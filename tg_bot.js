/* 
npm i ws

npm i node-telegram-bot-api

echo $PATH

export PATH=$PATH:/home/pc/node-v17.3.0-linux-x64/bin/

npm install --save google-tts-api

cd /home/pc/tg_bot

node tg_bot.js

sudo umount ./speech


*/



const TelegramBot = require('node-telegram-bot-api')
const fs = require("fs");
const token = 'YOUR_API_HERE'
const bot = new TelegramBot(token, { polling: true })
const googleTTS = require('google-tts-api');
const http = require('https');

// creating disk from virtual memory:

let disk_size = 115;

try {

	require('child_process').execSync('sudo mount -t tmpfs -o size=' + disk_size + 'm tmpfs ./speech');

} catch (exceptionVar) {

	console.log(exceptionVar);

} finally {

	console.log(`Virtual disk ${disk_size} megabytes was created`);

};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


help_notation ="А вот хуй";

help_notation1 ='Ну ладно. \n "без цифры" - читается на английском; \n "1 текст" - читается на русском; \n  "2 текст" - читается на немецком; \n "3 15" - таймер на 15 минут; \n "help" или "?" - такая вот справка  \n Нужён я - пиши rraww107@gmail.com';

bot.on('message', async (msg) => {

	let noRead = false;

	const chatId = msg.chat.id;
	
	/* Help notation part */
	
	norm = msg.text.toLowerCase();
	
	let isHelp = ((norm==="help") || (norm === "?") || (norm==="/help") || (norm==="/start"));
  
	if (isHelp) {
	
		bot.sendMessage(chatId, help_notation);
		noRead = true;
		
		setTimeout(() => {
  			
  			bot.sendMessage(chatId, help_notation1);
			
		}, 1500);
  	
	};
	
	/* switch language part */
  
	let isNumber = parseInt(msg.text);
  
	let language = 'en';
	
	let timer = 0;
  
  	if (isNumber) {
  
		switch(isNumber) {
			case 1: 
			
				language = 'ru';
				msg.text = msg.text.substr(2, (msg.text.length-2));
				break;
					
			case 2: 
  			
    			language = 'de';
    			msg.text = msg.text.substr(2, (msg.text.length-2));
    			break;
    			
    		case 3: 
  			
 				noRead = true;
    			timer = parseInt(msg.text.substr(2, (msg.text.length-2)));
    			bot.sendMessage(chatId, `Обратный отсчёт ${timer} минут(а)`);
				setTimeout(() => {
				
					bot.sendMessage(chatId,"Время вышло, пиздуй!");
				
				} , timer*60*1000)
    			break;
				
			case 4: 
  			
 				noRead = true;
    			require('child_process').execSync(' echo "' + msg.text.substr(2, (msg.text.length-2)) + '" | cat >> log.txt');
    			break;
    			
    		case 12345678: 
  			
 				noRead = true;
    			bot.sendDocument(chatId, "safe.js", {caption:  "I red it 4 you."});
    			break;
					
  			default:
    			language = 'en';
    			break;
				}
	};
  
	
	/* create an array  */
	
	let str = '';
 
    let proved_str = '';
	
	words_arr = msg.text.split(' ');

	send_arr = [];
		
	//array.length = parseInt(1+msg.text.length/200);
	
	if (!noRead) {
	
		/* make chunks with words about 195 symbols long */
		
		for (let i = 0; i<words_arr.length; i++) {

			str += " "+words_arr[i];
		
			if (str.length > 195) {
 		
				send_arr.push(_proved_str);
 		
				str =  words_arr[i];
 		
			}  else { 
 		
			_proved_str = " "+str ;
			
			};
		};
		
		send_arr.push(str);
	/* last piece*/
			
		for (let i = 0; i<send_arr.length; i++) {
  	
  			setTimeout(() => {
  			
  				/* get a link  */
			
				url = googleTTS.getAudioUrl(send_arr[i], {
  				
  					lang: language,
  					
  					slow: false,
  		
  					host: 'https://translate.google.com',
				
				});
			
			}, i*500);
	

			setTimeout(() => { 
			
				let file;
	
		     	/* download it in a folder  */{
				if (i<10) {file = fs.createWriteStream(`./speech/${chatId}00${i}.mp3`);};
				
				if ((i>=10)&&(i<100)) {file = fs.createWriteStream(`./speech/${chatId}0${i}.mp3`);};
				
				if (i>=100) {file = fs.createWriteStream(`./speech/${chatId}${i}.mp3`);};
				}
			
				//let file = fs.createWriteStream("./speech/"+chatId+i+".mp3");
			
				let request = http.get(url, function(response) {
				
   					response.pipe(file);
	
   					// after download completed close filestream
   					
   					file.on("finish", () => {
   					
  			     		file.close();
       				
       					console.log(`Download Completed - got ${i+1} part of  ${send_arr.length}`);
       				
       					bot.sendMessage(chatId, `Got ${i+1} part of  ${send_arr.length}`);
       					
   					});
				});
	  
			} , i*500)
  	
  		/* make a pause to complete the tasks  */
  	
  		await sleep(5000+(i+1)*2000);
  	
  
		};
	
		/* when everything is done....  */
	
		setTimeout(() => {
	
			/* make a "cat" command in the terminal */
			/* yes, it is SO EASY!! */
	 
			require('child_process').execSync(` cat speech/${chatId}*.mp3 > speech/result${chatId}.mp3`);
	
			console.log("sent");  
	
			bot.sendDocument(chatId, `speech/result${chatId}.mp3`, {caption:  "I red it 4 you."});
	
		} , send_arr.length*500);
	
		setTimeout(() => { 
	
			/* delete all the temporal files */
	
			require('child_process').execSync(` rm speech/*${chatId}*.mp3`);
		
			console.log("done");  
	
		} , (send_arr.length+1)*500);
	}

});


