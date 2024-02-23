import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditUser } from "../../redux/session";
import './EditProfileModal.css'

function EditProfileModal({currUser}) {
  const dispatch = useDispatch();
  const [about, setAbout] = useState(currUser?.about)
  const [profile_image, setProfile_Image] = useState(null)
  const [banner_image, setBanner_Image] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    if(profile_image) {
      formData.append("profile_image", profile_image)
    }

    if(about){
      formData.append("about", about)
    }

    if(banner_image) {
      formData.append("banner_image", banner_image)
    }

    setLoading(true)

    dispatch(thunkEditUser(formData)).then((res) => {
      if(res) {
        setErrors(res)
      } else {
        setLoading(false)
        closeModal()
      }
    })
  };

  return (
    <div id="edit-modal">
      <h1>Edit Profile</h1>
      {errors.server && <p>{errors.server}</p>}
      <form id="edit-profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="label">
					Profile Image
					<input
            className="file-input"
						type="file"
						accept="image/*"
						onChange={(e) => setProfile_Image(e.target.files[0])}

					/>
				</label>
        <label className="label">
					About
					<textarea value={about} onChange={(e) => setAbout(e.target.value)} className="edit-about"/>
          <div className="errors-div">					{errors.about && (
            <>*{errors.about}</>
          )}</div>
        </label>
        <label className="label">
					Banner Image
					<input
            className="file-input"
						type="file"
						accept="image/*"
						onChange={(e) => setBanner_Image(e.target.files[0])}

					/>
				</label>
        <button id="sign-up-submit" type="submit">Edit Profile</button>
        <div className="loading">
          {loading && <>Loading...</>}
        </div>
      </form>
    </div>
  );
}

export default EditProfileModal;
