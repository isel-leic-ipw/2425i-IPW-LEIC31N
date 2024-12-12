// Module responsibilities
// This file contains all HTTP Web Site handling functions.
//

import express from 'express'


import errosMapping from './application-to-http-erros.mjs'

export default function(services) {
    // const app = express.Router()

    // app.get('/books', createHandler(getBooks))           // Get all books
    // app.get('/books/:id', createHandler(getBook))        // Get a book details
    // app.delete('/books/:id', createHandler(deleteBook))  // Delete a book
    // app.put('/books/:id', createHandler(updateBook))     // Update a book
    // app.post('/books', createHandler(createBook))        // Delete a book

    // return app

    return {
        getBooks :  createHandler(getBooks),
        addBook: createHandler(createBook),
        getBook: createHandler(getBook),
        updateBook: createHandler(updateBook),
        deleteBook: createHandler(deleteBook),
        getFormCreate: getFormCreate,
        extractToken: extractToken
        
    }

    function extractToken(req, rsp, next) {
        // Hammer time. Frankenstein here gets even uglier....
        req.token = 'c176eafd-25eb-45d3-a8cb-7218f3d63b3b'
        next()
    }
    

    function getFormCreate(req, rsp) {
        const formCreate = `
        <!DOCTYPE html>
        <html>
            <body>

                <h2>Create Book</h2>

                <form action="/site/books" method=POST>
                    <label for="title">Title:</label><br>
                    <input type="text" id="title" name="title" value=""><br>
                    <label for="isbn">ISBN:</label><br>
                    <input type="text" id="isbn" name="isbn" value=""><br>
                    <br>
                    <input type="submit" value="Submit">
                </form> 

                <p>If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".</p>

            </body>
        </html>  
        `
        rsp.send(formCreate)


    }


    function createHandler(specificFunction) {
        return function (req, rsp, next) {
            const promiseResult = specificFunction(req, rsp)
    
            promiseResult
                .catch(error => sendError(rsp, error))
        }
    }

    async function getBooks(req, resp) {
        const books = await services.getBooks(req.token)
        resp.render('books', {g: books})
    }

    async function getBook(req, resp) {
        const book = await services.getBook(req.token, req.params.id)
        resp.render('book', book)
    }

    async function updateBook(req, resp) {  
        await services.updateBook(req.token, req.params.id, req.body.name, req.body.description)
    }

    async function createBook(req, resp) {
        resp.status(201)
        await services.createBook(req.body, req.token)
        rsp.send("book created")
    }

    async function deleteBook(req, resp) {
        await services.deleteBook(req.token, req.params.id)
    }
}