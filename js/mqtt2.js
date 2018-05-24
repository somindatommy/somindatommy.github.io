//client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "clientId");

client = new Paho.MQTT.Client("wss://iot.eclipse.org:443/ws",randomClientIDGenerator());

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client

client.connect({onSuccess:onConnect});

function randomClientIDGenerator(){
    var x = Math.floor((Math.random() * 100) + 1);
    var y = Math.floor((Math.random() * 100) + 1);
    var z = Math.floor((Math.random() * 100) + 1);
    x = x.toString();
    y = y.toString();
    var id = x+"User"+y+"login"+z+x;
    console.log(id);
    return id;
}



// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    onConnectSubscribe();
}

function onConnectSubscribe() {
    // Once a connection has been made, make a subscription and send a message.
    client.subscribe("iot_lamp/elamp/lightings");
}


function onConnectPublish(messageString,btn) {
    // Once a connection has been made, make a subscription and send a message.
    message1 = new Paho.MQTT.Message(messageString);
    message1.destinationName = "iot_lamp/elamp/lighting";
    client.send(message1);
    console.log(message1);
    change_color(btn);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    change_color(message.payloadString);
}


//-----------------------------------------------------------------------
function change_color(btn){
    document.getElementById("btn"+btn).style.backgroundColor = "rgb(255, 191, 0)";
    document.getElementById("btn"+btn).style.color = "black";
    document.getElementById("btn"+btn).textContent= "Lamp "+btn+" Lighted";
    document.getElementById("btn"+btn).style.fontWeight = "900"; 
    document.getElementById("btn"+btn).disabled = true;
}