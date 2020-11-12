import datetime
import json
from flask import Flask, render_template, request, make_response, jsonify
from pymongo import MongoClient

application = Flask(__name__)


@application.route("/")
def index():
    return render_template("index.html")


@application.route("/login")
def login():
    return render_template("login.html")

@application.route("/getVal", methods=['POST'])
def val():
    id_val = json.loads(request.form['name'])
    client = MongoClient(
        "mongodb+srv://zeus:heSKHiaE0Gnp6324@cluster0.uph2k.mongodb.net/KPIs?retryWrites=true&w=majority")
    db = client.get_database('KPIs')
    records = db.companyData
    try:
        for x in records.find({'url': id_val}):
            return_id = x['url']
            return_name = x['companyName']
            responseobject = {
                'status': 'success',
                'id': return_id,
                'name': return_name,
            }
            client.close()
        return make_response(jsonify(responseobject)), 200
    except Exception as e:
        responseobject = {
            'status': 'fail',
            'message': 'ID unknown'
        }
    return make_response(jsonify(responseobject)), 500

@application.route("/register", methods=['POST'])
def register():
    client = MongoClient(
        "mongodb+srv://zeus:heSKHiaE0Gnp6324@cluster0.uph2k.mongodb.net/KPIs?retryWrites=true&w=majority")
    db = client.get_database('KPIs')
    records = db.userData
    new_register = {
        # catch data
        'firstname': json.loads(request.form['first_name']),
        'lastname': json.loads(request.form['last_name']),
        'email': json.loads(request.form['email']),
        'telNumber': json.loads(request.form['tel']),
        'timestamp': datetime.datetime.now().strftime("%c"),
        'companyID': json.loads(request.form['company']),
    }
    records.insert_one(new_register)
    responseobject = {
        'status': 'success',
    }
    client.close()
    return make_response(jsonify(responseobject)), 200

if __name__ == "__main__":
    application.run(debug=True)
