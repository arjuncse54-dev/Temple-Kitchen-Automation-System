from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

notifications_data = [

    {
        "id": 1,
        "title": "No Hairnet",
        "location": "Kitchen Entry",
        "time": "06:45 PM"
    },

    {
        "id": 2,
        "title": "No Gloves",
        "location": "Food Area",
        "time": "06:50 PM"
    }

]

@app.route("/notifications")
def notifications():

    return notifications_data

@app.route("/notifications/<int:id>", methods=["DELETE"])
def delete_notification(id):

    global notifications_data

    notifications_data = [

        notification

        for notification in notifications_data

        if notification["id"] != id

    ]

    return jsonify({

        "message":"Notification deleted"

    })

@app.route("/notifications", methods=["POST"])
def add_notification():

    data = request.json

    notifications_data.append({

        "id": len(notifications_data) + 1,

        "title": data["title"],

        "location": data["location"],

        "time": data["time"]

    })

    return jsonify({

        "message": "Notification Added"

    })


if __name__ == "__main__":

    app.run(debug=True)