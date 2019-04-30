const request = require('request');
var mqtt = require('mqtt')


const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question("your name ? ", (name) => {
  postFor(name);
  readline.close()
})

function postFor(name){
	request('https://api.ipify.org/?format=json', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  let url = "http://ip-api.com/json/" + body.ip;
  request(url,{ json: true }, (err, res, body) => {

  	let msg = {
  		user:name,
  		latitude:body.lat,
  		longitude:body.lon,
  		timestamp:Date.now()
  	}

  	var client  = mqtt.connect('mqtt://test.mosquitto.org');
	client.on('connect', function () {
		console.log("connected")
		client.publish("adem-hmama-poc",JSON.stringify(msg),function(err){
			if(err)
				console.log("error sending mqtt msg");
			else
				console.log("done!");
			client.end();
		});	
	})

  })
});
}






 
