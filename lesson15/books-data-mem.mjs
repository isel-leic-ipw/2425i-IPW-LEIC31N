/**
 * Implements all Books data access, stored in memory 
 */

import errors from './errors.mjs'

let idNextBook = 0

function Book(title, isbn, ownerId) {
    this.id = ++idNextBook
    this.title = title
    this.isbn = isbn
    this.updateCount = 0
    this.ownerId = ownerId
}


const BOOKS = [
    new Book("Book1", 1111111, 1),
    new Book("Book2", 2222222, 1),
    new Book("Book3", 3333333, 2),
    new Book("Book4", 4444444, 2),
]


export function getBooks(userId) {
    return Promise.resolve(BOOKS.filter(b => b.ownerId == userId))
}

export function createBook(bookCreator, userId) {
    const newBook = new Book(bookCreator.title, bookCreator.isbn)
    BOOKS.push(newBook)
    return Promise.resolve(newBook)
}

export function getBook(bookId) {
    const book = BOOKS.find(b => b.id == bookId)
    if(book) {
        return Promise.resolve(book)
    }
    return Promise.reject(errors.NOT_FOUND(`Book with id ${bookId} not found`))
}



