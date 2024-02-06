import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkDeleteBook } from '../../redux/books';
import { useEffect } from 'react';
import './BookTile.css'

export default function BookTile({book, currUser}) {


    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
    }, [dispatch, book.id])

    function burnBook(bookId) {
        dispatch(thunkDeleteBook(bookId));
    }

    if(!currUser) {
        return null
    }
    return (
        <div className='book-tile'>
            <Link to={`/books/${book.id}`} className="book-cover-link">
                <img src={book.cover} alt={book.coverName} className='cover-image'/>
                <div className='book-title'>{book.title}</div>
            </Link>
            <div className='tile-spine'>
                <div className='tile-front-cover'>
                    <div className='tile-author-area'>
                        <Link className='tile-synopsis' to={`/books/${book.id}`}>
                            <p>Synopsis:</p>
                            <p id='synopsis-text'>
                                {book.synopsis}
                            </p>
                        </Link>
                        <Link className='tile-author' to={`/users/${book.author.id}`}>
                            <div className='tile-book-author'>
                            <img
                            src={book.author.profileImage}
                            alt={book.author.profileImageName}
                            className='tile-book-author-image'
                            />
                                {book.author.username}
                            </div>
                        </Link>
                    </div>
                    {
                        book.author.id == currUser.id &&
                        <button onClick={() => navigate(`/books/${book.id}/edit`)} className='revise-button'>
                            <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        }
                </div>
                <div className='tile-back-cover'>
                    <div className='tile-index'>
                        {book.author.id == currUser.id &&
                        <>
                            <button onClick={() => burnBook(book.id)} className='burn-button'>
                                <i className="fa-solid fa-fire"></i>
                            </button>
                            <button onClick={() => navigate(`/books/${book.id}/page/new`)} className='new-page-button'>
                                <i className="fa-solid fa-file-circle-plus"></i>
                            </button>
                        </>}
                        <p className='TOC'>Table of Contents:</p>
                        <ol>
                            {book?.pages.slice(0, 5).map((page) => (
                                <li className='tile-index-item' key={page.id}>
                                    <Link className='index-link' to={`/page/${page.id}`}>
                                        {page.page_name}
                                    </Link>
                                </li>
                            ))}

                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}
