from fastapi import FastAPI, Response, Request
from pydantic import BaseModel
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from typing import List
import mysql.connector
import os
import ssl
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from datetime import datetime, timedelta, time

from joblib import load

import qrcode
import base64
from io import BytesIO

rf_loaded = load('random_forest_model.joblib')
# set up OAuth2 credentials
Base = declarative_base()


class Address(Base):
    __tablename__ = "Address"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    schoolCode = Column(String)
    address = Column(String)


class ReceivingAppointMent(Base):
    __tablename__ = "ReceivingAppointMent"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    express_tracking_number = Column(String)

    appointment_time = Column(String)


class Student(Base):
    __tablename__ = "Student"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    password = Column(String)
    username = Column(String)
    email = Column(String)
    phoneNo = Column(String)
    schoolCode = Column(String)
    address = Column(String)


class Manager(Base):
    __tablename__ = "Manager"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    password = Column(String)
    username = Column(String)
    email = Column(String)
    phoneNo = Column(String)
    schoolCode = Column(String)
    address = Column(String)
    work_status=Column(Boolean)


class Parcel(Base):
    __tablename__ = "Parcel"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    express_tracking_number = Column(String)
    address = Column(String)
    account_name = Column(String)
    email = Column(String)
    phone_No = Column(String)
    Receiving_schoolCode = Column(String)
    courier = Column(String)
    pickup_status = Column(Boolean)
    order_created_time = Column(String)
    warehouse_time = Column(String)
    expired = Column(Boolean)


engine = create_engine(
    "mysql+pymysql://root:6pY5tRcEwgpWPErp8Qs6@containers-us-west-111.railway.app:5542/railway")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()


async def shutdown():
    app.db_connection.close()

class Modify(BaseModel):
    
    email: str
    phoneNo: str
    uname:str
    schoolCode: str
   
    address: str


class UserIn(BaseModel):
    username: str
    email: str
    phoneNo: str
    password: str
    schoolCode: str
    Identity: str
    address: str
class Status(BaseModel):
    status:bool
    uname:str
    
class Passwordflesh(BaseModel):
    oldpassword:str
    newpassword:str

