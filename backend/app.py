import sqlite3
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import cv2
from flask import Response
from datetime import datetime

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

        conn = sqlite3.connect(
            "temple_kitchen.db"
        )

        conn.row_factory = sqlite3.Row

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

                "message": "Login Successful",

                "user_id": user["id"],

                "email": user["email"]

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


    cursor.execute(
    "PRAGMA table_info(notifications)"
)

    print(cursor.fetchall())

    cursor.execute("""

        CREATE TABLE IF NOT EXISTS notifications (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            title TEXT NOT NULL,

            location TEXT NOT NULL,

            time TEXT NOT NULL

        )

    """)

    try:
      cursor.execute(
        "ALTER TABLE notifications ADD COLUMN user_id INTEGER"
    )
    except:
      pass


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

    name TEXT,

    email TEXT UNIQUE,

    phone TEXT,

    password TEXT

)

""") 
    
    cursor.execute("""

INSERT OR IGNORE INTO users
(id, email, password)

VALUES
(1, 'admin@temple.com', 'admin123')

""")

    cursor.execute("""
INSERT OR IGNORE INTO users
(id, name, email, phone, password)

VALUES
(
    2,
    'Ravi Sharma',
    'worker1@temple.com',
    '9876543210',
    'worker123'
)

""")

    cursor.execute("""

INSERT OR IGNORE INTO users
(id, name, email, phone, password)

VALUES
(
    3,
    'Aman Gupta',
    'worker2@temple.com',
    '9876501234',
    'worker123'
)

""")

    cursor.execute("""

INSERT OR IGNORE INTO users
(id, name, email, phone, password)

VALUES
(
    4,
    'Rohit Kumar',
    'worker3@temple.com',
    '9998877665',
    'worker123'
)
""")
    
    cursor.execute(
    "PRAGMA table_info(notifications)"
)

    print(cursor.fetchall())

    cursor.execute("""

CREATE TABLE IF NOT EXISTS warnings (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER,

    title TEXT,

    location TEXT,

    time TEXT

)

""")
    
    




    conn.commit()

    conn.close()


# ==========================
# TEMPORARY DATA
# ==========================




# ==========================
# GET USERS
# ==========================

@app.route("/users")
def get_users():

    conn = sqlite3.connect("temple_kitchen.db")

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users")

    rows = cursor.fetchall()

    conn.close()

    users = []

    for row in rows:

        users.append({

            "id": row["id"],
            "email": row["email"]

        })

    return users




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

    print("Notification Data:", data)

    conn = sqlite3.connect("temple_kitchen.db")

    cursor = conn.cursor()
    cursor.execute("""

    INSERT INTO notifications
    (user_id, title, location, time)

    VALUES (?, ?, ?, ?)

""", (

    data["user_id"],
    data["title"],
    data["location"],
    data["time"]

))

    conn.commit()

    conn.close()

    return jsonify({

        "message": "Notification Added"

    })  

@app.route("/dashboard-stats")
def dashboard_stats():

    conn = sqlite3.connect(
        "temple_kitchen.db"
    )

    cursor = conn.cursor()

    # Total warnings/violations
    cursor.execute(
        "SELECT COUNT(*) FROM warnings"
    )
    total_violations = cursor.fetchone()[0]

    # Today's violations
    today_violations = total_violations

    conn.close()

    return {

        "total_violations":
        total_violations,

        "today_violations":
        today_violations,

        "active_cameras":
        1,

        "alert_status":
        "Active" if total_violations > 0
        else "Inactive"

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
(id, name, email, phone, password)

VALUES
(
    1,
    'Administrator',
    'admin@temple.com',
    '0000000000',
    'admin123'
)

""")

    conn.commit()

    conn.close()

    return {

        "message": "Settings Saved"

    } 
# ==========================
# USER NOTIFICATIONS
# ==========================

