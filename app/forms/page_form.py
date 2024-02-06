from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FileField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS import ALLOWED_EXTENSIONS


class PageForm(FlaskForm):
    page_name = StringField("Page Name", validators=[DataRequired(), Length(max=25)])
    caption = TextAreaField("Caption", validators=[DataRequired(), Length(max=300)])
    image = FileField("Page Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
