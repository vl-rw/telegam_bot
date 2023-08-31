        const ws = new WebSocket("ws://localhost:9898");
        
        ws.addEventListener("open", () => {
           text_area.textContent= "We are connected!";
           
           //ws.send("Request from html-based GUI...");
        });
        
        ws.addEventListener("message", ({ data }) => {
        
        	console.log(data);
        
           if (data[0] == 'y')  {
           
           	   label.innerHTML = data;
           	   
           	   //alert("Listen!");
           	   
           	   legend.innerHTML = '<button style="box-shadow: rgba(90, 0, 0, 0.56) 0px 22px 70px 4px; transform: scale(3); margin-left: 100px;" onClick="window.location.href = \'result.mp3?t=' + Date.now() +'\'  " >Listen the file</button>';
           
           }      else  {
           
               text_area.value = data;
            };
        });
