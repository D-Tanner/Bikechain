from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


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

follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)



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

  rides = db.relationship("Ride", back_populates="user")
  posts = db.relationship("Post", back_populates="user")
  committed_rides = db.relationship("Ride", secondary="users_committed_rides", back_populates="committed_riders")
  followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("follows", lazy="dynamic"),
        lazy="dynamic"
    )

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
        # "following": self.followers,
      }


class Ride(db.Model):
  __tablename__ = "rides"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey("users.id"))
  title = db.Column(db.String(100), nullable=False)
  content = db.Column(db.Text, nullable=True)
  date = db.Column(db.Date, nullable=False)
  latitude = db.Column(db.Float(precision=20), nullable=False)
  longitude = db.Column(db.Float(precision=20), nullable=False)
  isLocal = db.Column(db.Boolean, nullable=False, default=False)
  level = db.Column(db.String(50), nullable=False)

  user = db.relationship("User", back_populates="rides")
  posts = db.relationship("Post", cascade="all,delete", back_populates="ride")
  committed_riders = db.relationship("User", secondary="users_committed_rides", back_populates="committed_rides")


  def to_dict(self):
    return {
      "title": self.title,
      "userId": self.userId,
      "id": self.id,
      "title": self.title,
      "content": self.content,
      "date": self.date,
      "latitude": self.latitude,
      "longitude": self.longitude,
      "isLocal": self.isLocal,
      "user": self.user.to_dict(),
      "committedRiders": [rider.to_dict() for rider in self.committed_riders],
      "posts": [post.to_dict() for post in self.posts],
    }
