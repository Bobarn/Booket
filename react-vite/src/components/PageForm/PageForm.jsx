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
    const [image, setImage] = useState(page?.imageName)
    const [loading, setLoading] = useState(false)
    const [imageURL, setImageURL] = useState(page?.image)
    const [filename, setFilename] = useState(page?.imageName)

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
        if(page_name.length > 30) errorList.page_name = "Page Title cannot be longer than 30 characters"
        if(!caption) errorList.caption = "Caption is required"
        if(caption.length > 300) errorList.caption = "Caption cannot be longer than 300 characters"
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
        setLoading(true)
        if(formType == "Publish Page") {
            dispatch(thunkCreatePage(form, bookId)).then((res) => {
              setLoading(false)
              if(res.errors) {
                setErrors(res.errors)
              } else {
                navigate(`/books/${bookId}`)
              }
            })
        } else {
            dispatch(thunkEditPage(form, pageId)).then((res) => {
              setLoading(false)
              if(res.errors) {
                setErrors(res.errors)
              } else {
                navigate(`/books/${bookId}`)
              }
            })
        }
    }
    const fileWrap = (e) => {
      e.stopPropagation();

      const tempFile = e.target.files[0];

      // Check for max image size of 5Mb
      if (tempFile.size > 5000000) {
        setFilename("Selected image exceeds the maximum file size of 5Mb"); // "Selected image exceeds the maximum file size of 5Mb"
        return
      }

      const newImageURL = URL.createObjectURL(tempFile); // Generate a local URL to render the image file inside of the <img> tag.
      setImageURL(newImageURL);
      setFilename(tempFile.name);
      setImage(e.target.files[0])
    }




    useEffect(() => {
        setSubmitted(false);
        setErrors({});
      }, [submitted]);

      if(!user) {
        return null
      }

  return (
    <>
    <div id="buffer"></div>
    <div className="create-page-container">
        {formType == "Publish Page" ?
        <>
            <h1 id="page-form-heading">Add A New Page to Your Book!</h1>
            <div>Write out your story, one page and one picture at a time.</div>
        </>
        :
        <>
            <h1 id="page-form-heading">Revise Your Page!</h1>
            <div>Stories change and this is yours, tell us what you want to change.</div>
        </>}
      <form className="page-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="left-form-container">
        <label id="overarching-label">
          Page Image
          <br></br>
          <br></br>
          <div className="file-inputs-container">
              <input type="file" accept="image/png, image/jpeg, image/jpg" id="post-image-input" onChange={fileWrap}></input>
              <label htmlFor="post-image-input" id="cover-image-label" className="file-input-labels">Choose File</label>
              <div className="file-inputs-filename" style={{ color: filename === "Selected image exceeds the maximum file size of 5Mb" ? "red" : "#B7BBBF" }}>{filename}</div>
              <div className="thumbnails-container"><img style={{border: "none"}} src={imageURL} className="thumbnail"></img></div>
          </div>

          <div className="error">
            {errors.image && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.image}</p>
            )}
          </div>
        </label>
        </div>
        <div className="right-form-container">
        <label id="title-label" className="book-label">
          Page Title <br></br>
          {page_name?.length}/30
          <input
            id="title-input"
            className="form-title"
            maxLength={30}
            type="text"
            value={page_name}
            onChange={(e) => setPage_Name(e.target.value)}
          />

          <div className="error">
            {errors.page_name && (
              <>*{errors.page_name}</>
            )}
          </div>
        </label>
        <label id="synopsis-label" className="book-label">
          Caption <br></br>
          {caption.length}/300
          <textarea
            id="synopsis-input"
            maxLength={300}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="form-caption"
          />

          <div className="error">
            {errors.caption && (
              <>*{errors.caption}</>
            )}
          </div>
        </label>
        <div className="form-foot">
        <button id="form-submit" type="submit">{formType == "Publish Page" ? <>Add Page</> : <>Update Page</>}</button>
        </div>
        </div>
        {loading && <div className="page-loading-bars"><div></div><div></div><div></div></div>}
      </form>
    </div>
    </>
  );
}

export default PageForm;
