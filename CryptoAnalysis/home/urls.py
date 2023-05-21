from django.urls import path 
from . import views as ha
urlpatterns = [
  
  path('',ha.Index.as_view(),name="home"),
  path('start/crypto/prediction',ha.prediction.as_view(),name="QORA-ANN"),
  path('show/annmodel',ha.AnnModel.as_view(),name="annmodel"),
  path('show/investment/leagal',ha.InvestmentAndLegal.as_view(),name="investment"),
  path('show/crypto',ha.Crypto.as_view(),name="crypto")

]
