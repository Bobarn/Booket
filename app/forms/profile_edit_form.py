from flask_wtf import FlaskForm
from wtforms import TextAreaField
from flask_wtf.file import FileField, FileAllowed
from ..api.AWS import ALLOWED_EXTENSIONS


class ProfileEditForm(FlaskForm):
    profile_image = FileField("Profile Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    banner_image = FileField("Banner Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    about = TextAreaField("About")
