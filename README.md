# SMS Geust Macro

The SMS invite Macro allows you to send a guest meeting invitation from a Webex Device to a mobile user via SMS. This Macro uses Webex Connect for its SMS service. Additionally, this Macro will automatically add the intial button on your devices touch interface.


![output_Sg23R9](https://user-images.githubusercontent.com/21026209/161605701-a4d3b36a-a63a-47f1-8cdb-28560accca07.gif)

## Using the Macro
Once the Macro has been configured and running on your device:
1. Tap the SMS Invite button
2. Enter the number of the person you wish to invite
3. Change the dafault Personal Meeting Room (PMR) URI if desired
4. Hit send
5. If the invite was sent succesfull, you will have the option to join the meeting automatically.


## Requirements

1. A Cisco Webex Device running RoomOS or CE9.6 or newer
2. A instance of imiconnect with a webhook and SMS service

## Getting your Webhook URL from Webex Connect

1. Log into your Webex Connect instance and create a flow which connects a webhook to an SMS service
![image](https://user-images.githubusercontent.com/21026209/135327888-da36290f-2b67-44ea-baec-6881695ca287.png)
2. Obtain your Webhook URL and use this in the Macro
![image](https://user-images.githubusercontent.com/21026209/135330888-bbfca70b-8d70-4e47-9afa-345e81d64791.png)
