from flask import Flask
from flask_pymongo import PyMongo
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()

app.config['SECRET_KEY'] = '85e1dfe6b7'
app.config['MONGO_URI'] = os.getenv('MONGO_URI')

mongo = PyMongo(app)

db = mongo.db