// export PATH="/home/pc/node-v17.3.0-linux-x64/bin/:$PATH"
// cd /home/pc/Downloads/sp-serv1

const WebSocket = require('ws')
const fs = require("fs");
const googleTTS = require('google-tts-api');
const http = require('https');



const ws = new WebSocket.Server({port: 9898});

ws.on('connection', onConnect);

let language = "en";

fs.writeFileSync( 'lang.txt', language );

function onConnect(wsClient) {

	let numb = 1;

	function ls_files() {
 
			let result = require('child_process').execSync(`ls`).toString();
			
			//console.log(result)
			
			if (result.toString().includes("result")) {
			
				wsClient.send("your file <a href='result.mp3'>here</a>");
				
				wsClient.send("Job is done.");
				
			} else {
			
				wsClient.send("working in progress x"+numb);
				
				console.log(numb);
				
				numb++;
			
				setTimeout(()=> {ls_files()}, 500);
			
			};
	};

	console.log('Connection established');

	wsClient.send('Paste your text here, it would be red.');

	wsClient.on('message', function(message) {

		

		
		if ( message.toString() === "ru" ) { language = "ru"; console.log("Russian"); fs.writeFileSync( 'lang.txt', language ); };
		
		if ( message.toString() === "en" ) { language = "en"; console.log("English"); fs.writeFileSync( 'lang.txt', language ); };
		
		if ( message.toString() === "de" ) { language = "de"; console.log("Deutsch"); fs.writeFileSync( 'lang.txt', language ); };
		
		if (( message.toString() != "de" ) && ( message.toString() != "ru" ) && ( message.toString() != "en" )  ) {
		
		
		// require('child_process').execSync(` node sp`);
		

		console.log(message.toString());
		
		wsClient.send('Stay calm, your file is in process...');
		
		fs.writeFileSync( 'text.txt', message.toString() );
		
		try {

			require('child_process').execSync(`rm ./result.mp3`);
		
		} catch (exceptionVar) {
		
			console.log(exceptionVar.toString());
		
		} finally {
		
			setTimeout(()=> {ls_files()}, 500);

		};
		
		//require('child_process').execSync(` node sp`);
		
		let result = require('child_process').execSync(` node sp`).toString();
		
		console.log(result);
		
		//setTimeout(()=>{wsClient.send("your file <a href='result.mp3'>here</a>");}, 500);
		
		//ls_files();
		
		//result.then(()=>{wsClient.send("your file <a href='result.mp3'>here</a>");});

		}
	}
);

wsClient.on('close', function() {

		console.log('user is gone');
	
	})

};

setTimeout( () => { require('child_process').execSync(`chromium index.html`) } , 500);





