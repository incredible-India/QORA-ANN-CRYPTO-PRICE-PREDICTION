var bnws = new WebSocket("wss://stream.binance.com:9443/ws/bnbusdt@ticker");

var inrPriceToDoller = 81.85;



var pricaeArrayForchart = new Array();





bnws.onopen = (event)=>{

    console.log("binance conncetion",event);

   

}

bnws.addEventListener('message', (event) => {
    //event.data  contains the message


    //avarage price
    document.getElementById("bnbprice").innerText = '₹ ' + ((JSON.parse(event.data).w)*inrPriceToDoller).toFixed(4);

//chart.....
    pricaeArrayForchart.push(((JSON.parse(event.data).w)*inrPriceToDoller).toFixed(4));
    bnbupdateChart(pricaeArrayForchart);


    ///end

    document.getElementById("bnbprc").innerText = '₹ ' + ((JSON.parse(event.data).w)*inrPriceToDoller).toFixed(4);
    document.getElementById("bnbbtcpercentchange").innerText =   (JSON.parse(event.data).P) + '%';
    document.getElementById("bnbprch").innerText = '₹ ' + ((JSON.parse(event.data).p)*inrPriceToDoller).toFixed(4) 
    document.getElementById("bnbblow").innerText = ' ₹ ' + ((JSON.parse(event.data).l)*inrPriceToDoller).toFixed(4) 
    document.getElementById("bnbbhigh").innerText = '₹ ' + ((JSON.parse(event.data).h)*inrPriceToDoller).toFixed(4) 
    document.getElementById("bnbbopenprc").innerText = '₹ ' + ((JSON.parse(event.data).o)*inrPriceToDoller).toFixed(4) 
    document.getElementById("bnbbbid").innerText = '₹ ' + ((JSON.parse(event.data).b)*inrPriceToDoller).toFixed(4) 
    document.getElementById("bnbbask").innerText = '₹ ' + ((JSON.parse(event.data).a)*inrPriceToDoller).toFixed(4) 
    document.getElementById("bnbbbidq").innerText = (JSON.parse(event.data).B)
    document.getElementById("bnbbaskq").innerText = (JSON.parse(event.data).A)


 
   
});
// WebSocket connection could not be established
bnws.addEventListener('error', (event) => {
   
    console.log('binance connection could not be established.',event);
   
});

// WebSocket connectionsending the message for the server side


// WebSocket connection close
bnws.addEventListener('close', (event) => {
    
    
    console.log('binance connection closed.',event);
  
});





//creating the live chart for the div
function bnbupdateChart(bpdata){


	priceChart.data.datasets[0].data[0] = bpdata[0]
	priceChart.data.datasets[0].data[1]= bpdata[1]
	priceChart.data.datasets[0].data[2] = bpdata[2]
	priceChart.data.datasets[0].data[3] = bpdata[3]
	priceChart.data.datasets[0].data [4]= bpdata[4]
	priceChart.data.datasets[0].data [5]= bpdata[5]
	

 
    priceChart.update();

	if(bpdata.length > 7){
		bpdata.shift();
	}


}

const ctx = document.getElementById('myChartbnb');

var priceChart =new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1 sec', '2 sec', '3 sec', '4 sec', '5 sec', '6 sec'].reverse(),
    datasets: [{
      label: 'Live Price',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      borderColor: 'orangered' // Change the color here
    }]
  },
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeOutExpo',
        from: 1,
        to: 0,
        loop: true
      }
    },
   
  }
});

////////////////////////////////