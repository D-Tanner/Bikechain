# from .db import db

# class Commitment(db.Model):
#   __tablename___ = "commitments"

#   id = db.Column(db.Integer, primary_key = True)
#   userId = db.Column(db.Integer, db.ForeignKey("users.id"))
#   rideId = db.Column(db.Integer, db.ForeingKey("rides.id"))

#   user = db.relationship("User", back_populates="commitments")
#   ride = db.relationhsip("Ride", back_populates="commitments")

#   def to_dict(self):
#     return {
#       "id": self.name,
#       "userId": self.userId,
#       "rideId": self.rideId
#     }
