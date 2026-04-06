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
closeButton.addEventListener('click', (hideFlashcard = () => {container.classList.remove('hidden'); addQuestionFlashcard.classList.add('hidden'); 
    if (editBoolean) {
        editBoolean = false;
        submitFlashcard();
    }
}));
saveButton.addEventListener('click', (submitFlashcard = () => {editBoolean = false; temporaryQuestion = question.value.trim(); temporaryAnswer = answer.value.trim();
    if (!temporaryQuestion || !temporaryAnswer) {
        error.classList.remove('hidden');
    } else {
        container.classList.remove('hidden');
        error.classList.add('hidden');
        viewlist();
        question.value = '';
        answer.value = '';
    }
}));
function viewlist() {
    var listFlashcard = document.getElementsByClassName("card-list-container");
    var div = document.createElement("div");
    div.classList.add("flashcard");
    div.innerHTML += `<p class="question-div">${question.value}</p>`;
    var displayAnswer = document.createElement("p");
    displayAnswer.classList.add("answer-div", "hidden");
    displayAnswer.innerText = answer.value;
    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "show-hide-button");
    link.innerHTML = "Show/Hide";
    link.addEventListener("click", () => {
        displayAnswer.classList.toggle("hidden");
    });
    div.appendChild(link);
    div.appendChild(displayAnswer);
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    var editButton = document.createElement("button");
    editButton.setAttribute("class", "edit");
    editButton.innerHTML = `<span class="material-symbols-outlined">edit_note</span>`;
    editButton.addEventListener("click", () => {
        editBoolean = true;
        modifyElement(editButton, true);
        addQuestionFlashcard.classList.remove("hidden");
    });
    buttonContainer.appendChild(editButton);
    disableButton(false);
    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete");
    deleteButton.innerHTML = `<span class="material-symbols-outlined">delete_sweep</span>`;
    deleteButton.addEventListener("click", () => {modifyElement(deleteButton);
    });
    buttonContainer.appendChild(deleteButton);
    div.appendChild(buttonContainer);
    listFlashcard[0].appendChild(div);
    hideFlashcard();
}
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement.parentElement;
    let parentQuestion = parentDiv.querySelector(".question-div").innerText;
    if (edit) {
        let parnetAnswer = parentDiv.querySelector(".answer-div").innerText;
        answer.value = parnetAnswer;
        question.value = parentQuestion;
        disableButton(true);
    }
    parentDiv.remove();
};
const disableButton = (value) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from (editButtons).forEach((element) => {
        element.disabled = value;
    });
};
