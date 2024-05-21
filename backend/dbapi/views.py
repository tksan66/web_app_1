# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ChatMessage
from .serializers import ChatMessageSerializer
from django.shortcuts import render
import psycopg2
import datetime

class UpdateDBView(APIView):
    def post(self, request):
        user_info = request.data.get("user_info")
        print(user_info)
        conn = psycopg2.connect(database="testdb", user="tksan", password="6179")
        cur = conn.cursor()
        username = user_info["username"]
        timestamp = datetime.datetime.now()  # 現在の日時
        usermessage = user_info["usermessage"]
        aimessage = user_info["aimessage"]
        id = int(user_info["id"])
        # データ挿入
        cur.execute("INSERT INTO chathistory (username, timestamp, usermessage, aimessage, id) VALUES (%s, %s, %s, %s, %s)",
                    (username, timestamp, usermessage, aimessage, id))

        # トランザクションの確定
        conn.commit()
        cur.close()
        conn.close()
        return Response({'status': 'success'})

class GetHistoryView(APIView):
    def post(self, request):
        conn = psycopg2.connect(database="testdb", user="tksan", password="6179")
        cur = conn.cursor()
        user_info = request.data.get("user_info")
        query = "SELECT * FROM chathistory WHERE username=%s"
        cur.execute(query,(user_info["username"],))
        rows = cur.fetchall()

        group_dict = {}
        for row in rows:
            if row[-1] not in group_dict:
                group_dict[row[-1]] = [row]
            else:
                group_dict[row[-1]].append(row)
        
        res_list = []
        for id, content in group_dict.items():
            message_list = []
            for con in content:
                message_list.append({"sender":"user","text":con[2]})
                message_list.append({"sender":"bot", "text":con[3]})
            res_list.append({"id":id, "message":message_list})

        cur.close()
        conn.close()
        return Response({'content': res_list})