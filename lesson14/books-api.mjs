/**
 * This file contains all HTTP API handling functions, 
 * and all data handling
 */

import * as booksService from './books-service.mjs'


export async function getBooks(req, rsp) {
    // rsp.type('application/json')
        // .send(JSON.stringify(BOOKS))
    let books = await booksService.getBooks()
    rsp.json(books)
}

export async function addBook(req, rsp) {
    let bookRepresentation = req.body

    if(bookRepresentation.title && bookRepresentation.isbn) {
        const newBook = new Book(bookRepresentation.title, bookRepresentation.isbn)

        BOOKS.push(newBook)

        rsp.status(201).send({
            description: `Book created`,
            uri: `/api/books/${newBook.id}`
        })
        return
    }
    badRequest(rsp)
}

export async function getBook(req, rsp) {
    const bookId = req.params.bookId
    const book = BOOKS.find(b => b.id == bookId)
    if(book) {
        rsp.json(book)
        return
    } 
    // Book not found. Inform the client
    bookNotFound(rsp, bookId)
}

export function updateBook(req, rsp) {
    const bookRepresentation = req.body
    const bookId = req.params.bookId 
    const book = BOOKS.find(b => b.id == bookId)
    if(book) {
        if(bookRepresentation.title && bookRepresentation.isbn) {
            book.title = bookRepresentation.title
            book.isbn = bookRepresentation.isbn
            book.updateCount++
            rsp.json({ message: `Book with id ${bookId} updated` })
        } else {
            badRequest(rsp, bookId)
        }
        return
    }
    bookNotFound(rsp, bookId)
}

export function deleteBook(req, rsp) {
    const bookId = req.params.bookId
    const idxToRemove = BOOKS.findIndex(b => b.id == bookId)
    if(idxToRemove != -1) {
        BOOKS.splice(idxToRemove, 1)
        rsp.json({ message: `Book with id ${bookId} deleted` })
        return
    }
    bookNotFound(rsp, bookId)
}

///////// Auxiliary functions


function bookNotFound(rsp, bookId) {
    sendStatusResponse(rsp, 404, `Book with id ${bookId} not found`)
}

function badRequest(rsp, bookId) {
    sendStatusResponse(rsp, 400, `Bad request for adding/updating book wit id ${bookId}`)
}

function sendStatusResponse(rsp, status, message) {
    rsp.status(status)
        .json({
            message: message
        })
}