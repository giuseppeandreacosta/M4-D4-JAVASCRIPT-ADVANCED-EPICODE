const apiUrl = "https://striveschool-api.herokuapp.com/books";
const cardsContainer = document.querySelector(".cards-container");
const searchForm = document.querySelector('form[action="search"]');
const searchInput = searchForm.querySelector('input[type="text"]');


function getDatas(apiUrl) {
    fetch(apiUrl,{
        method : 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        generateHTML(data); // Chiamata alla funzione generateHTML con i dati recuperati
    })
    .catch((error) => {
        console.error('Errore: ' , error)
    })
}   console.log(getDatas(apiUrl))
getDatas(apiUrl);

// Funzione che prende dati dall'API e li mette nel DOM.

const generateHTML = (books) => {
    cardsContainer.innerHTML += books.map(book =>
        `<li class="card">
            <img src="${book.img}" alt="book image">
            <div class="details">
                <span>Title: ${book.title}</span>
                <span>Price: ${book.price}</span>
                <button> Add to cart </button>
            </div>
        </li>`
    ).join("");
}

searchForm.addEventListener('input', function(event) {
    event.preventDefault(); // Previene il comportamento di default del form
    const searchTerm = searchInput.value.toLowerCase(); // Prende il valore dell'input e lo rende minuscolo

    const books = document.querySelectorAll('.card'); // Seleziona tutti i libri
    books.forEach(book => {
        const title = book.querySelector('.details span').textContent.toLowerCase(); // Prende il titolo del libro e lo rende minuscolo
        if (title.includes(searchTerm)) { // Controlla se il titolo del libro include il termine di ricerca
            book.style.display = 'block'; // Se il termine di ricerca è nel titolo, mostra il libro
        } else {
            book.style.display = 'none'; // Se il termine di ricerca non è nel titolo, nasconde il libro
        }
    });
});



let cart = [];

function addToCart(book) {
    cart.push(book);
    updateCartIcon();
    updateCartTotal();
    showCart();
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.bi-cart');
    cartIcon.textContent = cart.length;
}

function updateCartTotal() {
    const cartTotal = document.querySelector('.cart-total span:nth-child(2)');
    let total = 0;
    for (let book of cart) {
        total += book.price;
    }
    cartTotal.textContent = '€' + total.toFixed(2);
}

cardsContainer.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        const card = event.target.closest('.card');
        const book = {
            img: card.querySelector('img').src,
            title: card.querySelector('.details span:nth-child(1)').textContent,
            price: parseFloat(card.querySelector('.details span:nth-child(2)').textContent.replace('Price: ', ''))
        };
        addToCart(book);
    }
});

function showCart() {
    const cart = document.querySelector('.cart');
    cart.style.display = 'block';
}


function removeFromCart(bookTitle) {
    const index = cart.findIndex(book => book.title === bookTitle);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartIcon();
        updateCartTotal();
    }
}

cardsContainer.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Remove from cart') {
        const card = event.target.closest('.card');
        const bookTitle = card.querySelector('.details span:nth-child(1)').textContent;
        removeFromCart(bookTitle);
    }
});

document.querySelector('.delete-cart').addEventListener('click', function() {
    cart = []; // Svuota l'array del carrello
    updateCartIcon();
    updateCartTotal();
});



