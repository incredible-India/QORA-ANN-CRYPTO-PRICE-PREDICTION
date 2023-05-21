var bws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");

var inrPriceToDoller = 81.85




//fix info abt btc

document.getElementById('sym').innerText= 'BTC'

///////////////////




bpricaeArrayForchart = new Array();


bws.onopen = (event)=>{

    console.log("btc conncetion",event);

   

}

bws.addEventListener('message', (event) => {
    //event.data  contains the message

   
  
    //avarage price
  document.getElementById("btcprice").innerText = '₹ ' + ((JSON.parse(event.data).w)*inrPriceToDoller).toFixed(4);







	bpricaeArrayForchart.push(((JSON.parse(event.data).w)*inrPriceToDoller).toFixed(4));

	updateChart(bpricaeArrayForchart);

	//chart
//chart.....
//  now fill the details

document.getElementById("btcprc").innerText = '₹ ' + ((JSON.parse(event.data).w)*inrPriceToDoller).toFixed(4);
document.getElementById("btcpercentchange").innerText =   (JSON.parse(event.data).P) + '%';
document.getElementById("prch").innerText = '₹ ' + ((JSON.parse(event.data).p)*inrPriceToDoller).toFixed(4) 
document.getElementById("blow").innerText = ' ₹ ' + ((JSON.parse(event.data).l)*inrPriceToDoller).toFixed(4) 
document.getElementById("bhigh").innerText = '₹ ' + ((JSON.parse(event.data).h)*inrPriceToDoller).toFixed(4) 
document.getElementById("bopenprc").innerText = '₹ ' + ((JSON.parse(event.data).o)*inrPriceToDoller).toFixed(4) 
document.getElementById("bbid").innerText = '₹ ' + ((JSON.parse(event.data).b)*inrPriceToDoller).toFixed(4) 
document.getElementById("bask").innerText = '₹ ' + ((JSON.parse(event.data).a)*inrPriceToDoller).toFixed(4) 
document.getElementById("bbidq").innerText = (JSON.parse(event.data).B)
document.getElementById("baskq").innerText = (JSON.parse(event.data).A)

///end


	///////





});
// WebSocket connection could not be established
bws.addEventListener('error', (event) => {
   
    console.log('btc connection could not be established.',event);
   
});

// WebSocket connectionsending the message for the server side


// WebSocket connection close
bws.addEventListener('close', (event) => {
    
    
    console.log('btc connection closed.',event);
  
});




//chart................................................................

function updateChart(pdata){


	bpriceChart.data.datasets[0].data[0] = pdata[0]
	bpriceChart.data.datasets[0].data[1]= pdata[1]
	bpriceChart.data.datasets[0].data[2] = pdata[2]
	bpriceChart.data.datasets[0].data[3] = pdata[3]
	bpriceChart.data.datasets[0].data [4]= pdata[4]
	bpriceChart.data.datasets[0].data [5]= pdata[5]
	

 
    bpriceChart.update();

	if(pdata.length > 7){
		pdata.shift();
	}


}


const ctxi = document.getElementById('myChartbtc');

var bpriceChart =new Chart(ctxi, {
  type: 'line',
  data: {
	backgroundColor:"red",
    labels: ['1 sec', '2 sec', '3 sec', '4 sec', '5 sec', '6 sec'].reverse(),
    datasets: [{
      label: 'Live Price',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
	  borderColor: 'orange' // Change the color here
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

///////////////////////////////////////////////////