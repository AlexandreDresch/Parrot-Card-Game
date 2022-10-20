let cardCount = prompt('Com quantas cartas você deseja jogar? Selecione uma quantidade par de 4 à 14 cartas.')

while (cardCount < 4 || cardCount > 14 || cardCount % 2 !== 0) {
    cardCount = prompt('Com quantas cartas você deseja jogar? Selecione uma quantidade par de 4 à 14 cartas.')
}

{/* <div class="closed-card-container ">
    <img src="./assets/back.png" alt="">
</div> */}