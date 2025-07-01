# Intelligent Resume Generator

[Live Demo on Hugging Face Spaces](https://huggingface.co/spaces/ThaboMarvin/Sentiment-Analyzer)

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
- [Usage](#usage)  
- [Templates](#templates)  
- [API Integration](#api-integration)  
- [Export Options](#export-options)  
- [Accessibility and Responsiveness](#accessibility-and-responsiveness)  
- [Future Improvements](#future-improvements)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## Project Overview

The **Intelligent Resume Generator** is a modern web application designed to help users create professional, elegant, and creative resumes with ease. This app combines traditional input-based resume building with advanced AI-powered features, allowing users to generate a polished resume quickly, either by filling out the form or by leveraging AI-generated professional summaries and layouts.

The application provides a live preview with multiple customizable templates and supports exporting resumes in PDF, DOCX, and HTML formats. An integrated ATS (Applicant Tracking System) compatibility meter offers instant feedback on how well the resume is optimized for automated job application systems.

---

## Features

- **User-Friendly Form Interface:** Intuitive input sections for personal info, experience, education, skills, and more.  
- **Multiple Resume Templates:** Choose from Professional, Modern, Minimalist, Elegant, Creative, and AI-Generated templates.  
- **AI-Generated Content:** Automatically generate a professional summary and enhanced resume layout using free OpenRouter AI API.  
- **Live Resume Preview:** See real-time updates of your resume in your chosen template style.  
- **ATS Compatibility Meter:** Get instant scoring and suggestions to optimize your resume for job application tracking systems.  
- **Smart Suggestions Panel:** Tailored improvement tips to enhance your resume content.  
- **Export Options:** Download your resume as PDF, DOCX, or HTML with a single click.  
- **Responsive Design:** Fully mobile-friendly and accessible UI for any device.  
- **Loading and Error Handling:** Clear loading indicators and error messages during AI content generation and exports.

---

## Technologies Used

- **Frontend:** HTML5, CSS3 (with CSS variables and grid/flex layouts), JavaScript (ES6+)  
- **AI Integration:** OpenRouter Free API for AI-generated summaries and content  
- **Export Libraries:** jsPDF, html-docx-js, FileSaver.js  
- **Build Tools:** None (Vanilla JS app for easy deployment)  

---

## Getting Started

### Prerequisites

To run the project locally, you need:

- A modern web browser (Chrome, Firefox, Edge, Safari)  
- Node.js and npm (optional, only if you plan to install dependencies or extend the project)  

### Installation

Clone the repository:

```bash
git clone https://github.com/ThaboMarvin/intelligent-resume-generator.git
cd intelligent-resume-generator
````

Open the `index.html` file in your browser to start the application.

### Running Locally

You can simply open `index.html` in your browser, or use a live server for hot reloads:

```bash
# Using VS Code Live Server extension or
npx live-server
```

---

## Usage

1. Fill out the form sections with your personal information, experiences, education, and skills.
2. Select your preferred resume template from the top selector.
3. Click "Generate Resume" to create a live preview of your resume.
4. Use the "ATS Compatibility" panel to review your resume score and suggested improvements.
5. Optionally, click "Generate AI Summary" to get a professionally rewritten summary powered by AI.
6. Export your resume by clicking PDF, DOCX, or HTML export buttons.

---

## Templates

The app includes six beautifully designed templates:

* **Professional:** Classic and clean design suitable for most industries.
* **Modern:** Stylish with color blocks and contemporary typography.
* **Minimalist:** Simple and understated for maximum readability.
* **Elegant:** Serif fonts and subtle styling for creative professionals.
* **Creative:** Bold colors and unique typography for artistic fields.
* **AI-Generated:** Special template that displays AI-enhanced content with a distinctive style.

Each template adapts responsively to screen size and preserves print/export fidelity.

---

## API Integration

The AI-powered features use the **OpenRouter free API** for generating professional summaries and enhancing resume content. This integration helps users who need help crafting polished summaries or want a smarter resume layout quickly.

The app includes error handling and loading states to ensure a smooth user experience.

---

## Export Options

Your resume can be exported easily as:

* **PDF:** A print-ready professional PDF.
* **DOCX:** Editable Microsoft Word document format.
* **HTML:** Clean HTML markup for web-based sharing or further editing.

Exports preserve your selected template’s styles and formatting.

---

## Accessibility and Responsiveness

* Fully responsive layouts for mobile, tablet, and desktop devices.
* Keyboard-friendly navigation and focus styles (planned enhancements).
* Clear color contrasts and legible font sizes.

---

## Future Improvements

* Add local storage for saving form progress.
* Enhanced form validation with live feedback.
* Additional export formats such as Markdown.
* User accounts and cloud saving options.
* More AI-powered enhancements and language support.

---

## Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/ThaboMarvin/intelligent-resume-generator/issues).

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

Created by **Thabo Marvin**.
You can reach me at:

* Email: [thabo.marvin@example.com](mailto:thabo.marvin@example.com)
* GitHub: [https://github.com/ThaboMarvin](https://github.com/ThaboMarvin)
* LinkedIn: [https://linkedin.com/in/thabomarvin](https://linkedin.com/in/thabomarvin)

---

Thank you for checking out the Intelligent Resume Generator!


```
