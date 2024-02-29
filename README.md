<a name="readme-top"></a>

<div align="center">
  <h3><b>DL SCAN</b></h3>
</div>

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

# 📖 DL SCAN <a name="about-project"></a>

**DL Scan** is a web application that allows users to scan and store their driver's license information. The application will use OCR to extract the information from the driver's license and display it. The application works fully on the client side.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

The following technologies were used in the development of this project:

- **React (Next.js)** for the user interface.
  - **React-webcam** for capturing images.
- **Python** for the image processing with the modules below:
  - **OpenCV** for image processing.
  - **Tesseract** for OCR.

<!-- Features -->

### Key Features <a name="key-features"></a>

- **Capture Image**: Users can capture an image of their driver's license using their device's camera.
- **Extract Information**: The application will use OCR to extract the information from the driver's license.
- **Display Information**: The extracted information will be displayed in tabular form.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Setup

Clone this repository to your desired folder:

```sh
  git clone git@github.com:yuvenalmash/dl-scan.git
  cd dl-scan
```

### Install

Install node modules with:
  
  ```sh
    npm install
  ```
Install python modules with:
  
  ```sh
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
  ```

### Usage

To run the project, execute the following command:

```sh
  npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Yuvenal Njoroge**
- GitHub: [@yuvenalmash](https://github.com/yuvenalmash)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

The extract part of the application is incomplete. The following features are planned for the future:

- [ ] **Add an adaptable image processing to prepare for OCR**.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
