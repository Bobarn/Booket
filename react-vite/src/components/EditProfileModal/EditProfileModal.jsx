import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditUser } from "../../redux/session";

function EditProfileModal() {
  const dispatch = useDispatch();
  const [about, setAbout] = useState('')
  const [profile_image, setProfile_Image] = useState(null)
  const [banner_image, setBanner_Image] = useState(null)
  // const [imageLoading, setImageLoading] = useState(false);
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

    const serverResponse = await dispatch(
      thunkEditUser(formData)
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div id="sign-up-modal">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form id="sign-up-form" onSubmit={handleSubmit} encType="multipart/form-data">
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
					<textarea value={about} onChange={(e) => setAbout(e.target.value)} className="signup-about"/>
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
      </form>
    </div>
  );
}

export default EditProfileModal;
