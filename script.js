const apiKey="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";




function sendMessage(){
    const message= document.getElementById("message-input");
    if(!message.value){
        message.style.border= "1px solid red";
        return;
    }
    message.style.border= "none";
    
    var status= document.getElementById("status");
    var btnSubmit= document.getElementById("send-button");

   
    status.innerHTML= "Buscando resposta...";
    btnSubmit.disabled= true;
    btnSubmit.style.cursor= "not-allowed";
    message.disabled= true;

    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o",   
            max_tokens:3000,
            temperature:0,
            messages: [
                {
                    role: "user",
                    content: message.value
                }
            ]
        })
    })
    .then((response)=> response.json())
    .then((response)=>{
       let r
       = response.choices[0].message.content;
       showHistoric(message.value,r);
    })
    .catch((e)=>{
        console.log('Error->',e);
    })
    .finally(()=>{
        btnSubmit.disabled= false;
        btnSubmit.style.cursor= "pointer";
        message.disabled= false;
    })
    message.value = "";
}
function showHistoric(message,response){
    var historic = document.getElementById("chat-messages");

// MINHA MENSAGEM
    var userMessage = document.createElement('div')
    userMessage.className = "userMessage";

    var userMessageText = document.createElement('p');
    userMessageText.innerHTML = message;

    userMessage.appendChild(userMessageText);
    historic.appendChild(userMessage);
    



    // RESPONDE CHAT
    var aiMessage = document.createElement("div");
    aiMessage.className = "aiMessage";

    var aiMessageText = document.createElement('p');
    aiMessageText.innerHTML = response;

    aiMessage.appendChild(aiMessageText);
    historic.appendChild(aiMessage);

    // SCROLL PARA O FINAL
    historic.scrollTop = historic.scrollHeight;
}

