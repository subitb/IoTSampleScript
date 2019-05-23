const mqtt = require('mqtt')
var fs = require("fs");
var random = require('random-js')();

const deviceAlternateId = "envDevice";
const sensorAltenateId = "10271";
const capabilityAlternateId = "envData";

const certFile = "./certificates/envDevice-device_certificate .pem";
const secretPasswordFile = "./certificates/envDevice-device_password.txt";

var connectOptions = {
    keepalive: 10,
    clientId: deviceAlternateId,
    clean: true,
    reconnectPeriod: 2000,
    connectTimeout: 2000,
    cert: fs.readFileSync(certFile),
    key: fs.readFileSync(certFile),
    passphrase: fs.readFileSync(secretPasswordFile).toString(),
    rejectUnauthorized: false
};

var mqttClient = mqtt.connect("mqtts://0ba8a0c6-b270-4ae6-b8cd-bfe45e3d8539.eu10.cp.iot.sap:8883", connectOptions);

mqttClient.on('connect', function() {

	console.log("mqttClient connect");
});

mqttClient.on("error", function(err) {
	console.log("mqttClient ERROR : ");
	console.log(err);
});

mqttClient.on('offline', function() {
    console.log("mqttClient offline");
});

mqttClient.on('reconnect', function() {
    console.log("mqttClient reconnect");
});

mqttClient.on('close', function(){
	console.log("mqttClient close");
});

var refTemperature = 25;
var refHumidity = 70;
var refLight = 800;

var lastTemperature = refTemperature;
var lastHumidity = refHumidity;
var lastLight = refLight;

function generateDataAndSendViaMQTT() {

    console.log(new Date().toISOString(), "Creating random data...");

    var data = {
        temperature : random.integer(lastTemperature - 1, lastTemperature + 1),
        humidity : random.integer(lastHumidity - 10, lastHumidity + 10),
        light : random.integer(lastLight - 100, lastLight + 100)
    }

    sendValuesToSCPIoTService(data);

    lastTemperature = data.temperature;
    lastHumidity = data.humidity;
    lastLight = data.light;
}

function sendValuesToSCPIoTService(data){

    var pushData = {
        "sensorAlternateId" : sensorAltenateId,
        "capabilityAlternateId" : capabilityAlternateId,
        "measures" : [
            data.temperature.toString(),
            data.humidity.toString(),
            data.light.toString()
        ]
    }

    var topicName = 'measures/' + deviceAlternateId;

    mqttClient.publish(topicName, JSON.stringify(pushData), [], function(err){
        if(!err){
            console.log("MQQT client pushed data : ", pushData);
        }
        else{
            console.log("MQQT client error :");
            console.log(pushData);
            console.log(err);
        }
    });

}

setInterval(generateDataAndSendViaMQTT, 1000);
