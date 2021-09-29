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

### Confirmation invite was sent successfully and an option to automatically join the PMR:
![image](https://user-images.githubusercontent.com/21026209/130437964-d5440801-8190-4429-b397-0c55d177ad42.png)



## Requirements

1. A Cisco Webex Device running RoomOS or CE9.6 or newer
2. A instance of imiconnect with a webhook and SMS service

## Getting your Webhook URL from imiconnect

1. Log into your imiconnect instance and create a flow which connects a webhook to an SMS service
![image](https://user-images.githubusercontent.com/21026209/135327888-da36290f-2b67-44ea-baec-6881695ca287.png)
2. Obtain your Webhook URL and use this in the Macro
![image](https://user-images.githubusercontent.com/21026209/135330888-bbfca70b-8d70-4e47-9afa-345e81d64791.png)


