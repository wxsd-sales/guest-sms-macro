# SMS-Macro

The SMS invite macro allows you to send a meeting invitation meeting from your RoomOS devices to a mobile user via SMS. This macro use the IMI Connect as it SMS service. 



## Snapshot of Webex Navigator screen with SMS Invite button:
![image](https://user-images.githubusercontent.com/21026209/129073401-b7475e9d-6cff-4c31-b7e4-ec0d33d2cbe3.png)


### Initial prompt for input:
![image](https://user-images.githubusercontent.com/21026209/129073854-118b407f-e5e0-4808-bd8c-4cd15bb5f4f0.png)

### Enter the mobile phone number:
![image](https://user-images.githubusercontent.com/21026209/129073983-a1bc3eef-849c-4521-9455-1b20f61a03f9.png)

### Change the invite information if needed:
![image](https://user-images.githubusercontent.com/21026209/129074196-bdae1ee8-85c5-4184-9950-a37ad13ea3f8.png)

### Enter alternative invite information:
![image](https://user-images.githubusercontent.com/21026209/129074936-6a2458c6-9386-4baa-a722-668bf98202c7.png)

### Hit send:
![image](https://user-images.githubusercontent.com/21026209/129075140-ebdf310e-c529-4133-9337-dc5f6509af4a.png)

### Confirmation of a successful message:
![image](https://user-images.githubusercontent.com/21026209/129075654-aeabc876-bb94-4e1d-99de-d30c273ef42b.png)


## Requirements

1. A Cisco Webex Device running RoomOS or CE9.6 or newer
2. HttpClient Mode enabled on the device



### Enabling HttpCient Mode

#### Via the Webe Interface

1. Log into the web interface using your admin credentials and enable as per the image below

![image](https://user-images.githubusercontent.com/21026209/129081620-605edb82-59ee-423f-8cee-82df1b4c9fca.png)

2. Log into the device via SSH and run the command 'xConfiguration HttpClient Mode: On'

![image](https://user-images.githubusercontent.com/21026209/129081733-4288bbf9-c5d1-4183-923d-c2cfea03248b.png)


