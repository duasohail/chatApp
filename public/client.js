let name;
let type_area=document.querySelector('#type_area')
let msg_area=document.querySelector('.msg_area');


do{
    name= prompt('enter username');
}while(!name)


function user(){
  document.getElementById("para").innerHTML="username: "+name;

    
}

function userout(){
    document.getElementById("para").innerHTML="";
  
      
  }

  const socket = io();

 type_area.addEventListener('keyup', (e) =>{
     if(e.key==='Enter'){
         outgoingMsg(e.target.value)
     }
 })

 function outgoingMsg(message){
     let msg={
         user: name,
         usermsg:message
     }

     appendMsg(msg,'send_msg_clr')
     type_area.value=''
     scrollBottom()


     socket.emit('srvr_msg', msg)
 }


 function appendMsg(msg , type){
     let msgdiv= document.createElement('div');
     let Classname=type;
     msgdiv.classList.add(Classname , 'msg');

    

     let pattrn=`
        <p><span id='user__nme'>${msg.user}</span><br> ${msg.usermsg}</p>
     `

     msgdiv.innerHTML=pattrn;
     msg_area.appendChild(msgdiv);

 }

 function scrollBottom(){
     msg_area.scrollTop = msg_area.scrollHeight;
 }


 // incoming messages

 socket.on('srvr_msg',(msg)=>{
     user=msg.user;
     document.getElementById('online').innerHTML += user+' ';
     
     appendMsg(msg,'rec_msg_clr')
     scrollBottom();

     
 })

 