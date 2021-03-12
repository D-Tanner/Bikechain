from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CreatePost(FlaskForm):
    userId = IntegerField("userId")
    rideId = IntegerField("userId")
    content = StringField("content", validators=[DataRequired()])
