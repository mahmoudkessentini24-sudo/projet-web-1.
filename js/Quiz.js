const correctAnswers = {
    q1: 'b', // PHP (ou plutôt les trois sont populaires, mais PHP est historique)
    q2: 'b', // Une base organisée en tables
    q3: 'b', // Séparer présentation, logique, données
    q4: 'b', // O(log n)
    q5: 'a', // Django
    q6: 'a', // Système de gestion de versions
    q7: 'b', // Single Responsibility Principle
    q8: 'a', // Interface pour accéder aux ressources
    q9: 'b', // Port 80
    q10: 'a', // Capacité à s'adapter à différentes tailles d'écran
    q11: 'a', // Permettre aux machines d'apprendre
    q12: 'a', // Plateforme de conteneurisation
    q13: 'c', // HTTPS
    q14: 'a', // Méthodologie itérative
    q15: 'd' // Tous les trois
};

const questionLabels = {
    q1: 'Quel langage de programmation est le plus utilisé pour le web backend ?',
    q2: 'Qu\'est-ce qu\'une base de données relationnelle ?',
    q3: 'Quel est le but principal du pattern MVC ?',
    q4: 'Quelle est la complexité temporelle de la recherche binaire ?',
    q5: 'Quel framework web Python est le plus populaire ?',
    q6: 'Qu\'est-ce que Git ?',
    q7: 'Quel est le principe de SOLID qui stipule qu\'une classe doit avoir une seule responsabilité ?',
    q8: 'Qu\'est-ce qu\'une API REST ?',
    q9: 'Quel est le port par défaut pour HTTP ?',
    q10: 'Qu\'est-ce que le responsive design ?',
    q11: 'Quel est l\'objectif principal du Machine Learning ?',
    q12: 'Qu\'est-ce que Docker ?',
    q13: 'Quel est le protocole de sécurité pour les connexions web ?',
    q14: 'Qu\'est-ce que l\'Agile en génie logiciel ?',
    q15: 'Quel langage est idéal pour les algorithmes et structures de données ?'
};

const answerOptions = {
    q1: { a: 'Python', b: 'PHP', c: 'JavaScript (Node.js)', d: 'C++' },
    q2: { a: 'Une base qui stocke des fichiers texte', b: 'Une base organisée en tables avec relations entre elles', c: 'Une base stockée uniquement en mémoire', d: 'Une base utilisée uniquement pour les images' },
    q3: { a: 'Compresser le code', b: 'Séparer la présentation, la logique métier et les données', c: 'Augmenter la vitesse d\'exécution', d: 'Réduire la mémoire utilisée' },
    q4: { a: 'O(n)', b: 'O(log n)', c: 'O(n²)', d: 'O(1)' },
    q5: { a: 'Django', b: 'Flask', c: 'FastAPI', d: 'Tous les trois sont équalement populaires' },
    q6: { a: 'Un système de gestion de versions décentralisé', b: 'Un langage de programmation', c: 'Un framework web', d: 'Une base de données' },
    q7: { a: 'Open/Closed Principle', b: 'Single Responsibility Principle', c: 'Liskov Substitution Principle', d: 'Interface Segregation Principle' },
    q8: { a: 'Un interface pour accéder à des ressources web via HTTP', b: 'Un langage de programmation', c: 'Un système d\'exploitation', d: 'Un navigateur web' },
    q9: { a: '21', b: '80', c: '443', d: '3306' },
    q10: { a: 'La capacité d\'un site à s\'adapter à différentes tailles d\'écran', b: 'Un langage de programmation', c: 'Un type de base de données', d: 'Un framework CSS' },
    q11: { a: 'Permettre aux machines d\'apprendre sans être explicitement programmées', b: 'Remplacer les programmeurs', c: 'Augmenter la vitesse des processeurs', d: 'Créer des interfaces utilisateur' },
    q12: { a: 'Une plateforme de conteneurisation', b: 'Un éditeur de code', c: 'Un système d\'exploitation', d: 'Un langage de programmation' },
    q13: { a: 'HTTP', b: 'FTP', c: 'HTTPS', d: 'SMTP' },
    q14: { a: 'Une méthodologie de développement itérative et flexible', b: 'Un langage de programmation', c: 'Un framework web', d: 'Un système de base de données' },
    q15: { a: 'C', b: 'Python', c: 'Java', d: 'Tous les trois' }
};

document.getElementById('quizForm').addEventListener('submit', function(e){
    e.preventDefault();
    submitQuiz();
});

function submitQuiz(){
    let score = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    const userAnswers = {};

    for(let q in correctAnswers){
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if(selected){
            userAnswers[q] = selected.value;
            if(selected.value === correctAnswers[q]){
                score++;
            }
        } else {
            userAnswers[q] = null;
        }
    }

    const percentage = Math.round((score / totalQuestions) * 100);

    displayResults(score, totalQuestions, percentage, userAnswers);
}

function displayResults(score, total, percentage, userAnswers){
    const quizForm = document.getElementById('quizForm');
    const resultsSection = document.getElementById('results');

    quizForm.style.display = 'none';
    resultsSection.style.display = 'block';

    document.getElementById('scoreValue').textContent = percentage;

    const circle = document.getElementById('scoreRing');
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    let message = '';
    if(percentage === 100){
        message = '🎉 Parfait ! Vous maîtrisez complètement l\'informatique !';
    } else if(percentage >= 80){
        message = '🌟 Excellent ! Vous avez une très bonne connaissance !';
    } else if(percentage >= 60){
        message = '👍 Bon travail ! Vous avez des bases solides.';
    } else if(percentage >= 40){
        message = '📚 Vous progressez ! Continuez vos apprentissages.';
    } else {
        message = '💪 Ne vous découragez pas ! Révisez et réessayez.';
    }
    document.getElementById('scoreMessage').textContent = `${score}/${total} bonnes réponses • ${message}`;

    generateAnswersReview(userAnswers);
}

function generateAnswersReview(userAnswers){
    const answersList = document.getElementById('answersList');
    answersList.innerHTML = '';

    for(let i = 1; i <= 15; i++){
        const qKey = `q${i}`;
        const userAnswer = userAnswers[qKey];
        const correctAnswer = correctAnswers[qKey];
        const isCorrect = userAnswer === correctAnswer;

        const answerDiv = document.createElement('div');
        answerDiv.className = `answer-item ${isCorrect ? 'correct' : 'incorrect'}`;

        const question = questionLabels[qKey];
        const userText = userAnswer ? answerOptions[qKey][userAnswer] : 'Non répondu';
        const correctText = answerOptions[qKey][correctAnswer];

        answerDiv.innerHTML = `
            <div class="answer-question">Q${i}. ${question}</div>
            <div class="answer-details">
                <div class="answer-user"><strong>Votre réponse :</strong> ${userText}</div>
                <div class="answer-correct"><strong>Bonne réponse :</strong> ${correctText}</div>
                <span class="answer-status ${isCorrect ? 'correct' : 'incorrect'}">
                    <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
                    ${isCorrect ? 'Correct' : 'Incorrect'}
                </span>
            </div>
        `;

        answersList.appendChild(answerDiv);
    }
}