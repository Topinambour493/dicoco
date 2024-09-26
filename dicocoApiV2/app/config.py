import os
from dotenv import load_dotenv
from sqlalchemy import engine, URL
from sqlalchemy.orm import sessionmaker

load_dotenv()


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')

    # Configuration pour MySQL
    SQLALCHEMY_DATABASE_URI = f"mysql+mysqlconnector://{os.getenv('MYSQL_USER')}:{os.getenv('MYSQL_PASSWORD')}@{os.getenv('MYSQL_HOST')}/{os.getenv('MYSQL_DB')}"

    SQLALCHEMY_TRACK_MODIFICATIONS = False
