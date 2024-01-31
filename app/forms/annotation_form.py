from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField
from ..api.AWS import ALLOWED_EXTENSIONS


class AnnotationForm(FlaskForm):
    text = StringField("Text", validators=[DataRequired(), Length(max=300)])
