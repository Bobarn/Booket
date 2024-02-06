import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { thunkDeleteAnnotation } from '../../../redux/annotations';

export default function AnnotationDelete({ annotationId }) {

  const dispatch = useDispatch();
  const {closeModal} = useModal();


  const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(thunkDeleteAnnotation(annotationId))
        closeModal()
    }


  return (
    <div className='annotation-delete-modal'>
      <h2 style={{fontFamily: "Arial"}}>Confirm Delete</h2>
      <p style={{fontFamily: "Arial"}}>Are you sure you want to delete this annotation?</p>

      <div className='annotation-delete-buttons'>
        <button className='delete-annotation' onClick={handleDelete}>Yes, delete this annotation.</button>
        <button className='keep-annotation' onClick={closeModal}>No, keep this annotation.</button>
      </div>
    </div>
  )
}
