from .db import db

class Commitment(db.Model):
  __tablename___ = "commitments"

  id = db.Column(db.Integer, primary_key = True)
  isCommitted = db.Column(db.Boolean, default=false)
  userId = db.Column(db.Integer, db.ForeignKey("users.id"))
  rideId = db.Columen(db.Integer, db.ForeingKey("rides.id"))
