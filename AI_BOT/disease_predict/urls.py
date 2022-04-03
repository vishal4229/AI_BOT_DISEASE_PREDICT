from django.urls import include,path
from django.conf.urls import url
from disease_predict.views import Disease_prediction,Prediction_question,Available_doctor
urlpatterns = [
    url(r'^disease_predict',Disease_prediction.as_view(),name="Disease_prediction"),
    url(r'^predict_questions',Prediction_question.as_view(),name="Prediction_question"),
    url(r'^available_doctor',Available_doctor.as_view(),name="Prediction_question"),
]