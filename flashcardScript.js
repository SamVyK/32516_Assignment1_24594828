const container = document.querySelector('.container');
const addQuestionFlashcard = document.getElementById('add-question-flashcard');
const saveButton = document.getElementById('save-button');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const error = document.getElementById('error');
const addFlashcard = document.getElementById('add-flashcard');
const closeButton = document.getElementById('close-button');
let editBoolean = false;

addFlashcard.addEventListener('click', () => {
    container.classList.add('hidden');
    question.value = '';
    answer.value = '';
    addQuestionFlashcard.classList.remove('hidden');
});

closeButton.addEventListener('click', (hideFlashcard => { container.classList.remove('hidden'); addQuestionFlashcard.classList.add('hidden'); 
    if (editBoolean) {
        editBoolean = false;
        submitFlashcard();
    }
}));