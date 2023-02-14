from fastapi import FastAPI, Response, Request
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, Column, Integer, String
import mysql.connector
Base = declarative_base()
class Student(Base):
    __tablename__ = "Student"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    password = Column(String)
    username = Column(String)
    contact = Column(String)
    schoolCode = Column(String)
class Manager(Base):
    __tablename__ = "Manager"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    password = Column(String)
    username = Column(String)
    contact = Column(String)
    schoolCode = Column(String)

engine = create_engine("mysql+pymysql://root:MCvjStFQVRQQuezriDR6@containers-us-west-111.railway.app:5542/railway")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()




async def shutdown():
    app.db_connection.close()
class UserIn(BaseModel):
    username: str
    contact: str
    password: str
    schoolCode: str
    Identity:str
def validate_username(username: str):
    if len(username) < 3 or len(username) > 10:
        message1 = {
        "message1": 'username must be between 3 to 10 characters'
    }
    else:
        message1={
            "message1":'success'
        }
        
    return message1  
def validate_password(password: str):
    if len(password) < 3 or len(password) > 16:
        message2 = {
        "message2": 'password must be between 3 to 16 characters'
    }
    elif not any(char.isdigit() for char in password):
         message2 = {
        "message2": 'Password must contain at least one digit.'
    }
    elif not any(char.isupper() for char in password):
         message2 = {
        "message2": 'Password must contain at least one uppercase letter.'
    }  
    elif not any(char.islower() for char in password):
         message2 = {
        "message2": 'Password must contain at least one lowercase letter.'
    }
    else:
        message2 = {
        "message2": 'success'
    }
    return message2           

class UserLogin(BaseModel):
    username:str
    password:str
    selectedIdentity:str

@app.post("/register")
async def register(user: UserIn, response: Response):
    # Perform your registration logic here, for example, saving the user to a database
    # ...
    message3=''
    session = SessionLocal()
    existing_user1 = session.query(Student).filter(Student.username == user.username).first()
    if existing_user1:
        message3 = "This username is already taken"
    existing_user2 = session.query(Manager).filter(Manager.username == user.username).first()
    if existing_user2:
        message3 = "This username is already taken"
    db_user1 = Student(username=user.username, contact=user.contact, password=user.password, schoolCode=user.schoolCode)
    db_user2= Manager(username=user.username,contact=user.contact, password=user.password, schoolCode=user.schoolCode)
    if user.Identity=='Student' and not existing_user1:
        session.add(db_user1)
    elif not existing_user2:
        session.add(db_user2)
    session.commit()
    session.close()
    response.set_cookie(key="username", value=user.username)
    response.set_cookie(key="contact", value=user.contact)
    response.set_cookie(key="schoolCode", value=user.schoolCode)
    response.set_cookie(key='Identity',value=user.Identity)
    # Return a success response
    message1=validate_username(user.username)
    message2=validate_password(user.password)
    
    return message1,message2,message3
    


           
        
   
    # {"message": "success"}
@app.post("/login2")
async def login2(user: UserLogin,response: Response):
    # Perform your registration logic here, for example, saving the user to a database
    # ...
    session = SessionLocal()
    db_user = session.query(Student).filter(Student.username == user.username).first()
    session.close()
    if db_user is None:
        return {"message": "user not found, please register first"}
    if db_user.password != user.password:
        return {"message": "incorrect password"}

    response.set_cookie(key="username", value=db_user.username)
    return {"message": "success"}

@app.get("/Homepage")
async def homepage(request: Request):
    # Connect to the database
    conn = mysql.connector.connect(
        host="containers-us-west-111.railway.app",
        user="root",
        password="MCvjStFQVRQQuezriDR6",
        database="railway",
        port=5542
    )

    cursor = conn.cursor()

    # Retrieve the package information for the user
    username = request.cookies.get("username")
    print(username)
    query = f"SELECT * FROM Parcels WHERE Recipient_student='{username}'"
    cursor.execute(query)
    
    parcels = cursor.fetchall()
    column_names = [column[0] for column in cursor.description]
    parcels = [dict(zip(column_names, row)) for row in parcels]
    
    print(parcels[3]['is_issued'])
    for i in range(0,len(parcels)):
        if parcels[i]['is_issued']==1:
            parcels[i]['is_issued']='have issued'
        else:
            parcels[i]['is_issued']='not issued'
    for i in range(0,len(parcels)):
        if parcels[i]['is_deliveried']==1:
            parcels[i]['is_deliveried']='have deliveried'
        else:
            parcels[i]['is_deliveried']='not deliveried'

    # Close the connection to the database
    cursor.close()
    conn.close()

    return {"parcels": parcels}

