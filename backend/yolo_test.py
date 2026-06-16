from ultralytics import YOLO

model = YOLO("yolov8n.pt")

results = model.predict(
    source=0,
    show=True,
    conf=0.5,
    stream=True
)

for result in results:

    print(result.boxes)