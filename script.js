// Complete functional script.js with AI integration, ATS scoring, and loading state

const resumeForm = document.getElementById('resumeForm');
const resumePreview = document.getElementById('resumePreview');
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');
const templateCards = document.querySelectorAll('.template-card');
const tabButtons = document.querySelectorAll('.tab-btn');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const exportDocxBtn = document.getElementById('exportDocxBtn');
const exportHtmlBtn = document.getElementById('exportHtmlBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const suggestionsList = document.getElementById('suggestionsList');
const atsScoreElem = document.getElementById('atsScore');
const meterFill = document.getElementById('meterFill');
const feedbackList = document.getElementById('feedbackList');

let selectedTemplate = 'professional';

// Template selection
templateCards.forEach(card => {
  card.addEventListener('click', () => {
    document.querySelector('.template-card.active').classList.remove('active');
    card.classList.add('active');
    selectedTemplate = card.getAttribute('data-template');
    generateResume();
  });
});

// Tab switching
let activeTab = 'full';
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.tab-btn.active').classList.remove('active');
    btn.classList.add('active');
    activeTab = btn.getAttribute('data-tab');
    renderResume();
  });
});

// Dynamic sections
let experienceCount = 1;
let educationCount = 1;

const addExperience = document.getElementById('addExperience');
addExperience.addEventListener('click', () => {
  experienceCount++;
  const experienceForm = document.createElement('div');
  experienceForm.className = 'experience-form';
  experienceForm.innerHTML = `
    <div class="form-group">
      <label for="jobTitle${experienceCount}">Job Title</label>
      <input type="text" id="jobTitle${experienceCount}" placeholder="Senior Developer" />
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="company${experienceCount}">Company</label>
        <input type="text" id="company${experienceCount}" placeholder="Tech Solutions Inc." />
      </div>
      <div class="form-group">
        <label for="jobDate${experienceCount}">Date Range</label>
        <input type="text" id="jobDate${experienceCount}" placeholder="Jan 2020 - Present" />
      </div>
    </div>
    <div class="form-group">
      <label for="jobDescription${experienceCount}">Description & Achievements</label>
      <textarea id="jobDescription${experienceCount}" placeholder="Led development of..."></textarea>
    </div>
  `;
  document.getElementById('experienceContainer').appendChild(experienceForm);
});

const addEducation = document.getElementById('addEducation');
addEducation.addEventListener('click', () => {
  educationCount++;
  const educationForm = document.createElement('div');
  educationForm.className = 'education-form';
  educationForm.innerHTML = `
    <div class="form-group">
      <label for="school${educationCount}">School/University</label>
      <input type="text" id="school${educationCount}" placeholder="Stanford University" />
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="degree${educationCount}">Degree</label>
        <input type="text" id="degree${educationCount}" placeholder="Bachelor of Science in Computer Science" />
      </div>
      <div class="form-group">
        <label for="educationDate${educationCount}">Date Range</label>
        <input type="text" id="educationDate${educationCount}" placeholder="2016 - 2020" />
      </div>
    </div>
  `;
  document.getElementById('educationContainer').appendChild(educationForm);
});

// Reset form
resetBtn.addEventListener('click', () => {
  resumeForm.reset();
  resumePreview.innerHTML = '';
  atsScoreElem.textContent = '0%';
  meterFill.style.width = '0%';
  feedbackList.innerHTML = '';
});

// Generate Resume
generateBtn.addEventListener('click', generateResume);

function generateResume() {
  const resumeData = collectFormData();
  const targetDescription = document.getElementById('jobDescription').value;

  if (selectedTemplate === 'ai-generated') {
    generateWithAI(resumeData);
  } else {
    renderResume();
  }

  updateATSScore(resumeData, targetDescription);
   const smartSuggestions = [
    { title: 'Use Action Verbs', text: 'Start bullet points with strong action verbs like "Led", "Developed", or "Implemented".' },
    { title: 'Add Metrics', text: 'Quantify your impact: e.g. "Reduced response time by 30%".' }
  ];

  displaySuggestions(smartSuggestions);
}

