/**
 * This file contains all HTTP API handling functions, 
 * and all data handling
 */

let idNextBook = 0

function Book(title, isbn) {
    this.id = ++idNextBook
    this.title = title
    this.isbn = isbn
    this.updateCount = 0
}


const BOOKS = [
    new Book("Book1", 1111111),
    new Book("Book2", 2222222),
    new Book("Book3", 3333333),
    new Book("Book4", 4444444),
]

export function getBooks(req, rsp) {
    // rsp.type('application/json')
        // .send(JSON.stringify(BOOKS))
    rsp.json(BOOKS)
}

export function addBook(req, rsp) {
    let bookRepresentation = req.body
    const newBook = new Book(bookRepresentation.title, bookRepresentation.isbn)

    BOOKS.push(newBook)
}

export function getBook(req, rsp) {
    const bookId = req.params.bookId
    const book = BOOKS.find(b => b.id == bookId)
    rsp.json(book)
    return
}

export function updateBook(req, rsp) {
    const bookRepresentation = req.body
    
    const bookId = req.params.bookId 
    const book = BOOKS.find(b => b.id == bookId)
    book.title = bookRepresentation.title
    book.isbn = bookRepresentation.isbn
    book.updateCount++
    rsp.json({ message: `Book with id ${bookId} updated` })
}

export function deleteBook(req, rsp) {
    const bookId = req.params.bookId
    const idxToRemove = BOOKS.findIndex(b => b.id == bookId)
    BOOKS.splice(idxToRemove, 1)
    rsp.json({ message: `Book with id ${bookId} deleted` })
    return
}

