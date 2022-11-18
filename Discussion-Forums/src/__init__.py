from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import mysql.connector as mc
import os
app=Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'DATABASE_URL'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
app.config["SECRET_KEY"]="SECRET_KEY"
app.config["DEBUG"]=True
db=SQLAlchemy(app)

# mydb.commit()
# mydb.close()
from src import routes