function collectFormData() {
  const name = document.getElementById('fullName').value;
  const title = document.getElementById('jobTitle').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const location = document.getElementById('location').value;
  const summary = document.getElementById('summary').value;

  const experiences = [];
  for (let i = 1; i <= experienceCount; i++) {
    const jobTitle = document.getElementById(`jobTitle${i}`)?.value;
    const company = document.getElementById(`company${i}`)?.value;
    const date = document.getElementById(`jobDate${i}`)?.value;
    const description = document.getElementById(`jobDescription${i}`)?.value;

    if (jobTitle && company && date && description) {
      experiences.push({ jobTitle, company, date, description });
    }
  }

  const education = [];
  for (let i = 1; i <= educationCount; i++) {
    const school = document.getElementById(`school${i}`)?.value;
    const degree = document.getElementById(`degree${i}`)?.value;
    const date = document.getElementById(`educationDate${i}`)?.value;

    if (school && degree && date) {
      education.push({ school, degree, date });
    }
  }

  const skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s);

  return { name, title, email, phone, location, summary, experiences, education, skills };
}

function renderResume() {
  const data = collectFormData();
  let content = '';

  if (activeTab === 'full' || activeTab === 'summary') {
    content += `<div class='resume-header'><div class='resume-name'>${data.name}</div><div class='resume-title'>${data.title}</div><div class='contact-info'><span>${data.email}</span><span>${data.phone}</span><span>${data.location}</span></div></div>`;
    content += `<div class='section'><div class='section-title'>Professional Summary</div><p>${data.summary}</p></div>`;
  }

  if (activeTab === 'full' || activeTab === 'experience') {
    content += `<div class='section'><div class='section-title'>Experience</div>`;
    data.experiences.forEach(exp => {
      content += `<div class='experience-item'><div class='item-header'><div class='item-title'>${exp.jobTitle} at ${exp.company}</div><div class='item-date'>${exp.date}</div></div><div class='item-subtitle'>${exp.description}</div></div>`;
    });
    content += `</div>`;
  }

  if (activeTab === 'full' || activeTab === 'education') {
    content += `<div class='section'><div class='section-title'>Education</div>`;
    data.education.forEach(edu => {
      content += `<div class='education-item'><div class='item-header'><div class='item-title'>${edu.degree} at ${edu.school}</div><div class='item-date'>${edu.date}</div></div></div>`;
    });
    content += `</div>`;
  }

  if (activeTab === 'full' || activeTab === 'skills') {
    content += `<div class='section'><div class='section-title'>Skills</div><div class='skills-list'>`;
    data.skills.forEach(skill => {
      content += `<span class='skill-tag'>${skill}</span>`;
    });
    content += `</div></div>`;
  }

  resumePreview.className = `resume-preview template-${selectedTemplate}`;
  resumePreview.innerHTML = content;
}

