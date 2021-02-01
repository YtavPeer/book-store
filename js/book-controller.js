'use strict';

function onInit() {
    renderBooks();

}

function renderBooks() {
    var books = getBooks();
    if (gSortBy === 'name') {
        books = sortByName(books);
    } else if (gSortBy === 'price') {
        books = sortByPrice(books);
    }
    var strBooksHtml = books.map(function (book) {
        var book =
            `<tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td><button onclick='onReadBook("${book.id}")' type="button" class="button blue">Read</button></td>
            <td><button onclick='onUpdateBook("${book.id}")' type="button" class="button yellow">update</button></td>
            <td><button onclick='onRemoveBook("${book.id}")' type="button" class="button red">delete</button></td>
        </tr>`
        return book;
    })

    var elTable = document.querySelector('.body-table');
    elTable.innerHTML = strBooksHtml.join('');;
}

function onRemoveBook(id) {
    console.log('remove book', id);
    removeBook(id);
    renderBooks();
}

function onAddBook() {
    document.querySelector('.add-book').hidden = false;
    // var name = prompt('please choose book name to add');
    // var price = +prompt('please choose book price to add');
    // addBook(name, price);
}

function onAddNewBook(ev) {
    ev.preventDefault();
    var title = document.querySelector('input[name="title"]').value;
    var price = document.querySelector('input[name="price"]').value;
    addBook(title, price);
    onCloseNewBookModal(ev)
    renderBooks();
}

function onCloseNewBookModal(ev) {
    ev.preventDefault();
    document.querySelector('.add-book').hidden = true
}

function onUpdateBook(id) {
    var newPrice = +prompt('please put the new price')
    updateBook(id, newPrice);
    renderBooks();
}

function onReadBook(id) {
    var currBook = getBook(id);

    var elModal = document.querySelector('.modal');
    elModal.hidden = false;

    var eltitle = document.querySelector('.modal h4');
    eltitle.innerText = currBook.title;
    var elPrice = document.querySelector('.modal h5');
    elPrice.innerText = currBook.price;
    var elImg = document.querySelector('.modal img');
    elImg.src = currBook.imageUrl;
    var elRate = document.querySelector('.modal span');
    elRate.innerText = currBook.rate;

    renderBooks();
}

function closeModal() {
    console.log('closing modal')
    document.querySelector('.modal').hidden = true
}

function onUpdateRate(value) {
    var newRate = updateBookRate(value);
    if (!newRate) return;
    var elRate = document.querySelector('.modal span');
    elRate.innerText = newRate;
    renderBooks();
}

function onSortByPrice() {
    updateSortBy('price')
    renderBooks()
}

function onSortByName() {
    updateSortBy('name')
    renderBooks()
}

function onNextPage(num) {
    var elLastPage = document.querySelector(`[name='${gPageIdx}']`);
    elLastPage.classList.remove('active');
    nextPage(num);
    var elCurrentPage = document.querySelector(`[name='${gPageIdx}']`);
    elCurrentPage.classList.add('active');
    renderBooks()
}

function onNextSpecificPage(pageNum) {
    var elCurrentPage = document.querySelector(`[name='${pageNum}']`);
    elCurrentPage.classList.add('active');
    var elLastPage = document.querySelector(`[name='${gPageIdx}']`);
    elLastPage.classList.remove('active');
    nextSpecificPage(pageNum)
    renderBooks()
}