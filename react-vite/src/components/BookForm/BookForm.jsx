import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateBook, thunkEditBook, thunkGetAllBooks } from "../../redux/books";
import "./BookForm.css"


function BookForm({formType, book, bookId}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.session.user)

    const [category, setCategory] = useState(book.category)
    const [title, setTitle] = useState(book.title)
    const [synopsis, setSynopsis] = useState(book.synopsis)
    const [coverImage, setCoverImage] = useState(book.coverImage)
    const [privacy, setPrivate] = useState(book.private)
    const [loading, setLoading] = useState(false)
    const [imageURL, setImageURL] = useState(book?.coverImage)
    const [filename, setFilename] = useState(book?.coverName)

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)


    // console.log(book)
    useEffect(() => {
        dispatch(thunkGetAllBooks())
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errorList = {}

        if(!category) errorList.category = "Category is required"
        if(!title) errorList.title = "Title is required"
        if(title.length > 35) errorList.title = "Title cannot be longer than 35 characters"
        if(!synopsis) errorList.synopsis = "Synopsis is required"
        if(synopsis.length > 350) errorList.synopsis = "Synopsis cannot be longer than 350 characters."
        if(formType == "Publish Book" && !coverImage) errorList.coverImage = "Please add a cover image for this book (.jpg, .jpeg, .png, .gif, .pdf)"


        if(Object.values(errorList).length > 0) {
            setErrors(errorList);
            return
        }



        const form = new FormData()
        form.append("category", category)
        form.append("title", title)
        form.append("synopsis", synopsis)
        if(coverImage) {
          form.append("cover_image", coverImage)
        }
        form.append("private", privacy)
        setLoading(true)

        if(formType == "Publish Book") {
            dispatch(thunkCreateBook(form)).then((res) => {
              setLoading(false)
              if(res.errors) {
                setErrors(res.errors)
              } else {
                navigate(`/users/${user.id}`)
              }
            })
        } else {
            dispatch(thunkEditBook(form, bookId)).then((res) => {
              setLoading(false)
              if(res.errors) {
                setErrors(res.errors)
              } else {
                navigate(`/users/${user.id}`)
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
      // setFile(tempFile);
      setFilename(tempFile.name);
      setCoverImage(e.target.files[0])
    }





    useEffect(() => {
        setSubmitted(false);
        setErrors({});
      }, [submitted]);

      if(!user) {
        navigate('/')
      }

  return (
    <>
    <div id="buffer"></div>
    <div className="fader create-book-container">
        {formType == "Publish Book" ?
        <>
            <h1 id="book-form-heading">Publish Your New Book</h1>
            <div>Write out your story, one page and one picture at a time.</div>
        </>
        :
        <>
            <h1 id="book-form-heading">Revise Your Book</h1>
            <div>Stories change and this is yours, tell us what you want to change.</div>
        </>}
      <form className="book-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="left-form-container">
          <label id="overarching-label">
            Cover Image
            <br></br>
            <br></br>
            <div className="file-inputs-container">
              <input type="file" accept="image/png, image/jpeg, image/jpg" id="post-image-input" onChange={fileWrap}></input>
              <label htmlFor="post-image-input" id="cover-image-label" className="file-input-labels">Choose File</label>
              <div className="file-inputs-filename" style={{ color: filename === "Selected image exceeds the maximum file size of 5Mb" ? "red" : "#374151" }}>{filename}</div>
              <div className="thumbnail-container"><img src={imageURL} className="thumbnails"></img></div>
            </div>
            <div className="error">
              {errors.coverImage && (
                <>*{errors.coverImage}</>
              )}
            </div>
          </label>
            <div className="display-curr-image"></div>
              {loading && <div className="loading-bars"><div></div><div></div><div></div></div>}
        </div>
        <div className="right-form-container">
          <div className="book-form-input-container">

          <label id="category-label" className="book-label">
            Category
            </label>
            <select
              id='category-input'
              value={category}
              onChange={(e) => {
                  setCategory(e.target.value);
              }}
              >
                  <option value={'Home'}>Home</option>
                  <option value={'Fitness'}>Fitness</option>
                  <option value={'Outdoors'}>Outdoors</option>
                  <option value={'Self-Improvement'}>Self-Improvement</option>
                  <option value={'Tech'}>Tech</option>
                  <option value={'Other'}>Other</option>
                  <option value='' disabled>&#40;select one&#41;</option>
              </select>
              <div className="error">
                {errors.category && (
                  <>*{errors.category}</>
                )}
              </div>
          </div>
          <div className="book-form-input-container">

            <label id="title-label" className="book-label">
              Title<br></br>
              {title.length}/35
              </label>
              <input
                id="title-input"
                type="text"
                maxLength={35}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-title"
              />
              <div className="error">
                {errors.title && (
                  <>*{errors.title}</>
                )}
              </div>

          </div>
          <div className="book-form-input-container">
            <label id="synopsis-label" className="book-label">
              Synopsis <br/>
              {synopsis.length}/350
              </label>
              <textarea
                id="synopsis-input"
                value={synopsis}
                maxLength={350}
                onChange={(e) => setSynopsis(e.target.value)}
                className="form-synopsis"
              />
              <p></p>
              <div className="error">
                {errors.synopsis && (
                  <>*{errors.synopsis}</>
                )}
              </div>

          </div>
          <p id="private-label">Private? (Toggle for a private album only you will see)</p>
          <label className="switch">

              <input type="checkbox"
              id="privacy-input"
              checked={privacy}
              onChange={() => setPrivate(!privacy)}
              />
              <span className="slider round"></span>
          </label>
        <div className="form-foot">
          <button id="form-submit" type="submit">{formType == "Publish Book" ? <>Publish Book</> : <>Update Book</>}</button>
        </div>
        </div>

      </form>
    </div>
    </>
  );
}

export default BookForm;
