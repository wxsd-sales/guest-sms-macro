# SMS Guest Macro

The SMS invite Macro allows you to send a guest meeting invitation from a Webex Device to a mobile user via SMS. This Macro uses Webex Connect for its SMS service. Additionally, this Macro will automatically add the initial button on your devices touch interface.

![output_Sg23R9](https://user-images.githubusercontent.com/21026209/161605701-a4d3b36a-a63a-47f1-8cdb-28560accca07.gif)

## Overview

This Webex Device macro lets you send a meeting link over SMS from your Webex Device by leveraging Webex Connect as the SMS service. It programmatically creates the initial UI Extension button on the device for you and once tapped, will open up a series of feedback response prompts. Using the prompt interface you can enter the target number of the mobile user you want to send the invite to. Also you al give an alternative PMR address for the meeting invite to point to.

## Setup

### Prerequisites & Dependencies: 

- Cisco Webex Device running RoomOS or CE9.6 or newer
- Web admin access to the device to upload the macro
- Webex Connect instance or sandbox and a Webhook URL for your flow.
  - Link to create your own Webex Connect sandbox: https://imimobile.com/products/webex-connect/sandbox

### Getting your Webhook URL from Webex Connect

1. Log into your Webex Connect instance and create a flow which connects a webhook to an SMS service
![image](https://user-images.githubusercontent.com/21026209/135327888-da36290f-2b67-44ea-baec-6881695ca287.png)
2. Obtain your Webhook URL and use this in the Macro
![image](https://user-images.githubusercontent.com/21026209/135330888-bbfca70b-8d70-4e47-9afa-345e81d64791.png)

### Installation Steps:

1. Download the ``SMS-Macro.js`` file and upload it to your Webex Room devices Macro editor via the web interface.
2. Configure the Macro by changing the initial values, there are comments explaining each one.
3. Enable the Macro on the editor.

## Demo

*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).


## License

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer

Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex use cases, but are not Official Cisco Webex Branded demos.


## Questions
Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=guest-sms-macro) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 
