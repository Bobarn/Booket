import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteBook } from '../../redux/books';

export default function BookDelete({ bookId }) {

  const dispatch = useDispatch();
  const {closeModal} = useModal();


  const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(thunkDeleteBook(bookId))
        closeModal()
    }


  return (
    <div className='annotation-delete-modal'>
      <h2 style={{fontFamily: "Arial"}}>Burn this Book</h2>
      <p style={{fontFamily: "Arial"}}>Are you sure you want to toss this into the flames?</p>

      <div className='annotation-delete-buttons'>
        <button className='delete-annotation' onClick={handleDelete}>Yes, delete this book.</button>
        <button className='keep-annotation' onClick={closeModal}>No, keep this book.</button>
      </div>
    </div>
  )
}
