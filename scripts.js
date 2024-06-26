const myLibrary = [{ title: "Harry Potter", name: "J.K Rowling", pages: 332, read: "yes" }];
console.log(myLibrary)

function Book(name, title, pages, read) {
    this.name = name;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeStatus = function() {
    this.read = this.read === "yes" ? "no" : "yes";
};

displayBook();

function addBookToLibrary(name, title, pages, read) {
    myLibrary.push(new Book(name, title, pages, read));
    displayBook();
}

function displayBook() {
    clear();


    myLibrary.forEach((book, index) => {
        const randomHeight = Math.floor(Math.random() * (300 - 100 + 1)) + 240;
        const randomWidth = Math.floor(Math.random() * (130 - 100 + 1)) + 135;
        const chosenColors = ['#042836', '#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#AE2012', '#9B2226'];
        const randomIndex = Math.floor(Math.random() * chosenColors.length);
        const randomColor = chosenColors[randomIndex];

        const container = document.querySelector('#container');
        const cardContainer = document.createElement("div");
        const remove = document.createElement("button");
        const div = document.createElement("div");
        const lighting = document.createElement("div");
        const bookInfo = document.createElement("h2");


        cardContainer.classList.add("cardContainer");
        remove.classList.add("cardButton");
        remove.dataset.number = index;
        remove.textContent = "X";
        div.dataset.number = index;
        bookInfo.dataset.number = index;
        div.classList.add("card");
        div.style.height = randomHeight + 'px';
        div.style.width = randomWidth + 'px';
        div.style.backgroundColor = randomColor
        bookInfo.classList.add("bookInfo");
        bookInfo.textContent = `${book.title}.`;
        lighting.classList.add("lighting-effect");

        div.appendChild(bookInfo);
        div.appendChild(lighting)
        cardContainer.appendChild(remove)
        container.appendChild(cardContainer);
        cardContainer.appendChild(div);
    });
}

function clear() {
    const container = document.querySelector('#container');
    container.innerHTML = '';
}

document.querySelector('#form').addEventListener('submit', (event) => {
    event.preventDefault();

    const author = document.querySelector('#author').value;
    const title = document.querySelector('#title').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('input[name="read"]:checked').value;

    addBookToLibrary(author, title, pages, read);
    overlay.style.display = 'none'
    dialog.close();
});

document.querySelector('#container').addEventListener('click', e => {
    if (e.target.classList.contains('cardButton')) {
        console.log(e.target.dataset.number);
        myLibrary.splice(e.target.dataset.number, 1);
        displayBook();
    }
});

const openDialog = document.querySelector('#open');
const closeDialog = document.querySelector('#close');
const dialog = document.querySelector('#dialog');
openDialog.addEventListener('click', e => {
    overlay.style.display = 'block'
    dialog.showModal();
});
closeDialog.addEventListener('click', e => {
    overlay.style.display = 'none'
    dialog.close();
});


const bookModal = document.querySelector('#bookDialog');
const overlay = document.querySelector('.overlay');


document.querySelector('#container').addEventListener('click', e => {
    console.log(e.target);
    if (e.target.dataset.number && !e.target.classList.contains('cardButton')) {
        const book = myLibrary.find((book, index) => index === +e.target.dataset.number);
        const bookTitle = document.querySelector('#bookTitle');
        const pages = document.querySelector('#totalPages');
        const author = document.querySelector('#authorName');
        const readStatus = document.querySelector('#readStatus');
        readStatus.dataset.number = +e.target.dataset.number;

        book.read === "yes" ? readStatus.textContent = `READ!` : readStatus.textContent = `NOT READ YET!`
        bookTitle.textContent = `${book.title}.`;
        author.textContent = `${book.name}.`;
        pages.textContent = `${book.pages} pages.`
        bookModal.style.display = 'grid';
        overlay.style.display = 'block'
    }
});

document.querySelector('#closeBookDialog').addEventListener('click', e => {
    overlay.style.display = 'none'
    bookModal.style.display = 'none';
})

document.querySelector('#readStatus').addEventListener('click', e =>{
    const book = myLibrary.find((book, index) => index === +e.target.dataset.number);
    book.changeStatus()
    e.target.textContent = book.read === "yes" ? "READ!" : "NOT READ YET!";
})