import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBooks } from '../../redux/books';
import { thunkGetBookmarks } from '../../redux/bookmarks';
import { Link, useNavigate } from 'react-router-dom';
import BookTile from '../BookTile/BookTile';
import './HomeFeed.css'


export default function HomeFeed() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allBooks = useSelector((state) => state.books);
    const currUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(thunkGetAllBooks())
        dispatch(thunkGetBookmarks())
    }, [dispatch])

    if(!allBooks) return null
    if(!currUser) navigate('/')
    const booksArray = Object.values(allBooks).filter((book) => book.private != true).sort((a, b) => b.id - a.id)

    return (
        <>
        <div id="buffer"></div>
        <div className='fader main-shelf'>
            <div className='category-main-cont'>
                <Link className='cat-link' to={'/category/Home'}><i className="cat-logo-specific fa-xs fa-solid fa-house-chimney"></i> <img className='cat-logo' src='https://photobooket.s3.amazonaws.com/a03e8cefc38f4a9bb210ba8085e01f36.png'/>Home</Link>
                <Link className='cat-link' to={'/category/Fitness'}> <i className="cat-logo-specific fa-xs fa-solid fa-dumbbell"></i> <img className='cat-logo' src='https://photobooket.s3.amazonaws.com/a03e8cefc38f4a9bb210ba8085e01f36.png'/>Fitness</Link>
                <Link className='cat-link' to={'/category/Outdoors'}><i className="cat-logo-specific fa-xs fa-solid fa-tree"></i><img className='cat-logo' src='https://photobooket.s3.amazonaws.com/a03e8cefc38f4a9bb210ba8085e01f36.png'/>Outdoors</Link>
                <Link className='cat-link' to={'/category/Self-Improvement'}><i className="cat-logo-specific fa-xs fa-solid fa-heart"></i> <img className='cat-logo' src='https://photobooket.s3.amazonaws.com/a03e8cefc38f4a9bb210ba8085e01f36.png'/>Self-Improvement</Link>
                <Link className='cat-link' to={'/category/Tech'}><i className="cat-logo-specific fa-xs fa-brands fa-space-awesome"></i><img className='cat-logo' src='https://photobooket.s3.amazonaws.com/a03e8cefc38f4a9bb210ba8085e01f36.png'/>Tech</Link>
                <Link className='cat-link' to={'/category/Other'}><i className="cat-logo-specific fa-xs fa-solid fa-otter"></i><img className='cat-logo' src='https://photobooket.s3.amazonaws.com/a03e8cefc38f4a9bb210ba8085e01f36.png'/>Other</Link>
            </div>
            <div className='book-shelf'>
                <div className='books-container'>
                    {booksArray.map((book) => {
                        return (
                            <div key={book.id} className='book-tile-container'>
                                <BookTile book={book} currUser={currUser}/>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
        </>
    )
}
