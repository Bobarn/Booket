import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { thunkGetAllBooks } from '../../redux/books';
import { thunkAddCheckout, thunkGetCheckouts, thunkRemoveCheckout, } from '../../redux/checkouts'
import './BookPage.css'



export default function BookPage() {


    const navigate = useNavigate()

    const {bookId} = useParams();

    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const book = useSelector((state) => state.books[bookId]);
    const checkouts = useSelector((state) => state.checkouts)

    if(!user || (book?.private && book.author.id != user.id)) {
        navigate('/home')
    }

    useEffect(() => {
        dispatch(thunkGetAllBooks())
        dispatch(thunkGetCheckouts())
    }, [dispatch])

    function removeCheckout(bookId) {
        dispatch(thunkRemoveCheckout(bookId))
    }

    function addCheckout(bookId) {
        dispatch(thunkAddCheckout(bookId))
    }

    if(!book) return null;


    return (
    <>
        <div id="buffer"></div>
        <div id='book-container'>
            {/* Add in on changes so that we avoid the warning for uncontrolled/controlled inputs. Also add checked so we can force it closed again after navigation */}
                <input type="checkbox" className='checkbox' defaultChecked={true} id="checkbox-cover"/>
                <input type="checkbox" className='checkbox' onChange={() => null} checked={true} id="checkbox-page1"/>
                <input type="checkbox" className='checkbox' onChange={() => null} checked={false} id="checkbox-page2"/>
                <div className="book">

                    <div className="cover">
                    </div>
                    <div className="page" id="page1">
                        <div className="front-page">
                            Flipping...
                        </div>
                        <div className="back-page">
                            {user && user.id !== book.user_id && !checkouts[book.id] &&
                            <button className='checkouts-button' onClick={() => addCheckout(book.id)}><i className="fa-solid fa-square-plus"></i></button>
                            }
                            {user && user.id !== book.user_id && checkouts[book.id] &&
                            <button className='checkouts-button' onClick={() => removeCheckout(book.id)}><i className="fa-solid fa-book-open-reader"></i></button>
                            }
                        <h4>{book.title}</h4>
                            <img id='book-image' src={book.cover}/>
                        </div>
                    </div>
                    <div className="page" id="page2">
                        <div className="front-page">
                        <h2>Synopsis</h2>
                        <p className='page-caption'>{book.synopsis}</p>
                        </div>
                        <h4 id='book-toc'>Table of Contents</h4>
                        <div className='table-of-contents'>
                        <ol className='toc'>
                            {book?.pages.map((page) => (
                                    <li className='toc-item' key={page.id}>
                                        <Link className='toc-link' to={`/books/${book.id}/page/${page.id}`}>
                                            {page.page_name}
                                        </Link>
                                    </li>
                                ))}
                        </ol>
                        </div>
                        <div className="back-page">
                            Flipping...
                        </div>
                    </div>
                    <div className="back-cover"></div>
                </div>
            </div>
        </>
    )
}
