

//functions
//function for the showing the erro message

function ShowMessage(show,msg,clr){

    document.getElementsByClassName('errcode')[0].style.display = show;
    document.getElementsByClassName('errcode')[0].style.color = clr;
    document.getElementsByClassName('errcode')[0].innerText = msg;
    
}

//function for the connecting the server socekt...


   

    //if any error


//cheking the internet connectivity of user

if(navigator.onLine)
{
    //user is online 
    //dont show the error message
    ShowMessage("none",null);

    //now creating  websocket server connection



    let serverCon = new WebSocket("ws://localhost:8000/ws/crypto")

    //if server connection is established

    serverCon.onopen = (e)=>{

        console.log("conncetion",e);
       
        ShowMessage("block","Server Connection is successfully Established..","green");

        let btcwsocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");
        let ethwsocket = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@ticker");
        let bnbwsocket = new WebSocket("wss://stream.binance.com:9443/ws/bnbusdt@ticker");

        //sending data for thr bitcoin
        btcwsocket.onmessage =(e)=>{
            serverCon.send(e.data)
        }
        //sending data for the etherium
        ethwsocket.onmessage =(e)=>{
            serverCon.send(e.data)
        }
        //sending data for binance
        bnbwsocket.onmessage =(e)=>{
            serverCon.send(e.data)
        }
    }


    // WebSocket connection could not be established
    serverCon.addEventListener('error', (event) => {
        ShowMessage("block","Connection cannot established to the server","red");
        console.log('WebSocket connection could not be established.',event);
       
    });

    // WebSocket connectionsending the message for the server side
    serverCon.addEventListener('message', (event) => {
        //event.data  contains the message
        console.log('receive message',event);

        //sending bitcoin data

       
    });

    // WebSocket connection close
    serverCon.addEventListener('close', (event) => {
        
        ShowMessage("block","Connection closed from the server","red");
        console.log('WebSocket connection closed.',event);
      
    });



    







}else{


//user is offline 
ShowMessage("block","Internet connection lost..","red");

}


// ws.onerror =(e)=>{
     
// }

// ws.onmessage = (event=>{
//     console.log(event.data);
//     document.getElementById("btcprice").innerText = (JSON.parse(event.data).E).toFixed(3);
//     document.getElementsByClassName("eth")[0].innerText = (JSON.parse(event.data).a);

// })