def validate_username(username: str):
    if len(username) < 3 or len(username) > 10:
        message1 = {
            "message1": 'username must be between 3 to 10 characters'
        }
    else:
        message1 = {
            "message1": 'success'
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
    username: str
    password: str
    selectedIdentity: str


class ParcelForm(BaseModel):
    express_tracking_number: str
    address: str
    account_name: str
    email: str
    phone_No: str
    Receiving_schoolCode: str
    courier: str
    pickup_status: bool
    order_created_time: str
    warehouse_time: str
class ParcelForm2(BaseModel):
    express_tracking_number: str
    address: str
    cookiename: str
    email: str
    phone_No: str
    Receiving_schoolCode: str
    courier: str
    pickup_status: bool
    order_created_time: str
    warehouse_time: str

class Selection(BaseModel):
    time: str
    option: str
    checkedCheckboxes: List[str]
    uname: str


class deleteParcel(BaseModel):
    express_tracking_number: str


class prediction(BaseModel):
    distance: str
    parcelsize: str
    selectedfoggy: bool
    selectedraining: bool

    selectedsnowing: bool
    windlevel: str


@app.post("/register")
async def register(user: UserIn, response: Response):
    # Perform your registration logic here, for example, saving the user to a database
    # ...
    message3 = ''
    session = SessionLocal()
    existing_user1 = session.query(Student).filter(
        Student.username == user.username).first()
    if existing_user1:
        message3 = "This username is already taken"
    existing_user2 = session.query(Manager).filter(
        Manager.username == user.username).first()
    if existing_user2:
        message3 = "This username is already taken"
    db_user1 = Student(username=user.username, email=user.email,
                       phoneNo=user.phoneNo, password=user.password, schoolCode=user.schoolCode)
    db_user2 = Manager(username=user.username, email=user.email,
                       phoneNo=user.phoneNo, password=user.password, schoolCode=user.schoolCode)
    if user.Identity == 'Student' and not existing_user1:
        session.add(db_user1)
    elif not existing_user2:
        session.add(db_user2)
    session.commit()
    session.close()
    # session1 = SessionLocal()
    # db_address = Address(schoolCode=user.schoolCode,address=user.address)
    # existing_schoolcode = session1.query(Address).filter(
    #     Address.schoolCode == user.schoolCode).first()
    # if existing_schoolcode:
    #     message3 = "This schoolcode is already taken"
    # else:
    #     session1.add(db_address)
    #     session1.commit()
    #     session1.close()
    response.set_cookie(key="username", value=user.username)
    response.set_cookie(key="email", value=user.email)
    response.set_cookie(key="phoneNo", value=user.phoneNo)
    response.set_cookie(key="schoolCode", value=user.schoolCode)
    response.set_cookie(key='Identity', value=user.Identity)
    response.set_cookie(key='address', value=user.address)
    # Return a success response
    message1 = validate_username(user.username)
    message2 = validate_password(user.password)

    return message1, message2, message3

    # {"message": "success"}


@app.post("/login2")
async def login2(user: UserLogin, response: Response):

    session = SessionLocal()
    db_user1 = session.query(Student).filter(
        Student.username == user.username).first()
    db_user2 = session.query(Manager).filter(
        Manager.username == user.username).first()

    if user.selectedIdentity == "Student" and (db_user1 is None or db_user1.password != user.password):
        return {"message": "Student credential matches failed, please check and try again!"}
    elif user.selectedIdentity == "Manager" and (db_user2 is None or db_user2.password != user.password):
        return {"message": "Manager credential matches failed, please check and try again!"}

    if user.selectedIdentity == "Student":
        response.set_cookie(key="username", value=db_user1.username)
        response.set_cookie(key="email", value=db_user1.email)
        response.set_cookie(key="address", value=db_user1.address)
        response.set_cookie(key="schoolCode", value=db_user1.schoolCode)
        response.set_cookie(key="phoneNo", value=db_user1.phoneNo)

        print(db_user1.username)
        username = db_user1.username

        parcels = session.query(Parcel).filter(
            Parcel.account_name == username).all()
       
        for parcel in parcels:
            
            warehouse_time = parcel.warehouse_time
            current_time = datetime.now()
            warehouse_time = datetime.combine(warehouse_time, time(0, 0))
            if current_time - warehouse_time > timedelta(days=3):
                parcel_id = parcel.id
                print(parcel_id)
                session.query(Parcel).filter(Parcel.express_tracking_number == parcel.express_tracking_number).update({Parcel.expired: True})
                sender = '19201346zcx@gmail.com'
                recipient = parcel.email
                subject = 'Delay Notice Email'
                body = f'Your package is stack out over 3 days!its tracking number is {parcel.express_tracking_number}'
                # Create a multipart message object and attach the body of the email
                msg = MIMEMultipart()
                msg.attach(MIMEText(body, 'plain'))
        
                # Set the sender, recipient, subject, and body of the email
                msg['From'] = sender
                msg['To'] = recipient
                msg['Subject'] = subject
        
                smtp_server = 'smtp.gmail.com'
                smtp_port = 587
                smtp_username = '19201346zcx@gmail.com'
                smtp_password = 'ketioiiksxrbcwpi'
                server = smtplib.SMTP(smtp_server, smtp_port)
                server.starttls()
                server.login(smtp_username, smtp_password)
        
                # Send the email and close the connection to the SMTP server
                server.sendmail(sender, recipient, msg.as_string())
                server.quit()
        session.commit()
        session.close()
    else:
        schoolCode = db_user2.schoolCode
        parcels = session.query(Parcel).filter(
            Parcel.Receiving_schoolCode == schoolCode).all()
        for parcel in parcels:
            print(parcel)
            warehouse_time = parcel.warehouse_time
            current_time = datetime.now()
            warehouse_time = datetime.combine(warehouse_time, time(0, 0))
            if current_time - warehouse_time > timedelta(days=3):
                parcel_id = parcel.id
                print(parcel_id)
                session.query(Parcel).filter(Parcel.express_tracking_number == parcel.express_tracking_number).update({Parcel.expired: True})
        response.set_cookie(key="username", value=db_user2.username)
        response.set_cookie(key="email", value=db_user2.email)
        response.set_cookie(key="address", value=db_user2.address)
        response.set_cookie(key="schoolCode", value=db_user2.schoolCode)
        response.set_cookie(key="phoneNo", value=db_user2.phoneNo)
        session.commit()
        session.close()
    response.set_cookie(key='Identity', value=user.selectedIdentity)

    return {"message": "success"}


@app.get("/Homepage")
async def homepage2(request: Request):
    conn = mysql.connector.connect(
        host="containers-us-west-111.railway.app",
        user="root",
        password="6pY5tRcEwgpWPErp8Qs6",
        database="railway",
        port=5542
    )

    cursor = conn.cursor()

    # Retrieve the package information for the user
    schoolCode = request.cookies.get("schoolCode")
    query1 = f"SELECT * FROM Manager WHERE schoolCode='{schoolCode}'"
    cursor.execute(query1)
    managers = cursor.fetchall()
    column_names = [column[0] for column in cursor.description]
    managers = [dict(zip(column_names, row)) for row in managers]

    cursor = conn.cursor()

    # Retrieve the package information for the user
    username = request.cookies.get("username")
    query1 = f"SELECT * FROM Parcel WHERE account_name='{username}'"
    cursor.execute(query1)
    parcels = cursor.fetchall()
    column_names = [column[0] for column in cursor.description]
    parcels = [dict(zip(column_names, row)) for row in parcels]

    if parcels is None:
        return {'parcels': 'No parcels about you'}
    else:
        for i in range(0, len(parcels)):
            if parcels[i]['pickup_status'] == 1:
                parcels[i]['pickup_status'] = 'have deliveried'
            else:
                parcels[i]['pickup_status'] = 'not deliveried'
        for i in range(0, len(parcels)):
            if parcels[i]['expired'] == 1:
                parcels[i]['expired'] = 'Delayed'
            elif parcels[i]['expired'] == 0:
                parcels[i]['expired'] = 'Normal'

    cursor.close()
    conn.close()

    p = f"{parcels}"

    imgs = []
    for i in range(0, len(parcels)):
        qr = qrcode.QRCode(box_size=10, border=4)
        qr.add_data(
            f"http://100.77.66.121:3000/packages?express_tracking_number={parcels[i]['express_tracking_number']}&account_name={parcels[i]['account_name']}")
        img = qr.make_image(fill_color="black", back_color="white")

        buffered = BytesIO()
        img.save(buffered)
        img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
        img_data_uri = f"data:image/png;base64,{img_base64}"

        imgs.append(img_data_uri)
        parcels[i]["QRcode"] = imgs[i]

    return {"managers": managers, "parcels": parcels}


@app.post("/test3")
async def delete(parcel: ParcelForm2, response: Response):
    message = '1'
    session = SessionLocal()
    existing_parcel = session.query(Parcel).filter(
        Parcel.express_tracking_number == parcel.express_tracking_number.replace(" ", '')).first()
    tracking_number = parcel.express_tracking_number.replace(" ", '')
   
    if existing_parcel:
        if existing_parcel.account_name == parcel.cookiename:
            print(existing_parcel.account_name)
            parcel_express_tracking_number = parcel.express_tracking_number.replace(
            " ", '')
            print(parcel_express_tracking_number)
            query1 = text(
            f"DELETE FROM ReceivingAppointMent WHERE express_tracking_number='{parcel_express_tracking_number}'")
            query2 = text(
            f"DELETE FROM Parcel WHERE express_tracking_number='{parcel_express_tracking_number}'")
            session.execute(query2)
            print(session.execute(query2))
            session.execute(query1)
            session.commit()
            session.close()
    # Retrieve the package information for the user
            message = "You have picked your parcel"
        else:
            message = "It's not your parcel!"        
    else:
        message = "Non-existing parcel"

    return message
   
    


@app.get("/packages")
async def packagesqr(request: Request):
    # Connect to the database
    conn = mysql.connector.connect(
        host="containers-us-west-111.railway.app",
        user="root",
        password="6pY5tRcEwgpWPErp8Qs6",
        database="railway",
        port=5542
    )

    cursor = conn.cursor()

    # Retrieve the package information for the user
    username = request.cookies.get("username")
    query1 = f"SELECT * FROM Parcel WHERE account_name='{username}'"
    cursor.execute(query1)
    parcels = cursor.fetchall()
    column_names = [column[0] for column in cursor.description]
    parcels = [dict(zip(column_names, row)) for row in parcels]

    if parcels is None:
        return {'parcels': 'No parcels about you'}
    else:
        for i in range(0, len(parcels)):
            if parcels[i]['pickup_status'] == 1:
                parcels[i]['pickup_status'] = 'have deliveried'
            else:
                parcels[i]['pickup_status'] = 'not deliveried'
        

    # Close the connection to the database
    cursor.close()
    conn.close()

    return {"parcels": parcels}


@app.get('/Mhomepage')
async def homepage(request: Request):
    # Connect to the database
    conn = mysql.connector.connect(
        host="containers-us-west-111.railway.app",
        user="root",
        password="6pY5tRcEwgpWPErp8Qs6",
        database="railway",
        port=5542
    )

    cursor = conn.cursor()

    # Retrieve the package information for the user
    schoolcode = request.cookies.get("schoolCode")

    query = f"SELECT * FROM Parcel WHERE Receiving_schoolCode='{schoolcode}'"
    cursor.execute(query)

    parcels = cursor.fetchall()
    column_names = [column[0] for column in cursor.description]
    parcels = [dict(zip(column_names, row)) for row in parcels]
    if parcels is None:
        return {'parcels': 'No parcels about you'}
    else:
        for i in range(0, len(parcels)):
            if parcels[i]['pickup_status'] == 1:
                parcels[i]['pickup_status'] = 'have deliveried'
            elif parcels[i]['pickup_status'] == 0:
                parcels[i]['pickup_status'] = 'not deliveried'
        for i in range(0, len(parcels)):
            if parcels[i]['expired'] == 1:
                parcels[i]['expired'] = 'Delayed'
            elif parcels[i]['expired'] == 0:
                parcels[i]['expired'] = 'Normal'

    # Close the connection to the database
    cursor.close()
    conn.close()

    return {"parcels": parcels}


@app.post('/test2')
async def test(parcel: ParcelForm, response: Response):

    message3 = ''
    session = SessionLocal()
    existing_parcel = session.query(Parcel).filter(
        Parcel.express_tracking_number == parcel.express_tracking_number).first()

    if existing_parcel is None:
        message3 = 'gg'
        db_parcel = Parcel(express_tracking_number=parcel.express_tracking_number,
                           address=parcel.address,
                           account_name=parcel.account_name,
                           email=parcel.email,
                           phone_No=parcel.phone_No,
                           Receiving_schoolCode=parcel.Receiving_schoolCode,
                           courier=parcel.courier,
                           pickup_status=parcel.pickup_status,
                           order_created_time=parcel.order_created_time,
                           warehouse_time=parcel.warehouse_time
                           )
        session.add(db_parcel)
        session.commit()
        session.close()
        response.set_cookie(key="express_tracking_number",
                            value=parcel.express_tracking_number)
        response.set_cookie(key="address", value=parcel.address)
        response.set_cookie(key="account_name", value=parcel.account_name)
        response.set_cookie(key="email", value=parcel.email)
        response.set_cookie(key="phoneNo", value=parcel.phone_No)
        response.set_cookie(
            key="schoolCode", value=parcel.Receiving_schoolCode)
        response.set_cookie(key='courier', value=parcel.courier)
        response.set_cookie(key='pickup_status', value=parcel.pickup_status)
        response.set_cookie(key='order_created_time',
                            value=parcel.order_created_time)
        response.set_cookie(key='warehouse_time', value=parcel.warehouse_time)
        # Define the sender, recipient, subject, and body of the email
        sender = '19201346zcx@gmail.com'
        recipient = parcel.email
        subject = 'Pick Notice Email'
        body = f'Your package is coming!its tracking number is {parcel.express_tracking_number}'
        # Create a multipart message object and attach the body of the email
        msg = MIMEMultipart()
        msg.attach(MIMEText(body, 'plain'))

        # Set the sender, recipient, subject, and body of the email
        msg['From'] = sender
        msg['To'] = recipient
        msg['Subject'] = subject

        smtp_server = 'smtp.gmail.com'
        smtp_port = 587
        smtp_username = '19201346zcx@gmail.com'
        smtp_password = 'ketioiiksxrbcwpi'
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)

        # Send the email and close the connection to the SMTP server
        server.sendmail(sender, recipient, msg.as_string())
        server.quit()

    # Return a success response

        return message3

    else:
        message3 = "This parcel have already existed"
        return message3


