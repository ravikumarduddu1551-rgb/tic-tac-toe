// DOM Elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newGameBtn = document.querySelector("#new-game");
const msgContainer = document.querySelector(".head"); // Houses the msg and new game btn
const msg = document.querySelector("#msg");

// Game State
let turnO = true; // playerX, playerO
let count = 0; // To track draw

// Winning Patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Reset Game Logic
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msg.classList.remove("show");
    msg.innerText = "";
};

// Handle Box Clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#b0413e";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#191914"; // Different color for X
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

// Handle Game Draw
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msg.classList.add("show");
    disableBoxes();
};

// Disable all boxes after a win/draw
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable boxes for a new game
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Show Winner Screen
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg.classList.add("show");
    disableBoxes();
};

// Check for Winning Patterns
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos1Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

// Event Listeners
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);