import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [about, setAbout] = useState('')
  const [profile_image, setProfile_Image] = useState(null)
  const [banner_image, setBanner_Image] = useState(null)
  // const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorList = {}

    if (password !== confirmPassword) {
      errorList.confirmPassword = "Confirm Password field must be the same as the Password field"
    }

    if(about.length > 300) {
      errorList.about = "About cannot be longer than 300 characters"
    }

    if(username.length > 16 || username.length < 4) {
      errorList.username = "Username must be between 4 and 16 characters"
    }

    if(password.length > 20 || password.length < 8) {
      errorList.password = "Username must be between 8 and 20 characters"
    }

    if(email.length > 255) {
      errorList.email = "Email must be less than 255 characters long"
    }

    if(Object.values(errorList).length > 0) {
      setErrors(errorList);
      return
    }

    const formData = new FormData()
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password)

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
      thunkSignup(formData)
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
          *Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="errors-div">{errors.email && <>{errors.email}</>}</div>

        <label className="label">
          *Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <div className="errors-div">{errors.username && <>{errors.username}</>}</div>

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
        <label className="label">
          *Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="errors-div">{errors.password && <>{errors.password}</>}</div>
        <label className="label">
          *Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="errors-div">
          {errors.confirmPassword && <>{errors.confirmPassword}</>}
        </div>
        <button id="sign-up-submit" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
