const GET_BOOKMARKS = 'bookmarks/GET_BOOKMARKS';
const ADD_BOOKMARK = 'bookmarks/ADD_BOOKMARK';
const REMOVE_BOOKMARK = 'bookmarks/REMOVE_BOOKMARK';
const CLEAR_STATE = 'bookmarks/CLEAR_STATE';

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

export const clearState = () => {
    return {
        type: CLEAR_STATE
    }
}


export const thunkGetBookmarks = () => async (dispatch) => {
    const response = await fetch('/api/pages/bookmarks')

    if(response.ok) {
        const {pages} = await response.json()

        dispatch(getBookmarks(pages))

        return pages
    } else {
        const error = await response.json()

        return error;
    }
}

export const thunkAddBookmark = (bookId) => async (dispatch) => {
    const response = await fetch(`/api/pages/bookmarks/${bookId}`, {
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
    const response = await fetch(`/api/pages/bookmarks/${bookId}`, {
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
            const newState = {}
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
        case CLEAR_STATE:{
            return {}
        }
        default:
            return state
    }
}

export default bookmarksReducer
