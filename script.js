// Main application controller
class QuestionnaireApp {
    constructor() {
        // DOM Elements
        this.elements = {
            intro: document.getElementById('intro'),
            questionnaire: document.getElementById('questionnaire'),
            questionContainer: document.getElementById('question-container'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            saveBtn: document.getElementById('saveBtn'),
            progressContainer: document.getElementById('progress-container'),
            progressBar: document.getElementById('progress-bar'),
            progressText: document.getElementById('progress-text'),
            summary: document.getElementById('summary'),
            answersSummary: document.getElementById('answers-summary'),
            exportCsv: document.getElementById('exportCsv'),
            exportExcel: document.getElementById('exportExcel'),
            exportPdf: document.getElementById('exportPdf'),
            newResponse: document.getElementById('newResponse'),
            startBtn: document.getElementById('startBtn'),
            diceRadios: document.querySelectorAll('input[name="dice"]'),
            diceOtherSection: document.getElementById('diceOtherSection'),
            diceOther: document.getElementById('diceOther')
        };

        // Initialize the app
        this.currentSectionIndex = 0;
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.totalQuestions = this.calculateTotalQuestions();
        
        // Bind event listeners
        this.bindEvents();
        
        // Load saved progress if available
        this.loadProgress();

        // Initialize the app
        this.currentSectionIndex = 0;
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.totalQuestions = this.calculateTotalQuestions();
        
        // Bind methods
        this.setupAutoAdvance = this.setupAutoAdvance.bind(this);
        
        // Bind event listeners
        this.bindEvents();
        
        // Load saved progress if available
        this.loadProgress();
        
        // Setup auto-advance
        this.setupAutoAdvance();
        }
    
    // Calculate total number of questions
    calculateTotalQuestions() {
        return questionnaireData.sections.reduce((total, section) => {
            return total + section.questions.length;
        }, 0);
    }
    
    // Bind all event listeners
    bindEvents() {
        // Navigation buttons
        this.elements.startBtn.addEventListener('click', () => this.startQuestionnaire());
        this.elements.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.elements.nextBtn.addEventListener('click', () => this.navigate(1));
        this.elements.saveBtn.addEventListener('click', () => this.saveProgress());
        this.elements.newResponse.addEventListener('click', () => this.resetQuestionnaire());
        
        // Export buttons
        this.elements.exportCsv.addEventListener('click', () => this.exportToCsv());
        this.elements.exportExcel.addEventListener('click', () => this.exportToExcel());
        this.elements.exportPdf.addEventListener('click', () => this.exportToPdf());
        
        // DICE framework radio buttons
        this.elements.diceRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.elements.diceOtherSection.style.display = 
                    e.target.id === 'diceNone' ? 'block' : 'none';
            });
        });
    }
    
    // Start the questionnaire
    startQuestionnaire() {
        // Save DICE framework selection
        const selectedDice = document.querySelector('input[name="dice"]:checked');
        if (!selectedDice) {
            alert('Selecteer een optie uit het DICE-framework of geef aan waarom VR wordt overwogen.');
            return;
        }
        
        this.answers.dice = {
            value: selectedDice.value,
            other: selectedDice.id === 'diceNone' ? this.elements.diceOther.value : ''
        };
        
        // Hide intro and show questionnaire
        this.elements.intro.classList.add('d-none');
        this.elements.questionnaire.classList.remove('d-none');
        this.elements.progressContainer.classList.remove('d-none');
        
        // Show section navigation and progress
        const sectionNav = document.getElementById('section-navigation');
        sectionNav.classList.remove('d-none');
        sectionNav.classList.add('d-flex');
        
        // Setup section navigation
        this.setupSectionNavigation();
        
        // Hide section description
        document.getElementById('section-description').classList.add('d-none');
        
        // Show first section and question
        this.currentSectionIndex = 0;
        this.currentQuestionIndex = 0;
        
        // Make sure the questionnaire container is visible
        this.elements.questionContainer.style.display = 'block';
        
        // Show the first question
        this.renderQuestion();
        this.updateProgress();
        this.updateNavigationButtons();
        
        // Ensure auto-advance is set up
        this.setupAutoAdvance();
    }
    
    // Navigate between questions
    navigate(direction) {
        // Save current answer before navigating
        this.saveCurrentAnswer();
        
        const currentSection = questionnaireData.sections[this.currentSectionIndex];
        this.currentQuestionIndex += direction;
        
        // Check if we need to change section
        if (this.currentQuestionIndex >= currentSection.questions.length) {
            // Move to next section
            this.currentSectionIndex++;
            this.currentQuestionIndex = 0;
            
            // If no more sections, show summary
            if (this.currentSectionIndex >= questionnaireData.sections.length) {
                this.showSummary();
                return;
            }
            this.updateSectionNavigation();
        } else if (this.currentQuestionIndex < 0) {
            // Move to previous section
            this.currentSectionIndex--;
            
            // If before first section, go to intro
            if (this.currentSectionIndex < 0) {
                this.elements.questionnaire.classList.add('d-none');
                this.elements.progressContainer.classList.add('d-none');
                this.elements.intro.classList.remove('d-none');
                this.currentSectionIndex = 0;
                this.currentQuestionIndex = 0;
                return;
            }
            
            // Set to last question of previous section
            const prevSection = questionnaireData.sections[this.currentSectionIndex];
            this.currentQuestionIndex = prevSection.questions.length - 1;
            this.updateSectionNavigation();
        }
    
    // Render the new question
    this.renderQuestion();
}
    
    
    // Render the current question
    renderQuestion() {
        const section = questionnaireData.sections[this.currentSectionIndex];
        const question = section.questions[this.currentQuestionIndex];
        
        // Update progress
        this.updateProgress();
        
        // Update navigation buttons
        this.elements.prevBtn.disabled = this.currentSectionIndex === 0 && this.currentQuestionIndex === 0;
        this.elements.nextBtn.textContent = 
            this.currentSectionIndex === questionnaireData.sections.length - 1 && 
            this.currentQuestionIndex === section.questions.length - 1
                ? 'Afronden' 
                : 'Volgende';
        
        // Create question HTML
        let html = `
            <div class="question fade-in">
                <h3>${section.title}</h3>
                <p class="text-muted mb-4">${section.description}</p>
                <h4>${question.id}. ${question.text}</h4>
                <div class="mt-4">
        `;
        
        // Add answer options based on question type
        if (question.type === 'likert') {
    html += '<div class="likert-scale">';
    questionnaireData.likertOptions.forEach(option => {
        const isChecked = this.answers[question.id] === option.value ? 'checked' : '';
        html += `
            <div class="form-check">
                <input class="form-check-input answer-radio" type="radio" 
                       name="${question.id}" id="${question.id}_${option.value}" 
                       value="${option.value}" ${isChecked}>
                <label class="form-check-label" for="${question.id}_${option.value}">
                    ${option.value}. ${option.label}
                </label>
            </div>
        `;
    });
    html += '</div>';
        }
        
        html += `
                </div>
                <div class="mt-3 text-muted">
                    Vraag ${this.getQuestionNumber() + 1} van ${this.totalQuestions}
                </div>
            </div>
        `;
        
        // Update the DOM
        this.elements.questionContainer.innerHTML = html;
    }
    
    // Save the current answer
    saveCurrentAnswer() {
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) return;
        
        const selectedOption = document.querySelector(`input[name="${currentQuestion.id}"]:checked`);
        if (selectedOption) {
            this.answers[currentQuestion.id] = parseInt(selectedOption.value);
        }
    }
    
    // Setup section navigation
    setupSectionNavigation() {
        const sectionNavButtons = document.querySelectorAll('.section-nav');
        
        sectionNavButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Save current answer before navigating
                this.saveCurrentAnswer();
                
                // Update current section and question indices
                this.currentSectionIndex = index;
                this.currentQuestionIndex = 0; // Always start at first question of the section
                
                // Update the UI
                this.renderQuestion();
                this.updateNavigationButtons();
                this.updateSectionNavigation();
            });
        });
        
        // Set initial active state
        this.updateSectionNavigation();
    }
    
    // Update section navigation buttons state
    updateSectionNavigation() {
        const sectionNavButtons = document.querySelectorAll('.section-nav');
        sectionNavButtons.forEach((button, index) => {
            if (index === this.currentSectionIndex) {
                button.classList.remove('btn-outline-secondary');
                button.classList.add('btn-primary');
            } else {
                button.classList.remove('btn-primary');
                button.classList.add('btn-outline-secondary');
            }
        });
    }
    
    // Get current question object
    getCurrentQuestion() {
        if (this.currentSectionIndex >= 0 && this.currentSectionIndex < questionnaireData.sections.length) {
            const section = questionnaireData.sections[this.currentSectionIndex];
            if (this.currentQuestionIndex >= 0 && this.currentQuestionIndex < section.questions.length) {
                return section.questions[this.currentQuestionIndex];
            }
        }
        return null;
    }
    
    // Update navigation buttons state
    updateNavigationButtons() {
        const currentSection = questionnaireData.sections[this.currentSectionIndex];
        
        // Update previous button
        this.elements.prevBtn.disabled = this.currentSectionIndex === 0 && this.currentQuestionIndex === 0;
        
        // Update next button text and state
        const isLastQuestion = this.currentQuestionIndex === currentSection.questions.length - 1;
        const isLastSection = this.currentSectionIndex === questionnaireData.sections.length - 1;
        
        this.elements.nextBtn.textContent = isLastQuestion && isLastSection ? 'Afronden' : 'Volgende';
    }
    
    // Get current question number (global index)
    getQuestionNumber() {
        let count = 0;
        for (let i = 0; i < this.currentSectionIndex; i++) {
            count += questionnaireData.sections[i].questions.length;
        }
        return count + this.currentQuestionIndex;
    }
    
    // Update progress bar and text
    updateProgress() {
        const totalAnswered = Object.keys(this.answers).length - (this.answers.dice ? 1 : 0); // Exclude DICE answer
        const percentage = Math.round((totalAnswered / this.totalQuestions) * 100);
        
        this.elements.progressBar.style.width = `${percentage}%`;
        this.elements.progressBar.setAttribute('aria-valuenow', percentage);
        this.elements.progressText.textContent = `${totalAnswered} van de ${this.totalQuestions} vragen beantwoord`;
    }
    
    // Show summary of answers
    showSummary() {
        this.elements.questionnaire.classList.add('d-none');
        this.elements.summary.classList.remove('d-none');
        
        // Build summary HTML
        let html = '';
        
        // Add DICE framework selection
        html += `
            <div class="answer-item">
                <strong>DICE-framework selectie:</strong><br>
                ${this.getDiceLabel(this.answers.dice.value)}
                ${this.answers.dice.other ? `<br><em>${this.answers.dice.other}</em>` : ''}
            </div>
            <hr>
        `;
        
        // Add all answers
        questionnaireData.sections.forEach(section => {
            html += `<h4>${section.title}</h4>`;
            
            section.questions.forEach(question => {
                const answer = this.answers[question.id];
                const answerText = answer ? this.getLikertLabel(answer) : 'Niet beantwoord';
                
                html += `
                    <div class="answer-item">
                        <strong>${question.id}.</strong> ${question.text}<br>
                        <span class="text-primary">${answerText}</span>
                    </div>
                `;
            });
            
            html += '<hr>';
        });
        
        this.elements.answersSummary.innerHTML = html;
    }
    
    // Get label for DICE option
    getDiceLabel(value) {
        const option = questionnaireData.diceOptions.find(opt => opt.value === value);
        return option ? option.label : value;
    }
    
    // Get label for Likert scale value
    getLikertLabel(value) {
        const option = questionnaireData.likertOptions.find(opt => opt.value === value);
        return option ? option.label : value;
    }
    
    // Save progress to localStorage
    saveProgress() {
        this.saveCurrentAnswer();
        localStorage.setItem('vrQuestionnaireProgress', JSON.stringify({
            answers: this.answers,
            currentSectionIndex: this.currentSectionIndex,
            currentQuestionIndex: this.currentQuestionIndex
        }));
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.className = 'alert alert-success mt-3';
        feedback.textContent = 'Voortgang opgeslagen!';
        this.elements.questionContainer.appendChild(feedback);
        
        // Remove feedback after 3 seconds
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }
    
    // Load progress from localStorage
    loadProgress() {
        const savedData = localStorage.getItem('vrQuestionnaireProgress');
        if (savedData) {
            try {
                const { answers, currentSectionIndex, currentQuestionIndex } = JSON.parse(savedData);
                this.answers = answers || {};
                this.currentSectionIndex = currentSectionIndex || 0;
                this.currentQuestionIndex = currentQuestionIndex || 0;
                
                // Restore DICE selection if exists
                if (this.answers.dice) {
                    const diceRadio = document.querySelector(`input[value="${this.answers.dice.value}"]`);
                    if (diceRadio) {
                        diceRadio.checked = true;
                        if (this.answers.dice.value === 'none' && this.answers.dice.other) {
                            this.elements.diceOtherSection.style.display = 'block';
                            this.elements.diceOther.value = this.answers.dice.other;
                        }
                    }
                }
                
                // Update progress display
                this.updateProgress();
                
            } catch (e) {
                console.error('Error loading saved progress:', e);
                localStorage.removeItem('vrQuestionnaireProgress');
            }
        }
    }
    
    // Reset the questionnaire
    resetQuestionnaire() {
        if (confirm('Weet je zeker dat je een nieuwe vragenlijst wilt starten? Alle antwoorden worden gewist.')) {
            this.answers = {};
            this.currentSectionIndex = 0;
            this.currentQuestionIndex = 0;
            
            // Reset form
            this.elements.summary.classList.add('d-none');
            this.elements.questionnaire.classList.add('d-none');
            this.elements.progressContainer.classList.add('d-none');
            this.elements.intro.classList.remove('d-none');
            
            // Clear saved progress
            localStorage.removeItem('vrQuestionnaireProgress');
            
            // Reset DICE selection
            this.elements.diceRadios.forEach(radio => radio.checked = false);
            this.elements.diceOtherSection.style.display = 'none';
            this.elements.diceOther.value = '';
        }
    }
    
    // Export to CSV
    exportToCsv() {
        const csvContent = this.generateCsvContent();
        this.downloadFile(csvContent, 'vr_vragenlijst_resultaten.csv', 'text/csv');
    }
    
    // Export to Excel
    exportToExcel() {
        const csvContent = this.generateCsvContent();
        const excelContent = '\uFEFF' + csvContent; // Add BOM for Excel
        this.downloadFile(excelContent, 'vr_vragenlijst_resultaten.xls', 'application/vnd.ms-excel');
    }
    
    // Generate CSV content
    generateCsvContent() {
        let csv = [];
        
        // Add headers
        const headers = ['Vraag ID', 'Vraag', 'Antwoord'];
        csv.push(headers.join(';'));
        
        // Add DICE framework selection
        csv.push([
            'DICE',
            'DICE-framework selectie',
            `${this.getDiceLabel(this.answers.dice.value)}${this.answers.dice.other ? ` (${this.answers.dice.other})` : ''}`
        ].join(';'));
        
        // Add all answers
        questionnaireData.sections.forEach(section => {
            section.questions.forEach(question => {
                const answer = this.answers[question.id];
                const answerText = answer ? this.getLikertLabel(answer) : 'Niet beantwoord';
                
                csv.push([
                    question.id,
                    `"${question.text.replace(/"/g, '""')}"`,
                    `"${answerText.replace(/"/g, '""')}"`
                ].join(';'));
            });
        });
        
        return csv.join('\n');
    }
    
    // Export to PDF
    exportToPdf() {
        // Use jsPDF with autoTable plugin
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(18);
        doc.text('VR Vragenlijst Resultaten', 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        
        // Add DICE framework selection
        doc.text('DICE-framework selectie:', 14, 40);
        doc.text(`${this.getDiceLabel(this.answers.dice.value)}${this.answers.dice.other ? ` (${this.answers.dice.other})` : ''}`, 20, 48);
        
        // Add answers
        let y = 60;
        questionnaireData.sections.forEach((section, sectionIndex) => {
            // Add section header
            if (y > 260) {
                doc.addPage();
                y = 20;
            }
            
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text(section.title, 14, y);
            y += 10;
            
            // Add questions and answers
            doc.setFontSize(11);
            section.questions.forEach(question => {
                if (y > 260) {
                    doc.addPage();
                    y = 20;
                }
                
                const answer = this.answers[question.id];
                const answerText = answer ? this.getLikertLabel(answer) : 'Niet beantwoord';
                
                // Add question
                doc.setFont(undefined, 'bold');
                doc.text(`${question.id}. ${question.text}`, 14, y);
                y += 7;
                
                // Add answer
                doc.setFont(undefined, 'normal');
                doc.text(`Antwoord: ${answerText}`, 20, y);
                y += 10;
                
                // Add some space between questions
                y += 5;
            });
            
            // Add some space between sections
            y += 10;
        });
        
        // Save the PDF
        doc.save('vr_vragenlijst_resultaten.pdf');
    }
    
    // Helper function to download files
    downloadFile(content, fileName, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    setupAutoAdvance() {
    // Use event delegation for better performance
    document.addEventListener('change', (e) => {
        if (e.target && e.target.matches('.answer-radio')) {
            // Save the answer
            this.saveCurrentAnswer();
            
            // Auto-advance to next question after a short delay
            setTimeout(() => {
                const section = questionnaireData.sections[this.currentSectionIndex];
                const isLastSection = this.currentSectionIndex === questionnaireData.sections.length - 1;
                const isLastQuestion = this.currentQuestionIndex === section.questions.length - 1;
                
                // Only auto-advance if not on the last question
                if (!(isLastSection && isLastQuestion)) {
                    this.navigate(1);
                } else {
                    // If it's the last question, just update the UI
                    this.updateProgress();
                }
               }, 100); // Small delay for better UX
          }
        });
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load jsPDF from CDN if not already loaded
    if (typeof window.jspdf === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            // Load autoTable plugin
            const autoTableScript = document.createElement('script');
            autoTableScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js';
            autoTableScript.onload = () => new QuestionnaireApp();
            document.head.appendChild(autoTableScript);
        };
        document.head.appendChild(script);
    } else {
        new QuestionnaireApp();
    }
});
