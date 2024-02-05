import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBooks } from '../../redux/books';
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
    }, [dispatch])

    if(!allBooks) return null
    if(!currUser) navigate('/')
    const booksArray = Object.values(allBooks).filter((book) => book.private != true)

    return (
        <>
        <div id="buffer"></div>
        <div className='main-shelf'>
            <div className='category-main-cont'>
                <Link className='cat-link' to={'/category/Home'}><i className="cat-logo-specific fa-xs fa-solid fa-house-chimney"></i> <img className='cat-logo' src='https://cdn.discordapp.com/attachments/1187515837817557065/1203214115389046844/Screenshot_2024-02-02_214303.png?ex=65d04777&is=65bdd277&hm=895b5d166618ab2a4a64d8e15e3ae9455878e593b7c5ccf6bd3e8dda1d610252&'/>Home</Link>
                <Link className='cat-link' to={'/category/Fitness'}> <i className="cat-logo-specific fa-xs fa-solid fa-dumbbell"></i> <img className='cat-logo' src='https://cdn.discordapp.com/attachments/1187515837817557065/1203214115389046844/Screenshot_2024-02-02_214303.png?ex=65d04777&is=65bdd277&hm=895b5d166618ab2a4a64d8e15e3ae9455878e593b7c5ccf6bd3e8dda1d610252&'/>Fitness</Link>
                <Link className='cat-link' to={'/category/Outdoors'}><i className="cat-logo-specific fa-xs fa-solid fa-tree"></i><img className='cat-logo' src='https://cdn.discordapp.com/attachments/1187515837817557065/1203214115389046844/Screenshot_2024-02-02_214303.png?ex=65d04777&is=65bdd277&hm=895b5d166618ab2a4a64d8e15e3ae9455878e593b7c5ccf6bd3e8dda1d610252&'/>Outdoors</Link>
                <Link className='cat-link' to={'/category/Self-Improvement'}><i className="cat-logo-specific fa-xs fa-solid fa-heart"></i> <img className='cat-logo' src='https://cdn.discordapp.com/attachments/1187515837817557065/1203214115389046844/Screenshot_2024-02-02_214303.png?ex=65d04777&is=65bdd277&hm=895b5d166618ab2a4a64d8e15e3ae9455878e593b7c5ccf6bd3e8dda1d610252&'/>Self-Improvement</Link>
                <Link className='cat-link' to={'/category/Tech'}><i className="cat-logo-specific fa-xs fa-brands fa-space-awesome"></i><img className='cat-logo' src='https://cdn.discordapp.com/attachments/1187515837817557065/1203214115389046844/Screenshot_2024-02-02_214303.png?ex=65d04777&is=65bdd277&hm=895b5d166618ab2a4a64d8e15e3ae9455878e593b7c5ccf6bd3e8dda1d610252&'/>Tech</Link>
                <Link className='cat-link' to={'/category/Other'}><i className="cat-logo-specific fa-xs fa-solid fa-otter"></i><img className='cat-logo' src='https://cdn.discordapp.com/attachments/1187515837817557065/1203214115389046844/Screenshot_2024-02-02_214303.png?ex=65d04777&is=65bdd277&hm=895b5d166618ab2a4a64d8e15e3ae9455878e593b7c5ccf6bd3e8dda1d610252&'/>Other</Link>
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
