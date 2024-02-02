import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllAnnotations } from "../../../redux/annotations";
import { thunkEditAnnotation } from "../../../redux/annotations";
import { useModal } from "../../../context/Modal";


export default function AnnotationEdit( {annotationId} ) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const annotation = useSelector((state) => state.annotations[annotationId])

    const [text, setText] = useState(annotation ? annotation.text : "")
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        dispatch(thunkGetAllAnnotations())
    }, [dispatch])


    const handleSubmit = (e) => {

        e.preventDefault()
        let errorList = {}

        if(!text) errorList.text = "Text is required"
        if(Object.values(errorList).length > 0) {
            setErrors(errorList);
            return
        }

        const form = new FormData()
        form.append("text", text)

        dispatch(thunkEditAnnotation(form, annotationId))
        closeModal()

    }

    useEffect(() => {
        setSubmitted(false);
        setErrors({});
      }, [submitted]);


  return (
    <div style={{margin: "18px"}}>
      <h1>Edit Annotation</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Text
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="annotation-text"
          />
          {errors.text && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.text}</p>
          )}
        </label>

            <div className="lb2">

        <button type="submit">Update Annotation</button>
            </div>
      </form>

    </div>
  );
}
