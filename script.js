// Questions data with options and eidi values
const questions = [
    {
        question: "How often do you pray?",
        options: [
            { text: "5 times a day", value: 500 },
            { text: "Sometimes", value: 300 },
            { text: "Only on Fridays", value: 200 },
            { text: "Rarely", value: 100 }
        ]
    },
    {
        question: "How do you treat your parents?",
        options: [
            { text: "With utmost respect and care", value: 600 },
            { text: "I respect them but sometimes argue", value: 400 },
            { text: "We have our differences", value: 200 },
            { text: "We don't get along well", value: 100 }
        ]
    },
    {
        question: "How often do you help others?",
        options: [
            { text: "Whenever I can", value: 500 },
            { text: "On special occasions", value: 300 },
            { text: "When asked to", value: 200 },
            { text: "Rarely", value: 100 }
        ]
    },
    {
        question: "How was your fasting during Ramadan?",
        options: [
            { text: "Fasted the whole month", value: 500 },
            { text: "Missed a few days", value: 350 },
            { text: "Fasted occasionally", value: 200 },
            { text: "Didn't fast", value: 100 }
        ]
    },
    {
        question: "How do you spend your money?",
        options: [
            { text: "Save most, donate some", value: 600 },
            { text: "Balanced between saving and spending", value: 400 },
            { text: "Spend most of it", value: 200 },
            { text: "Always short on money", value: 100 }
        ]
    }
];

// Variables to track state
let currentQuestion = 0;
let selectedAnswers = [];
let userName = "";
let accountNumber = "";

// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const questionsScreen = document.getElementById('questions-screen');
const resultScreen = document.getElementById('result-screen');
const userForm = document.getElementById('user-form');
const questionContainer = document.getElementById('question-container');
const progressBar = document.querySelector('.progress');
const resultName = document.getElementById('result-name');
const resultAccount = document.getElementById('result-account');
const totalEidi = document.getElementById('total-eidi');
const restartButton = document.getElementById('restart');

// Initialize the app
function init() {
    userForm.addEventListener('submit', handleUserFormSubmit);
    restartButton.addEventListener('click', resetApp);
}

// Handle user form submission
function handleUserFormSubmit(e) {
    e.preventDefault();
    userName = document.getElementById('name').value;
    accountNumber = document.getElementById('account').value;
    
    // Switch to questions screen
    welcomeScreen.classList.remove('active');
    questionsScreen.classList.add('active');
    
    // Load first question
    loadQuestion();
}

// Load a question into the DOM
function loadQuestion() {
    // Update progress bar
    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
    
    // Clear previous question
    questionContainer.innerHTML = '';
    
    if (currentQuestion < questions.length) {
        const questionData = questions[currentQuestion];
        
        // Create question element
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        
        // Add question title
        const questionTitle = document.createElement('h2');
        questionTitle.textContent = `${currentQuestion + 1}. ${questionData.question}`;
        questionElement.appendChild(questionTitle);
        
        // Add options
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options';
        
        questionData.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option.text;
            optionElement.dataset.value = option.value;
            optionElement.dataset.index = index;
            
            optionElement.addEventListener('click', () => selectOption(optionElement, questionElement));
            
            optionsContainer.appendChild(optionElement);
        });
        
        questionElement.appendChild(optionsContainer);
        questionContainer.appendChild(questionElement);
    } else {
        // Show results if all questions are answered
        showResults();
    }
}

// Handle option selection
function selectOption(selectedOption, questionElement) {
    // Remove selected class from all options
    const options = questionElement.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selected class to clicked option
    selectedOption.classList.add('selected');
    
    // Store answer
    selectedAnswers[currentQuestion] = parseInt(selectedOption.dataset.value);
    
    // Move to next question after a brief delay
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 500);
}

// Show results screen
function showResults() {
    // Calculate total eidi
    const total = selectedAnswers.reduce((sum, value) => sum + value, 0);
    
    // Update DOM elements
    resultName.textContent = userName;
    resultAccount.textContent = accountNumber;
    
    // Animate the counting of total eidi
    animateCounter(0, total, 1500);
    
    // Switch to results screen
    questionsScreen.classList.remove('active');
    resultScreen.classList.add('active');
}

// Animate counter for total eidi
function animateCounter(start, end, duration) {
    let startTime = null;
    
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        totalEidi.textContent = value;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Reset the app to start again
function resetApp() {
    currentQuestion = 0;
    selectedAnswers = [];
    
    resultScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    
    document.getElementById('name').value = '';
    document.getElementById('account').value = '';
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
