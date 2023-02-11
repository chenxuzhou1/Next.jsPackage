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

@app.post("/register")
async def register(user: UserIn, response: Response):
    # Perform your registration logic here, for example, saving the user to a database
    # ...
    session = SessionLocal()
    db_user = Student(username=user.username, contact=user.contact, password=user.password, schoolCode=user.schoolCode)
    session.add(db_user)
    session.commit()
    session.close()
    response.set_cookie(key="username", value=user.username)
    response.set_cookie(key="contact", value=user.contact)
    response.set_cookie(key="schoolCode", value=user.schoolCode)
    # Return a success response
    message1=validate_username(user.username)
    message2=validate_password(user.password)
    
    return message1,message2
    


           
        
   
    # {"message": "success"}
@app.post("/login2")
async def login2(user: UserLogin,response: Response):
    # Perform your registration logic here, for example, saving the user to a database
    # ...
    response.set_cookie(key="username", value=user.username)
    # Return a success response
    success = {
        "message": "success"
    }
    return success

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
    print(parcels)

    # Close the connection to the database
    cursor.close()
    conn.close()

    return {"parcels": parcels}

