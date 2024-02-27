import sys
import cv2
from PIL import Image
from io import BytesIO
import base64
import numpy as np
import pytesseract

print ("START #############################################")
base64String = sys.argv[1]

def base64_to_image(base64_string):
    imgdata = base64.b64decode(base64_string)
    image = Image.open(BytesIO(imgdata))
    return image

image = base64_to_image(base64String)

# convert the image to a numpy array
image = np.array(image)

# save image
# cv2.imwrite("image.jpeg", image)

# convert the image to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# use tesseract to do OCR on the image
text = pytesseract.image_to_string(gray)

# add the text to the command line arguments
sys.argv.append(text)
print(sys.argv[2])

print ("END #############################################")

