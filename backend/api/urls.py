from django.urls import path
from api.views import BanksApi

urlpatterns = [
    path('banks', view=BanksApi.as_view(), name="banks"),
    path('banks/<int:compensation_code>', view=BanksApi.as_view(), name="bank")
]
