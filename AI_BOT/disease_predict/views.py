import os
import random
from ssl import ALERT_DESCRIPTION_BAD_CERTIFICATE_HASH_VALUE
from django.shortcuts import render
from matplotlib.style import available
from rest_framework.views import APIView
from rest_framework.response import Response
from disease_predict.train_model import Train_model
from disease_predict.test_model import Test_model
from disease_predict.questions import Question
from disease_predict.models import available_room
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html_path = os.path.join(BASE_DIR, 'disease_predict/room.html')

class Disease_prediction(APIView):
    def get(self,request):
        return Response(status=200,data={'hi':'Server Connected'})

    def post(self,request):
        #uncomment when need to train model
        # tm = Train_model() 
        # tm.train_model()
        try:
            input = request.data.get("input")
            print(input)
            input = (37,1,2,130,250,0,1,187,0,3.5,0,0,2)
            if len(input)<13:
                return Response(status=400,data="Data is not sufficient")
            test = Test_model() 
            predict = test.test_model(input)
        except:
            predict = "Error while predicting"
            return Response(status=400,data=predict)
        return Response(status=200,data={'result':[predict]})
    
class Prediction_question(APIView):
    def get(self,request):
        return Response(status=200,data={'questions':Question})
    
class Available_doctor(APIView):
    def get(self,request):
        available_doctors = []
        # a_obj = available_room.objects.filter(is_active=True,online_gt=0)
        # for i in a_obj:
        #     available_doctors.append(i.room_name)
        # return Response(status=200,data={'doctor':available_doctors})
        return Response(status=200,data={'doctor':'vishal_Room'})

    def post(self,request):
        room1=''
        try:
            room1 = request.data.get("room")
            ava_room,created = available_room.objects.get_or_create(room_name=room1)
            if created:
                ava_room.is_active=True
                ava_room.save()
            elif ava_room.is_active!=True:
                ava_room.is_active=True
                ava_room.save()
        except:
            return Response(status=400,data="Error in saving object")
        return Response(status=200,data="Success in saving object")