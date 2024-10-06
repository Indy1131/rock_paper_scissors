const mainHeader = document.querySelector("#mainHeader");
const roundHeader = document.querySelector("#roundHeader");
const opponentHeader = document.querySelector("#opponentHeader");

const selectionButtons = document.querySelectorAll(".button-container button");
const goButton = document.querySelector(".go");

const opponenetScore = document.querySelector("#opponentScore").children;
const playerScore = document.querySelector("#playerScore").children;

selectionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (disabled) {
            return;
        }

        if (currentSelection != button) {
            if (currentSelection) {
                currentSelection.classList.remove("current");
            }
            currentSelection = button;
            button.classList.add("current");
        } else {
            currentSelection.classList.remove("current");
            currentSelection = null;
        }
    });
});

goButton.addEventListener("click", (e) => {
    if (roundEnded) {
        if (humanScore == 3 || computerScore == 3) {
            displayResults();
            return;
        }
        setupRound();
        return;
    }

    if (disabled || !currentSelection) {
        return;
    }
    highlightSelection();
    toggleInput();
    const messages = ["Rock!", "Paper!", "Scissors!", "Shoot!"];
    shoot(messages, 0);
});

let roundNumber = 1;
let humanScore = 0;
let computerScore = 0;

let roundEnded = false;

let currentSelection = null;

let disabled = true
function toggleInput() {
    disabled = !disabled;
    if (disabled) {
        selectionButtons.forEach((button) => {
            button.classList.remove("button-interact");
        });
    } else {
        selectionButtons.forEach((button) => {
            button.classList.add("button-interact");
        });
    }
}

function highlightSelection() {
    selectionButtons.forEach((button) => {
        if (button != currentSelection) {
            button.classList.add("disabled");
        } else {
            button.classList.remove("current");
            button.classList.add("selected");
        }
    });
}

const map = new Map();

function setMessage(element, message, wait = 100) {
    if (message == element.textContent) {
        return;
    }

    if (!map.has(element)) {
        map.set(element, [0, element.style.getPropertyValue("font-size")]);
    }
    const position = map.get(element) + 1;
    map.get(element)[0] = position;

    element.style.cssText = "font-size: 0";
    const myTimeout = setTimeout(() => {
        if (map.get(element)[0] == position) {
            map.get(element)[0] = 0;
            element.textContent = message;
            element.style.cssText = `font-size: ${map.get(element)[1]};`;
        }
    }, wait);
}

function shoot(messages, i) {
    setMessage(mainHeader, messages[i]);
    if (i == messages.length - 1) {
        setTimeout(() => {
            playRound(currentSelection.textContent, getComputerChoice());
        }, 200);
        return;
    }
    setTimeout(() => {
        shoot(messages, i + 1);
    }, 300);
}

function updateScores() {
    for (i = 0; i < computerScore; i++) {
        opponenetScore[i].style.cssText = "background-color: white;";
    }

    for (i = 0; i < humanScore; i++) {
        playerScore[i].style.cssText = "background-color: white;";
    }
}

function reset() {
    roundEnded = false;
    currentSelection = null;
    setMessage(mainHeader, "Rock, Paper, Scissors!")
    setMessage(opponentHeader, "?");
    setMessage(goButton, "Shoot", 50);
    selectionButtons.forEach((button) => {
        button.classList.remove("disabled");
        button.classList.remove("selected");
    });
}

function getComputerChoice() {
    let rand = Math.floor(Math.random() * 3);
    switch (rand) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors"
    }
}

function evalChoices(humanChoice, computerChoice) {
    if (humanChoice == "Paper") {
        return computerChoice == "Rock";
    } else if (humanChoice == "Rock") {
        return computerChoice == "Scissors";
    } else {
        return computerChoice == "Paper";
    }
}

function playRound(humanChoice, computerChoice) {
    setMessage(opponentHeader, computerChoice);

    if (humanChoice == computerChoice) {
        setMessage(goButton, "It's a tie!", 50);
    } else {
        roundNumber++;

        const result = evalChoices(humanChoice, computerChoice);
        if (result) {
            humanScore++;
            setMessage(goButton, "You won!", 50);
        } else {
            computerScore++;
            setMessage(goButton, "You lost!", 50);
        }
    }

    updateScores();
    // goButton.textContent = "Next Round";
    roundEnded = true;
}

function displayResults() {
    reset();

    if (humanScore > computerScore) {
        setMessage(mainHeader, "You beat the computer!");
    } else {
        setMessage(mainHeader, "You lost to the computer!");
    }
    setMessage(goButton, "Thanks for playing!");
}

function setupRound() {
    reset();
    roundHeader.textContent = "Round " + roundNumber + " of 5";
    toggleInput();
}

setupRound();
// updateMain("");
