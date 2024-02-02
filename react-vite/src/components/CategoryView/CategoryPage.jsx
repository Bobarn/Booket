import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBooks } from '../../redux/books';
import { useParams, Link } from 'react-router-dom';
import BookTile from '../BookTile/BookTile';
import './CategoryPage.css'


export default function CategoryPage() {
    const { category } = useParams();
    const dispatch = useDispatch();
    const allBooks = useSelector((state) => state.books);
    const currUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(thunkGetAllBooks())
    }, [dispatch])

    if(!allBooks) return null
    if(!currUser) return null
    const booksArray = Object.values(allBooks).filter((book) => book.private != true && book.category == category);
    console.log(booksArray, category)

    return (
        <>
            <div className='category-main-cont'>
                <Link to={'/category/Home'}>Home</Link>
                <Link to={'/category/Fitness'}>Fitness</Link>
                <Link to={'/category/Outdoors'}>Outdoors</Link>
                <Link to={'/category/Self-Improvement'}>Self-Improvement</Link>
                <Link to={'/category/Tech'}>Tech</Link>
                <Link to={'/category/Other'}>Other</Link>
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
        </>
    )
}
