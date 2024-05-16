from django.shortcuts import render
import psycopg2
import datetime

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response

class authenticationView(APIView):
    def post(self, request):
        user_info = request.data.get("user_info")
        user_name = user_info["username"]
        user_pass = user_info["password"]

        if user_pass == "admin":
            return Response({"status" : "success"})
        
        else:
            return Response({"status" : "failed"})
        # conn = psycopg2.connect(database="userdb", user="tksan", password="6179")
        # cur = conn.cursor()
        # username = user_info["username"]
        # timestamp = datetime.datetime.now()  # 現在の日時
        # usermessage = user_info["usermessage"]
        # aimessage = user_info["aimessage"]
        # id = int(user_info["id"])
        # # データ挿入
        # cur.execute("INSERT INTO chathistory (username, timestamp, usermessage, aimessage, id) VALUES (%s, %s, %s, %s, %s)",
        #             (username, timestamp, usermessage, aimessage, id))

        # # トランザクションの確定
        # conn.commit()
        # cur.close()
        # conn.close()

