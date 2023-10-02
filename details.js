const params = new URLSearchParams(window.location.search);
const asin = params.get("asin");

fetch(`https://striveschool-api.herokuapp.com/books/?id=${asin}`)
  .then(response => response.json())
  .then(data => {
    bookAsinShow(data);
    addEventListeners(data);
  });

const bookAsin = document.querySelector(".cards-container");

function bookAsinShow(data) {
  console.log(data); // Stampa l'intero oggetto per vedere la sua struttura
  let html = '';
  data.forEach((book) => {
    html += `
      <div id="${book.asin}" class="card">
        <img src="${book.img}" alt="book image">
            <div class="details" id="details-${book.asin}">
                <span>Title: ${book.title}</span>
                <span>Price: € ${book.price}</span>
                <span>ASIN: ${book.asin}</span>
            </div>
      </div>
    `;
  });
  bookAsin.innerHTML = html;
}

function addEventListeners(booksData) {
  // Ora booksData dovrebbe essere un array di oggetti libro
  booksData.forEach((book) => {
    document.getElementById(`details-${book.asin}`).addEventListener('click', () => {
      console.log(book); // Stampa l'intero oggetto libro quando si fa clic sulla sezione "details"
    });
  });
}
