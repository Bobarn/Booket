//Action Type Constants
const GET_ALL_BOOKS = "books/GET_ALL_BOOKS"
const CREATE_BOOK = "books/CREATE_BOOK"
const UPDATE_BOOK = "books/UPDATE_BOOK"
const DELETE_BOOK = "books/DELETE_BOOK"




//Action Creators

const getAllBooks = (books) => ({
    type: GET_ALL_BOOKS,
    books
})

const createBook = (book) => ({
    type: CREATE_BOOK,
    book
})

const editBook = (book) => ({
    type: UPDATE_BOOK,
    book
})

const deleteBook = (bookId) => ({
    type: DELETE_BOOK,
    bookId
})






// GET ALL BOOKS
export const thunkGetAllBooks = () => async (dispatch) => {
    const response = await fetch('/api/books/all')

    if (response.ok) {
        const { Books } = await response.json();
        dispatch(getAllBooks(Books))
        return Books
    } else {
        const error = await response.json();
        return error
    }
}

// CREATE BOOK
export const thunkCreateBook = (formData) => async (dispatch) => {
    const response = await fetch('/api/books/new', {
        method: "POST",
        body: formData
    })
    console.log(response)

    if (response.ok) {

        const book = await response.json()
        dispatch(createBook(book))
        // dispatch(thunkGetAllBooks())

        return book
    } else {
        const error = await response.json();
        console.log(error)
        return error
    }
}


// EDIT BOOK
export const thunkEditBook = (formData, bookId) => async(dispatch) => {

    const response = await fetch(`/api/books/${bookId}/edit`, {
        method: "PUT",
        body: formData
    })

    if(response.ok) {
        const updatedBook = await response.json();
        dispatch(editBook(updatedBook))
        // dispatch(fetchAllBooks())
        return updatedBook
    } else {
        const error = await response.json();
        return error;
    }

}

// DELETE BOOK
export const thunkDeleteBook = (bookId) => async(dispatch) => {
    const response = await fetch(`/api/books/${bookId}/delete`, {
        method: "DELETE"
    })

    if(response.ok) {
        const data = await response.json();
        await dispatch(deleteBook(bookId))
        await dispatch(thunkGetAllBooks())
        return data
    } else {
        const data = await response.json()
        return data;
    }
}



const booksReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_BOOKS:{
            const newState = { ...state };
            const books = action.books;
            books.forEach((book) => {
                newState[book.id] = book;
            })

            return newState
        }
        case CREATE_BOOK:{
            const newState = { ...state }
            newState[action.book.id] = action.book
            return newState
        }
        case UPDATE_BOOK:{
            const newState = { ...state }
            newState[action.book.id] = action.book
            return newState;
        }
        case DELETE_BOOK:{
            const newState = { ...state }
            delete newState[action.bookId]
            return newState
        }
        default:
            return state
    }
}

export default booksReducer
