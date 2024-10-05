function getComputerChoice() {
    let rand = Math.floor(Math.random() * 3);
    switch (rand) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors"
    }
}

function getPlayerChoice() {
    choice = undefined
    do {
        choice = prompt("Select: ").toLowerCase();
    } while (choice != "rock" && choice != "paper" && choice != "scissors")
    return choice
}

function evalChoices(humanChoice, computerChoice) {
    if (humanChoice == "paper") {
        return computerChoice == "rock";
    } else if (humanChoice == "rock") {
        return computerChoice == "scissors";
    } else {
        return computerChoice == "paper";
    }
}

function playRound(humanChoice, computerChoice) {
    console.log("The computer chose " + computerChoice + "!");

    if (humanChoice == computerChoice) {
        console.log("It's a tie!");
        return
    }

    const result = evalChoices(humanChoice, computerChoice);
    if (result) {
        humanScore++;
        console.log("You win!");
        return true
    } else {
        computerScore++;
        console.log("You lose!");
        return false
    }
}

function playGame() {
    humanScore = 0;
    computerScore = 0;

    while (humanScore < 3 && computerScore < 3) {
        playRound(getPlayerChoice(), getComputerChoice());
    }

    console.log("Computer score: " + computerScore);
    console.log("Your score: " + humanScore);
}

playGame();