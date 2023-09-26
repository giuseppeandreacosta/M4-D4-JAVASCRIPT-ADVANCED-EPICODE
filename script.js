const apiUrl = "https://striveschool-api.herokuapp.com/books";
const cardsContainer = document.querySelector(".cards-container");
const cartsContainer = document.querySelector(".cart-items");
const searchForm = document.querySelector('.form-container');
const searchInput = searchForm.querySelector('input[type="text"]');

let cart = [];
let books = {};

// Funzione che prende dati dall'API 
function getDatas(apiUrl) {
  fetch(apiUrl, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      generateHTML(data); // Chiamata alla funzione generateHTML con i dati recuperati
    })
    .catch((error) => {
      console.error("Errore: ", error);
    });
}

getDatas(apiUrl);

const generateHTML = (booksData) => {
  cardsContainer.innerHTML += booksData
    .map((book) => {
                                        //genero tramite JavaScript HTML ,
      books[book] = book;               //in questo caso ho iniettato nel DOM delle cards con immagine,titolo e prezzo.
      return `<li class="card" id="${book.asin}">
            <img src="${book.img}" alt="book image">
            <div class="details">
                <span>Title: ${book.title}</span>
                <span>Price: € ${book.price}</span>
                <div class="buttons">
                <button onclick="addToCart('${book}')"> Add to cart </button>
                <button class="skipCards"> Skip </button>
                <button onclick="window.location.href='details.html?asin=${book.asin}'">Details</button>
                </div>
            </div>
        </li>`;
    })
    .join("");
    
    // Aggiungi un event listener a ciascun pulsante "Skip"
document.querySelectorAll('.skipCards').forEach((button, index) => {
  button.addEventListener('click', () => {
      const card = document.querySelectorAll('.card')[index];
      card.style.display = 'none';
  });
});
booksData.forEach((book) => {
  document.getElementById(book.asin).addEventListener('click', () => {
      console.log(books[book.asin]);
  });
});
};

const fetchBookDetails = (asin) => {
  let apiUrl = `https://striveschool-api.herokuapp.com/books/?id=${asin}`;
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          // Qui puoi fare qualcosa con i dati del libro, come visualizzarli in un modal
      })
      .catch(error => console.error('Errore:', error));
}

function addToCart(bookId) {
  const book = books[bookId]; //Questa riga seleziona un libro dall’array books utilizzando bookId come indice. Il libro selezionato viene quindi salvato nella variabile book.
  cart.push(book); // Aggiunge il libro selezionato nell'array Cart.
  updateCartIcon(); // richiama la funzione per aggiornare il contatore del carrello
  updateCartTotal(); // richiama la funzione che calcola la somma dei libri nel carrello
  showCart(); // richiama la funzione che mostra il carrello.
}

searchInput.addEventListener("input", function (event) {
//   event.preventDefault(); // Previene il comportamento di default del form
  const searchTerm = searchInput.value.toLowerCase(); // Prende il valore dell'input e lo rende minuscolo
  const books = document.querySelectorAll(".card"); // Seleziona tutti i libri
  books.forEach((book) => {
    const title = book.querySelector(".details span").textContent.toLowerCase(); // Prende il titolo del libro e lo rende minuscolo
    if (searchTerm.length < 3 || title.includes(searchTerm)) {
      // Controlla se il titolo del libro è nella ricerca
      book.style.display = "block"; // Se c'è il libro mette display block
    } else {
      book.style.display = "none"; // Se non trova il libro mette display none
    }
  });
});




function updateCartIcon() {
  const cartIcon = document.querySelector(".bi-cart"); // seleziono l'icona del carrello
  cartIcon.textContent = cart.length; //aggiorna il numero corrente dell'icona carrello
}

function updateCartTotal() {
  const cartTotal = document.querySelector(".cart-total span:nth-child(2)"); // selezione il secondo span
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    //itera tutto l'array cart
    total += cart[i].price;
  }
  cartTotal.textContent = "€" + total.toFixed(2); //mostra il prezzo sommato // toFixed formatta un numero in modo tale da visualizzarlo in maniera decimale
}

function showCart() {
  const cartElement = document.querySelector(".cart"); //seleziono il carrello
  cartElement.style.display = "block"; // il carrello di default è display none , quando aggiungo "libri", il carrello si mostra
}

function removeFromCart(bookTitle) {
  const index = cart.findIndex((book) => book.title === bookTitle); // funzione per rimuovere dal carrello il totale.
  if (index !== -1) {
    cart.splice(index, 1); // il metodo splice modifica l'array originale e restituisce un nuovo array contenente gli elementi rimossi.
    updateCartIcon();
    updateCartTotal();
  }
}

document.querySelector(".delete-cart").addEventListener("click", function () {
  // prendo l'icona per rimuovere contenuti dal carrello
  cart = []; // Svuota l'array del carrello
  updateCartIcon(); // richiama la funzione per aggiornare il contatore del carrello
  updateCartTotal(); // richiama la funzione che calcola la somma dei libri nel carrello
});
