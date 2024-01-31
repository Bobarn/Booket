import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBooks } from '../../redux/books';
import BookTile from '../BookTile/BookTile';
import './HomeFeed.css'


export default function HomeFeed() {
    const dispatch = useDispatch();
    const allBooks = useSelector((state) => state.books);
    const currUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(thunkGetAllBooks())
    }, [dispatch])

    if(!allBooks) return null
    if(!currUser) return null
    const booksArray = Object.values(allBooks)

    return (
        <>
            <div className='book-shelf'>
                <div className='books-container'>
                    {booksArray.map((book) => {
                        return (
                            <div key={book.id} className='book-tile-container'>
                                <BookTile book={book}/>
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}
