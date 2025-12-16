//Source: Techful Goodies YouTube channel
//https://www.youtube.com/@techfulgoodies
//PLEASE NOTE:  I am not a programming professional so some of the code may not be optimized.  Use as your base or for reference.


var subCount = 0; 
var viewCount = 0;
var videoCount = 0;
var GoogleAPI_ID = "";  // Put your API ID here
var GoogleAPI_KEY = ""; // Put your API Key here
var refreshMin = 60; //how many minutes until refresh
var ChannelStartDate = new Date('8/1/2022');  //Add the date your channel was started

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}

var refreshInt = (refreshMin * 60) * 1000;
setInterval(updateData, refreshInt);

function updateData() {
	fetch('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + GoogleAPI_ID + '&key=' + GoogleAPI_KEY)
	  .then((response) => response.json())
	  .then(
	  (data) => { 
		subCount = data.items[0].statistics.subscriberCount; 
		subCount = subCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //add comma
		viewCount = data.items[0].statistics.viewCount;
		viewCount = viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //add comma
		videoCount = data.items[0].statistics.videoCount;
		  
		id = "subNum";
		document.getElementById(id).innerHTML = subCount;
		document.getElementById('viewCount').innerHTML = viewCount;
		document.getElementById('videoCount').innerHTML = videoCount;
		  
		newPageTitle = 'Sub: ' + subCount;
		document.title = newPageTitle;
		  
		const date1 = new Date(ChannelStartDate);
		const date2 = new Date();
		const diffTime = Math.abs(date2 - date1);
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
		const diffYears = Math.floor((diffTime / (1000 * 60 * 60 * 24)) / 365); 
		const diffDaysShort = diffDays - (diffYears * 365); 
		document.getElementById('dayCount').innerHTML = diffYears + "y " + diffDaysShort + "d";
		
		date = new Date();
		current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
		current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
		document.getElementById("mytime").innerHTML =  "UPDATED: <span style=\"font-weight: bold\">" +formatAMPM(date) + "</span>";
	
		
		console.log(subCount);
	  }
	);
}


updateData();
