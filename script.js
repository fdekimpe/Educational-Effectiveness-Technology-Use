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
            summaryBtn: document.getElementById('summaryBtn'),
            progressContainer: document.getElementById('progress-container'),
            progressBar: document.getElementById('progress-bar'),
            progressText: document.getElementById('progress-text'),
            summary: document.getElementById('summary'),
            answersSummary: document.getElementById('answers-summary'),
            exportExcel: document.getElementById('exportExcel'),
            exportPdf: document.getElementById('exportPdf'),
            newResponse: document.getElementById('newResponse'),
            startBtn: document.getElementById('startBtn'),
            diceRadios: document.querySelectorAll('input[name="dice"]'),
            diceOtherSection: document.getElementById('diceOtherSection'),
            diceOther: document.getElementById('diceOther'),
            sectionDropdown: document.getElementById('sectionDropdown'),
            currentSectionText: document.getElementById('current-section'),
            sectionNavItems: document.querySelectorAll('.section-nav')
        };

        // Initialize the app state
        this.currentSectionIndex = 0;
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.totalQuestions = this.calculateTotalQuestions();
        this.isNavigating = false;
        
        // Bind methods
        this.setupAutoAdvance = this.setupAutoAdvance.bind(this);
        
        // Setup event listeners
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
    
    // Setup summary overlay
    setupSummaryOverlay() {
        const overlay = document.getElementById('ai-summary-overlay');
        const closeBtn = document.getElementById('close-summary-btn');
        const prevBtn = document.getElementById('prev-section-summary');
        const nextBtn = document.getElementById('next-section-summary');
        const contentEl = document.getElementById('ai-summary-content');
        
        // Close overlay when clicking the close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideSectionSummary());
        }
        
        // Navigation between sections
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const currentSection = parseInt(contentEl?.dataset.section || '0');
                if (currentSection > 0) {
                    this.showSectionSummary(currentSection - 1);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const currentSection = parseInt(contentEl?.dataset.section || '0');
                if (currentSection < questionnaireData.sections.length - 1) {
                    this.showSectionSummary(currentSection + 1);
                }
            });
        }
    }

    // Show section summary in overlay
    showSectionSummary(sectionIndex) {
        // Save current answer before showing summary
        this.saveCurrentAnswer();
        
        const overlay = document.getElementById('ai-summary-overlay');
        const loadingEl = document.getElementById('ai-summary-loading');
        const contentEl = document.getElementById('ai-summary-content');
        const titleEl = document.getElementById('ai-summary-title');
        const prevBtn = document.getElementById('prev-section-summary');
        const nextBtn = document.getElementById('next-section-summary');
        
        // Show overlay
        overlay.classList.add('show');
        
        // Get current section
        const section = questionnaireData.sections[sectionIndex];
        
        // Update UI
        titleEl.textContent = section.title;
        prevBtn.disabled = sectionIndex === 0;
        nextBtn.disabled = sectionIndex === questionnaireData.sections.length - 1;
        
        // Show loading
        loadingEl.style.display = 'block';
        contentEl.style.display = 'none';
        
        // Store current section in data attribute
        contentEl.dataset.section = sectionIndex;
        
        // Generate summary (simulated delay for effect)
        setTimeout(() => {
            // Get section answers
            const sectionAnswers = [];
            let totalScore = 0;
            let answeredQuestions = 0;
            
            section.questions.forEach(question => {
                const answer = this.answers[question.id];
                if (answer) {
                    sectionAnswers.push({
                        id: question.id,
                        text: question.text,
                        answer: this.getLikertLabel(answer),
                        score: answer
                    });
                    totalScore += answer;
                    answeredQuestions++;
                }
            });
            
            const averageScore = answeredQuestions > 0 ? (totalScore / answeredQuestions).toFixed(1) : 0;
            
            // Generate HTML
            let html = `
                <div class="section-summary">
                    <div class="mb-4">
                        <h5>${section.title}</h5>
                        <p>${section.description}</p>
                        <div class="alert ${averageScore >= 3 ? 'alert-success' : averageScore >= 2 ? 'alert-warning' : 'alert-danger'}">
                            <strong>Gemiddelde score:</strong> ${averageScore}/5
                        </div>
                    </div>
                    <h6>Gedetailleerde antwoorden:</h6>
                    <div class="list-group mb-4">
            `;
            
            sectionAnswers.forEach(item => {
                const scoreClass = item.score >= 4 ? 'list-group-item-success' : 
                                 item.score <= 2 ? 'list-group-item-danger' : 'list-group-item-warning';
                
                html += `
                    <div class="list-group-item ${scoreClass}">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>${item.text}</div>
                            <span class="badge bg-primary rounded-pill">${item.answer}</span>
                        </div>
                    </div>
                `;
            });
            
            // Add recommendations section
            html += `
                    </div>
                    <div class="recommendations">
                        <h6>Aanbevelingen:</h6>
            `;
            
            // Get low scoring questions (scores 1-3)
            const lowScoringQuestions = sectionAnswers
                .filter(item => item.score > 0 && item.score <= 3)
                .sort((a, b) => a.score - b.score);

            if (lowScoringQuestions.length > 0) {
                // Show specific recommendations for low scoring questions
                html += `
                    <div class="alert alert-warning">
                        <h6><i class="fas fa-exclamation-triangle me-2"></i>Aandachtspunten:</h6>
                        <ul class="mb-0">
                `;
                
                // Show top 3 lowest scoring questions with recommendations
                lowScoringQuestions.slice(0, 3).forEach(item => {
                    // Get the correct section ID (using the section's actual ID from questionnaireData)
                    const sectionId = section.id; // e.g., 'section1', 'section2', etc.
                    
                    // Find recommendations for this question
                    console.log('Getting recommendations for:', { sectionId, questionId: item.id });
                    const questionRecs = this.getRecommendationsForQuestion(sectionId, item.id);
                    
                    html += `
                        <li class="mb-3">
                            <strong>${item.id}. ${item.text}</strong><br>
                            <em>Score: ${item.score}/5</em>
                    `;
                    
                    if (questionRecs && questionRecs.length > 0) {
                        questionRecs.forEach(rec => {
                            html += `
                                <div class="mt-2">
                                    <strong>${rec.title}:</strong> ${rec.description}
                                    ${this.formatResources(rec.resources)}
                                </div>
                            `;
                        });
                    } else {
                        // Fallback to general recommendation if no specific ones found
                        html += `
                            <div class="mt-2">
                                <strong>Algemene aanbeveling:</strong> 
                                Bespreek dit specifieke punt met collega's en betrek eventueel studenten bij het vinden van verbeteringen.
                                ${this.formatResources()}
                            </div>
                        `;
                    }
                    
                    html += `</li>`;
                });
                
                html += `
                        </ul>
                    </div>
                `;
                
                // Add general improvement tips if multiple low scores
                if (lowScoringQuestions.length >= 2) {
                    html += this.getGeneralRecommendations();
                }
            } else if (averageScore < 4) {
                // If no specific low scores but average could be better
                html += `
                    <div class="alert alert-info">
                        <h6><i class="fas fa-lightbulb me-2"></i>Suggesties voor verdere verbetering:</h6>
                        <ul class="mb-0">
                `;
                
                // Show general tips for improvement
                recommendations.generalTips.forEach(tip => {
                    html += `
                        <li class="mb-2">
                            <strong>${tip.title}:</strong> ${tip.description}
                            ${this.formatResources(tip.resources)}
                        </li>
                    `;
                });
                
                html += `
                        </ul>
                    </div>
                `;
            } else {
                // Excellent score
                html += `
                    <div class="alert alert-success">
                        <h6><i class="fas fa-check-circle me-2"></i>Uitstekend!</h6>
                        <p class="mb-0">Deze sectie scoort zeer goed. Overweeg om deze aanpak ook in andere delen van je onderwijs toe te passen.</p>
                    </div>
                `;
            }
            
            html += `
                    </div>
                </div>
            `;
            
            // Update content
            contentEl.innerHTML = html;
            contentEl.dataset.section = sectionIndex;
            
            // Show content
            loadingEl.style.display = 'none';
            contentEl.style.display = 'block';
            
        }, 800); // Simulate processing time
    }
    
    // Helper method to get recommendations for a specific question
    getRecommendationsForQuestion(sectionId, questionId) {
        console.log('Looking for recommendations for:', { sectionId, questionId });
        
        // Controleer of de sectie bestaat in de recommendations
        if (!recommendations?.sectionSpecific?.[sectionId]) {
            console.log('No recommendations found for section:', sectionId);
            return [];
        }
        
        const sectionRecs = recommendations.sectionSpecific[sectionId];
        console.log('Section recommendations:', sectionRecs);
        
        // Zoek naar de specifieke vraag in de sectie-aanbevelingen
        const questionRecs = sectionRecs.find(item => item.questionId === questionId);
        console.log('Found recommendations for question:', questionRecs);
        
        // Als er specifieke aanbevelingen zijn, retourneer die, anders retourneer een lege array
        return questionRecs?.recommendations || [];
    }
    
    // Helper method to format resources as HTML
    formatResources(resources = []) {
        if (!resources || resources.length === 0) {
            return '';
        }
        
        console.log('Formatting resources:', resources);
        
        // Als resources een array van strings is (oude formaat), converteer dit naar het nieuwe formaat
        const formattedResources = resources.map(resource => {
            if (typeof resource === 'string') {
                return { title: resource, url: '#' };
            }
            return resource;
        });
        
        return `
            <div class="mt-1 small text-muted">
                <i class="fas fa-book me-1"></i> Bronnen:
                <ul class="list-unstyled ms-3 mt-1">
                    ${formattedResources.map(resource => {
                        const title = resource.title || resource;
                        const url = resource.url || '#';
                        return `<li><a href="${url}" target="_blank" class="text-primary">${title}</a></li>`;
                    }).join('')}
                </ul>
            </div>
        `;
    }
    
    // Get general recommendations
    getGeneralRecommendations() {
        // Ensure recommendations and generalTips exist before mapping
        const tips = (window.recommendations?.generalTips || []);
        
        if (tips.length === 0) {
            return ''; // Return empty string if no tips available
        }
        
        return `
            <div class="alert alert-info mt-3">
                <h6><i class="fas fa-lightbulb me-2"></i>Algemene tips voor verbetering:</h6>
                <ul class="mb-0">
                    ${tips.map(tip => `
                        <li class="mb-2">
                            <strong>${tip.title}:</strong> ${tip.description}
                            ${this.formatResources(tip.resources || [])}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    // Hide section summary overlay
    hideSectionSummary() {
        const overlay = document.getElementById('ai-summary-overlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
    }

    // Bind all event listeners
    bindEvents() {
        // Navigation buttons
        this.elements.prevBtn?.addEventListener('click', () => this.navigate(-1));
        this.elements.nextBtn?.addEventListener('click', () => this.navigate(1));
        this.elements.saveBtn?.addEventListener('click', () => this.saveProgress());
        this.elements.summaryBtn?.addEventListener('click', () => this.showSummary());
        this.elements.newResponse?.addEventListener('click', () => this.resetQuestionnaire());
        this.elements.startBtn?.addEventListener('click', () => this.startQuestionnaire());

        // Section navigation
        this.elements.sectionNavItems?.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionIndex = parseInt(item.dataset.section);
                this.goToSection(sectionIndex);
                // No need to update text content here as it's handled in goToSection
                // No need to call updateSectionNavigation here as it's also handled in goToSection
            });
        });

        // Export buttons
        this.elements.exportExcel?.addEventListener('click', () => this.exportToExcel());
        this.elements.exportPdf?.addEventListener('click', () => this.exportToPdf());
        
        // DICE framework radio buttons
        this.elements.diceRadios?.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (this.elements.diceOtherSection) {
                    this.elements.diceOtherSection.style.display = 
                        e.target.id === 'diceNone' ? 'block' : 'none';
                }
            });
        });
    }

