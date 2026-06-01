import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# ==========================
# LOGIN
# ==========================

@app.route("/login", methods=["POST"])
def login():

    try:

        data = request.json

        print("Received Data:", data)

        email = data["email"]
        password = data["password"]

        conn = sqlite3.connect("temple_kitchen.db")

        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT *
            FROM users
            WHERE email = ?
            AND password = ?
            """,
            (email, password)
        )

        user = cursor.fetchone()

        conn.close()

        if user:

            return {
                "success": True,
                "message": "Login Successful"
            }

        return {
            "success": False,
            "message": "Invalid Email or Password"
        }

    except Exception as e:

        print("LOGIN ERROR:", e)

        return {
            "success": False,
            "error": str(e)
        }, 500



# ==========================
# DATABASE SETUP
# ==========================

def init_db():

    conn = sqlite3.connect("temple_kitchen.db")

    cursor = conn.cursor()

    cursor.execute("""

        CREATE TABLE IF NOT EXISTS notifications (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            title TEXT NOT NULL,

            location TEXT NOT NULL,

            time TEXT NOT NULL

        )

    """)


    cursor.execute("""

    CREATE TABLE IF NOT EXISTS settings (

        id INTEGER PRIMARY KEY,

        camera_url TEXT,

        notifications INTEGER,

        sound INTEGER

    )

""") 
    

    cursor.execute("""

    INSERT OR IGNORE INTO settings

    (id, camera_url, notifications, sound)

    VALUES

    (1, '', 1, 1)

""")
    
    cursor.execute("""

    CREATE TABLE IF NOT EXISTS users (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        email TEXT UNIQUE,

        password TEXT

    )

""") 
    
    cursor.execute("""

    INSERT OR IGNORE INTO users

    (id, email, password)

    VALUES

    (1,
     'admin@temple.com',
     'admin123')

""")

    conn.commit()

    conn.close()


# ==========================
# TEMPORARY DATA
# ==========================




# ==========================
# GET NOTIFICATIONS
# ==========================
@app.route("/notifications")
def notifications():

    conn = sqlite3.connect("temple_kitchen.db")

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM notifications")

    rows = cursor.fetchall()

    conn.close()

    notifications = []

    for row in rows:

        notifications.append({

            "id": row["id"],
            "title": row["title"],
            "location": row["location"],
            "time": row["time"]

        })

    return notifications


# ==========================
# DELETE NOTIFICATION
# ==========================

@app.route("/notifications/<int:id>", methods=["DELETE"])
def delete_notification(id):

    conn = sqlite3.connect("temple_kitchen.db")

    cursor = conn.cursor()

    cursor.execute(

        "DELETE FROM notifications WHERE id = ?",

        (id,)

    )

    conn.commit()

    conn.close()

    return jsonify({

        "message": "Notification deleted"

    })


# ==========================
# ADD NOTIFICATION
# ==========================

@app.route("/notifications", methods=["POST"])
def add_notification():

    data = request.json

    conn = sqlite3.connect("temple_kitchen.db")

    cursor = conn.cursor()

    cursor.execute("""

        INSERT INTO notifications
        (title, location, time)

        VALUES (?, ?, ?)

    """, (

        data["title"],
        data["location"],
        data["time"]

    ))

    conn.commit()

    conn.close()

    return jsonify({

        "message": "Notification Added"

    })  
@app.route("/reports")
def reports():

    conn = sqlite3.connect("temple_kitchen.db")

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM notifications")

    rows = cursor.fetchall()

    conn.close()

    reports = []

    for row in rows:

        reports.append({

            "id": row["id"],

            "user": "System",

            "violation": row["title"],

            "location": row["location"],

            "time": row["time"],

            "status": "Pending"

        })

    return reports

@app.route("/dashboard-stats")
def dashboard_stats():

    conn = sqlite3.connect("temple_kitchen.db")

    cursor = conn.cursor()

    cursor.execute(
        "SELECT COUNT(*) FROM notifications"
    )

    total_violations = cursor.fetchone()[0]

    conn.close()

    return {

        "total_violations": total_violations,

        "today_violations": total_violations,

        "active_cameras": 4,

        "alert_status": "Active"
    } 


@app.route("/settings")
def get_settings():

    conn = sqlite3.connect("temple_kitchen.db")

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM settings WHERE id = 1"
    )

    row = cursor.fetchone()

    conn.close()

    return {

        "cameraUrl": row["camera_url"],

        "notifications": bool(
            row["notifications"]
        ),

        "sound": bool(
            row["sound"]
        )

    }
   


@app.route("/settings", methods=["POST"])
def save_settings():

    data = request.json

    conn = sqlite3.connect("temple_kitchen.db")

    cursor = conn.cursor()

    cursor.execute("""

        UPDATE settings

        SET

        camera_url = ?,

        notifications = ?,

        sound = ?

        WHERE id = 1

    """,
      (

        data["cameraUrl"],

        int(data["notifications"]),

        int(data["sound"])

    ))  


    cursor.execute("""

    CREATE TABLE IF NOT EXISTS users (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        email TEXT UNIQUE,

        password TEXT

    )

""")
    

    cursor.execute("""

    INSERT OR IGNORE INTO users

    (id, email, password)

    VALUES

    (1,
     'admin@temple.com',
     'admin123')

""")

    conn.commit()

    conn.close()

    return {

        "message": "Settings Saved"

    } 





# ==========================
# START APP
# ==========================

init_db()

if __name__ == "__main__":

    app.run(debug=True)

  





    