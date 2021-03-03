# from .db import db

# class Following(db.Model):
#   __tabelname__: "Followings"

#   id = db.Column(db.Integer, primary_key=True)
#   follower_id = db.Column(db.Integer, ForeignKey("users.id"))
#   followee_id = db.Column(db.Integer, ForeignKey("users.id"))


#   def to_dict():
#     return {
#       "id": self.id,
#       "follower_id": self.follower_id,
#       "followee_id": self.followee_id
#     }
