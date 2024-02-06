import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllBooks } from '../../../redux/books';
import PageForm from '../PageForm'

export default function CreatePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { bookId } = useParams()

  const page = {
    page: '',
    page_name: '',
    caption: '',
    image: null,
    imageName: ''
  };

  const user = useSelector((state) => state.session.user);
  const book = useSelector((state) => state.books[bookId]);



  useEffect(() => {
    if(!user) {
      navigate('/home')
    }
    dispatch(thunkGetAllBooks());
  }, [user])

  if(!book) return null;

  return (
    <PageForm
      page={page}
      bookId={bookId}
      formType="Publish Page"
    />
  );
}
