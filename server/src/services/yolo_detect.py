from ultralytics import YOLO
import sys
import json

model = YOLO("yolov8x.pt")
img_path = sys.argv[1]

# Run detection
results = model(img_path, verbose=False)  # חשוב לכבות verbose

# הוצאת שמות האובייקטים
labels = []
for r in results:
    for c in r.boxes.cls:
        labels.append(r.names[int(c)])

# הדפסה נקייה (רק JSON):
print(json.dumps(list(set(labels))))
