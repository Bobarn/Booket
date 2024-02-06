import './Welcome.css'
import { thunkGetAllBooks } from '../../redux/books'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BookTile from '../BookTile/BookTile';

export function SampleBookTile() {

    const dispatch = useDispatch()

    const allBooks = useSelector((state) => state.books)

    const allBooksArr = Object.values(allBooks).filter((book) => book.private === false)

    let book;

    const checkBook = localStorage.getItem("book_of_the_day")

    if(checkBook === "undefined") {

        const randomBook = allBooksArr[Math.floor(Math.random() * allBooksArr.length)];
        localStorage.setItem("book_of_the_day", JSON.stringify(randomBook))

    } else {
        book = JSON.parse(checkBook)

    }





    useEffect(() => {
        dispatch(thunkGetAllBooks())
    }, [dispatch])

    if(!book) return null;

    return (
        <div className='sample-book'>
        Here&rsquo;s a sample of what you can read on the site!
        <div className='book-tile'>
            <div className='book-cover-link'>
                <img src={book.cover} alt={book.coverName} className='cover-image'/>
                <div className='book-title'>{book.title}</div>
            </div>
            <div className='tile-spine'>
                <div className='tile-front-cover'>
                    <div className='tile-author-area'>
                        <div className='tile-synopsis'>
                            <p>Synopsis:</p>
                            <p id='synopsis-text'>
                                {book.synopsis}
                            </p>
                        </div>
                        <div className='tile-author'>
                            <div className='tile-book-author'>
                            <img
                            src={book.author.profileImage}
                            alt={book.author.profileImageName}
                            className='tile-book-author-image'
                            />
                                {book.author.username}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='tile-back-cover'>
                    <div className='tile-index'>
                        <p className='TOC'>Table of Contents:</p>
                        <ol>
                            {book?.pages.slice(0, 5).map((page) => (
                                <li className='tile-index-item' key={page.id}>
                                        {page.page_name}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default function Welcome() {

    const navigate = useNavigate()

    const user = useSelector((state) => state.session.user)

    const tutorialBook = useSelector((state) => state.books[8])


   useEffect(() => {
    if(user) {
        navigate('/home')
    }
   }, [user])

    return (
        <>
            <div id='buffer'></div>
            <div className='welcome-landing'>
                <div className="welcome-background">

                    <div className="welcome-page-container">
                        <h1>
                        Hello and Welcome to Booket
                        </h1>

                    </div>
                </div>
                <SampleBookTile />
                <div id='tutorial-book'>
                    This is a brief tutorial of some of the main features of our site!
                    <BookTile book={tutorialBook}/>
                </div>
            </div>
        </>
    )
}
