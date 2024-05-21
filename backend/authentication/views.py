from django.shortcuts import render
import psycopg2
import datetime
import bcrypt
import hashlib
import os 
from psycopg2.extensions import Binary

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response

def hash_password(password):

    password = password.encode('utf-8') 
    
    # bcryptを使用してパスワードをハッシュ化
    salt = os.urandom(16)
    hashed_password_hex = hashlib.sha256(password + salt).hexdigest()
    
    # ハッシュ化されたパスワードをデータベースに保存
    # ここではハッシュ化されたパスワードを返すだけ
    return hashed_password_hex, Binary(salt)

def dehash_password(password, salt):
    salt = salt.tobytes()
    password = password.encode('utf-8') 
    hashed_password_hex = hashlib.sha256(password + salt).hexdigest()
    return hashed_password_hex

class authenticationView(APIView):
    def post(self, request):
        user_info = request.data.get("user_info")
        user_name = user_info["username"]
        user_pass = user_info["password"]

        conn = psycopg2.connect(database="userdb", user="tksan", password="6179")
        cur = conn.cursor()
        cur.execute("SELECT * FROM usertable WHERE username = %s", (user_name,))
        rows = cur.fetchall()

        db_pass = dehash_password(user_pass, rows[-1][2])

        if len(rows) == 0:
            return Response({"status" : "failed"})
        
        elif db_pass == rows[-1][1]:
            return Response({"status" : "success"})
        else:
            return Response({"status" : "failed"})

class authenticationcreateView(APIView):
    def post(self, request):
        try:
            user_info = request.data.get("user_info")
            user_name = user_info["username"]
            user_pass = user_info["password"]
            conn = psycopg2.connect(database="userdb", user="tksan", password="6179")

            cur = conn.cursor()

            hashed_password, salt = hash_password(user_pass)

            cur.execute("INSERT INTO usertable (username, password, password_salt) VALUES (%s, %s, %s)",
                (user_name, hashed_password, salt))
            
            conn.commit()
            cur.close()
            conn.close()

            return Response({"status" : "success"})
        
        except:
            return Response({"status" : "failed"})