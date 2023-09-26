const params = new URLSearchParams(window.location.search);
const asin = params.get("asin");



fetch(`https://striveschool-api.herokuapp.com/books/?id=${asin}`)
  .then(response => response.json())
  .then(bookAsinShow) 
    // Qui puoi generare l'HTML per visualizzare i dettagli del libro
  


    // Aggiungi un gestore di eventi per ogni libro
    // booksData.forEach((book) => {
    //     document.getElementById(book.asin).addEventListener('click', () => {
    //         console.log(books[book.asin]);
    //     });
    // });

console.log(fetch)

const bookAsin = document.querySelector(".cards-container")

function bookAsinShow(data) {
        console.log(data.book)
    bookAsin.innerHTML = data.book
}



