document.addEventListener('DOMContentLoaded', () => {
    const cardValues = [
        'apple', 'banana', 'cherry', 'grape', 'melon', 'pineapple', 'strawberry', 'peach'
    ];
    const cards = [...cardValues, ...cardValues]; // Crear 16 cartas (8 pares)
    let cardElements = [];
    let flippedCards = [];
    let matches = 0;

    // Mezcla las cartas
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(cards);

    // Crea el tablero de juego
    const gameBoard = document.querySelector('.game-board');
    cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        const img = document.createElement('img');
        img.src = `images/${value}.png`;
        card.appendChild(img);
        gameBoard.appendChild(card);

        cardElements.push(card);
    });

    // Maneja el clic en una carta
    gameBoard.addEventListener('click', (e) => {
        if (!e.target.classList.contains('card') && !e.target.parentElement.classList.contains('card')) return;
        const clickedCard = e.target.closest('.card');
        if (flippedCards.length === 2) return;
        if (clickedCard.classList.contains('flipped')) return;

        clickedCard.classList.add('flipped');
        clickedCard.querySelector('img').style.display = 'block'; // Mostrar imagen
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    });

    // Verifica si las cartas coinciden
    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            matches++;
            if (matches === cardValues.length) {
                alert('¡Felicidades! Has encontrado todas las parejas.');
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.querySelector('img').style.display = 'none'; // Ocultar imagen
            card2.querySelector('img').style.display = 'none'; // Ocultar imagen
        }
        flippedCards = [];
    }

    // Reinicia el juego
    document.getElementById('restart').addEventListener('click', () => {
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
            card.querySelector('img').style.display = 'none'; // Ocultar imagen
        });
        matches = 0;
        shuffle(cards);
        cardElements.forEach((card, index) => {
            card.classList.remove('flipped');
            card.dataset.value = cards[index];
            card.querySelector('img').src = `images/${cards[index]}.png`;
        });
    });
});
