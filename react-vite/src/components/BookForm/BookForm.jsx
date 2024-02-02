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
        if(!synopsis) errorList.synopsis = "Synopsis is required"
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

        if(formType == "Publish Book") {
            dispatch(thunkCreateBook(form))
        } else {
            dispatch(thunkEditBook(form, bookId))
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
    <div className="create-book-container">
        {formType == "Publish Book" ?
        <>
            <h1>Publish Your New Book</h1>
            <div>Write out your story, one page and one picture at a time.</div>
        </>
        :
        <>
            <h1>Revise Your Book</h1>
            <div>Stories change and this is yours, tell us what you want to change.</div>
        </>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          {errors.category && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.category}</p>
          )}
        </label>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {errors.title && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.title}</p>
          )}
        </label>
        <label>
          Synopsis
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            className="form-synopsis"
          />
          {errors.synopsis && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.synopsis}</p>
          )}
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

          {errors.coverImage && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.coverImage}</p>
          )}
        </label>
        Private? (Toggle for a private album only you will see)
        <label className="switch">

            <input type="checkbox"
            checked={privacy}
            onChange={() => setPrivate(!privacy)}
             />
            <span className="slider round"></span>
        </label>
        <div>
        <button type="submit">Add book</button>
        </div>

      </form>
    </div>
  );
}

export default BookForm;
