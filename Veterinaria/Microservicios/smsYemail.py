from __future__ import print_function
import time
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from pprint import pprint
import os
import environment
from flask import Flask
from flask import request
from twilio.rest import Client

app=Flask(__name__)

@app.route("/")
def inicio():
    print("entro")
    test=os.environ["prueba"]
    return test

@app.route("/sms")
def sms():
    try:
        account_sid=os.environ["TWILIO_ACCOUNT_SID"]
        auth_token=os.environ["TWILIO_AUTH_TOKEN"]
        client=Client(account_sid,auth_token)
        contenido=request.args.get("message")
        destino=request.args.get("phone")
        message=client.messages.create(
            body=contenido,
            from_="+18655036552",
            to="+57"+destino
        )
        print(message.sid)
        return "Mensaje enviado exitosamente"
    except Exception as e:
        print(e)
        return("ocurrio un error")

@app.route("/email")
def email():
    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = os.environ["SENDINBLUE_API_KEY"]
    destino=request.args.get("correo_destino")
    asunto=request.args.get("asunto")
    mensaje=request.args.get("mensaje")

    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
    subject = asunto
    html_content = "<html><body><h1>"+mensaje+"</h1></body></html>"
    sender = {"name":"John Doe","email":"haroldrocha.tic@ucaldas2020.onmicrosoft.com"}
    to = [{"email":destino,"name":"Jane Doe"}]
   # cc = [{"email":"example2@example2.com","name":"Janice Doe"}]
   # bcc = [{"name":"John Doe","email":"example@example.com"}]
    reply_to = {"email":"haroldrocha.tic@ucaldas2020.onmicrosoft.com","name":"John Doe"}
    headers = {"Some-Custom-Name":"unique-id-1234"}
    params = {"parameter":"My param value","subject":"New Subject"}
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(to=to, reply_to=reply_to, headers=headers, html_content=html_content, sender=sender, subject=subject)

    try:
        api_response = api_instance.send_transac_email(send_smtp_email)
        pprint(api_response)
        return "Correo enviado exitosamente"
    except ApiException as e:
        print("Exception when calling SMTPApi->send_transac_email: %s\n" % e)
        return "Se encontro un error en el envio" 
if __name__=="__main__":
    app.run()

