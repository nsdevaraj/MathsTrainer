
let currentQuestionIndex = 0;
let questions = [];

function mathTeacherAdditionQuestions(numbersArray) {
    let generatedQuestions = [];

    // Loop through the array to create questions
    for (let i = 0; i < numbersArray.length; i++) {
        for (let j = i + 1; j < numbersArray.length; j++) {
            let num1 = numbersArray[i];
            let num2 = numbersArray[j];

            // Step 1: Begin with the first number
            let explanation = `Let's start with ${num1}.`;

            // Step 2: Explain that we are adding the second number
            explanation += ` Now, add ${num2}.`;

            // Step 3: Perform the addition
            let result = num1 + num2;

            // Step 4: Show the result
            //explanation += ` The result is ${result}.`;

            // Push question and explanation to the questions array
            generatedQuestions.push({
                question: `${num1} + ${num2}`,
                explanation: explanation,
                result: result
            });
        }
    }

    return generatedQuestions;
}

function displayCurrentQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionElement = document.getElementById('question');
    let explanationElement = document.getElementById('explanation');

    if (currentQuestion) {
        questionElement.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
        explanationElement.textContent = ` ${currentQuestion.explanation}`;
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayCurrentQuestion();
    }
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayCurrentQuestion();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Example usage:
    let numbers = [10, 5, 15, 3];
    questions = mathTeacherAdditionQuestions(numbers);

    let previousButton = document.getElementById('previous');
    let nextButton = document.getElementById('next');

    previousButton.addEventListener('click', showPreviousQuestion);
    nextButton.addEventListener('click', showNextQuestion);

    displayCurrentQuestion();
});
