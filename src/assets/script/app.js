const currentRound = document.querySelector(".current-round")
// const playerPoints = document.querySelector(".players-points span")
// const computerPoints = document.querySelector(".computer-points span")

const leaf = document.querySelector("button.leaf")
const rock = document.querySelector("button.rock")
const scissors = document.querySelector("button.scissors")

let winner = null



const elements = ["Feuille", "Ciseaux", "Pierre"]
// Génère un nombre aléatoire de 0 à 2 pour désigner un des élément du tableau pour l'ordinateur
const randComputerElement = (elements) => {
    let rand = Math.floor(Math.random() * elements.length)
    let computerElement = elements[rand]
    return computerElement
}

let computerElement = randComputerElement(elements)

// console.log()

// Compare 2 éléments pour déterminer le vainqueur
const compareElements = (element1, element2) => {
    let winner
    if (element1 === element2){
    winner = "Egalité"
    }
    else if (element1 === "Ciseaux" && element2 === "Feuille" || element2 === "Feuille" && element1 === "Ciseaux"){
    winner = "Ciseaux"
    }
    else if (element1 === "Pierre" && element2 === "Ciseaux" || element2 === "Pierre" && element1 === "Ciseaux"){
    winner = "Pierre"
    }
    else if (element1 === "Feuille" && element2 === "Pierre" || element2 === "Pierre" && element1 === "Feuille") {
    winner = "Feuille"
    }
    return winner
}
//--------------------------------------------------


// Change l'élément sélectionné selon l'élément sur lequel clique l'utilisateur
leaf.addEventListener("click", () => {
    leaf.classList.add("selected")
    rock.classList.remove("selected")
    scissors.classList.remove("selected")
}
)

rock.addEventListener("click", () => {
    rock.classList.add("selected")
    scissors.classList.remove("selected")
    leaf.classList.remove("selected")
}
)

scissors.addEventListener("click", () => {
    scissors.classList.add("selected")
    rock.classList.remove("selected")
    leaf.classList.remove("selected")
}
)
//--------------------------------------------------------


// Fonction qui memorise le choix du joueur
const memorisePlayerChoice = () => {
    let playerChoice
    if (leaf.classList.contains("selected")){
        playerChoice = "Feuille"
    }
    else if (rock.classList.contains("selected")){
        playerChoice = "Pierre"
    }
    else if (scissors.classList.contains("selected")){
        playerChoice = "Ciseaux"
    }
    else {
        alert("Vous devez choisir un élément pour jouer")
    }
    return playerChoice
}
//------------------------------------------------------

let playerElement = memorisePlayerChoice()

const buttonPlay = document.querySelector("button.play")

// Au clic du bouton "jouer", mémorise l'élément du joueur
buttonPlay.addEventListener("click", () => {
    let round = 0
    const computerElement = randComputerElement(elements)
    const playerElement = memorisePlayerChoice()
    // console.log(computerElement)
    // console.log(playerElement)
    // console.log(compareElements(computerElement, playerElement))
    setWinner(computerElement, playerElement),
    round += 1
    // return playerElement
})
//--------------------------------------------------------

const playerCounter = document.querySelector("span.player-points")
const computerCounter = document.querySelector("span.computer-points")

let computerPoints = 0
let playerPoints = 0

const wordPointPlayer = document.querySelector(".player p")
const wordPointComputer = document.querySelector(".computer p")

// Ajout d'un "s" au mot point s'il y en a plusieurs
const checkPointsNumber = (pointsNumber, element) => {
    if (pointsNumber > 1) {
        element.textContent = "points"
    }
}

// Désigne le vainqueur et ajoute un point à son compteur
const setWinner = (computerElement, playerElement) => {
    // const computerElement = randComputerElement()
    // const playerElement = memorisePlayerChoice()
    let gameWinner = ""
    const elementWinner = compareElements(computerElement, playerElement)
    if (elementWinner === computerElement){
        gameWinner = "L'ordinateur a gagné"
        computerPoints += 1
        computerCounter.textContent = computerPoints
        checkPointsNumber(computerPoints, wordPointComputer)
        }
        
    else if (elementWinner === playerElement){
        gameWinner = "Vous avez gagné"
        playerPoints += 1
        playerCounter.textContent = playerPoints
        checkPointsNumber(playerPoints, wordPointPlayer)
        }
    else {
        gameWinner = "Match nul !"
    }
    const textGame = document.createElement("p")
    textGame.textContent = `Vous jouez ${playerElement}, l'ordinateur joue ${computerElement}`
    const textResult = document.createElement("p")
    currentRound.append(textGame, textResult)
    textResult.textContent = `> ${gameWinner} <`
    textGame.style.borderTop="0.1rem solid black"
    textResult.style.textAlign="center"
    return gameWinner
}
// console.log(winner)
// console.log(computerElement)
// console.log(playerElement)
// console.log(compareElements(computerElement, playerElement))

// const showTextGame = () => {
//     const textGame = `Vous jouez ${playerElement}, l'ordinateur joue ${computerElement}`

// }

// const addPointToWinner = () => {

// }

