import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookTile from '../BookTile/BookTile';
import { thunkGetAllBooks} from '../../redux/books';
import { thunkGetAllUsers } from '../../redux/users';
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
// import EditProfileModal from "../EditProfileModal/EditProfileModal";
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

  if(!currUser) return null;

  const booksArr = Object.values(allBooks);

  const userBooks = currUser?.id == userId ?
  booksArr.filter((book) => book.author.id == userId)
  :
  booksArr.filter((book) => {
    if(book.author.id == userId && book.private == false) {
      return book;
  }})

  return (
    <>
    <div id="buffer"></div>
    <div className="user-page-container">
      <div className="user-profile-container">
        <div className='banner'>
            <img src={user.bannerImage} className='user-banner-image' />
        </div>
        <img src={user.profileImage} className="user-profile-image" />
        <h2 className="user-page-username">{user.username}</h2>

        <div className="users-stats">
          <h3>{user.books} Book(s)      {user.pages} Page(s)</h3>
        </div>
        {/* <OpenModalMenuItem
        itemText={"Edit Profile"}
        modalComponent={<EditProfileModal />}
        /> */}

        <div className="user-joined">
          {`Joined ${new Date(user.joined).getFullYear()}`}
        </div>

      </div>

      <div className="user-books">
        <div className="user-page-about">About Me: <p>{user.about}</p></div>
        <div className="books-container">
          {userBooks.map((book) => (
              <div key={book.id} className='book-tile-container'>
                  <BookTile book={book} currUser={currUser} />
              </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
