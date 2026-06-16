import cv2

url = "http://192.168.1.101:8080/video"

cap = cv2.VideoCapture(url)

while True:
    ret, frame = cap.read()

    if not ret:
        print("Failed to get frame")
        break

    cv2.imshow("Temple Kitchen Camera", frame)

    if cv2.waitKey(1) == 27:  # ESC key
        break

cap.release()
cv2.destroyAllWindows()