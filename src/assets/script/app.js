const currentRound = document.querySelector(".current-round")

const leaf = document.querySelector("button.leaf")
const rock = document.querySelector("button.rock")
const scissors = document.querySelector("button.scissors")
const well = document.querySelector("button.well")

let winner = ""


const elements = ["Feuille", "Ciseaux", "Pierre"]
// Génère un nombre aléatoire de 0 à 2 pour désigner un des élément du tableau pour l'ordinateur
const randComputerElement = (elements) => {
    let rand = Math.floor(Math.random() * elements.length)
    let computerElement = elements[rand]
    return computerElement
}


// Compare 2 éléments pour déterminer le vainqueur
const compareElements = (element1, element2) => {
    let winner
    if (element1 === element2){
    winner = "Egalité"
    }
    else if (element1 === "Ciseaux" && element2 === "Feuille" || element1 === "Feuille" && element2 === "Ciseaux"){
    winner = "Ciseaux"
    }
    else if (element1 === "Pierre" && element2 === "Ciseaux" ||  element1 === "Ciseaux" && element2 === "Pierre"){
    winner = "Pierre"
    }
    else if (element1 === "Feuille" && element2 === "Pierre" || element1 === "Pierre" && element2 === "Feuille") {
    winner = "Feuille"
    }
    else if (element1 === "Feuille" && element2 === "Puits" || element1 === "Puits" && element2 === "Feuille") {
    winner = "Feuille"
    }
    else if (element1 === "Puits" && element2 === "Pierre" || element1 === "Pierre" && element2 === "Puits") {
    winner = "Puits"
    }
    else if (element1 === "Puits" && element2 === "Ciseaux" || element1 === "Ciseaux" && element2 === "Puits") {
    winner = "Puits"
    }
    return winner
}
//--------------------------------------------------


// Change l'élément sélectionné selon l'élément sur lequel clique l'utilisateur
leaf.addEventListener("click", () => {
    leaf.classList.add("selected")
    rock.classList.remove("selected")
    scissors.classList.remove("selected")
    well.classList.remove("selected")
})

rock.addEventListener("click", () => {
    rock.classList.add("selected")
    scissors.classList.remove("selected")
    leaf.classList.remove("selected")
    well.classList.remove("selected")
})

scissors.addEventListener("click", () => {
    scissors.classList.add("selected")
    rock.classList.remove("selected")
    leaf.classList.remove("selected")
    well.classList.remove("selected")
})

well.addEventListener("click", () => {
    well.classList.add("selected")
    scissors.classList.remove("selected")
    rock.classList.remove("selected")
    leaf.classList.remove("selected")
})
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
    else if (well.classList.contains("selected")){
        playerChoice = "Puits"
    }
    else {
        alert("Vous devez choisir un élément pour jouer")
    }
    return playerChoice
}
//------------------------------------------------------

// let playerElement = memorisePlayerChoice()

const buttonPlay = document.querySelector("button.play")

// Au clic du bouton "jouer", mémorise l'élément du joueur
buttonPlay.addEventListener("click", () => {
    let round = 0
    const computerElement = randComputerElement(elements)
    const playerElement = memorisePlayerChoice()
    setWinner(computerElement, playerElement),
    round += 1
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
//---------------------------------------------------------
// const wellImg = document.querySelector("button.well img")
const wellImg = document.querySelector("button.well img")
const leafImg = document.querySelector("button.leaf img")
const rockImg = document.querySelector("button.rock img")
const scissorsImg = document.querySelector("button.scissors img")

const wellIcon = wellImg.cloneNode()
const leafIcon = leafImg.cloneNode()
const rockIcon = rockImg.cloneNode()
const scissorsIcon = scissorsImg.cloneNode()

// const wellImg = document.createElement("img")
// wellImg.src = "./assets/style/img/well.png"
// const leafImg = document.createElement("img")
// leafImg.src = "./assets/style/img/leaf.png"
// const rockImg = document.createElement("img")
// rockImg.src = "./assets/style/img/rock.png"
// const scissorsImg = document.createElement("img")
// scissorsImg.src = "./assets/style/img/scissors.png"

// Clone et insère les images dans le déroulé du jeu
const setElementImg = (element) => {
    let img
    if (element === "Puits"){
        img = wellIcon.cloneNode()
    }
    else if (element === "Feuille"){
        img = leafIcon.cloneNode()
    }
    else if (element === "Pierre"){
        img = rockIcon.cloneNode()
    }
    else if (element === "Ciseaux"){
        img = scissorsIcon.cloneNode()
    }
    return img
}

// Désigne le vainqueur et ajoute un point à son compteur
const setWinner = (computerElement, playerElement) => {
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
    let imgComputer = setElementImg(computerElement)
    let imgPlayer = setElementImg(playerElement)

    const textGame = document.createElement("p")
    textGame.textContent = `Vous jouez ${playerElement}, l'ordinateur joue ${computerElement}`
    const textResult = document.createElement("p")
    currentRound.prepend(textGame, textResult)
    textResult.textContent = ` > ${gameWinner} < `
    textResult.prepend(imgPlayer)
    imgPlayer.style.width="7%"
    textResult.append(imgComputer)
    imgComputer.style.width="7%"
    textGame.classList.add("text")
    textResult.classList.add("result")
    return gameWinner
}

// Ajout du bouton puits dans le jeu + modification du texte du bouton de triche lors du clic

const buttonCheat = document.querySelector("button.cheat")
const elementsList = document.querySelector("p.elements-list")
const liCheat = document.querySelectorAll("li.cheat")

buttonCheat.addEventListener("click", () => {
    well.classList.toggle("hidden")

    let wellSpan = document.createElement("span")
    wellSpan.classList.add("well")
    wellSpan.textContent="puits, "

    if (!well.classList.contains("hidden")){
        buttonCheat.textContent="Ne plus tricher"
        elementsList.prepend(wellSpan)
        // Montre tous les li concernant le puits
        for (let li of liCheat){
            li.classList.remove("hidden")
        }
    }
    else {
        buttonCheat.textContent="Tricher"
        let wellSpan = document.querySelector("span.well")
        // Retire les éléments liés au puits dans les règles
        wellSpan.remove()
        for (let li of liCheat){
            li.classList.add("hidden")
        }
    }
})

const reduceButton = document.querySelector("button.reduce")
const pInRulesSection = document.querySelectorAll("section.rules p") 

// Change le texte du bouton réduire au clic et réduit les régles du jeu
reduceButton.addEventListener("click", () => {
      reduceRules()
})

const reduceRules = () => {
    for (let p of pInRulesSection){
        p.classList.toggle("hidden")  
        if (!p.classList.contains("hidden")){
            // p.classList.add("hidden") 
        reduceButton.textContent="Réduire"
        }
        else {
            // p.classList.remove("hidden") 
        reduceButton.textContent="En voir plus"
        }
    }
}

// const history = document.querySelector("div.history")


