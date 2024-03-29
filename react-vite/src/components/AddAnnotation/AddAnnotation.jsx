import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllPages } from "../../redux/pages";
import { thunkCreateAnnotation } from "../../redux/annotations";
import './AddAnnotation.css'

export default function AddAnnotation( {pageId} ) {
    const dispatch = useDispatch()
    const [text, setText] = useState("")
    const [errors, setErrors] = useState({})
    const [disabled, setDisabled] = useState(false)

    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(thunkGetAllPages())
    }, [dispatch])

    useEffect(() => {
      let boolean = false
      if(text.length == 0) {
        boolean = true
      }
      setDisabled(boolean)
    }, [text])

    useEffect(() => {
      setText('')
    }, [pageId])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errorList = {}
        if(text === '') return false

        if(text.length > 300) errorList.text = "Text must be less than 300 characters"

        if(Object.values(errorList).length > 0) {
            setErrors(errorList);
            return
        }

        const form = new FormData()
        form.append("text", text)

        dispatch(thunkCreateAnnotation(form, pageId))
        setText('')
    }

    document.getElementById("page-annotation-text")?.addEventListener("keydown", (e) => {
      if(e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        document.getElementById("annotation-submit").click()
        return false
      }
      return true
    })


  return (
      <form id="annotation-form" onSubmit={handleSubmit}>

      <div>
        <img src={user.profileImage} id="annotation-logo"/>
      </div>
          <div className="error">
            {errors.text && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.text}</p>
            )}
          </div>
        <label className="page-annotation-area">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            id="page-annotation-text"
          />
        </label>
                <button id="annotation-submit" disabled={disabled} type="submit"><i className="fa-solid fa-pencil"></i></button>


      </form>
  );
}
