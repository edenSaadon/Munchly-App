# ======================================================================
# File: yolo_detect.py
# Purpose:
# This script loads a pretrained YOLOv8 model and performs object detection
# on a given image. It prints a JSON array of unique labels (object names)
# detected in the image.
#
# Usage (from command line):
#   python yolo_detect.py path/to/image.jpg
# ======================================================================

from ultralytics import YOLO
import sys
import json

# Load the pretrained YOLOv8 model (YOLOv8x is the largest version)
model = YOLO("yolov8x.pt")

# Get the image path from command-line arguments
img_path = sys.argv[1]

# Run object detection (disable verbose output for cleaner logs)
results = model(img_path, verbose=False)

# Extract detected object class names
labels = []
for r in results:
    for c in r.boxes.cls:
        labels.append(r.names[int(c)])

# Print unique object names as a JSON array
print(json.dumps(list(set(labels))))
