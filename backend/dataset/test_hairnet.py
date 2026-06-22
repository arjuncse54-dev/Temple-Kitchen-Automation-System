from ultralytics import YOLO
import cv2
import requests
import time

model = YOLO(
    r"C:\Users\arjun\OneDrive\Desktop\Temple Kitchen Automation System\backend\dataset\runs\detect\train-2\weights\best.pt"
)

last_alert_time = 0

url = "http://10.128.132.167:8080/video"

cap = cv2.VideoCapture(url)

while True:

    success, frame = cap.read()

    if not success:
        break

    results = model(frame)

    # Check detections
    for box in results[0].boxes:

        cls = int(box.cls[0])

        label = model.names[cls]

        print("Detected:", label)

        if label == "no-hairnet":

            current_time = time.time()

            if current_time - last_alert_time > 10:

                print("NO HAIRNET DETECTED")

                try:
                    response = requests.post(
                        "http://127.0.0.1:5000/detect-violation",
                        json={
                            "violation": "No Hairnet"
                        }
                    )

                    print("Notification Sent:", response.status_code)

                except Exception as e:
                    print("Error sending notification:", e)

                last_alert_time = current_time

    annotated_frame = results[0].plot()

    cv2.imshow(
        "Hairnet Detection",
        annotated_frame
    )

    if cv2.waitKey(1) == 27:  # ESC key
        break

cap.release()
cv2.destroyAllWindows()