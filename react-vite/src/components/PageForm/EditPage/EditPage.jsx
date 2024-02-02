import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllPages } from '../../../redux/pages';
import { thunkGetAllBooks } from '../../../redux/books';
import PageForm from '../PageForm';

const EditPage = () => {
  const navigate = useNavigate();
  const { pageId, bookId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllBooks());
    dispatch(thunkGetAllPages())
  }, [dispatch, user]);

  const book = useSelector((state) => state.books[bookId]);
  const page = useSelector((state) => state.pages[pageId])

  if (!book || !page) return(<></>);

  if(book?.author.id !== user?.id) {
    navigate('/home')
  }

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    Object.keys(page).length > 1 && (
      <>
        <PageForm
          page={{
            caption: page?.caption,
            page_name: page?.page_name,
            image: page?.image,
            imageName: page?.imageName
          }}
          bookId={bookId}
          formType="Edit Page"
          pageId={pageId}
        />
      </>
    )
  );
};

export default EditPage;
