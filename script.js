// Questions data with options and eidi values
const questions = [
    {
        question: "Rozana namaz parhtay thay?",
        options: [
            { text: "Roz 5 waqt", value: 100, feedback: "MashAllah bhai! Seedha Jannat ka VIP pass! 🕌✨" },
            { text: "Kabhi kabhi", value: 80, feedback: "Chalo shukr hai kuch tou parhtay thay, consistency lao! 🙏" },
            { text: "Sirf Jummah", value: 60, feedback: "n-3 karte ho ? ya jumma Consistent hai . 🕋" },
            { text: "Bas Eid pe", value: 40, feedback: "Namaz sirf Eid ki choti nahi hoti boss! 😅" }
        ]
    },
    {
        question: "Kitne rozay rakhe thay?",
        options: [
            { text: "Saray mashAllah", value: 100, feedback: "Taqwa level: Pro Max! 🌙💪" },
            { text: "20-30", value: 80, feedback: "Wah bhai, patience aur bukhaar dono sambhal liye! 🔥" },
            { text: "10-20", value: 60, feedback: "Half-half kar liya Ramadan ka subscription! 📅" },
            { text: "0-10", value: 40, feedback: "Bhai Tujh se Ziada Rozay toh Manav ne Rakhe! 😂" }
        ]
    },
    {
        question: "Mere liye kitni dafa dua ki thi?",
        options: [
            { text: "Roz roz", value: 100, feedback: "Tera dil tou saaf hai bhai, Allah khush rakhe! ❤️🤲" },
            { text: "Hafte mein ek dafa", value: 80, feedback: "Chalo theek hai, kam az kam yaad tou kiya! 📆" },
            { text: "Sirf ek dafa", value: 60, feedback: "Zarurat thi ya waqt nahi mila? 🤔" },
            { text: "Bhool gaya/gayi", value: 40, feedback: "Bus abhi dua kar lo, waqt gaya nahi! 🙏" }
        ]
    },
    {
        question: "Eid ka snap bhejoge/bhejogi?",
        options: [
            { text: "Han han exclusive drop", value: 100, feedback: "Style bhi, sharing bhi – Eid goals! 📸✨" },
            { text: "Group mein bhej dunga/dungi", value: 80, feedback: "Public service bhi zaroori hai! 👨‍👩‍👧‍👦" },
            { text: "Agar bana tou zaroor", value: 60, feedback: "Snap banane se Eid complete hoti hai! 📱" },
            { text: "Bhag simp kahin ke", value: 40, feedback: "Snap ka intezar rahega, simp na ban! 😜" }
        ]
    },
    {
        question: "Eidi se treat milega Eid ke baad?",
        options: [
            { text: "Han exclusive, bestie ho tum", value: 100, feedback: "Loyalty check: Pass with flying colors! 🏆💯" },
            { text: "Han sab ko milega", value: 80, feedback: "Bari baat hai, Eidi distribute karke bhi zinda ho! 🎁" },
            { text: "Dekhte hain", value: 60, feedback: "Zaroori nahi ke treat ho, niyyat honi chahiye! 🤝" },
            { text: "Bhag yahan se", value: 40, feedback: "Yeh nafrat kyun bhai, chocolate tou de do! 🍫" }
        ]
    }
];

// Variables to track state
let currentQuestion = 0;
let selectedAnswers = [];
let userName = "";
let accountNumber = "";
let isReactionVisible = false;
let reactionTimer = null; // Add this variable to track the timer

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
const reactionContainer = document.getElementById('reaction');
const mainOverlay = document.getElementById('overlay');

// Initialize the app
function init() {
    userForm.addEventListener('submit', handleUserFormSubmit);
    restartButton.addEventListener('click', resetApp);
    
    // Add animation to floating elements
    animateFloatingElements();
    
    // Add creator signature to all screens
    addCreatorSignature();
}

