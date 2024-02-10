import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeletePage } from '../../redux/pages';
import { useNavigate } from 'react-router-dom';

export default function PageDelete({ pageId }) {

  const dispatch = useDispatch();
  const {closeModal} = useModal();
  const navigate = useNavigate()

  const user = useSelector((state) => state.session.user);

  const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(thunkDeletePage(pageId))
        closeModal()
        navigate(`/users/${user.id}`)
    }


  return (
    <div className='annotation-delete-modal'>
      <h2 style={{fontFamily: "Arial"}}>Tear this Page</h2>
      <p style={{fontFamily: "Arial"}}>Are you sure you want to tear out this page?</p>

      <div className='annotation-delete-buttons'>
        <button className='delete-annotation' onClick={handleDelete}>Yes, delete this page.</button>
        <button className='keep-annotation' onClick={closeModal}>No, keep this page.</button>
      </div>
    </div>
  )
}
