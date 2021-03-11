from flask import Blueprint, jsonify, request, json
from flask_login import login_required
from sqlalchemy import desc, func
from werkzeug.utils import secure_filename

from app.models.user_and_ride import Ride, User
from app.models import db, Post, Image
from ..config import Config

from app.forms import CreateRide, CreatePost
from app.helpers import validation_errors_to_error_messages, allowed_file, upload_file_to_s3
import datetime


ride_routes = Blueprint('rides', __name__)


@ride_routes.route('/')
def get_rides():
    rides = Ride.query.all()
    return {"Rides": [ride.to_dict() for ride in rides]}

@ride_routes.route('/<int:id>')
def get_ride_by_id(id):
    ride = Ride.query.get(id)
    return ride.to_dict()


@ride_routes.route('/new-ride', methods=["POST"])
def create_ride():
    form = CreateRide()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(request.data)
    if form.validate_on_submit():
        ride = Ride()
        print("hello")
        form.populate_obj(ride)
        db.session.add(ride)
        db.session.commit()
        return ride.to_dict()

    return {'errors':  validation_errors_to_error_messages(form.errors)}

@ride_routes.route('/unfollow/<int:follower_id>/<int:followed_id>', methods=["DELETE"])
def unfollow_rider(follower_id, followed_id):
    user = db.session.query(User).get(follower_id)
    user.followers = [user for user in user.followers if user.id != followed_id]
    db.session.commit()

    following_dict = [following.to_dict() for following in user.followers]

    return {"user": user.to_dict(),
            "following": following_dict}


@ride_routes.route('/follow/<int:follower_id>/<int:followed_id>')
def follow_rider(follower_id, followed_id):
    user = db.session.query(User).get(follower_id)
    user2 = db.session.query(User).get(followed_id)
    user.followers.append(user2)
    db.session.commit()

    following_dict = [following.to_dict() for following in user.followers]

    return {"user": user.to_dict(),
            "following": following_dict}

@ride_routes.route('/commit/<int:user_id>/<int:ride_id>')
def commit_to_ride(user_id, ride_id):

    ride = db.session.query(Ride).get(ride_id)
    user = db.session.query(User).get(user_id)
    ride.committed_riders.append(user)
    db.session.commit()

    return ride.to_dict()

@ride_routes.route('/uncommit/<int:user_id>/<int:ride_id>')
def uncommit_to_ride(user_id, ride_id):

    ride = db.session.query(Ride).get(ride_id)
    ride.committed_riders = [user for user in ride.committed_riders if user.id != user_id]
    db.session.commit()

    return ride.to_dict()


@ride_routes.route('/new-post', methods=["POST"])
def create_new_post():
    form = CreatePost()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post()
        form.populate_obj(post)
        db.session.add(post)
        db.session.commit()

        if 'images' in request.files:
            images = request.files.getlist('images')

            for image in images:
                if allowed_file(image.filename):
                    image.filename = secure_filename(image.filename)
                    image_url = upload_file_to_s3(image, Config.S3_BUCKET)
                    image = Image(postId=post.id, imageUrl=image_url)
                    db.session.add(image)
        db.session.commit()
        return post.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}


@ride_routes.route('/update-post/<int:post_id>', methods=["PUT"])
def update_post(post_id):
    post = db.session.query(Post).get(post_id)

    if request.method == "PUT":
        form = CreateProject()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            form.populate_obj(project)
            db.session.commit()

            if 'images' in request.files:
                images = request.files.getlist('images')
                for image in images:
                    if allowed_file(image.filename):
                        image.filename = secure_filename(image.filename)
                        image_url = upload_file_to_s3(image, Config.S3_BUCKET)
                        image = Image(postId=post.id, imageUrl=image_url)
                        db.session.add(image)
            db.session.commit()
            return post.to_dict()

        return {'errors': validation_errors_to_error_messages(form.errors)}

    # elif request.method == "DELETE":
    #     db.session.delete(project)
    #     db.session.commit()
    #     return {'message': 'Delete Successful'}

    return {'message': 'Invalid Route'}
