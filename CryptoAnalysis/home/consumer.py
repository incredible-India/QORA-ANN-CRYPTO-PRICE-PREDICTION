#all the websocket login will be wriiten here..

from channels.consumer import SyncConsumer
from channels.exceptions import StopConsumer
import pandas as pd
import json

#creating class for the websocket conncetion and r/w operations
bitcoinDict = {"w":[],"o":[],"h":[],"l":[],"v":[],"q":[]}
ethcoinDict = {"w":[],"o":[],"h":[],"l":[],"v":[],"q":[]}
bnbcoinDict = {"w":[],"o":[],"h":[],"l":[],"v":[],"q":[]}
class WebSocketOperations(SyncConsumer):
    def websocket_connect(self,event):


        # Called when a WebSocket connection is established
        self.send({"type":'websocket.accept'})

       

        print('web socket connected successfully',event)




    #receving from the soket channels

    def websocket_receive(self,event):
       # print('msg from client',event)

        #for the bitcoin saving the data in csv


      
      
      if(json.loads(event['text'])['s'] == "BTCUSDT"):
        bitcoinDict["w"].append(json.loads(event['text'])['w'])
        bitcoinDict["o"].append(json.loads(event['text'])['o'])
        bitcoinDict["h"].append(json.loads(event['text'])['h'])
        bitcoinDict["l"].append(json.loads(event['text'])['l'])
        bitcoinDict["v"].append(json.loads(event['text'])['v'])
        bitcoinDict["q"].append(json.loads(event['text'])['q'])
    
        df = pd.DataFrame(bitcoinDict)
    
        df.to_csv("home\\Datasets\\bitcoin.csv",index=False,mode="a",header=False)



      
        #for the etherrium saving the data in csv

        #sednign predicted data to the client
   
     
     



      
      if(json.loads(event['text'])['s'] == "ETHUSDT"):
        ethcoinDict["w"].append(json.loads(event['text'])['w'])
        ethcoinDict["o"].append(json.loads(event['text'])['o'])
        ethcoinDict["h"].append(json.loads(event['text'])['h'])
        ethcoinDict["l"].append(json.loads(event['text'])['l'])
        ethcoinDict["v"].append(json.loads(event['text'])['v'])
        ethcoinDict["q"].append(json.loads(event['text'])['q'])

        df2 = pd.DataFrame(ethcoinDict)

        df2.to_csv("home\\Datasets\\ethcoin.csv",index=False,mode='a',header=False)

    

    #for the binance
      if(json.loads(event['text'])['s'] == "BNBUSDT"):
      
        bnbcoinDict["w"].append(json.loads(event['text'])['w'])
        bnbcoinDict["o"].append(json.loads(event['text'])['o'])
        bnbcoinDict["h"].append(json.loads(event['text'])['h'])
        bnbcoinDict["l"].append(json.loads(event['text'])['l'])
        bnbcoinDict["v"].append(json.loads(event['text'])['v'])
        bnbcoinDict["q"].append(json.loads(event['text'])['q'])
    
        df3 = pd.DataFrame(bnbcoinDict)
    
        df3.to_csv("home\\Datasets\\bnbcoin.csv",index=False,mode='a',header=False)
    


    #diconnecting the websocket

    def websocket_disconnect(self,event):
        print("websocket discconetd")
        raise StopConsumer();
