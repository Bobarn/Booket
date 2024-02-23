from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class ChatForm(FlaskForm):
    user1Id = IntegerField("User One", validators=[DataRequired()])
    user2Id = IntegerField("User Two", validators=[DataRequired()])
