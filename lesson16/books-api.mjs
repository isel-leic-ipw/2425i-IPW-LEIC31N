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


export const getBooks = createHandler(internalGetBooks)
export const addBook = createHandler(internalAddBook)
export const getBook = createHandler(internalGetBook)
export const updateBook = createHandler(internalUpdateBook)
export const deleteBook = createHandler(internalDeleteBook)

function internalGetBooks(req, rsp) {
    const userId = getUserId(req)
    return booksService.getBooks(userId).then(
        books => rsp.json(books)
    )
}

function internalAddBook(req, rsp) {
    const userId = getUserId(req)
    let bookRepresentation = req.body

    return booksService.createBook(bookRepresentation, userId).then(
        book => rsp.status(201).json({
            description: `Book created`,
            uri: `/api/books/${book.id}`
        })
    )
}

function internalGetBook(req, rsp) {
    const bookId = req.params.bookId
    const userId = getUserId(req)

    return booksService.getBook(bookId, userId).then(
        book => rsp.json(book)
    )
}

function internalUpdateBook(req, rsp) {
    const bookRepresentation = req.body
    const bookId = req.params.bookId 
    const userId = getUserId(req)

    return booksService.updateBook(bookId, bookRepresentation, bookId, userId).then(
        book => rsp.json({ message: `Book with id ${bookId} updated` })
    )
}

function internalDeleteBook(req, rsp) {
    const bookId = req.params.bookId
    const userId = getUserId(req)

    return booksService.deleteBook(bookId, userId).then(
        bookId => rsp.json({ message: `Book with id ${bookId} deleted` })
    )
}

///////// Auxiliary functions


function createHandler(specificFunction) {
    return function (req, rsp) {
        const promiseResult = specificFunction(req, rsp)
    
        promiseResult
            .catch(error => sendError(rsp, error))
    }
}

function sendError(rsp, appError) {
    const httpError = errosMapping(appError)
    rsp.status(httpError.status).json(httpError.body)
}




function getUserId(req) {
    // HAMMER TIME: This should be replaced by the proper code to get user id from request
    const fakeUserId = 1
    return fakeUserId
}