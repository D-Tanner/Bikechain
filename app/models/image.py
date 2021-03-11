from .db import db


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id"))
    imageUrl = db.Column(db.String(255), nullable=False)

    post = db.relationship("Post", back_populates="images")

    def to_dict(self):
        return {
            "postId": self.postId,
            "imageUrl": self.imageUrl,
            "id": self.id
        }