// AI Integration
async function generateWithAI(data) {
  loadingIndicator.style.display = 'block';
  resumePreview.innerHTML = '';

  const prompt = `
Create a professional resume with the following structure:
- Full Name (bold)
- Job Title (italic)
- Contact Information (bold header, bullet points)
- Professional Summary (bold header, paragraph)
- Experience (bold header, job title italicized, bullet points)
- Education (bold header, degree italicized, bullet points if applicable)
- Skills (bold header, bullet points)
- Certifications (bold header, bullet points)
- Closing line: References available upon request.

Here is the candidate's information:
Name: ${data.name}
Title: ${data.title}
Email: ${data.email}
Phone: ${data.phone}
Summary: ${data.summary}
Experience: ${data.experiences.map(exp => `${exp.jobTitle} at ${exp.company} from ${exp.date}. ${exp.description}`).join('\n')}
Education: ${data.education.map(edu => `${edu.degree} from ${edu.school} (${edu.date})`).join('\n')}
Skills: ${data.skills.join(', ')}
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-small-3.2-24b-instruct:free',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const result = await response.json();
    let aiContent = result.choices[0].message.content;

    // Basic Markdown Parsing: bold, italics, bullets, line breaks
    aiContent = aiContent
      .replace(/\*\*(.*?)\*\*/g, '<h2 class="ai-section-title">$1</h2>') // Bold headers
      .replace(/\*(.*?)\*/g, '<h3 class="ai-sub-title">$1</h3>') // Italic sub-headers
      .replace(/•\s?(.*?)(?=\n|$)/g, '<li>$1</li>') // Bullet points
      .replace(/\n{2,}/g, '</ul><br><ul>') // Separate sections with line breaks
      .replace(/\n/g, '<br>'); // Normal line breaks

    // Wrap in initial <ul> for bullet points
    aiContent = '<ul>' + aiContent + '</ul>';

    resumePreview.className = 'resume-preview template-ai-generated';
    resumePreview.innerHTML = aiContent;

  } catch (error) {
    console.error(error);
    alert('AI generation failed. Please try again.');
  }

  loadingIndicator.style.display = 'none';
}


exportPdfBtn.addEventListener('click', () => {
  const resumeElement = document.getElementById('resumePreview');

  if (!resumeElement.innerHTML.trim()) {
    alert("Resume preview is empty. Please generate your resume first.");
    return;
  }

  exportPdfBtn.disabled = true;
  exportPdfBtn.innerHTML = 'Preparing...';

  html2canvas(resumeElement, {
    scale: 4, // Higher scale for better quality
    useCORS: true,
    willReadFrequently: true
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'pt', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;
    let remainingHeight = imgHeight;

    // Calculate the height in canvas pixels that matches one PDF page height
    const pageHeightInCanvas = (canvas.width / pageWidth) * pageHeight;

    while (remainingHeight > 0) {
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.min(pageHeightInCanvas, canvas.height - (position * (canvas.width / pageWidth)));

      const ctx = pageCanvas.getContext('2d');

      // Crop the image to the current page portion
      ctx.drawImage(
        canvas,
        0,
        position * (canvas.width / pageWidth),
        canvas.width,
        pageCanvas.height,
        0,
        0,
        canvas.width,
        pageCanvas.height
      );

      const pageImgData = pageCanvas.toDataURL('image/png');
      pdf.addImage(pageImgData, 'PNG', 0, 0, imgWidth, (pageCanvas.height * imgWidth) / canvas.width);

      remainingHeight -= pageHeight;
      if (remainingHeight > 0) {
        pdf.addPage();
        position++;
      }
    }

    pdf.save('resume.pdf');

    exportPdfBtn.disabled = false;
    exportPdfBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Export PDF';
  }).catch(error => {
    console.error('PDF Export Error:', error);
    alert('Failed to export PDF.');
    exportPdfBtn.disabled = false;
    exportPdfBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Export PDF';
  });
});



exportDocxBtn.addEventListener('click', () => {
  const { docx } = window;
  const { Document, Packer, Paragraph, TextRun } = docx;

  const resumeContent = document.getElementById('resumePreview');
  const textContent = resumeContent.innerText || resumeContent.textContent;

  if (!textContent.trim()) {
    alert('Resume content is empty. Please generate a resume first.');
    return;
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: textContent,
              font: "Arial",
              size: 24,
            })
          ]
        })
      ]
    }]
  });

  Packer.toBlob(doc).then(blob => {
    const docxUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = docxUrl;
    link.download = 'Resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});


exportHtmlBtn.addEventListener('click', () => {
  const blob = new Blob([resumePreview.innerHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Resume.html';
  a.click();
  URL.revokeObjectURL(url);
});

// Display Suggestions
function displaySuggestions(suggestions) {
  const suggestionsList = document.getElementById('suggestionsList');
  if (!suggestionsList) {
    console.error('Suggestions list element not found!');
    return;
  }

  suggestionsList.innerHTML = '';

  if (!Array.isArray(suggestions) || suggestions.length === 0) {
    suggestionsList.innerHTML = '<li>No suggestions at this time.</li>';
    return;
  }

  suggestions.forEach(sug => {
    const li = document.createElement('li');
    li.classList.add('suggestion-item');
    li.innerHTML = `
      <i class="fas fa-lightbulb suggestion-icon"></i>
      <div class="suggestion-content">
        <h4>${sug.title || 'No title'}</h4>
        <p>${sug.text || 'No content'}</p>
      </div>
    `;
    suggestionsList.appendChild(li);
    console.log('Suggestions array:', suggestions);

  });
}


// ATS Scoring
function updateATSScore(formData, targetDescription) {
  const atsScoreElem = document.getElementById('atsScore');
  const meterFill = document.getElementById('meterFill');
  const feedbackList = document.getElementById('feedbackList');

  if (!targetDescription) {
    atsScoreElem.textContent = '0%';
    meterFill.style.width = '0%';
    feedbackList.innerHTML = '<li>Paste the target job description to get ATS score.</li>';
    displaySuggestions([]); // Clear suggestions when job description is missing
    return;
  }

  const targetWords = targetDescription.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  const resumeText = `
    ${formData.summary}
    ${formData.skills.join(' ')}
    ${formData.experiences.map(e => e.jobTitle + ' ' + e.description).join(' ')}
    ${formData.education.map(e => e.degree + ' ' + e.school).join(' ')}
  `.toLowerCase();

  let matchedCount = 0;
  const unmatchedKeywords = [];

  const uniqueTargetWords = [...new Set(targetWords)];
  uniqueTargetWords.forEach(word => {
    if (resumeText.includes(word)) {
      matchedCount++;
    } else {
      unmatchedKeywords.push(word);
    }
  });

  const score = Math.round((matchedCount / uniqueTargetWords.length) * 100);
  atsScoreElem.textContent = `${score}%`;
  meterFill.style.width = `${score}%`;

  feedbackList.innerHTML = '';
  if (score > 80) {
    feedbackList.innerHTML = '<li><i class="fas fa-check-circle"></i> Excellent match! Your resume is ATS optimized.</li>';
  } else if (score > 50) {
    feedbackList.innerHTML = '<li><i class="fas fa-exclamation-circle"></i> Good, but consider adding more relevant keywords.</li>';
  } else {
    feedbackList.innerHTML = '<li><i class="fas fa-exclamation-triangle"></i> Low score. Review the job description and add key skills or experiences.</li>';
  }

  // ===== Smart Suggestions Based on Score =====
  const suggestions = [];

  if (score < 80) {
    if (unmatchedKeywords.length > 0) {
      suggestions.push({
        title: 'Missing Keywords',
        text: `Consider adding these keywords from the job description: ${unmatchedKeywords.slice(0, 5).join(', ')}`
      });
    }

    suggestions.push({
      title: 'Quantify Achievements',
      text: 'Add measurable results like "Increased efficiency by 20%" to improve impact.'
    });

    suggestions.push({
      title: 'Use Action Verbs',
      text: 'Start bullet points with strong action verbs like "Led", "Developed", or "Implemented".'
    });
  }

  if (formData.skills.length < 5) {
    suggestions.push({
      title: 'Add More Skills',
      text: 'Include at least 5 relevant skills to strengthen your resume.'
    });
  }

  displaySuggestions(suggestions);
}

function testCanvasCapture() {
  const resumeElement = document.getElementById('resumePreview');

  if (!resumeElement.innerHTML.trim()) {
    alert("Resume preview is empty. Please generate your resume first.");
    return;
  }

  html2canvas(resumeElement, { 
    scale: 4, 
    useCORS: true, 
    logging: true // Optional: helps debug CORS issues 
  }).then(canvas => {
    // Append the captured canvas to the page to visually inspect it
    document.body.appendChild(canvas);

    // Optional: Log the canvas object to the console
    console.log('Canvas captured:', canvas);
  }).catch(err => {
    console.error('html2canvas capture failed:', err);
  });
}

