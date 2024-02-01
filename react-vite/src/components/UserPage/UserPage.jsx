import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookTile from '../BookTile/BookTile';
import { thunkGetAllBooks} from '../../redux/books';
import { thunkGetAllUsers } from '../../redux/users';
import "./UserPage.css";

export default function UserPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const user = useSelector((state) => state.users[userId]);
  const currUser = useSelector((state) => state.session.user)
  const allBooks = useSelector((state) => state.books);


  useEffect(() => {
    dispatch(thunkGetAllBooks());
    dispatch(thunkGetAllUsers())
  }, [dispatch]);

  if (!allBooks) return null;

  if (!user) return null;

  const booksArr = Object.values(allBooks);
  const userBooks = booksArr.filter((book) => book.author.id == userId);


  return (
    <>
      <div className="user-profile-container">
        <div className='banner'>
            <img src={user.bannerImage} className='user-banner-image' />
        </div>
        <img src={user.profileImage} className="user-profile-image" />
        <div className="user-page-username">{user.username}</div>

        <div className="users-stats">
          <div>{user.books} Books</div>
          <div>{user.pages} Pages</div>
        </div>

        <div className="user-page-about">{user.about}</div>
      </div>


      <div className="books-container">
        {userBooks.map((book) => (
            <div key={book.id} className='book-tile-container'>
                <BookTile book={book} currUser={currUser} />
            </div>
        ))}
      </div>
    </>
  );
}
