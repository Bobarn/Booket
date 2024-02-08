from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed
from app.models import User
from ..api.AWS import ALLOWED_EXTENSIONS


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=4, max=16), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email("This field requires a valid email")])
    password = StringField('password', validators=[DataRequired(), Length(min=8, max=20)])
    profile_image = FileField("Profile Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))]) #*Not necessary for sign-up
    banner_image = FileField("Banner Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))]) #*Not necessary for sign-up
    about = TextAreaField("About", validators=[Length(max=300)])
