var ews = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@ticker");

var inrPriceToDoller = 81.85


var ethArray =  new Array();

ews.onopen = (event)=>{

    console.log("eth conncetion",event);

   

}

ews.addEventListener('message', (event) => {
    //event.data  contains the message


    //avarage price
    document.getElementById("ethprice").innerText = '₹ ' + ((JSON.parse(event.data).w)*inrPriceToDoller).toFixed(4);


    //chart
    ethArray.push(((JSON.parse(event.data).w)*inrPriceToDoller).toFixed(4));
    ethupdateChart(ethArray);


    ////////////////////////////////
document.getElementById("ethprc").innerText = '₹ ' + ((JSON.parse(event.data).w)*inrPriceToDoller).toFixed(4);

    document.getElementById("ebtcpercentchange").innerText =   (JSON.parse(event.data).P) + '%';
    document.getElementById("eprch").innerText = '₹ ' + ((JSON.parse(event.data).p)*inrPriceToDoller).toFixed(4) 
    document.getElementById("eblow").innerText = ' ₹ ' + ((JSON.parse(event.data).l)*inrPriceToDoller).toFixed(4) 
    document.getElementById("ebhigh").innerText = '₹ ' + ((JSON.parse(event.data).h)*inrPriceToDoller).toFixed(4) 
    document.getElementById("ebopenprc").innerText = '₹ ' + ((JSON.parse(event.data).o)*inrPriceToDoller).toFixed(4) 
    document.getElementById("ebbid").innerText = '₹ ' + ((JSON.parse(event.data).b)*inrPriceToDoller).toFixed(4) 
    document.getElementById("ebask").innerText = '₹ ' + ((JSON.parse(event.data).a)*inrPriceToDoller).toFixed(4) 
    document.getElementById("ebbidq").innerText = (JSON.parse(event.data).B)
    document.getElementById("ebaskq").innerText = (JSON.parse(event.data).A)
    



});
// WebSocket connection could not be established
ews.addEventListener('error', (event) => {
   
    console.log('eth connection could not be established.',event);
   
});

// WebSocket connectionsending the message for the server side


// WebSocket connection close
ews.addEventListener('close', (event) => {
    
    
    console.log('eth connection closed.',event);
  
});





////////////////////////////////////////////////////////////////
function ethupdateChart(ethpdata){


	ethpriceChart.data.datasets[0].data[0] = ethpdata[0]
	ethpriceChart.data.datasets[0].data[1]= ethpdata[1]
	ethpriceChart.data.datasets[0].data[2] = ethpdata[2]
	ethpriceChart.data.datasets[0].data[3] = ethpdata[3]
	ethpriceChart.data.datasets[0].data [4]= ethpdata[4]
	ethpriceChart.data.datasets[0].data [5]= ethpdata[5]
	

 
    ethpriceChart.update();

	if(ethpdata.length > 7){
		ethpdata.shift();
	}


}


const ctxie = document.getElementById('myCharteth');

var ethpriceChart =new Chart(ctxie, {
  type: 'line',
  data: {
	backgroundColor:"red",
    labels: ['1 sec', '2 sec', '3 sec', '4 sec', '5 sec', '6 sec'].reverse(),
    datasets: [{
      label: 'Live Price',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
	  borderColor: 'silver' // Change the color here
    }]
  },
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
   
  }
});