// Add creator signature to all screens
function addCreatorSignature() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        const existingSignature = screen.querySelector('.creator-tag');
        if (!existingSignature) {
            const signature = document.createElement('div');
            signature.className = 'creator-tag';
            signature.innerHTML = 'Eidi Calculator<br>Created by Zohaib Ali Mughal';
            screen.appendChild(signature);
        } else {
            existingSignature.innerHTML = 'Eidi Calculator<br>Created by Zohaib Ali Mughal';
        }
    });
}

// Animate floating elements
function animateFloatingElements() {
    const floatingItems = document.querySelectorAll('.floating-item');
    
    floatingItems.forEach(item => {
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        
        item.style.left = `${randomX}px`;
        item.style.top = `${randomY}px`;
    });
}

// Handle user form submission
function handleUserFormSubmit(e) {
    e.preventDefault();
    userName = document.getElementById('name').value;
    accountNumber = document.getElementById('account').value;
    
    // Switch to questions screen with animation
    welcomeScreen.classList.remove('active');
    setTimeout(() => {
        questionsScreen.classList.add('active');
        
        // Load first question
        loadQuestion();
    }, 300);
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
        
        // Add question title with Eid decoration
        const questionTitle = document.createElement('h2');
        questionTitle.innerHTML = `<span class="eid-decoration">✨ 🌙 ✨</span><br>${currentQuestion + 1}. ${questionData.question}`;
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
            optionElement.dataset.feedback = option.feedback;
            
            optionElement.addEventListener('click', () => {
                // Only allow selection if no reaction is currently visible
                if (!isReactionVisible) {
                    selectOption(optionElement, questionElement);
                }
            });
            
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
    const value = parseInt(selectedOption.dataset.value);
    selectedAnswers[currentQuestion] = value;
    
    // Show reaction based on value
    showReaction(value, selectedOption.dataset.feedback);
    
    // Set the flag to prevent background clicks
    isReactionVisible = true;
    mainOverlay.style.display = 'block';
}

// Show reaction to the answer
function showReaction(value, feedback) {
    const isGood = value >= 80;
    
    // Clear any existing timer
    if (reactionTimer) {
        clearTimeout(reactionTimer);
    }
    
    // Create timer element with countdown
    reactionContainer.innerHTML = `
        <div class="reaction-icon">${isGood ? '😊' : '😢'}</div>
        <div class="reaction-text">${feedback}</div>
        <div class="timer-text">Next question in <span id="countdown">5</span> seconds...</div>
    `;
    
    reactionContainer.style.display = 'block';
    reactionContainer.className = 'reaction-container';
    reactionContainer.classList.add(isGood ? 'good' : 'bad');
    
    mainOverlay.style.display = 'block';
    isReactionVisible = true;
    
    // Set up countdown display
    let seconds = 5;
    const countdownElement = document.getElementById('countdown');
    
    const updateCountdown = setInterval(() => {
        seconds--;
        if (countdownElement) {
            countdownElement.textContent = seconds;
        }
        if (seconds <= 0) {
            clearInterval(updateCountdown);
        }
    }, 1000);
    
    // Set timer to automatically proceed to next question after 5 seconds
    reactionTimer = setTimeout(() => {
        clearInterval(updateCountdown);
        nextQuestion();
    }, 5000);
}

// Proceed to the next question
function nextQuestion() {
    hideReaction();
    currentQuestion++;
    loadQuestion();
}

// Hide reaction
function hideReaction() {
    reactionContainer.style.display = 'none';
    mainOverlay.style.display = 'none';
    isReactionVisible = false;
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
    setTimeout(() => {
        resultScreen.classList.add('active');
    }, 300);
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
    isReactionVisible = false;
    
    // Clear any active timer
    if (reactionTimer) {
        clearTimeout(reactionTimer);
        reactionTimer = null;
    }
    
    resultScreen.classList.remove('active');
    setTimeout(() => {
        welcomeScreen.classList.add('active');
    }, 300);
    
    document.getElementById('name').value = '';
    document.getElementById('account').value = '';
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
