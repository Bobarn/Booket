from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField, TextAreaField, FileField, BooleanField, SelectField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS import ALLOWED_EXTENSIONS


class BookForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(max=35)])
    synopsis = TextAreaField("Synopsis", validators=[DataRequired(), Length(max=350)])
    category = SelectField("Category", validators=[DataRequired(), Length(max=20)], choices=['Home', 'Fitness', 'Outdoors', 'Self-Improvement', 'Tech', 'Other'])
    cover_image = FileField("Cover Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    private = BooleanField("Private Book")