@app.route("/user-notifications/<int:user_id>")
def user_notifications(user_id):

    conn = sqlite3.connect(
        "temple_kitchen.db"
    )

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""

        SELECT *
        FROM notifications
        ORDER BY id DESC

    """)

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
# ADD WARNING
# ==========================

@app.route("/warnings", methods=["POST"])
def add_warning():

    data = request.json

    print("Warning Data:", data)

    conn = sqlite3.connect(
        "temple_kitchen.db"
    )

    cursor = conn.cursor()

    cursor.execute("""

        INSERT INTO warnings
        (user_id, title, location, time)

        VALUES (?, ?, ?, ?)

    """, (

        data["user_id"],
        data["title"],
        data["location"],
        data["time"]

    ))

    conn.commit()

    conn.close()

    return jsonify({

        "message": "Warning Added"

    })


# ==========================
# GET USER WARNINGS
# ==========================

@app.route("/user-warnings/<int:user_id>")
def get_user_warnings(user_id):

    conn = sqlite3.connect(
        "temple_kitchen.db"
    )

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""

        SELECT *
        FROM warnings

        WHERE user_id = ?

        ORDER BY id DESC

    """, (user_id,))

    rows = cursor.fetchall()

    conn.close()

    warnings = []

    for row in rows:

        warnings.append({

            "id": row["id"],

            "title": row["title"],

            "location": row["location"],

            "time": row["time"]

        })

    return warnings



    

# ==========================
# USER PROFILE
# ==========================

@app.route("/profile/<int:user_id>")
def profile(user_id):

    conn = sqlite3.connect(
        "temple_kitchen.db"
    )

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute(

        """
        SELECT *
        FROM users
        WHERE id = ?
        """,

        (user_id,)
    )

    user = cursor.fetchone()

    conn.close()

    if not user:

        return {
            "error": "User Not Found"
        }

    return {

    "id": user["id"],

    "name": user["name"],

    "email": user["email"],

    "phone": user["phone"],

    "password": user["password"]

}

  #=======================
   # UPDATE PROFILE
# ==========================

@app.route("/update-profile", methods=["POST"])
def update_profile():

    data = request.json

    conn = sqlite3.connect(
        "temple_kitchen.db"
    )

    cursor = conn.cursor()

    cursor.execute("""

        UPDATE users

        SET

        name = ?,
        email = ?,
        phone = ?,
        password = ?

        WHERE id = ?

    """, (

        data["name"],
        data["email"],
        data["phone"],
        data["password"],
        data["user_id"]

    ))

    conn.commit()

    conn.close()

    return {
        "success": True
    }



    # ==========================
# LIVE CAMERA
# ==========================

camera = cv2.VideoCapture(0)

def generate_frames():

    while True:

        success, frame = camera.read()

        if not success:
            break

        ret, buffer = cv2.imencode(
            ".jpg",
            frame
        )

        frame = buffer.tobytes()

        yield (

            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n'
            + frame +
            b'\r\n'

        )


@app.route("/video_feed")
def video_feed():

    return Response(

        generate_frames(),

        mimetype=
        "multipart/x-mixed-replace; boundary=frame"

    )

# ==========================
# AI DETECTION
# ==========================

@app.route(
    "/detect-violation",
    methods=["POST"]
)
def detect_violation():

    data = request.json

    violation = data["violation"]

    conn = sqlite3.connect(
        "temple_kitchen.db"
    )

    cursor = conn.cursor()

    cursor.execute("""

        INSERT INTO notifications
        (title, location, time)

        VALUES (?, ?, ?)

    """, (

        violation,

        "Kitchen Entry",

        datetime.now()
        .strftime("%I:%M:%S %p")

    ))

    conn.commit()

    conn.close()

    return {

        "success": True

    }
    


    # ==========================
# REPORTS
# ==========================

@app.route("/reports")
def reports():

    conn = sqlite3.connect(
        "temple_kitchen.db"
    )

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""

        SELECT
        warnings.*,
        users.name

        FROM warnings

        LEFT JOIN users

        ON warnings.user_id = users.id

        ORDER BY warnings.id DESC

    """)

    rows = cursor.fetchall()

    conn.close()

    reports = []

    for row in rows:

        reports.append({

            "user": row["name"],

            "violation": row["title"],

            "location": row["location"],

            "time": row["time"],

            "status": "Warning Sent"

        })

    return reports

    


# ==========================
# START APP
# ==========================

init_db()

if __name__ == "__main__":

    app.run(debug=True)

  





    