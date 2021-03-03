from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  profileImageUrl = db.Column(db.String(255), nullable=True)
  city = db.Column(db.String(50), nullable=False)
  state = db.Column(db.String(50), nullable=False)
  level = db.Column(db.String(50), nullable=False)

  rides = db.relationship("Ride", back_populates="users")
  committed_rides = db.relationship("Ride", secondary="users_committed_rides", back_populates="committed_riders")
  following = db.relationship("User", secondary="following")

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
      return {
        "id": self.id,
        "username": self.username,
        "email": self.email,
        "city": self.city,
        "state": self.state,
        "level": self.level,
        "profileImage": self.profileImageUrl,
        "personal_rides": [ride.to_dict() for ride in self.rides],
        "commitments": [commitment.to_dict() for commitment in self.committed_rides],
        "following": [user.to_dict() for user in self.following],
      }


class Ride(db.Model):
  __tablename__ = "rides"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey("users.id"))
  title = db.Column(db.String(100), nullable=False)
  content = db.Column(db.Text, nullable=True)
  startTime = db.Column(db.DateTime, nullable=False)
  endTime = db.Column(db.DateTime, nullable=False)
  latitude = db.Column(db.Float(precision=8), nullable=False)
  longitude = db.Column(db.Float(precision=8), nullable=False)
  isLocal = db.Column(db.Boolean, nullable=False, default=False)

  posts = db.relationship("Post", cascade="all,delete", back_populates="rides")
  committed_riders = db.relationship("User", secondary="users_committed_rides", back_populates="committed_rides")


  def to_dict(self):
    return {
      "title": self.title,
      "userId": self.userId,
      "id": self.id,
      "title": self.title,
      "content": self.content,
      "startTime": self.startTime,
      "endTime": self.endTime,
      "latitude": self.latitude,
      "longitude": self.longitude,
      "isLocal": self.isLocal,
      "committedRiders": [rider.to_dict() for rider in self.committed_riders],
      "posts": [post.to_dict() for post in self.posts]
    }


users_committed_rides = db.Table(
  "users_committed_rides",
    db.Column(
      "userId",
      db.Integer,
      db.ForeignKey("users.id"),
    ),
    db.Column(
      "rideId",
      db.Integer,
      db.ForeignKey("rides.id"),
    )
)

following = db.Table(
  "followings",
    db.Column(
      "user_id",
      db.Integer,
      db.ForeignKey("users.id"),
    ),
    db.Column(
      "following_user_id",
      db.Integer,
      db.ForeignKey("users.id"),
    )
)
