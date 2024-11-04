/**
 * Implements all Books handling logic, 
 * and data access
 */


import errors from './errors.mjs'

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



/**
 * 
 * @returns Returns A Promise resolved with an array, with all books
 */
export function getBooks() {
    return Promise.resolve(BOOKS)
}

/**
 * Create a new Book, given a creator object
 * 
 * @param {*} bookCreator - The object with the initial data to create a Book
 * @returns a Promise resolved with the created book
 */
export function createBook(bookCreator) {
    if(bookCreator.title && bookCreator.isbn) {
        const newBook = new Book(bookCreator.title, bookCreator.isbn)
        BOOKS.push(newBook)
        return Promise.resolve(newBook)
    }
    return Promise.reject(errors.INVALID_DATA(`To create a Book, a title and isbn must be provided`))
}

export function getBook(bookId) {
    const book = BOOKS.find(b => b.id == bookId)
    if(book) {
        return Promise.resolve(book)
    }
    return Promise.reject(errors.NOT_FOUND(`Book with id ${bookId} not found`))
}

export function updateBook(bookId, bookUpdater) {
    const book = BOOKS.find(b => b.id == bookId)
    if(book) {
        if(bookUpdater.title && bookUpdater.isbn) {
            book.title = bookUpdater.title
            book.isbn = bookUpdater.isbn
            book.updateCount++
            return Promise.resolve(book)
        } else {
            return Promise.reject(errors.INVALID_DATA(`To update a Book, a title and isbn must be provided`))
        }
    }
    return Promise.reject(errors.NOT_FOUND(`Book with id ${bookId} not found`))
}