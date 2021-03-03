from .db import db

class Ride(db.Model):
  __tablename__ = "rides"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey("users.id"))
  title = db.Column(db.String(100), nullable=False)
  content = db.Column(db.Text, nullable=True)
  startTime = db.Column(db.DateTime, nullable=False)
  endTime = db.Column(db.DateTime, nullable=False)
  latitude = db.Column(db.Float, precision=64, nullable=False)
  longitude = db.Column(db.Float, precision=64, nullable=False)
  isLocal = db.Column(db.Boolean, nullable=False, default=False)

  posts = db.relationship("Post", cascade="all,delete", back_populates="rides")

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
      "isLocal" = self.isLocal,
      "posts" = [posts.to_dict() for post in self.posts]
    }
