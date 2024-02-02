import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreatePage, thunkEditPage, thunkGetAllPages } from "../../redux/pages";
import "./PageForm.css"


function PageForm({formType, page, bookId, pageId}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.session.user)

    const [page_name, setPage_Name] = useState(page.page_name)
    const [caption, setCaption] = useState(page.caption)
    const [image, setImage] = useState(null)

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)


    // console.log(book)
    useEffect(() => {
        dispatch(thunkGetAllPages())
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errorList = {}

        if(!page_name) errorList.page_name = "Page Title is required"
        if(!caption) errorList.caption = "Caption is required"
        if(formType == "Publish Page" && !image) {
            errorList.image = "Please add an image for this page (.jpg, .jpeg, .png, .gif, .pdf)"
        }


        if(Object.values(errorList).length > 0) {
            setErrors(errorList);
            return
        }



        const form = new FormData()
        form.append("page_name", page_name)
        form.append("caption", caption)
        if (image) {
            form.append("image", image)
          }
        if(formType == "Publish Page") {
            dispatch(thunkCreatePage(form, bookId))
        } else {
            dispatch(thunkEditPage(form, pageId))
        }
        navigate(`/users/${user.id}`)
    }





    useEffect(() => {
        setSubmitted(false);
        setErrors({});
      }, [submitted]);

      if(!user) {
        return null
      }

  return (
    <div className="create-page-container">
        {formType == "Publish Page" ?
        <>
            <h1>Add A New Page to Your Book!</h1>
            <div>Write out your story, one page and one picture at a time.</div>
        </>
        :
        <>
            <h1>Revise Your Page!</h1>
            <div>Stories change and this is yours, tell us what you want to change.</div>
        </>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Page Title
          <input
            type="text"
            value={page_name}
            onChange={(e) => setPage_Name(e.target.value)}
          />
          <div className="error">
            {errors.page_name && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.page_name}</p>
            )}
          </div>
        </label>
        <label>
          Caption
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="form-caption"
          />
          <div className="error">
            {errors.caption && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.caption}</p>
            )}
          </div>
        </label>

        <label>
          Page Image
          {formType == "Edit Page" && <div>Current Image Name: {page.imageName}</div>}
          <input
            // value={coverImage}
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="error">
            {errors.image && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.image}</p>
            )}
          </div>
        </label>
        <div>
        <button type="submit">{formType == "Publish Page" ? <>Add Page</> : <>Update Page</>}</button>
        </div>

      </form>
    </div>
  );
}

export default PageForm;
