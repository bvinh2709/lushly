from config import app, db
from flask import request
from bson import ObjectId
# from datetime import datetime

@app.route('/')
def index():
    return 'Hello World!'

@app.route('/add_user', methods=['POST'])
def add_user():
    user_data = request.get_json()

    name = user_data.get('name')
    email = user_data.get('email')


    users_collection = db.users
    user = {
            '_id': str(ObjectId()),
            'name': name,
            'email': email
        }

    result = users_collection.insert_one(user)
    return f'User added successfully. User ID: {result.inserted_id}'

if __name__ == '__main__':
    app.run(debug=True)