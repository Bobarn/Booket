import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import BookForm from '../BookForm';
import { thunkGetAllBooks } from '../../../redux/books';

const EditBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllBooks());
  }, [dispatch, user]);

  const book = useSelector((state) => state.books[bookId]);

  if (!book) return(<></>);

  if(book?.author.id !== user?.id) {
    navigate('/')
  }

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    Object.keys(book).length > 1 && (
      <>
        <BookForm
          book={{
            title: book?.title,
            synopsis: book?.synopsis,
            category: book?.category,
            coverImage: book?.cover,
            coverName: book?.coverName,
            private: book?.private
          }}
          bookId={bookId}
          formType="Edit Book"
        />
      </>
    )
  );
};

export default EditBook;