// Start the questionnaire
startQuestionnaire() {
    // Save DICE framework selection
    const selectedDice = document.querySelector('input[name="dice"]:checked');
    if (!selectedDice) {
        alert('Selecteer een optie om aan te geven waarom Immersive Tech wordt overwogen.');
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
    document.getElementById('section-navigation').classList.remove('d-none');
    
    // Initialize dropdown with first section and handle section description
    if (questionnaireData.sections && questionnaireData.sections.length > 0) {
        const firstSection = questionnaireData.sections[0];
        this.elements.currentSectionText.textContent = firstSection.title;
        
        // Set the section description
        const sectionDescription = document.getElementById('section-description');
        if (sectionDescription) {
            if (firstSection.description && firstSection.description.trim() !== '') {
                sectionDescription.textContent = firstSection.description;
                sectionDescription.style.display = 'block';
            } else {
                sectionDescription.textContent = '';
                sectionDescription.style.display = 'none';
            }
        }
        
        this.updateSectionNavigation();
    }
    
    this.renderQuestion();
}

// Navigate between questions
navigate(direction) {
    // Prevent multiple clicks
    if (this.isNavigating) return;
    this.isNavigating = true;
    
    try {
        // Save current answer before navigating
        this.saveCurrentAnswer();
        
        // Calculate new position
        let newSectionIndex = this.currentSectionIndex;
        let newQuestionIndex = this.currentQuestionIndex + direction;
        
        // Check if we need to change section
        const currentSection = questionnaireData.sections[newSectionIndex];
        
        if (newQuestionIndex >= currentSection.questions.length) {
            // Move to next section
            newSectionIndex++;
            newQuestionIndex = 0;
            
            // If no more sections, show summary
            if (newSectionIndex >= questionnaireData.sections.length) {
                this.showSummary();
                return;
            }
        } else if (newQuestionIndex < 0) {
            // Move to previous section
            newSectionIndex--;
            
            // If before first section, go to intro
            if (newSectionIndex < 0) {
                this.elements.questionnaire.classList.add('d-none');
                this.elements.progressContainer.classList.add('d-none');
                this.elements.intro.classList.remove('d-none');
                this.currentSectionIndex = 0;
                this.currentQuestionIndex = 0;
                return;
            }
            
            // Set to last question of previous section
            const prevSection = questionnaireData.sections[newSectionIndex];
            newQuestionIndex = prevSection.questions.length - 1;
        }
        
        // Store the old section index for comparison
        const oldSectionIndex = this.currentSectionIndex;
        
        // Update indices
        this.currentSectionIndex = newSectionIndex;
        this.currentQuestionIndex = newQuestionIndex;
        
        // Always update section navigation when using Next/Previous
        this.updateSectionNavigation();
        
        // Check if section actually changed
        const sectionChanged = newSectionIndex !== oldSectionIndex;
        if (sectionChanged) {
            // Update section description when section changes
            const sectionDescription = document.getElementById('section-description');
            if (sectionDescription) {
                const section = questionnaireData.sections[newSectionIndex];
                if (section && section.description && section.description.trim() !== '') {
                    sectionDescription.textContent = section.description;
                    sectionDescription.style.display = 'block';
                } else {
                    sectionDescription.textContent = '';
                    sectionDescription.style.display = 'none';
                }
            }
        }
        
        // Update the UI
        this.updateProgress();
        this.updateNavigationButtons();
        
        // Render the new question
        this.renderQuestion();
        
        // Ensure the question is scrolled into view
        const questionElement = document.querySelector('.question');
        if (questionElement) {
            questionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Reset navigation lock after a short delay
        setTimeout(() => {
            this.isNavigating = false;
        }, 300);
    } catch (error) {
        console.error('Error navigating between questions:', error);
    }
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
    
    // Go to a specific section
    goToSection(sectionIndex) {
        // Save current answer before navigating
        this.saveCurrentAnswer();
        
        // Update current section and reset to first question of the section
        this.currentSectionIndex = sectionIndex;
        this.currentQuestionIndex = 0;
        
        // Update the section dropdown text and description visibility
        if (questionnaireData.sections[sectionIndex]) {
            const section = questionnaireData.sections[sectionIndex];
            if (this.elements.currentSectionText) {
                this.elements.currentSectionText.textContent = section.title;
            }
            
            // Update section description visibility
            const sectionDescription = document.getElementById('section-description');
            if (sectionDescription) {
                if (section.description && section.description.trim() !== '') {
                    sectionDescription.textContent = section.description;
                    sectionDescription.style.display = 'block';
                } else {
                    sectionDescription.style.display = 'none';
                }
            }
        }
        
        // Update the UI
        this.renderQuestion();
        this.updateNavigationButtons();
        this.updateSectionNavigation();
        
        // Close the dropdown if open (for mobile)
        const dropdown = document.querySelector('.dropdown-menu');
        if (dropdown && dropdown.classList.contains('show')) {
            const dropdownToggle = document.querySelector('[data-bs-toggle="dropdown"]');
            if (dropdownToggle) {
                new bootstrap.Dropdown(dropdownToggle).hide();
            }
        }
    }
    
    // Update section navigation buttons state
    updateSectionNavigation() {
        const sectionNavButtons = document.querySelectorAll('.section-nav');
        sectionNavButtons.forEach((button, index) => {
            if (index === this.currentSectionIndex) {
                button.classList.remove('btn-outline-secondary');
                button.classList.add('btn-primary');
                // For dropdown items
                button.classList.add('active');
            } else {
                button.classList.remove('btn-primary');
                button.classList.add('btn-outline-secondary');
                // For dropdown items
                button.classList.remove('active');
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
    
    // Analyze answers and generate AI insights
    async analyzeAnswers() {
        // Prepare data for analysis
        const analysisData = {
            dice: {
                value: this.answers.dice.value,
                other: this.answers.dice.other || ''
            },
            sections: {}
        };

        // Group answers by section
        questionnaireData.sections.forEach(section => {
            analysisData.sections[section.id] = {
                title: section.title,
                description: section.description,
                answers: {}
            };

            section.questions.forEach(question => {
                const answer = this.answers[question.id];
                analysisData.sections[section.id].answers[question.id] = {
                    question: question.text,
                    answer: answer ? this.getLikertLabel(answer) : 'Niet beantwoord',
                    numericValue: answer || 0
                };
            });
        });

        try {
            // Calculate average scores per section
            const sectionScores = {};
            Object.keys(analysisData.sections).forEach(sectionId => {
                const section = analysisData.sections[sectionId];
                const answers = Object.values(section.answers)
                    .filter(a => a.numericValue > 0)
                    .map(a => a.numericValue);
                
                sectionScores[sectionId] = answers.length > 0 
                    ? (answers.reduce((a, b) => a + b, 0) / answers.length).toFixed(2)
                    : 0;
            });

            // Identify strengths and areas for improvement
            const strengths = [];
            const improvements = [];

            Object.entries(sectionScores).forEach(([sectionId, score]) => {
                if (score >= 3.5) {
                    strengths.push(analysisData.sections[sectionId].title);
                } else if (score <= 2.5) {
                    improvements.push(analysisData.sections[sectionId].title);
                }
            });

            // Generate AI response
            let aiResponse = '<h4>Analyse van je antwoorden</h4>';
            
            // Add overall assessment
            aiResponse += '<div class="ai-analysis-section">';
            aiResponse += '<h5>Algemene beoordeling</h5>';
            
            if (strengths.length > 0) {
                aiResponse += '<p><strong>Sterke punten:</strong> ';
                aiResponse += 'Je scoort vooral goed op ' + strengths.join(', ') + ". ";
                aiResponse += 'Dit laat zien dat de Immersive Tech-toepassing op deze gebieden effectief is ingezet.</p>';
            }
            
            if (improvements.length > 0) {
                aiResponse += '<p><strong>Verbeterpunten:</strong> ';
                aiResponse += 'Er zijn mogelijkheden voor verbetering op het gebied van ' + improvements.join(', ') + ". ";
                aiResponse += 'Overweeg om hier extra aandacht aan te besteden in je onderwijsontwerp.</p>';
            } else if (strengths.length === 0) {
                aiResponse += '<p>Je antwoorden laten een gemiddeld beeld zien. Er zijn geen duidelijke verbeterpunten, maar ook geen uitschieters naar boven.</p>';
            }
            
            // Add specific recommendations based on DICE framework
            aiResponse += '<h5>Aanbevelingen</h5>';
            aiResponse += '<ul>';
            
            if (analysisData.dice.value === 'none' && analysisData.dice.other) {
                aiResponse += `<li>Je gaf aan dat Immersive Tech wordt overwogen vanwege: "${analysisData.dice.other}". `;
                aiResponse += 'Zorg ervoor dat dit specifieke voordeel ook daadwerkelijk wordt gerealiseerd in je Immersive Tech-toepassing.</li>';
            }
            
            if (strengths.length > 0) {
                aiResponse += `<li>Bouw voort op je sterke punten (${strengths.join(', ')}) door deze elementen te benadrukken in je onderwijs.</li>`;
            }
            
            if (improvements.length > 0) {
                aiResponse += `<li>Besteed extra aandacht aan: ${improvements.join(', ')}. `;
                aiResponse += 'Overweeg om hier specifieke leerdoelen aan te koppelen.</li>';
            }
            
            aiResponse += '<li>Bekijk de gedetailleerde resultaten hieronder voor meer inzichten per onderdeel.</li>';
            aiResponse += '</ul></div>';
            
            // Add the AI analysis to the summary
            const aiContainer = document.getElementById('ai-analysis');
            if (aiContainer) {
                aiContainer.innerHTML = aiResponse;
                aiContainer.style.display = 'block';
            }
            
        } catch (error) {
            console.error('Error generating AI analysis:', error);
            const aiContainer = document.getElementById('ai-analysis');
            if (aiContainer) {
                aiContainer.innerHTML = '<p>Er is een fout opgetreden bij het genereren van de AI-analyse. Probeer het later opnieuw.</p>';
                aiContainer.style.display = 'block';
            }
        } finally {
            // Hide loading indicator
            const loadingIndicator = document.getElementById('ai-loading');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
    }

    // Show summary of answers
    showSummary() {
        this.elements.questionnaire.classList.add('d-none');
        this.elements.summary.classList.remove('d-none');
        
        // Show the summary overlay first
        this.showSectionSummary(0);
        
        // Build summary HTML
        let html = `
            <div id="ai-analysis" class="card mb-4">
                <div class="card-body">
                    <h4>AI-analyse van je antwoorden</h4>
                    <p>Bekijk hieronder een overzicht van je antwoorden. Klik op de knop hieronder om een gedetailleerde analyse per sectie te zien:</p>
                    <button id="show-ai-summary" class="btn btn-primary">
                        <i class="fas fa-chart-bar me-2"></i>Toon gedetailleerde analyse
                    </button>
                </div>
            </div>
            <h3>Jouw antwoorden</h3>
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
        
        // Add event listeners for the summary overlay
        this.setupSummaryOverlay();
        
        // Start AI analysis after rendering the summary
        this.analyzeAnswers();
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
        localStorage.setItem('QuestionnaireProgress', JSON.stringify({
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
        const savedData = localStorage.getItem('QuestionnaireProgress');
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
                localStorage.removeItem('QuestionnaireProgress');
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
            localStorage.removeItem('QuestionnaireProgress');
            
            // Reset DICE selection
            this.elements.diceRadios?.forEach(radio => radio.checked = false);
            if (this.elements.diceOtherSection) {
                this.elements.diceOtherSection.style.display = 'none';
                this.elements.diceOther.value = '';
            }
        }
    }
    
    // Export to Excel
    exportToExcel() {
        const csvContent = this.generateCsvContent();
        const excelContent = '\uFEFF' + csvContent; // Add BOM for Excel
        this.downloadFile(excelContent, 'Immersive-Tech_vragenlijst_resultaten.xls', 'application/vnd.ms-excel');
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
        
        // Set document properties
        doc.setProperties({
            title: 'Immersive Tech Vragenlijst Resultaten',
            subject: 'Resultaten van de VR vragenlijst',
            author: 'Hogeschool Windesheim',
            keywords: 'Immersive Tech, vragenlijst, resultaten, onderwijs',
            creator: 'Immersive Tech Vragenlijst Applicatie'
        });
        
        // Add header
        doc.setDrawColor(41, 98, 255);
        doc.setFillColor(41, 98, 255);
        doc.rect(0, 0, 220, 30, 'F');
        
        // Add title
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.text('Immersive Tech Vragenlijst Resultaten', 105, 20, { align: 'center' });
        
        // Add date
        doc.setFontSize(10);
        doc.text(`Gegenereerd op: ${new Date().toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}`, 14, 40);
        
        // Add DICE framework selection
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        doc.text('DICE-framework selectie:', 14, 60);
        doc.setFont(undefined, 'normal');
        doc.text(`${this.getDiceLabel(this.answers.dice.value)}${this.answers.dice.other ? ` (${this.answers.dice.other})` : ''}`, 20, 68);
        
        // Add a line
        doc.setDrawColor(200, 200, 200);
        doc.line(14, 80, 196, 80);
        
        // Add answers
        let y = 90;
        questionnaireData.sections.forEach((section, sectionIndex) => {
            // Check if we need a new page
            if (y > 260) {
                doc.addPage();
                y = 30;
            }
            
            // Add section header with colored background
            doc.setFillColor(41, 98, 255);
            doc.rect(14, y - 10, 183, 8, 'F');
            doc.setFontSize(14);
            doc.setTextColor(255, 255, 255);
            doc.text(section.title, 16, y - 3);
            y += 10;
            
            // Add section description
            doc.setFontSize(10);
            doc.setTextColor(100);
            const splitDesc = doc.splitTextToSize(section.description, 180);
            doc.text(splitDesc, 14, y);
            y += (splitDesc.length * 5) + 10;
            
            // Add questions and answers
            doc.setFontSize(11);
            section.questions.forEach(question => {
                if (y > 260) {
                    doc.addPage();
                    y = 30;
                }
                
                const answer = this.answers[question.id];
                const answerText = answer ? this.getLikertLabel(answer) : 'Niet beantwoord';
                
                // Add question with number
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                const questionText = `${question.id}. ${question.text}`;
                const splitQuestion = doc.splitTextToSize(questionText, 180);
                doc.text(splitQuestion, 14, y);
                y += (splitQuestion.length * 5) + 5;
                
                // Add answer with colored background based on score
                if (answer) {
                    const color = answer >= 4 ? 
                        [200, 230, 201] : // Light green for positive answers
                        answer <= 2 ? 
                        [255, 205, 210] : // Light red for negative answers
                        [255, 245, 157]; // Light yellow for neutral answers
                    
                    doc.setFillColor(...color);
                    doc.roundedRect(14, y - 2, 183, 8, 2, 2, 'F');
                }
                
                // Add answer text
                doc.setFont(undefined, 'normal');
                doc.setTextColor(0, 0, 0);
                doc.text(`Antwoord: ${answerText}`, 16, y + 5);
                y += 12;
                
                // Add a subtle separator
                doc.setDrawColor(240, 240, 240);
                doc.line(14, y, 196, y);
                y += 10;
            });
            
            // Add some space between sections
            y += 10;
        });
        
        // Add footer to all pages
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            
            // Add footer line
            doc.setDrawColor(41, 98, 255);
            doc.line(14, 280, 196, 280);
            
            // Add footer text
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(
                `Pagina ${i} van ${pageCount} | ${new Date().toLocaleDateString('nl-NL')} | Hogeschool Windesheim - Lectoraat Onderwijsinnovatie en ICT`, 
                105, 
                287, 
                { align: 'center' }
            );
        }
        
        // Save the PDF with a timestamp in the filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        doc.save(`immersive_tech__vragenlijst_resultaten_${timestamp}.pdf`);
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
    
// Setup auto-advance
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

// Make recommendations available globally
let recommendations = window.recommendations || {};

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
        // Load recommendations if available
        if (window.recommendations) {
            recommendations = window.recommendations;
        }
        new QuestionnaireApp();
    }
});