@app.post("/Homepage")
async def test(selection: Selection, response: Response):
    session = SessionLocal()
    db_parcel = ReceivingAppointMent(express_tracking_number=selection.checkedCheckboxes,


                                     appointment_time=selection.time
                                     )
    

    session.add(db_parcel)
    session.commit()
    session.close()
    sender = '19201346zcx@gmail.com'
    recipient = selection.option

    subject = 'Appointment Email'
    body = f' {selection.uname} will coming for parcels A student is scheduled to pick up the package at {selection.time} . The tracking number is {selection.checkedCheckboxes}'
    # Create a multipart message object and attach the body of the email
    msg = MIMEMultipart()
    msg.attach(MIMEText(body, 'plain'))

    # Set the sender, recipient, subject, and body of the email
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject

    # Connect to the SMTP server and authenticate with your email and password
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_username = '19201346zcx@gmail.com'
    smtp_password = 'ketioiiksxrbcwpi'
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    server.login(smtp_username, smtp_password)

    # Send the email and close the connection to the SMTP server
    server.sendmail(sender, recipient, msg.as_string())
    server.quit()


@app.post("/predict")
async def predict(prediction: prediction, response: Response):
    distance = prediction.distance
    selectedraining = prediction.selectedraining
    selectedfoggy = prediction.selectedfoggy
    selectedsnowing = prediction.selectedsnowing
    parcelsize = prediction.parcelsize
    windlevel = prediction.windlevel
    pred = rf_loaded.predict(
        [[distance, selectedraining, windlevel, parcelsize, selectedfoggy, selectedsnowing]])
    print(f"pred: {pred}")
    return {"predict": pred[0]}
