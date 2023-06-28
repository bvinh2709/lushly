from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_restful import Api
from flask_bcrypt import Bcrypt
from datetime import timedelta
from flask_session import Session
# import os
# from dotenv import load_dotenv

app = Flask(__name__)

# load_dotenv()

# app.config['MONGO_URI'] = os.getenv('MONGO_URI')
# print(os.getenv('MONGO_URI'))

app.config['SECRET_KEY'] = '85e1dfe6b7'
# app.config['SESSION_TYPE'] = 'filesystem'
app.config['MONGO_URI'] = 'mongodb+srv://lushly:lushly123@cluster0.hggfvko.mongodb.net/lushly?retryWrites=true&w=majority'

app.permanent_session_lifetime = timedelta(days=30)

# Session(app)
mongo = PyMongo(app)
api = Api(app)
bcrypt = Bcrypt(app)
CORS(app)

db = mongo.db