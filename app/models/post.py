from .db import db

class Post(db.Model):
  __tablename__ = "posts"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey("users.id"))
  rideId = db.Columen(db.Integer, db.ForeingKey("rides.id"))
  content = db.Column(db.Text, nullable=True)

  user = db.relationship("User", back_populates="posts")
  images = db.relationship("Image", cascade="all,delete", back_populates="post")

  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "rideId": self.rideId,
      "content": self.content,
      "user": self.user.to_dict(),
      "images": [image.to_dict() for image in self.images],
    }
