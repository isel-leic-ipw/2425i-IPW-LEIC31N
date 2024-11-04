/**
 * This file contains all HTTP API handling functions.
 */

import * as booksService from './books-service.mjs'
import errosMapping from './application-to-http-erros.mjs'


// export async function getBooks(req, rsp) {
//     // rsp.type('application/json')
//         // .send(JSON.stringify(BOOKS))
//     let books = await booksService.getBooks()
//     rsp.json(books)
// }

export function getBooks(req, rsp) {
    // rsp.type('application/json')
        // .send(JSON.stringify(BOOKS))
    booksService.getBooks()
        .then(books => rsp.json(books))
}

export function addBook(req, rsp) {
    let bookRepresentation = req.body

    booksService.createBook(bookRepresentation)
        .then(book => rsp.status(201).send({
            description: `Book created`,
            uri: `/api/books/${book.id}`
        }))
        .catch(error => badRequest(rsp, error.message))
}

export async function getBook(req, rsp) {
    const bookId = req.params.bookId

    booksService.getBook(bookId)
        .then(book => rsp.json(book))
        .catch(error => resourceNotFound(rsp, error.message))
}

export function updateBook(req, rsp) {
    const bookRepresentation = req.body
    const bookId = req.params.bookId 
    booksService.updateBook(bookId, bookRepresentation)
        .then(book => rsp.json({ message: `Book with id ${bookId} updated` }))
        .catch(error => sendError(rsp, errosMapping(error)))

}

export function deleteBook(req, rsp) {
    const bookId = req.params.bookId
    const idxToRemove = BOOKS.findIndex(b => b.id == bookId)
    if(idxToRemove != -1) {
        BOOKS.splice(idxToRemove, 1)
        rsp.json({ message: `Book with id ${bookId} deleted` })
        return
    }
    resourceNotFound(rsp, bookId)
}

///////// Auxiliary functions

function sendError(rsp, httpError) {
    rsp.status(httpError.status).json(httpError.body)
}


function resourceNotFound(rsp, message) {
    sendStatusResponse(rsp, 404, message)
}

function badRequest(rsp, message) {
    sendStatusResponse(rsp, 400, message)
}

function sendStatusResponse(rsp, status, message) {
    rsp.status(status)
        .json({
            message: message
        })
}