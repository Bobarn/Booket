import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import BookTile from '../BookTile/BookTile';
import { thunkGetAllBooks} from '../../redux/books';
import { thunkGetAllUsers } from '../../redux/users';
import { thunkCreateChat } from "../../redux/chats";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./UserPage.css";

export default function UserPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate()

  const user = useSelector((state) => state.users[userId]);
  const currUser = useSelector((state) => state.session.user)
  const allBooks = useSelector((state) => state.books);


  useEffect(() => {
    dispatch(thunkGetAllBooks());
    dispatch(thunkGetAllUsers())
  }, [dispatch]);

  if (!allBooks) return null;

  if (!user) return null;

  if(!currUser) navigate('/');

  const booksArr = Object.values(allBooks);

  const userBooks = currUser?.id == userId ?
  booksArr.filter((book) => book.author.id == userId)
  :
  booksArr.filter((book) => {
    if(book.author.id == userId && book.private == false) {
      return book;
  }})

  const openChat = (id) => {
    const chat = {
      user1Id: currUser.id,
      user2Id: id
    }
    let response = dispatch(thunkCreateChat(chat))
    .then(() => navigate(`/chat/${response.id}`))
  }

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
        <button onClick={openChat(userId)} className="open-chat">Message</button>

        <div className="users-stats">
          <h3>{user.books} Book(s)      {user.pages} Page(s)</h3>
        </div>
        {userId == currUser.id &&
          <OpenModalMenuItem
          itemText={"Edit Profile"}
          modalComponent={<EditProfileModal currUser={currUser} />}
          />
        }

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
