import { thunkGetAllBooks } from "./books"

const GET_ALL_PAGES = "pages/GET_ALL_PAGES"
const CREATE_PAGE = "pages/CREATE_PAGE"
const UPDATE_PAGE = "pages/UPDATE_PAGE"
const DELETE_PAGE = "pages/DELETE_PAGE"

const getAllPages = (pages) => ({
    type: GET_ALL_PAGES,
    pages
})


const createPage = (page) => ({
    type: CREATE_PAGE,
    page
})

const editPage = (page) => ({
    type: UPDATE_PAGE,
    page
})

const deletePage = (pageId) => ({
    type: DELETE_PAGE,
    pageId
})



//GET ALL PAGES
export const thunkGetAllPages = () => async (dispatch) => {
    const response = await fetch('/api/pages/all')

    if (response.ok) {
        const {Pages} = await response.json();
        dispatch(getAllPages(Pages))
        return Pages
    } else {
        const error = await response.json()
        return error
    }
}

//CREATE A PAGE ON A BOOK
export const thunkCreatePage = (pageData, bookId) => async (dispatch) => {

    const response = await fetch(`/api/books/${bookId}/new`, {
        method: "POST",
        body: pageData
    })

    if (response.ok) {
        const page = await response.json();
        await dispatch(createPage(page))
        await dispatch(thunkGetAllPages())
        return page
    } else {
        const error = await response.json()
        return error;
    }
}

//EDIT A PAGE
export const thunkEditPage = (pageData, pageId) => async (dispatch) => {
    const response = await fetch(`/api/pages/${pageId}/edit`, {
        method: "PUT",
        body: pageData
    })

    if (response.ok) {
        const page = await response.json();
        await dispatch(editPage(page))
        await dispatch(thunkGetAllBooks())
        await dispatch(thunkGetAllPages())
        return page
    } else {
        const error = await response.json();
        return error
    }
}

//DELETE A PAGE
export const thunkDeletePage = (pageId) => async (dispatch) => {
    const response = await fetch(`/api/pages/${pageId}/delete`, {
        method: "DELETE"
    })

    if (response.ok){
        await dispatch(deletePage(pageId))
        // await dispatch(thunkGetAllPages())
    } else {
        const error = await response.json()
        return error
    }
}


const pagesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_PAGES:{
            const newState = { ...state }
            const pages = action.pages;
            pages.forEach((page) => {
                newState[page.id] = page;
            })
            return newState;
        }
        case CREATE_PAGE:{
            const newState = { ...state }
            newState[action.page.id] = action.page
            return newState
        }
        case UPDATE_PAGE:{
            const newState = { ...state }
            newState[action.page.id] = action.page
            return newState;
        }
        case DELETE_PAGE:{
            const newState = { ...state }
            delete newState[action.pageId]
            return newState
        }
        default:
            return state
    }
}

export default pagesReducer