@app.post("/Homepage2")
async def test(student:Modify, response: Response):
     session = SessionLocal()
     session.query(Student).filter(Student.username == student.uname).update({Student.email:student.email})
     session.query(Student).filter(Student.username == student.uname).update({Student.phoneNo:student.phoneNo})
     session.query(Student).filter(Student.username == student.uname).update({Student.schoolCode:student.schoolCode})
     session.query(Student).filter(Student.username == student.uname).update({Student.address:student.address})
     session.commit()
     session.close()
     response.set_cookie(key="email", value=student.email)
     response.set_cookie(key="schoolCode", value=student.schoolCode)
     response.set_cookie(key="address", value=student.address)
     response.set_cookie(key="phoneNo", value=student.phoneNo)
@app.post("/Homepage3")
async def test(passwordflesh:Passwordflesh, response: Response, request: Request):
    session = SessionLocal()
    username = request.cookies.get("username")
    if Student.username == username and Student.password == passwordflesh.oldpassword:
        session.query(Student).filter(Student.username == username and Student.password == passwordflesh.oldpassword).update({Student.password:passwordflesh.newpassword})
    else:
        message="your current password is wrong, try again!"
    session.commit()
    session.close() 
    response.set_cookie(key="password", value=passwordflesh.newpassword)
    message="your password reset successfully"
    return message
@app.post("/statusset")
async def register(status:Status, response: Response):
     session = SessionLocal()
     session.query(Manager).filter(Manager.username ==status.uname).update({Manager.work_status:status.status})
     session.commit()
     session.close()
     response.set_cookie(key="username", value=status.uname)
     response.set_cookie(key="status", value=status.status)
@app.get("/statusset")
async def register(request:Request):
    conn = mysql.connector.connect(
        host="containers-us-west-111.railway.app",
        user="root",
        password="6pY5tRcEwgpWPErp8Qs6",
        database="railway",
        port=5542
    )

    cursor = conn.cursor()

    # Retrieve the package information for the user
    username = request.cookies.get("username")
    workstatus=request.cookies.get("status")

    query = f"SELECT * FROM Manager WHERE Receiving_schoolCode='{username}' and work_status={workstatus}"
    cursor.execute(query)

    total = cursor.fetchall()
    column_names = [column[0] for column in cursor.description]
    total = [dict(zip(column_names, row)) for row in total]
    cursor.close()
    conn.close()
    return {"total": total}
   
     