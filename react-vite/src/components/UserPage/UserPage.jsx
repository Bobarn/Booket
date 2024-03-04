import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import BookTile from '../BookTile/BookTile';
import { thunkGetAllBooks} from '../../redux/books';
import { thunkGetAllUsers } from '../../redux/users';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./UserPage.css";

export default function UserPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate()
  // const [showBooks, setShowYourBooks] = useState(true);
  // const [showPicks, setShowYourPicks] = useState(false);
  // const [showAbout, setShowAbout] = useState(false);

  const user = useSelector((state) => state.users[userId]);
  const currUser = useSelector((state) => state.session.user)
  const allBooks = useSelector((state) => state.books);


  useEffect(() => {
    dispatch(thunkGetAllBooks());
    dispatch(thunkGetAllUsers())
  }, [dispatch]);


  //Functions to show user books, picks, and about in some tabs and then adding and removing classes to show visual effect like fade-in transition
//   function showYourPicks() {
//     setShowYourBooks(false);
//     setShowYourPicks(true);
//     setShowAbout(false)
//     const yourBooksButton = document.getElementById("books-button");
//     const yourBooks = document.getElementById("user-books");
//     const yourPicksButton = document.getElementById("picks-button");
//     const yourPicks = document.getElementById("user-picks");
//     const aboutButton = document.getElementById("about-button");
//     const about = document.getElementById("user-about");
//     yourBooksButton?.classList.remove("using");
//     yourBooks?.classList.remove("showing");
//     aboutButton?.classList.remove("using");
//     about.classList.remove("showing");
//     yourPicksButton?.classList.add("using");
//     yourPicks?.classList.add("showing");
// }

// function showYourBooks() {
//   setShowYourPicks(false);
//   setShowYourBooks(true);
//   setShowAbout(false)
//   const yourBooksButton = document.getElementById("books-button");
//   const yourBooks = document.getElementById("user-books");
//   const yourPicksButton = document.getElementById("picks-button");
//   const yourPicks = document.getElementById("user-picks");
//   const aboutButton = document.getElementById("about-button");
//   const about = document.getElementById("user-about");
//   yourBooksButton?.classList.add("using");
//   yourBooks?.classList.add("showing");
//   aboutButton?.classList.remove("using");
//   about.classList.remove("showing");
//   yourPicksButton?.classList.remove("using");
//   yourPicks?.classList.remove("showing");
// }

// function showUserAbout() {
//   setShowYourPicks(false);
//   setShowYourBooks(false);
//   setShowAbout(true)
//   const yourBooksButton = document.getElementById("books-button");
//   const yourBooks = document.getElementById("user-books");
//   const yourPicksButton = document.getElementById("picks-button");
//   const yourPicks = document.getElementById("user-picks");
//   const aboutButton = document.getElementById("about-button");
//   const about = document.getElementById("user-about");
//   yourBooksButton?.classList.remove("using");
//   yourBooks?.classList.remove("showing");
//   aboutButton?.classList.add("using");
//   about.classList.add("showing");
//   yourPicksButton?.classList.remove("using");
//   yourPicks?.classList.remove("showing");
// }

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

  return (
    <>
    <div id="buffer"></div>
    <div className="fader user-page-container">
      <div className="user-profile-container">
        <div className='banner'>
            <img src={user?.bannerImage} className='user-banner-image' />
        </div>
        <img src={user?.profileImage} className="user-profile-image" />
        <h2 className="user-page-username">{user?.username}</h2>

        <div className="users-stats">
          <h3>{user?.books} Book(s)      {user?.pages} Page(s)</h3>
        </div>
        {/* <div> */}
          {userId == currUser.id &&
            <OpenModalMenuItem
            itemText={"Edit Profile"}
            modalComponent={<EditProfileModal currUser={currUser} />}
            />
          }
        {/* </div> */}

        <div className="user-joined">
          {`Joined ${new Date(user?.joined).getFullYear()}`}
        </div>

      </div>
      <div id="user-books" className="user-books">
        <div className="user-page-about">About Me: <p>{user?.about}</p></div>
        <div className="books-container">
          {userBooks.map((book) => (
              <div key={book.id} className='book-tile-container'>
                  <BookTile book={book} currUser={currUser} />
              </div>
          ))}
        </div>
      </div>

      {/* {showBooks && <div id="user-books" className="user-books">
        <div className="user-page-about">About Me: <p>{user.about}</p></div>
        <div className="books-container">
          {userBooks.map((book) => (
              <div key={book.id} className='book-tile-container'>
                  <BookTile book={book} currUser={currUser} />
              </div>
          ))}
        </div>
      </div>} */}

      {/* {currUser && currUser.id == userId &&
        showPicks && <div id="user-picks" className="user-picks">
        <div className="user-page-about">About Me: <p>{user.about}</p></div>
        <div className="books-container">
          {userBooks.map((book) => (
              <div key={book.id} className='book-tile-container'>
                  <BookTile book={book} currUser={currUser} />
              </div>
          ))}
        </div>
        </div>} */}
      {/* {showAbout && <div id="user-about" className="user-about">
        <div className="user-page-about">About Me: <p>{user.about}</p></div>
        </div>
      } */}
    </div>
    </>
  );
}
