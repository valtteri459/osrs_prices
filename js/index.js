// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

function formatDate(date) {
	var monthNames = [
	  "January", "February", "March",
	  "April", "May", "June", "July",
	  "August", "September", "October",
	  "November", "December"
	];
  
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
  
	return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

function bySortedValue(obj, callback, context) {
  var tuples = [];

  for (var key in obj) tuples.push([key, obj[key]]);

  tuples.sort(function(a, b) {
    return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0
  });

  var length = tuples.length;
  while (length--) callback.call(context, tuples[length][0], tuples[length][1]);
}


function abbreviateNumber(value) {
	if(value == null){value = 0}
    x = value.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
function loading(target){
	target.html(`<div class="center-align">
		<div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-red">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-yellow">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
	</div>`);
}












function getItemByName(data, name){
	var found = false
	$.each(data, function(key,val){
		if(val.name == name){
			found = val;
		}
	});
	return found;
}
function trend_icon(change_origin){
	var chg = change_origin["trend"];
	if(chg =="positive"){
		return "trending_up";
	}else{
		if(chg == "negative"){
			return "trending_down";
		}
		else{
			return "trending_flat";
		}
	}
}

var allItems;


function loadAlchs(min = 0, max = 100000000){
	loading($("#alchAssistant"));
	$.getJSON("names.json", function(shopPrices){
		natPrice = allItems["561"].buy_average;
		var alchables = [];
		$.each(shopPrices, function(key,val){
			citemid = key;
			if(allItems[key] != undefined && allItems[citemid]["buy_average"] != 0 && allItems[citemid]["overall_average"] != 0)
			{
				
				citemAlchVal = Math.floor(val["store"]*0.6);
				alchables[citemid] = citemAlchVal-(allItems[citemid]["buy_average"]+natPrice);
			}
		});
		
		var desired = 20;
		var i = 0;

		var tableRows = "<p>showing items ranging from "+abbreviateNumber(min)+" coins to "+abbreviateNumber(max)+" coins</p><p>current nature rune price: "+abbreviateNumber(allItems["561"].buy_average)+" coins</p><table><thead><th>item</th><th>market price</th><th>gp per alch</th><th>buy limit(4h)</th></thead><tbody>";
		bySortedValue(alchables, function(key, val){
			if(i <= desired){
				if(allItems[key]["buy_average"] < max && allItems[key]["buy_average"] > min){
					tableRows = tableRows+"<tr><td><a class='switchToTab1' href='#"+key+"'>"+allItems[key]["name"]+"</a></td><td>"+abbreviateNumber(allItems[key]["buy_average"])+" coins</td><td>"+abbreviateNumber(val)+" coins</td><td>"+(allItems["limits"][key] || "unlimited")+"</td></tr>";
					i++;
				}
			}
		});
		tableRows = tableRows+"</tbody></table>";
		$("#alchAssistant").html(tableRows);


	});
}
function loadFarms(){
	loading($("#farmAssistant"));
	var herbs = [
		{
			level:9,
			seed:5291,
			herb:199
		},
		{
			level:14,
			seed:5292,
			herb:201
		},
		{
			level:19,
			seed:5293,
			herb:203
		},
		{
			level:26,
			seed:5294,
			herb:205
		},
		{
			level:32,
			seed:5295,
			herb:207
		},
		{
			level:38,
			seed:5296,
			herb:3049
		},
		{
			level:44,
			seed:5297,
			herb:209
		},
		{
			level:50,
			seed:5298,
			herb:211
		},
		{
			level:56,
			seed:5299,
			herb:213
		},
		{
			level:62,
			seed:5300,
			herb:3051
		},
		{
			level:67,
			seed:5301,
			herb:215
		},
		{
			level:73,
			seed:5302,
			herb:2485
		},
		{
			level:79,
			seed:5303,
			herb:217
		},
		{
			level:85,
			seed:5304,
			herb:219
		}
	];
	var end = "<p>ultracompost price(calculated into profits): "+abbreviateNumber(allItems[21483]["buy_average"])+" coins</p><table><thead><tr><th>Seed/price</th><th>Herb/price</th><th>profit per seed</th><th>Level</th></tr></thead><tbody>";
	for(var i = 0;i<herbs.length;i++){
		cherb = herbs[i];
		var earnings = 6.46636195*allItems[cherb.herb]["sell_average"];
		var profit = earnings-allItems[cherb.seed]["buy_average"]-allItems[21483]["buy_average"];
		end = end+"<tr><td><a class='switchToTab1' href='#"+cherb.seed+"'>"+allItems[cherb.seed]["name"]+"</a>/"+abbreviateNumber(allItems[cherb.seed]["buy_average"])+"</td><td><a class='switchToTab1' href='#"+cherb.herb+"'>"+allItems[cherb.herb]["name"]+"</a>/"+abbreviateNumber(allItems[cherb.herb]["sell_average"])+"</td>";
		end = end+"<td>"+abbreviateNumber(Math.round(profit))+" coins</td><td>"+cherb.level+"</td></tr>";
	}
	end = end + "</tbody></table>";
	$("#farmAssistant").html(end);
}













function loadItem(data, itemID){
	document.title=data[itemID].name;
	$("#search").val(data[itemID].name);
	loading($("#putHere"));
	$.getJSON("names.json", function(shopPrices){
		$.getJSON("router.php?a=itemInfo&itemID="+itemID, function(itemData){
			natPrice = allItems["561"].buy_average;

			jinfo	= itemData["jagexInfo"]["item"];
			jgraph	= itemData["jagexGraph"];
			oinfo	= itemData["osbInfo"];
			ograph	= itemData["osbGraph"];
			alch_reward = Math.floor(shopPrices[jinfo["id"]]["store"]*0.6);
			presymbol = "";

			if(allItems[itemID] != undefined && allItems[itemID]["buy_average"] != 0 && allItems[itemID]["overall_average"] != 0)
			{
				
				alch_cost = alch_reward - allItems[itemID]["buy_average"] - natPrice;
			}else{
				if(oinfo["sellingQuantity"] > 10){
					alch_cost = alch_reward - oinfo["buying"] - natPrice;
				}else{
					alch_cost = alch_reward - ograph[0]["buyingPrice"] - natPrice;
				}
			}
			if(alch_cost < 0){
				presymbol = "-"
			}
			alch_cost = abbreviateNumber(Math.abs(alch_cost));

			$("#putHere").html(`<div class='row'>
	              <div class='col s12'>
					<div class='card'>
					  <div class='card-content row'>
						<div class="col m2 hide-on-med-and-down" style="height:100%">
							<img src="https://`+jinfo["icon_large"].substring(7)+`">
						</div>
						<div class="col m10 s12">
							<div class='card-title'>`+data[itemID].name+`</div>
							<p>`+jinfo["description"]+`</p>
							<table>
								<thead>
									<tr>
										<th>osrs price</th>
										<th>osbuddy price</th>
										<th>high alchemy price: </th>
										<th>gp per high alch cast: </th>
										<th>buy avg: </th>
										<th>sell avg: </th>
										<th>overall avg: </th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>`+jinfo["current"]["price"]+` coins</td>
										<td>`+abbreviateNumber(oinfo["overall"])+` coins</td>
										<td>`+abbreviateNumber(alch_reward)+` coins</td>
										<td>`+presymbol+alch_cost+` coins</td>
										<td>`+abbreviateNumber(allItems[itemID]["buy_average"])+` coins</td>
										<td>`+abbreviateNumber(allItems[itemID]["sell_average"])+` coins</td>
										<td>`+abbreviateNumber(allItems[itemID]["overall_average"])+` coins</td>
									</tr>
								</tbody>
							</table>
						</div>
	                  </div>
	                </div>
	                <div class='card'>
	                  <div class='card-content'>
	            		<div class='card-title'>Trends</div>
	                    <table>
	                    	<thead>
	                    		<tr>
	                    			<th>today</th>
	                    			<th>30 day</th>
	                    			<th>90 day</th>
	                    			<th>180 day</th>
	                    		</tr>
	                    	</thead>
	                    	<tbody>
	                    		<tr>
	                    			<td><i class="material-icons">`+trend_icon(jinfo["today"])+`</i> `+jinfo["today"]["price"]+`</td>
	                    			<td><i class="material-icons">`+trend_icon(jinfo["day30"])+`</i> `+jinfo["day30"]["change"]+`</td>
	                    			<td><i class="material-icons">`+trend_icon(jinfo["day90"])+`</i> `+jinfo["day90"]["change"]+`</td>
	                    			<td><i class="material-icons">`+trend_icon(jinfo["day180"])+`</i> `+jinfo["day180"]["change"]+`</td>
	                    		</tr>
	                    	</tbody>
	                    </table>
	                  </div>
	                </div>
					<div class="card">
						<div class="card-content">
							<div class="card-title row">chart timescale: <span style="float:right"><a class="btn" id="week" style="margin-right:15px">1 Week</a><a class="btn" id="2week" style="margin-right:15px">2 weeks</a><a class="btn" id="month" style="margin-right:15px">1 Month</a><a class="btn" id="3month" style="margin-right:15px">3 months</a><a class="btn" id="halfyear">6 months</a></span></div>
						</div>
					</div>
	              	<div class='card'>
	                  <div class='card-content'>
	            		<div class='card-title'>Prices</div>
	                    <canvas id="plotMe" style="width:100%"></canvas><hr/><br/><br/>
						<h5>Raw data</h5>
						<div style="max-height:500px;overflow-y:scroll">
							<div id="priceList"></div>
						</div>
					  </div>
	                </div>
	              
	              	<div class='card'>
	                  <div class='card-content'>
	            		<div class='card-title'>Traded amounts - only OSB users</div>
						<canvas id="saleHistory" style="width:100%"></canvas><hr/><br/><br/>
						<h5>Raw data</h5>
						<div style="max-height:500px;overflow-y:scroll">
							<div id="saleList"></div>
						</div>
	                  </div>
	                </div>
	              </div>
	            </div>
			`);




			var dates = [];

			

			var formattedJagexAverage=[];
			var formattedJagexPrices= [];
			var formattedOsbPrices	= [];
			var formattedOsbSell 	= [];
			var formattedOsbBuy		= [];

			var saleDates 		= [];
			var formattedSells	= [];
			var formattedBuys 	= [];



			$.each(jgraph["average"], function(key,val){
				var keyDate = new Date(parseInt(key));
				dates.push(keyDate);
				formattedJagexAverage.push(val);
			});
			$.each(jgraph["daily"], function(key,val){
				formattedJagexPrices.push(val);
			});
			$.each(dates, function(key, val){
				var dateFound = 0;
				for(i = 0;i<ograph.length;i++){
					var crow = ograph[i];
					var crowDate = new Date(crow["ts"]);
					if(crowDate.toString() == val.toString())
					{
						formattedOsbPrices.push(crow["overallPrice"]);
						formattedOsbSell.push(crow["sellingPrice"]);
						formattedOsbBuy.push(crow["buyingPrice"]);

						saleDates.push(crowDate);
						formattedSells.push(crow["sellingCompleted"]);
						formattedBuys.push(crow["buyingCompleted"]);
						dateFound = 1;
					}
				}
				if(dateFound == 0){
					formattedOsbPrices.push(null);
					formattedOsbSell.push(null);
					formattedOsbBuy.push(null);
				}
			});
			
			//loop through the formatted data and display it in the grids

			//reverse arrays first
			var datesR = dates.slice();
			var formattedJagexAverageR=formattedJagexAverage.slice();
			var formattedJagexPricesR =formattedJagexPrices.slice();
			var formattedOsbPricesR	= formattedOsbPrices.slice();
			var formattedOsbSellR 	= formattedOsbSell.slice();
			var formattedOsbBuyR	= formattedOsbBuy.slice();

			var saleDatesR 		= saleDates.slice();
			var formattedSellsR	= formattedSells.slice();
			var formattedBuysR 	= formattedBuys.slice();
			datesR.reverse();
			formattedJagexAverageR.reverse();
			formattedJagexPricesR.reverse();
			formattedOsbPricesR.reverse();
			formattedOsbSellR.reverse();
			formattedOsbBuyR.reverse();

			saleDatesR.reverse();
			formattedSellsR.reverse();
			formattedBuysR.reverse();

			function differenceValue(cur, previous){
				var difference =  cur-previous;
				if(difference == null){difference = 0}
				if(difference == 0){
					return "<span class='new badge blue' data-badge-caption='coins'>"+abbreviateNumber(difference)+"</span>";
				}else if(difference > 0){
					return "<span class='new badge green' data-badge-caption='coins'>"+abbreviateNumber(difference)+"</span>";
				}else{
					return "<span class='new badge red' data-badge-caption='coins'>"+abbreviateNumber(difference)+"</span>";
				}
			}
			function differenceNum(cur, previous){
				var difference =  cur-previous;
				if(difference == null){difference = 0}
				if(difference == 0){
					return "<span class='new badge blue' data-badge-caption='units'>"+abbreviateNumber(difference)+"</span>";
				}else if(difference > 0){
					return "<span class='new badge green' data-badge-caption='units'>"+abbreviateNumber(difference)+"</span>";
				}else{
					return "<span class='new badge red' data-badge-caption='units'>"+abbreviateNumber(difference)+"</span>";
				}
			}
			var priceList = `
			<table style="background-color:#f5f5f5">
				<thead>
					<tr>
						<th>Date</th>
						<th>Jagex price</th>
						<th>Jagex average</th>
						<th>OSB overall</th>
						<th>OSB sell</th>
						<th>OSB buy</th>
					</tr>
				</thead>
				<tbody>`;
			$.each(datesR, function(key, val){
				priceList += `<tr>
					<td>`+formatDate(val)+`</td>
					<td>`+abbreviateNumber(formattedJagexPricesR[key])	+` `	+differenceValue(formattedJagexPricesR[key], formattedJagexPricesR[key+1])+`</td>
					<td>`+abbreviateNumber(formattedJagexAverageR[key])	+` `	+differenceValue(formattedJagexAverageR[key], formattedJagexAverageR[key+1])+`</td>
					<td>`+abbreviateNumber(formattedOsbPricesR[key])	+` `	+differenceValue(formattedOsbPricesR[key], formattedOsbPricesR[key+1])+`</td>
					<td>`+abbreviateNumber(formattedOsbSellR[key])		+` `	+differenceValue(formattedOsbSellR[key], formattedOsbSellR[key+1])+`</td>
					<td>`+abbreviateNumber(formattedOsbBuyR[key])		+` `	+differenceValue(formattedOsbBuyR[key], formattedOsbBuyR[key+1])+`</td>
				</tr>`;
			});
			priceList += `</tbody>
			</table>`;
			$("#priceList").html(priceList);

			var saleList = `
			<table style="background-color:#f5f5f5">
				<thead>
					<tr>
						<th>date</th>
						<th>sold</th>
						<th>bought</th>
					</tr>
				</thead>
				<tbody>`;
			$.each(saleDatesR, function(key, val){
				saleList += `<tr>
					<td>`+formatDate(val)+`</td>
					<td>`+abbreviateNumber(formattedSellsR[key])	+` `+differenceNum(formattedSellsR[key], formattedSellsR[key+1])+`</td>
					<td>`+abbreviateNumber(formattedBuysR[key])	+` `+differenceNum(formattedBuysR[key], formattedBuysR[key+1])+`</td>
				</tr>`;
			});
			saleList += `</tbody>
			</table>`;
			$("#saleList").html(saleList);





			chartData = {
				labels: dates,
				datasets: [{
					data:formattedJagexPrices,
					label:"Jagex price",
					borderColor: "#3e95cd",
	       			fill: false
				}, {
					data:formattedJagexAverage,
			        label: "Jagex average",
			        borderColor: "#c45850",
			        fill: false
					
				}, {
					data:formattedOsbPrices,
					label:"OSB overall",
					borderColor: "#8e5ea2",
	        		fill: false
					
				}, {
					data:formattedOsbSell,
					label:"OSB sell",
					borderColor: "#e8c3b9",
	        		fill: false
				}, { 
			        data:formattedOsbBuy,
					label:"OSB buy",
					borderColor: "#3cba9f",
	        		fill: false
			    }]
			};




			chartData2 = {
				labels: saleDates,
				datasets: [{
					data:formattedSells,
					label:"Sold",
					borderColor: "#3e95cd",
	       			fill: false
				}, {
					data:formattedBuys,
			        label: "Bought",
			        borderColor: "#c45850",
			        fill: false
					
				}]
			};






			var ctx = document.getElementById("plotMe").getContext("2d");
			var myChart = new Chart(ctx, {
			    type: 'line',
			    data:chartData,
			    options: {
			        animation:{duration:0,},
			        hover:{animationDuration:0,},
			        responsiveAnimationDuration:0,
			        scales:{
			        	xAxes:[{
			        		display: false
			        	}]
			        },
			        tooltips: {
			        	"mode": "x-axis",
			        	callbacks:{
			        		label:function(tooltipItem, data){
			        			return data.datasets[tooltipItem.datasetIndex].label+": "+abbreviateNumber(tooltipItem.yLabel)+" coins";
			        		}
			        	}
			        },
			    }
			});
			myChart.data.labels = dates.slice(Math.max(formattedJagexPrices.length-30,1));
			myChart.data.datasets[0].data = formattedJagexPrices.slice(Math.max(formattedJagexPrices.length-30,1));
			myChart.data.datasets[1].data = formattedJagexAverage.slice(Math.max(formattedJagexPrices.length-30,1));
			myChart.data.datasets[2].data = formattedOsbPrices.slice(Math.max(formattedJagexPrices.length-30,1));
			myChart.data.datasets[3].data = formattedOsbSell.slice(Math.max(formattedJagexPrices.length-30,1));
			myChart.data.datasets[4].data = formattedOsbBuy.slice(Math.max(formattedJagexPrices.length-30,1));
			myChart.update(0);

			var ctx2 = document.getElementById("saleHistory").getContext("2d");
			var myChart2 = new Chart(ctx2, {
			    type: 'line',
			    data:chartData2,
			    options: {
			        animation:{duration:0,},
			        hover:{animationDuration:0,},
			        responsiveAnimationDuration:0,
			        scales:{
			        	xAxes:[{
			        		display: false
			        	}]
			        },
			        tooltips: {
			        	"mode": "x-axis",
			        	callbacks:{
			        		label:function(tooltipItem, data){
			        			return data.datasets[tooltipItem.datasetIndex].label+": "+abbreviateNumber(tooltipItem.yLabel)+" units";
			        		}
			        	}
			        },
			    }
			});

			myChart2.data.labels = saleDates.slice(Math.max(saleDates.length-30,1));
			myChart2.data.datasets[0].data = formattedSells.slice(Math.max(saleDates.length-30,1));
			myChart2.data.datasets[1].data = formattedBuys.slice(Math.max(saleDates.length-30,1));
			myChart2.update(0);	



			$(document).on("click", "#week", function(){
				myChart.data.labels = dates.slice(Math.max(formattedJagexPrices.length-7,1));
				myChart.data.datasets[0].data = formattedJagexPrices.slice(Math.max(formattedJagexPrices.length-7,1));
				myChart.data.datasets[1].data = formattedJagexAverage.slice(Math.max(formattedJagexPrices.length-7,1));
				myChart.data.datasets[2].data = formattedOsbPrices.slice(Math.max(formattedJagexPrices.length-7,1));
				myChart.data.datasets[3].data = formattedOsbSell.slice(Math.max(formattedJagexPrices.length-7,1));
				myChart.data.datasets[4].data = formattedOsbBuy.slice(Math.max(formattedJagexPrices.length-7,1));

				myChart2.data.labels = saleDates.slice(Math.max(saleDates.length-7,1));
				myChart2.data.datasets[0].data = formattedSells.slice(Math.max(saleDates.length-7,1));
				myChart2.data.datasets[1].data = formattedBuys.slice(Math.max(saleDates.length-7,1));




				myChart.update(0);
				myChart2.update(0);
			});
			$(document).on("click", "#2week", function(){
				myChart.data.labels = dates.slice(Math.max(formattedJagexPrices.length-14,1));
				myChart.data.datasets[0].data = formattedJagexPrices.slice(Math.max(formattedJagexPrices.length-14,1));
				myChart.data.datasets[1].data = formattedJagexAverage.slice(Math.max(formattedJagexPrices.length-14,1));
				myChart.data.datasets[2].data = formattedOsbPrices.slice(Math.max(formattedJagexPrices.length-14,1));
				myChart.data.datasets[3].data = formattedOsbSell.slice(Math.max(formattedJagexPrices.length-14,1));
				myChart.data.datasets[4].data = formattedOsbBuy.slice(Math.max(formattedJagexPrices.length-14,1));


				myChart2.data.labels = saleDates.slice(Math.max(saleDates.length-14,1));
				myChart2.data.datasets[0].data = formattedSells.slice(Math.max(saleDates.length-14,1));
				myChart2.data.datasets[1].data = formattedBuys.slice(Math.max(saleDates.length-14,1));


				myChart.update(0);
				myChart2.update(0);
			});
			$(document).on("click", "#month", function(){
				myChart.data.labels = dates.slice(Math.max(formattedJagexPrices.length-30,1));
				myChart.data.datasets[0].data = formattedJagexPrices.slice(Math.max(formattedJagexPrices.length-30,1));
				myChart.data.datasets[1].data = formattedJagexAverage.slice(Math.max(formattedJagexPrices.length-30,1));
				myChart.data.datasets[2].data = formattedOsbPrices.slice(Math.max(formattedJagexPrices.length-30,1));
				myChart.data.datasets[3].data = formattedOsbSell.slice(Math.max(formattedJagexPrices.length-30,1));
				myChart.data.datasets[4].data = formattedOsbBuy.slice(Math.max(formattedJagexPrices.length-30,1));



				myChart2.data.labels = saleDates.slice(Math.max(saleDates.length-30,1));
				myChart2.data.datasets[0].data = formattedSells.slice(Math.max(saleDates.length-30,1));
				myChart2.data.datasets[1].data = formattedBuys.slice(Math.max(saleDates.length-30,1));


				myChart.update(0);
				myChart2.update(0);
			});
			$(document).on("click", "#3month", function(){
				myChart.data.labels = dates.slice(Math.max(formattedJagexPrices.length-90,1));
				myChart.data.datasets[0].data = formattedJagexPrices.slice(Math.max(formattedJagexPrices.length-90,1));
				myChart.data.datasets[1].data = formattedJagexAverage.slice(Math.max(formattedJagexPrices.length-90,1));
				myChart.data.datasets[2].data = formattedOsbPrices.slice(Math.max(formattedJagexPrices.length-90,1));
				myChart.data.datasets[3].data = formattedOsbSell.slice(Math.max(formattedJagexPrices.length-90,1));
				myChart.data.datasets[4].data = formattedOsbBuy.slice(Math.max(formattedJagexPrices.length-90,1));



				myChart2.data.labels = saleDates.slice(Math.max(saleDates.length-90,1));
				myChart2.data.datasets[0].data = formattedSells.slice(Math.max(saleDates.length-90,1));
				myChart2.data.datasets[1].data = formattedBuys.slice(Math.max(saleDates.length-90,1));


				myChart.update(0);
				myChart2.update(0);
			});
			$(document).on("click", "#halfyear", function(){
				myChart.data.labels = dates;
				myChart.data.datasets[0].data = formattedJagexPrices;
				myChart.data.datasets[1].data = formattedJagexAverage;
				myChart.data.datasets[2].data = formattedOsbPrices;
				myChart.data.datasets[3].data = formattedOsbSell;
				myChart.data.datasets[4].data = formattedOsbBuy;


				myChart2.data.labels = saleDates;
				myChart2.data.datasets[0].data = formattedSells;
				myChart2.data.datasets[1].data = formattedBuys;



				myChart.update(0);
				myChart2.update(0);
			});
		});
	});
}





$(document).ready(function(){
	$.ajaxSetup({ cache: false });
	var baseurl = window.location.href.split("#")[0];
	$("#cancelSearch").click(function(){
		$("#search").val("");
	});
	$("#searchForm").submit(function(e){
		e.preventDefault();
	});
	$.getJSON("router.php?a=items", function(data){
		allItems = data;
		var searchableList = {};
		
		$.each(data, function(key,val){
			searchableList[val.name] = data.iconBase+"?id="+key;
		});
		$(window).on("hashchange", function(){
			if(window.location.hash.length > 1){
				var potentialItemId = window.location.hash.substring(1);
				if(data[potentialItemId] != undefined){
					loadItem(data, potentialItemId);
				}
			}
		});
		$('#search').autocomplete({
		    data: searchableList,
		    limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
		    onAutocomplete: function(val) {
		    	itemID = getItemByName(data, val).id;
		      	window.location = baseurl + "#"+itemID;
		    },
		    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
		});

		loadAlchs();
		loadFarms();
		$("ul.tabs").tabs({
			onShow:function(tab){
			}
		});
		$(document).on("click", ".switchToTab1", function(){
			$('ul.tabs').tabs('select_tab', 'tab1');
		});
		if(window.location.hash.length > 1){
			var potentialItemId = window.location.hash.substring(1);
			if(data[potentialItemId] != undefined){
				loadItem(data, potentialItemId);
			}
		}

		var slider = document.getElementById('priceRange');
		  noUiSlider.create(slider, {
		   start: [0, 10000],
		   connect: true,
		   step: 1,
		   orientation: 'horizontal', // 'horizontal' or 'vertical'
		   range: {
		     'min': 0,
		     'max': 10000000
		   },
		   format: wNumb({
		     decimals: 0
		   }),
		   range: {
		   	"min":[0],
		   	"50%":[150000],
		   	"max":[10000000],
		   }
		  });

		  slider.noUiSlider.on('change', function(){
		  	var values = slider.noUiSlider.get();
			loadAlchs(Math.floor(values[0]), Math.floor(values[1]));
		});


	});
});