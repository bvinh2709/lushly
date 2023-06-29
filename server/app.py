from config import app, db, api, bcrypt
from flask import Flask, request, make_response, session
from bson import ObjectId
from flask_restful import Resource
import jwt
# from datetime import datetime

# @app.route('/')
# def index():
#     return 'Hello World!'


# @app.route('/add_user', methods=['POST'])
# def add_user():
#     user_data = request.get_json()

#     name = user_data.get('name')
#     email = user_data.get('email')


#     users_collection = db.users
#     user = {
#             '_id': str(ObjectId()),
#             'name': name,
#             'email': email
#         }

#     result = users_collection.insert_one(user)
#     return f'User added successfully. User ID: {result.inserted_id}'

# --------------------------------------------------------------------------- #
# ----------------------------------- RESTFUL ------------------------------- #

class HomePage(Resource):
    def get(self):
        return {'message':'Hello World'}, 200

class Users(Resource):
    def get(self):
        users_collection = [u for u in db.users.find()]
        return make_response(users_collection, 200)

class UserByID(Resource):
    def get(self, user_id):
        user = db.users.find_one({"_id": user_id})
        if user:
            return make_response(user, 200)
        else:
            return make_response({'message': 'User not Found, please try again'}, 404)

    def patch(self, user_id):
        user = db.users.find_one({"_id": user_id})
        if user:
            updated_data = request.get_json()

            for key in updated_data.keys():
                user[key] = updated_data[key]

            db.users.update_one({"_id": user_id}, {"$set": user})
            return make_response(f'Info of User with ID: {ObjectId(user_id)} has been changed!', 201)
        else:
            return make_response({'message': 'User not Found, please try again'}, 404)

    def delete(self, user_id):
        user = db.users.find_one({"_id": user_id})
        if user:
            db.users.delete_one(user)
            return make_response(f'This user has been deleted!', 204)
        else:
            return make_response({'message': 'User either not Found or was deleted, please try again'}, 404)

class SignUp(Resource):
    def post(self):
        data = request.get_json()

        f_name = data.get('f_name')
        l_name = data.get('l_name')
        email = data.get('email')
        password = data.get('password')

        hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')

        users_collection = db.users
        user = {
                '_id': str(ObjectId()),
                'f_name': f_name,
                'l_name': l_name,
                'email': email,
                '_password': hashed_pw,
            }

        result = users_collection.insert_one(user)
        return make_response(f'User added successfully. User ID: {result.inserted_id}', 201)

class Login(Resource):
    def post(self):
        email = request.get_json().get('email')
        password = request.get_json().get('password')

        user = db.users.find_one({"email": email})
        if not email or not password:
            return {'error': 'Email and password are invalid'}, 400

        if not user:
            return {'error': 'Invalid email or password'}, 404

        hashed_pw = user['_password']

        if not bcrypt.check_password_hash(hashed_pw, password):
            return make_response('Invalid email or password', 401)

        session['user_id'] = str(user['_id'])
        session.permanent = True

        response_data = {
            'message': 'Login successful',
            'user_id': str(user['_id']),
            'user_f_name': user['f_name'],
        }

        return make_response(response_data, 201)

class Logout(Resource):
    def delete(self):
        session.get('user_id') == None

        return {}, 204

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = db.users.find_one({"_id": user_id})
            return make_response(user, 200)

        return make_response('Session expired or user not logged in', 401)

class Products(Resource):
    def get(self):
        products_collection = [p for p in db.products.find()]
        return make_response(products_collection, 200)

    def delete(self):
        result = db.products.delete_many({})

        if result.deleted_count > 0:
            return make_response('All products deleted', 204)
        else:
            return make_response('No products found', 404)

    def post(self):
        data = request.get_json()

        name = data.get('name')
        price = data.get('price')
        image = data.get('image')
        desc = data.get('desc')

        products_collection = db.products

        product = {
                '_id': str(ObjectId()),
                'name': name,
                'price': price,
                'image': image,
                'desc': desc,
            }

        result = products_collection.insert_one(product)
        return make_response(f'Item added successfully. Item ID: {result.inserted_id}', 201)

class ProductByID(Resource):
    def get(self, product_id):
        product = db.products.find_one({"_id": product_id})
        if product:
            return make_response(product, 200)
        else:
            return make_response({'message': 'Product not Found, please try again'}, 404)

    def patch(self, product_id):
        product = db.products.find_one({"_id": product_id})
        if product:
            updated_data = request.get_json()

            for key in updated_data.keys():
                product[key] = updated_data[key]

            db.products.update_one({"_id": product_id}, {"$set": product})
            return make_response(f'Info of Product with ID: {ObjectId(product_id)} has been changed!', 201)
        else:
            return make_response({'message': 'Product not Found, please try again'}, 404)

    def delete(self, product_id):
        product = db.products.find_one({"_id": product_id})
        if product:
            db.products.delete_one(product)
            return make_response(f'This product has been deleted!', 204)
        else:
            return make_response({'message': 'Product either not Found or was deleted, please try again'}, 404)

# ----------------------------------- ROUTES ------------------------------- #
api.add_resource(HomePage, '/')
api.add_resource(Users, '/users')
api.add_resource(UserByID, '/users/<string:user_id>')
api.add_resource(Products, '/products')
api.add_resource(ProductByID, '/products/<string:product_id>')
api.add_resource(SignUp, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

if __name__ == '__main__':
    app.run(debug=True)