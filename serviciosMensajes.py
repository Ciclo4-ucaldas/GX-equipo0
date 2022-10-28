# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client
from flask import Flask
from flask import request
import variablesEntorno
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app=Flask(__name__)

@app.route("/")
def inicio():
    print("entro")
    #print(os.environ)
    test=os.environ["Test"]
    #print(os.environ)
    return test
@app.route("/sms")
def sms():
    try:
    # Find your Account SID and Auth Token in Account Info
    # and set the environment variables. See http://twil.io/secure
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        contenido=request.args.get("message")
        destino=request.args.get("phone")
        message = client.messages.create(
          body=contenido,
          from_='+18583658743',
          to='+57'+destino
        )
        print(message.sid)
        return "enviado correctamete"
    except Exception as e:
        print(e)
        return "ocurrio un error"

@app.route("/email")
def email():    
    destino=request.args.get("correo_destino")
    asunto=request.args.get("asunto")
    mensaje=request.args.get("mensaje")
    message = Mail(
        from_email='haroldrs130203@gmail.com',
        to_emails=destino,
        subject=asunto,
        html_content=mensaje)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "correo enviado correctamente"
    except Exception as e:
        print(e.message)
        return "error en el envio del correo"
    

if __name__=='__main__':
    app.run()
