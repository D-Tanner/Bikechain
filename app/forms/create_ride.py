from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FloatField, DateField
from wtforms.validators import DataRequired


class CreateRide(FlaskForm):
    userId = IntegerField("userId")
    title = StringField("title", validators=[DataRequired()])
    content = StringField("content", validators=[DataRequired()])
    date = DateField("date", validators=[DataRequired()], format='%m-%d-%Y')
    latitude = FloatField("latitude", validators=[DataRequired()])
    longitude = FloatField("longitude", validators=[DataRequired()])
    isLocal = BooleanField("isLocal")
    level = StringField("level")
