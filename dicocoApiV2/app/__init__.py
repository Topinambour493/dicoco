from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import create_engine, URL
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_cors import CORS

from .config import Config

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(app)
    migrate = Migrate(app, db)
    app.config.from_object(Config)
    engine =create_engine(Config.SQLALCHEMY_DATABASE_URI)
    app.session = scoped_session(sessionmaker(bind=engine))

    db.init_app(app)

    with app.app_context():
        from . import routes, models, commands  # Importer routes et modèles
        db.create_all()

    return app
