from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class MessageForm(FlaskForm):
    chat_id = IntegerField('Chat Id')
    content = StringField('Message Content', validators=[DataRequired(), Length(max=400, message="Message must be less than 400 characters")])
