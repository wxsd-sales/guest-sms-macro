# SMS-Macro

The SMS invite macro allows you to send a meeting invitation meeting from your RoomOS devices to a mobile user via SMS. This macro use the IMI Connect as it SMS service. 

This version of macro has been modified to work with the new imiconnect sandbox. This will allow you to easily test the macro against your own mobile number.



## Snapshot of Webex Navigator screen with SMS Invite button:
![image](https://user-images.githubusercontent.com/21026209/129073401-b7475e9d-6cff-4c31-b7e4-ec0d33d2cbe3.png)

### Hit send:
![image](https://user-images.githubusercontent.com/21026209/129075140-ebdf310e-c529-4133-9337-dc5f6509af4a.png)

### Confirmation invite was sent successfully and an option to automatically join the PMR:
![image](https://user-images.githubusercontent.com/21026209/130437964-d5440801-8190-4429-b397-0c55d177ad42.png)



## Requirements

1. A Cisco Webex Device running RoomOS or CE9.6 or newer
2. A sandbox account on imiconnect https://sandbox.imiconnect.io/

## Setup

1. Log into your sandbox account and take a note of the three parameters, ``Service Key``,``To Number`` and ``From Number``
![image](https://user-images.githubusercontent.com/21026209/146599381-2f0a5666-4f59-492f-84e0-e0202d446c4a.png)
2. Then update the macro with the parameters from the sandbox, also update the ``PMR_URL`` with your personal webex meeting URL. This will be what is sent in the SMS invitation
![image](https://user-images.githubusercontent.com/21026209/146607717-b83581c5-998b-4ce7-8fd4-aa90770c7f8d.png)
