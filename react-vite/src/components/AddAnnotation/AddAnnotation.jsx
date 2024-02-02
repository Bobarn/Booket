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


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errorList = {}

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


  return (
    <div id="annotation-form-container">
      <div>
        <img src={user.profileImage} id="annotation-logo"/>
      </div>
      <form id="annotation-form" onSubmit={handleSubmit}>

          <div className="error">
            {errors.text && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.text}</p>
            )}
          </div>
        <label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="page-annotation-text"
          />
        </label>

              <div>
                    <button disabled={disabled} type="submit">Comment</button>
              </div>

      </form>
    </div>
  );
}
