from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import mysql.connector as mc
import os
app=Flask(__name__)
# host =  "localhost"
# password = "123!@#Chiru"
# database =  "mydb"
# user = "root"
# mydb = mc.connect(
#         host=str(host),
#         user=str(user),
#         passwd=str(password),
#         database=str(database)
#         )
# mycursor = mydb.cursor(buffered=True)
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://root:Haragopal1!@localhost/data'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
app.config["SECRET_KEY"]="123!@#Chiru"
app.config["DEBUG"]=True
db=SQLAlchemy(app)

# mydb.commit()
# mydb.close()
from src import routes
