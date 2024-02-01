import BookForm from '../BookForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function CreateBook() {
  const navigate = useNavigate()
  const book = {
    title: '',
    synopsis: '',
    category: '',
    cover_image: null,
    private: false
  };

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if(!user) {
      navigate('/home')
    }

  }, [user])

  return (
    <BookForm
      book={book}
      formType="Publish Book"
    />
  );
}
