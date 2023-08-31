
const fs = require("fs");
const googleTTS = require('google-tts-api');
const http = require('https');


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let data = '';

words_arr = [];

fs.readFile('text.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  //console.log(data.split(' '));
  words_arr = data.split(' ');
  arrayMaker();
});

let lang = 'en';
fs.readFile('lang.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  //console.log(data.split(' '));
  language =  data.toString();
  
});

const chatId = 'from_console_prog_';

send_arr = [];

async function arrayMaker() {

	/* create an array  */
	
	let str = '';
 
    let proved_str = '';
	
	//words_arr = data.split(' ');

	
		
	//array.length = parseInt(1+msg.text.length/200);
	
		/* make chunks with words about 195 symbols long */
		
		for (let i = 0; i < words_arr.length; i++) {

			str += " "+words_arr[i];
		
			if (str.length > 195) {
 		
				send_arr.push(_proved_str);
 		
				str =  words_arr[i];
 		
			}  else { 
 		
			_proved_str = " "+str ;
			
			};
		};
		
		send_arr.push(str);
		
		//console.log(send_arr);

};

async function toSound() {

		for (let j in send_arr) {
  	
  			setTimeout(() => {
  			
  				/* get a link  */
			
				url = googleTTS.getAudioUrl(send_arr[j], {
  				
  					lang: language,
  					
  					slow: false,
  		
  					host: 'https://translate.google.com',
				
				});
			
			}, j*500);
	

			setTimeout(() => { 
				let file;
	
			/* download it in a folder  */{
				if (j<10) {file = fs.createWriteStream("./speech/"+chatId+"00"+j+".mp3");};
				
				if ((j>=10)&&(j<100)) {file = fs.createWriteStream("./speech/"+chatId+"0"+j+".mp3");};
				
				if (j>=100) {file = fs.createWriteStream("./speech/"+chatId+j+".mp3");};
				}
			
				//let file = fs.createWriteStream("./speech/"+chatId+i+".mp3");
			
				let request = http.get(url, function(response) {
				
   					response.pipe(file);
	
   					// after download completed close filestream
   					
   					file.on("finish", () => {
   					
  			     		file.close();
       				
       					console.log("Download Completed - got " + parseInt(parseInt(j)+1)+ " part of  " + (parseInt(send_arr.length)-1));

       					
   					});
				});
	  
			} , j*500)
  	
  		/* make a pause to complete the tasks  */
  	
  		//await sleep(5000+(j+1)*2000);
  	
  
		};
	
		/* when everything is done....  */
	
		setTimeout(() => {
	
			/* make a "cat" command in the terminal */
			/* yes, it is SO EASY!! */
	 
			require('child_process').execSync('cat ./speech/* > ./result.mp3');
	
	
		} , send_arr.length*1500);
	
		setTimeout(() => { 
	
			/* delete all the temporal files */
	
			require('child_process').execSync(' rm speech/*.mp3');
		
			console.log("done");  
	
		} , (send_arr.length+1)*3500);
		


};

setTimeout(() => toSound(), 500);
