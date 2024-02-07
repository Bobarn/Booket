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
    const [coverImage, setCoverImage] = useState(null)
    const [privacy, setPrivate] = useState(book.private)
    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)


    // console.log(book)
    useEffect(() => {
        dispatch(thunkGetAllBooks())
    }, [dispatch])
    // console.log(coverImage)


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
        // navigate(`/users/${user.id}`)
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
    <div className="create-book-container">
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
        <label>
          Category
          <select
            id='category-input'
            value={category}
            onChange={(e) => {
                setCategory(e.target.value);
                console.log(category);
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
                <p style={{ fontSize: "10px", color: "red" }}>*{errors.category}</p>
              )}
            </div>
        </label>
        <label>
          Title
          <input
            type="text"
            maxLength={35}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-title"
          />
          <p>{title.length}/35</p>
          <div className="error">
            {errors.title && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.title}</p>
            )}
          </div>

        </label>
        <label>
          Synopsis
          <textarea
            value={synopsis}
            maxLength={350}
            onChange={(e) => setSynopsis(e.target.value)}
            className="form-synopsis"
          />
          <p>{synopsis.length}/350</p>
          <div className="error">
            {errors.synopsis && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.synopsis}</p>
            )}
          </div>
        </label>

        <label>
          Cover Image
          {formType == "Edit Book" && <div>Current Image Name: {book.coverName}</div>}
          <input
            // value={coverImage}
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
          <div className="error">
            {errors.coverImage && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.coverImage}</p>
            )}
          </div>
        </label>
        Private? (Toggle for a private album only you will see)
        <label className="switch">

            <input type="checkbox"
            checked={privacy}
            onChange={() => setPrivate(!privacy)}
             />
            <span className="slider round"></span>
        </label>
        <div className="form-foot">
          <button id="form-submit" type="submit">{formType == "Publish Book" ? <>Publish Book</> : <>Update Book</>}</button>
        </div>
        <div className="loading">
              {loading && <>Loading...</>}
        </div>
      </form>
    </div>
    </>
  );
}

export default BookForm;
