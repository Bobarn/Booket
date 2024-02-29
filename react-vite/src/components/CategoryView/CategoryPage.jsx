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
    // const [isCat, setIsCat] = useState(category)

    useEffect(() => {
        dispatch(thunkGetAllBooks())
    }, [dispatch])

    if(!allBooks) return null
    if(!currUser) return null
    const booksArray = Object.values(allBooks).filter((book) => book.private != true && book.category == category).sort((a, b) => b.id - a.id);

    return (
        <>
            <div id="buffer"></div>
            <div className='main-shelf'>
                <div className='category-main-cont'>
                    <Link style={{color: category == 'Home' ? "rgb(172, 59, 97)" : '' }} className='cat-link' to={'/category/Home'}><i style={{color: category == 'Home' ? "rgb(172, 59, 97)" : '' }} className="cat-logo-specific fa-xs fa-solid fa-house-chimney"></i> <img className='cat-logo' src='https://photobooket.s3.amazonaws.com/a03e8cefc38f4a9bb210ba8085e01f36.png'/>Home</Link>
                    <Link style={{color: category == 'Fitness' ? "rgb(172, 59, 97)" : '' }} className='cat-link' to={'/category/Fitness'}> <i style={{color: category == 'Fitness' ? "rgb(172, 59, 97)" : '' }} className="cat-logo-specific fa-xs fa-solid fa-dumbbell"></i> <img className='cat-logo' src='https://photobooket.s3.amazonaws.com/a03e8cefc38f4a9bb210ba8085e01f36.png'/>Fitness</Link>
                    <Link style={{color: category == 'Outdoors' ? "rgb(172, 59, 97)" : '' }} className='cat-link' to={'/category/Outdoors'}><i style={{color: category == 'Outdoors' ? "rgb(172, 59, 97)" : '' }} className="cat-logo-specific fa-xs fa-solid fa-tree"></i><img className='cat-logo' src='https://photobooket.s3.amazonaws.com/a03e8cefc38f4a9bb210ba8085e01f36.png'/>Outdoors</Link>
                    <Link style={{color: category == 'Self-Improvement' ? "rgb(172, 59, 97)" : '' }} className='cat-link' to={'/category/Self-Improvement'}><i style={{color: category == 'Self-Improvement' ? "rgb(172, 59, 97)" : '' }} className="cat-logo-specific fa-xs fa-solid fa-heart"></i> <img className='cat-logo' src='https://photobooket.s3.amazonaws.com/a03e8cefc38f4a9bb210ba8085e01f36.png'/>Self-Improvement</Link>
                    <Link style={{color: category == 'Tech' ? "rgb(172, 59, 97)" : '' }} className='cat-link' to={'/category/Tech'}><i style={{color: category == 'Tech' ? "rgb(172, 59, 97)" : '' }} className="cat-logo-specific fa-xs fa-brands fa-space-awesome"></i><img className='cat-logo' src='https://photobooket.s3.amazonaws.com/a03e8cefc38f4a9bb210ba8085e01f36.png'/>Tech</Link>
                    <Link style={{color: category == 'Other' ? "rgb(172, 59, 97)" : '' }} className='cat-link' to={'/category/Other'}><i style={{color: category == 'Other' ? "rgb(172, 59, 97)" : '' }} className="cat-logo-specific fa-xs fa-solid fa-otter"></i><img className='cat-logo' src='https://photobooket.s3.amazonaws.com/a03e8cefc38f4a9bb210ba8085e01f36.png'/>Other</Link>
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
