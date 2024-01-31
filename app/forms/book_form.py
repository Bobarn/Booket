from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField, TextAreaField, FileField, BooleanField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS import ALLOWED_EXTENSIONS


class BookForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(max=35)])
    synopsis = TextAreaField("Synopsis", validators=[DataRequired()])
    cover_image = FileField("Cover Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    private = BooleanField("Private Book")
