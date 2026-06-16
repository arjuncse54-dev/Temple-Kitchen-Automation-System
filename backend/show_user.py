import sqlite3

conn = sqlite3.connect("temple_kitchen.db")
cursor = conn.cursor()

cursor.execute("SELECT id, email, password FROM users")

for row in cursor.fetchall():
    print(row)

conn.close()