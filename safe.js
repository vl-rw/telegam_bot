const TelegramBot = require('node-telegram-bot-api')
const fs = require("fs");
const token = ' '
const bot = new TelegramBot(token, { polling: true })
const googleTTS = require('google-tts-api');
const http = require('https');


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

help_notation ="А вот хуй";

help_notation1 ='Ну ладно. \n "без цифры" - читается на английском; \n "1 текст" - читается на русском; \n  "2 текст" - читается на немецком; \n "3 15" - таймер на 15 минут; \n "12345678" - исходный код бота;  \n "help" или "?" - такая вот справка  \n Нужён я - пиши rraww107@gmail.com';

bot.on('message', async (msg) => {

	const chatId = msg.chat.id;
	
	/* Help notation part */
	
	let noRead = false;
	
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
    			bot.sendMessage(chatId, "Обратный отсчёт "+timer+ " минут(а)");
				setTimeout(() => {
				
					bot.sendMessage(chatId,"Время вышло, пиздуй!");
				
				} , timer*60*1000)
    			break;
				
			case 4: 
  			
 				noRead = true;
    			require('child_process').execSync(' echo ' + msg.text.substr(2, (msg.text.length-2)) + '_____ | cat >> log.txt');
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
	
			/* download it in a folder  */
			
				let file = fs.createWriteStream("./speech/file"+i+".mp3");
			
				let request = http.get(url, function(response) {
				
   					response.pipe(file);
	
   					// after download completed close filestream
   					
   					file.on("finish", () => {
   					
  			     		file.close();
       				
       					console.log("Download Completed");
       				
       					bot.sendMessage(chatId, "Got " + (i+1)+ " part of  " + send_arr.length );
       					
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
	 
			require('child_process').execSync(' cat speech/*.mp3 > result.mp3');
	
			console.log("sent");  
	
			bot.sendDocument(chatId, "result.mp3", {caption:  "I red it 4 you."});
	
		} , send_arr.length*500);
	
		setTimeout(() => { 
	
			/* delete all the temporal files */
	
			require('child_process').execSync(' rm speech/*.mp3');
		
			console.log("done");  
	
		} , (send_arr.length+1)*500);
	}

});

