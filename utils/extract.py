import sys
import cv2
from PIL import Image
from io import BytesIO
import base64
import numpy as np
import pytesseract
import re

# convert the base64 string to an image
def base64_to_image(base64_string):
    imgdata = base64.b64decode(base64_string)
    image = Image.open(BytesIO(imgdata))
    numpy_image = np.array(image)
    return numpy_image

# get grayscale image
def get_grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# noise removal
def remove_noise(image):
    return cv2.medianBlur(image,5)

# thresholding
def thresholding(image):
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

#dilation
def dilate(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.dilate(image, kernel, iterations = 1)

#erosion
def erode(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.erode(image, kernel, iterations = 1)

#opening - erosion followed by dilation
def opening(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)

#canny edge detection
def canny(image):
    return cv2.Canny(image, 100, 200)

#skew correction
def deskew(image):
    coords = np.column_stack(np.where(image > 0))
    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return rotated

#template matching
def match_template(image, template):
    return cv2.matchTemplate(image, template, cv2.TM_CCOEFF_NORMED)

# OCR with tesseract
def ocr(image):
    # custom_config = r'--oem 3 --psm 6'
    return pytesseract.image_to_string(image)

# save the image
def save_image(image, path):
    cv2.imwrite(path, image)

# read image from file
def read_image(path):
    return cv2.imread(path)

# base64String = sys.argv[1]
# image = base64_to_image(base64String)



imagePath = sys.argv[1]
image = read_image(imagePath)

# Preprocess Image
gray = get_grayscale(image)
output = thresholding(gray)

save_image(output, 'test.jpeg')

text = ocr(output)

# Define the regex pattern to extract details
first_name_pattern = r'FN([A-Z]+)'
last_name_pattern = r'tn\s([A-Z]+)'
dates_pattern = r'(\d{2}/\d{2}/\d{4})'

# Find the matches
first_name = re.search(first_name_pattern, text)
last_name = re.search(last_name_pattern, text)
dates = re.findall(dates_pattern, text) # expiry = dates[0], issuance = dates[-1]

# Extract the details
first_name = first_name.group(1) if first_name else ''
last_name = last_name.group(1) if last_name else ''
issuance_date = dates[-1] if dates else ''
expiry_date = dates[0] if dates else ''

# print the details
print(f'{first_name} {last_name} {issuance_date} {expiry_date}')