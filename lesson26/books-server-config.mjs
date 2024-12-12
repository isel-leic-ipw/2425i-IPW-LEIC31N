/**
 * Configures the express HTTP application (including routes and middlewares)
 */

import express from 'express'

import booksDataInit from './data/books-data-mem.mjs'
//import booksDataInit from './data/books-data-es.mjs'
import * as usersData from './data/users-data-mem.mjs'
import booksServiceInit from './books-service.mjs'
import apiInit from './books-api.mjs' 
import siteInit from './books-web-site.mjs' 

const booksData = booksDataInit()

const booksService = booksServiceInit(booksData, usersData)
const api = apiInit(booksService)
const site = siteInit(booksService)

console.log("Server-config loaded")

export default function(app) {
    app.use('/api/*', express.json())
    app.post('/site/*', express.urlencoded())

    app.use(countReq, showRequestData)
    app.use('/api/*', api.extractToken)
    app.use('/site/*', site.extractToken)

    // Web Application Resources URIs
    const RESOURCES_API = {
        // Resource URI that represents ALL Books
        BOOKS: '/api/books',    
        // Resource URI that represents ONE Book
        BOOK: '/api/books/:bookId'
    }

    
    const RESOURCES_WEB_SITE = {
        // Resource URI that represents ALL Books
        BOOKS: '/site/books',    
        // Resource URI that represents ONE Book
        BOOK: '/site/books/:bookId',
        // Resource URI that represents a HTML form to create a book
        BOOK_CREATOR: `/site/books/book-creator`,
        // Resource URI that represents a HTML form to update/edit a book
        BOOK_EDITOR: `/site/books/:bookId/book-editor`,
        // Resource URI that represents to delete a Book
        BOOK_ERASER: `/site/books/:bookId/book-eraser`
    }

    // Web Api Application Routes
    app.get(RESOURCES_API.BOOKS, api.getBooks)
    app.post(RESOURCES_API.BOOKS, api.addBook)

    app.get(RESOURCES_API.BOOK, api.getBook)
    app.put(RESOURCES_API.BOOK, api.updateBook)
    app.delete(RESOURCES_API.BOOK, api.deleteBook)


    // Web Site Application Routes
    // app.get(RESOURCES_WEB_SITE.BOOKS, site.getBooks)

    app.get(RESOURCES_WEB_SITE.BOOK_CREATOR, site.getFormCreate)
    app.post(RESOURCES_WEB_SITE.BOOKS, site.addBook)

    // app.get(RESOURCES_WEB_SITE.BOOK, api.getBook)
    // app.get(RESOURCES_WEB_SITE.BOOK_EDITOR, site.getFormEditor)

    // app.post(RESOURCES_WEB_SITE.BOOK, api.updateBook)
    // app.post(RESOURCES_WEB_SITE.BOOK_ERASER, api.deleteBook)


    let count = 1
    function countReq(req, rsp, next) {
        console.log(`Number of requests: ${count++}`)
        next()
    }

    function showRequestData(req, rsp, next) {
        console.log(`Request method: ${req.method}`)
        console.log(`Request uri: ${req.originalUrl}`)
        next()
    }

}

