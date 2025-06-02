#!/usr/bin/env python3
"""
resize_images.py

Resize images in public/images to predefined dimensions using macOS 'sips' command.
"""

import os
import subprocess

# Directory containing images to resize
dir_path = os.path.join(os.path.dirname(__file__), "public", "images")

# Mapping of image filenames to target sizes (width, height)
target_sizes = {
    "banner1.png": (1200, 400),
    "banner2.png": (1200, 400),
    "discover-events.jpg": (400, 288),
    "manage-bookings.png": (400, 288),
    "stay-notified.jpg": (400, 288),
    "calendar-view.png": (400, 288),
    "quick-search.jpg": (400, 288),
    "logo.png": (200, 200),
    "social-facebook.png": (50, 50),
    "social-twitter.png": (50, 50),
}

# Check directory
if not os.path.isdir(dir_path):
    print(f"Error: Directory not found: {dir_path}")
    exit(1)

# Process each file using sips
for filename, (width, height) in target_sizes.items():
    src_path = os.path.join(dir_path, filename)
    if not os.path.isfile(src_path):
        print(f"Skipping missing image: {filename}")
        continue
    try:
        print(f"Resizing {filename} to {width}x{height}...")
        subprocess.run(["sips", "-z", str(height), str(width), src_path], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Failed to resize {filename}: {e}")

print("Image resizing complete.")
