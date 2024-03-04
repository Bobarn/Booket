import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBooks } from '../../redux/books';
import { thunkGetBookmarks } from '../../redux/bookmarks';
import { thunkGetCheckouts } from '../../redux/checkouts';
import { Link, useNavigate } from 'react-router-dom';
import BookTile from '../BookTile/BookTile';
import './UserPicks.css'


export default function UserPicks() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allBooks = useSelector((state) => state.books);
    const currUser = useSelector((state) => state.session.user);
    const bookmarks = useSelector((state) => state.bookmarks)
    const checkouts = useSelector((state) => state.checkouts)

    useEffect(() => {
        dispatch(thunkGetAllBooks())
        dispatch(thunkGetBookmarks())
        dispatch(thunkGetCheckouts())
    }, [dispatch, Object.values(allBooks).length])

    if(!allBooks) return null
    if(!bookmarks) return null
    if(!checkouts) return null
    if(!currUser) navigate('/')
    const openBooks = Object.values(checkouts)
    const bookmarked = Object.values(bookmarks)

    return (
        <>
        <div id="buffer"></div>
        <div className='fader main-shelf'>
            <h1 className='picks-header'>Here are the books you are currently reading...</h1>
            <div className='book-shelf'>
                <div className='books-container'>
                    {openBooks.map((book) => {
                        return (
                            <div key={book.id} className='book-tile-container'>
                                <BookTile book={book} currUser={currUser}/>
                            </div>
                        )
                    })}
                </div>

            </div>
            <div className='fader bookmarks-container'>
                <h1>Here are your bookmarked pages...</h1>
                <div className='bookmarks'>
                    <ol className='toc'>
                        {bookmarked.reverse().map((page) => (
                                <li className='toc-item' key={page.id}>
                                    <Link className='toc-link' to={`/page/${page.id}`}>
                                        {page.page_name} by {page.author}
                                    </Link>
                                </li>
                            ))}
                    </ol>
                </div>

            </div>
        </div>
        </>
    )
}
