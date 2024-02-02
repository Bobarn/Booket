import { thunkGetAllPages } from './pages'

const GET_ALL_ANNOTATIONS = "annotations/GET_ALL_ANNOTATIONS"
const CREATE_ANNOTATION = "annotations/CREATE_ANNOTATION"
const UPDATE_ANNOTATION = "annotations/UPDATE_ANNOTATION"
const DELETE_ANNOTATION = "annotations/DELETE_ANNOTATION"

const getAllAnnotations = (annotations) => ({
    type: GET_ALL_ANNOTATIONS,
    annotations
})


const createAnnotation = (annotation) => ({
    type: CREATE_ANNOTATION,
    annotation
})

const editAnnotation = (annotation) => ({
    type: UPDATE_ANNOTATION,
    annotation
})

const deleteAnnotation = (annotationId) => ({
    type: DELETE_ANNOTATION,
    annotationId
})


//GET ALL ANNOTATIONS
export const thunkGetAllAnnotations = () => async (dispatch) => {
    const response = await fetch('/api/annotations')
    if (response.ok) {
        const {annotations} = await response.json();
        dispatch(getAllAnnotations(annotations))
        return annotations
    } else {
        const error = await response.json();
        return error
    }
}


// CREATE ANNOTATION
export const thunkCreateAnnotation = (data, pageId) => async (dispatch) => {
    const response = await fetch(`/api/pages/${pageId}/annotations/new`, {
        method: "POST",
        body: data
    })

    if (response.ok) {
        const annotation = await response.json()
        await dispatch(createAnnotation(annotation))
        await dispatch(thunkGetAllPages())

        return annotation
    } else {
        const error = await response.json()
        return error
    }
}

//EDIT ANNOTATION
export const thunkEditAnnotation = (data, annotationId) => async (dispatch) => {
    const response = await fetch (`/api/annotations/${annotationId}/edit`, {
        method: "PUT",
        body: data
    })

    if (response.ok) {
        const annotation = await response.json()
        await dispatch(editAnnotation(annotation))
        await dispatch(thunkGetAllPages())
        return annotation
    } else {
        const error = await response.json()
        return error
    }
}

//DELETE ANNOTATION
export const thunkDeleteAnnotation = (annotationId) => async (dispatch) => {
    const response = await fetch (`/api/annotations/${annotationId}/delete`, {
        method: "DELETE"
    })

    if(response.ok) {
        await dispatch(deleteAnnotation(annotationId))
        await dispatch(thunkGetAllPages())
    } else {
        const error = await response.json()
        return error
    }
}


const annotationsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_ANNOTATIONS:{
            const newState = { ...state }
            const annotations = action.annotations
            annotations.forEach((annotation) => {
                newState[annotation.id] = annotation
            })
            return newState
        }
        case CREATE_ANNOTATION:{
            const newState = { ...state }
            newState[action.annotation.id] = action.annotation
            return newState
        }
        case UPDATE_ANNOTATION:{
            const newState = { ...state }
            newState[action.annotation.id] = action.annotation
            return newState;
        }
        case DELETE_ANNOTATION:{
            const newState = { ...state }
            delete newState[action.annotationId]
            return newState
        }
        default:
            return state
    }
}

export default annotationsReducer
