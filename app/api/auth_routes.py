from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from ..config import Config
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.utils import secure_filename
from app.helpers import allowed_file, upload_file_to_s3, \
    validation_errors_to_error_messages

auth_routes = Blueprint('auth', __name__)

@auth_routes.route("/map-token")
def get_react_map_token():
    return {"token": Config.REACT_APP_MAP_TOKEN}


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        following_dict = [following.to_dict() for following in current_user.followers]

        return {"user": current_user.to_dict(),
                "following": following_dict}
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        following_dict = [following.to_dict() for following in user.followers]

        return {"user": user.to_dict(),
                "following": following_dict}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print(form.data)
        profileImageUrl = None
        if 'profileImage' in request.files:
            image = request.files['profileImage']
            image.filename = secure_filename(image.filename)
            profileImageUrl = upload_file_to_s3(image, Config.S3_BUCKET)
        user = User()
        form.populate_obj(user)
        user.profileImageUrl = profileImageUrl
        db.session.add(user)
        db.session.commit()
        login_user(user)
        following_dict = [following.to_dict() for following in user.followers]

        return {"user": user.to_dict(),
                "following": following_dict}
    return {'errors': validation_errors_to_error_messages(form.errors)}

@auth_routes.route('/edit-user/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    user = User.query.get(user_id)

    if 'city' in request.form:
        user.city = request.form['city']
    if 'state' in request.form:
        user.state = request.form['state']
    if 'level' in request.form:
        user.level = request.form['level']

    profileImageUrl = user.profileImageUrl;

    if 'profileImage' in request.files:
        image = request.files['profileImage']
        image.filename = secure_filename(image.filename)
        profileImageUrl = upload_file_to_s3(image, Config.S3_BUCKET)
    elif  request.form['profileImage'] == 'deleted':
        profileImageUrl = None;

    user.profileImageUrl = profileImageUrl
    db.session.commit()

    following_dict = [following.to_dict() for following in user.followers]

    return {"user": user.to_dict(),
            "following": following_dict}




@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
# @auth_routes.route('/signup', methods=['POST'])
# def sign_up():
#     """
#     Creates a new user and logs them in
#     """
#     form = SignUpForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         print(form.data)
#         profileImageUrl = None
#         if 'profileImage' in request.files:
#             image = request.files['profileImage']
#             image.filename = secure_filename(image.filename)
#             profileImageUrl = upload_file_to_s3(image, Config.S3_BUCKET)
#         user = User(
#             username=form.data['username'],
#             email=form.data['email'],
#             password=form.data['password'],
#             city=form.data['city'],
#             state=form.data['state'],
#             level=form.data['level'],
#         )
#         user.profileImage = profileImageUrl
#         db.session.add(user)
#         db.session.commit()
#         login_user(user)
#         following_dict = [following.to_dict() for following in user.followers]

#         return {"user": user.to_dict(),
#                 "following": following_dict}
#     return {'errors': validation_errors_to_error_messages(form.errors)}
