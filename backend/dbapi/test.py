import psycopg2
import datetime

# PostgreSQLに接続
try:
    conn = psycopg2.connect(database="testdb", user="tksan", password="6179")
except psycopg2.OperationalError:
    conn = psycopg2.connect(database="postgres", user="tksan", password="6179")
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute("CREATE DATABASE testdb")
    cur.close()
    conn.close()
    conn = psycopg2.connect(database="testdb", user="tksan", password="6179")
    conn.close()

# カーソルを作成
cur = conn.cursor()

# SQL実行 (テーブル作成)
# cur.execute("""CREATE TABLE chathistory (
#                 username TEXT NOT NULL, 
#                 timestamp TIMESTAMP NOT NULL,
#                 usermessage TEXT,
#                 aimessage TEXT,
#                 id INTEGER)""")
# username = "Jams"
# timestamp = datetime.datetime.now()  # 現在の日時
# usermessage = "Hello, how are you?"
# aimessage = "I'm doing well, thanks!"
# id = 1


# # データ挿入
# cur.execute("INSERT INTO chathistory (username, timestamp, usermessage, aimessage, id) VALUES (%s, %s, %s, %s, %s)",
#             (username, timestamp, usermessage, aimessage, id))

# # トランザクションの確定
# conn.commit()

# 結果の取得
cur.execute("SELECT * FROM chathistory WHERE username='takashisan'")
rows = cur.fetchall()
print(rows)



# リソースの開放
cur.close()
conn.close()