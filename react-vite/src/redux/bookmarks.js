const GET_BOOKMARKS = 'bookmarks/GET_BOOKMARKS';
const ADD_BOOKMARK = 'bookmarks/ADD_BOOKMARK';
const REMOVE_BOOKMARK = 'bookmarks/REMOVE_BOOKMARK';

const getBookmarks = (bookmarks) => {
    return {
    type: GET_BOOKMARKS,
    bookmarks
    }
}

const addBookmark = (bookmark) => {
    return {
        type: ADD_BOOKMARK,
        bookmark
    }
}

const removeBookmark = (bookmarkId) => {
    return {
        type: REMOVE_BOOKMARK,
        bookmarkId
    }
}


export const thunkGetBookmarks = () => async (dispatch) => {
    const response = await fetch('/api/books/bookmarks')

    if(response.ok) {
        const {bookmarks} = await response.json()

        dispatch(getBookmarks(bookmarks))

        return bookmarks
    } else {
        const error = await response.json()

        return error;
    }
}

export const thunkAddBookmark = (bookId) => async (dispatch) => {
    const response = await fetch(`/api/books/bookmarks/${bookId}`, {
        method: "POST"
    })

    if(response.ok) {
        const bookmark = await response.json()

        dispatch(addBookmark(bookmark))

        return bookmark
    } else {
        const error = await response.json()

        return error;
    }
}

export const thunkRemoveBookmark = (bookId) => async (dispatch) => {
    const response = await fetch(`/api/books/bookmarks/${bookId}`, {
        method: "DELETE"
    })

    if(response.ok) {

        dispatch(removeBookmark(bookId))

    } else {
        const error = await response.json()

        return error;
    }
}


const bookmarksReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BOOKMARKS:{
            const newState = { ...state }
            const bookmarks = action.bookmarks
            bookmarks.forEach((bookmark) => {
                newState[bookmark.id] = bookmark
            })
            return newState
        }
        case ADD_BOOKMARK:{
            const newState = { ...state }
            newState[action.bookmark.id] = action.bookmark
            return newState
        }
        case REMOVE_BOOKMARK:{
            const newState = { ...state }
            delete newState[action.bookmarkId]
            return newState
        }
        default:
            return state
    }
}

export default bookmarksReducer
