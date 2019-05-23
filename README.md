
# A sample Nodejs application to send a data payload to IOT 4.0 service



# Step 1: Clone the Sample Node.js Project

For this demo, you'll need to have installed Node.js on your machine. Clone the sample Node.js project from this GitHub repository and save the directory on your own PC

# Step 2: Create Certificate and passphrase

Create a subfolder called certificates in your directory.

Download PEM certificate for device:
1.	In the IoT service cockpit Navigate to the newly created device using the Devices list
2.	Click the Certificate tab
3.	Click on Generate Certificate
4.	Set Certificate Type to pem
5.	Click Generate. This will download the certificate.
6.	Take note of the Secret displayed after generating the pem, this cannot be viewed after the dialog is closed.


# Copy the downloaded pem certificate file into the certificates directory and rename it to envDevice-device_certificate.pem


Create a new file with the name envDevice-device_password.txt in the certificates directory. Paste the secret you took note of into the txt file.
envDevice should correspond to the deviceAlternate_ID value in your app.js file



# Step 3: Replace the endpoint for MQTT


On line 4 of the app.js file replace the value for HOST_ADDRESS with your IoT service instance. This can be found in the first part of the URL of your IoT service cockpit.


 # Step 4: Install required modules
 
 
Through the command line tool on your computer, change into the directory created before and then run npm install to install required modules.



 # Step 5: Run the node app.js file
To start the app use the command npm start within the created directory through your command line tool






