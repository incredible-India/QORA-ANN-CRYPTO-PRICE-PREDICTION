from django.shortcuts import render

from django.db.models import Q

from django.views import View
# Create your views here.

# //Ann model for the bicoin
import home.ANNMODEL.BTCAnnModel as btc
import home.ANNMODEL.ETHAnnModel as eth
import home.ANNMODEL.BNBAnnModel as bnb
import home.ANNMODEL.MakePriceStandardAsIndianRupee as StdBitcoin
#home page starting page

class Index(View):
    def get(self, request):
        return render(request, 'home/index.html');


#for the prediction value

class prediction(View):
    def get(self, request):
        btcp=btc.PrdictPriceBitcoin("home\\ANNMODEL\\bitcoin.csv");
        ethc = eth.PrdictPriceETH("home\\ANNMODEL\\ethcoin.csv")
        bnbc = bnb.PrdictPriceBNB("home\\ANNMODEL\\bnbcoin.csv")

        b=StdBitcoin.BitcoinIndianRupee(btcp)
        e=StdBitcoin.EtheriumIndianRupee(ethc)
        bn=StdBitcoin.BinanceIndianRupee(bnbc)
        
        return render(request, 'home/prediction.html',{"btc":btcp ,'btco':b[0],'btch':b[1],'btcl':b[2],'etho':e[0],'ethh':e[1],'ethl':e[2],'bnbo':bn[0],'bnbh':bn[1],'bnbl':bn[2]});
        # return render(request, 'home/prediction.html',{"btc":btcp ,'btco':btcp[0]*81.5*2*81.5,'btch':btcp[1]*81.5*2*81.5,'btcl':(btcp[2]*81.5*2*81.5),'etho':ethc[0]*81.5*2*81.5,'ethh':ethc[1]*81.5*2*81.5,'ethl':(ethc[2]*81.5*2*81.5),'bnbo':bnbc[0]*81.5*2*81.5,'bnbh':bnbc[1]*81.5*2*81.5,'bnbl':(bnbc[2]*81.5*2*81.5)});

#show the basic information of ANN / oppostion Learning/Future Scope
class AnnModel(View):
    def get(self,request):
        return render(request, 'home/annmodel.html')
#showing the investment and legal terms
class InvestmentAndLegal(View):
    def get(self,request):
        return render(request,'home/investment.html')
#showing the crypto page

class Crypto(View):
    def get(self,request):
        return render(request,'home/crypto.html')