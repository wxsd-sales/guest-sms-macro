import xapi from 'xapi';


// Add your own PMR information here
const PMR_URL = 'https://<example>.webex.com/meet/<example>';

// Customise your SMS message
const MESSAGE = 'Please join my meeting at: ';

// Enter the destination number you are using with your sandbox
const TO = '+12345678910';

// Enter the from number which your sandbox expects
const FROM = '+12345678910';

// Add your  Webhook URL here
const IMI_URL = 'https://api-sandbox.imiconnect.io/v1/sms/messages';
const IMI_SERVICE_KEY = '##########';


///////////////////////////////////
// Do not change anything below
///////////////////////////////////


const payload = {
      "from": FROM,
      "to": TO,
      "content": MESSAGE+PMR_URL,
      "contentType": "TEXT"
  };

// Enable the HTTP client if it isn't already
xapi.Config.HttpClient.Mode.get().then(value => {
  
  console.log('HTTP Client is : ' + value);

  if(value == 'Off'){
    console.log('Enabling HTTP Client');
    xapi.Config.HttpClient.Mode.set('On');
  }

});

// Add the Button to the touch panel
xapi.command('UserInterface Extensions Panel Save', {
    PanelId: 'sms_sandbox'
    }, `<Extensions>
      <Version>1.8</Version>
      <Panel>
        <Order>1</Order>
        <Type>Statusbar</Type>
        <Icon>Input</Icon>
        <Color>#A866FF</Color>
        <Name>SMS Sandbox</Name>
        <ActivityType>Custom</ActivityType>
      </Panel>
    </Extensions>`);



// This function prepares the invite message and sends it to the
// imiconnect SMS service to the target mobile number
function sendInvite(){

  console.log('Sending Invite');
  console.log(payload);


  xapi.command('HttpClient Post', {
    Header: ["Content-Type: application/json", 
            "Authorization: "+ IMI_SERVICE_KEY], 
    Url: IMI_URL,
    }, 
      JSON.stringify(payload))
    .then((result) => {
      console.log("success: " + result.StatusCode)
   
      xapi.command("UserInterface Message Prompt Display", {
        Title: "Invite sent successfully"
      , Text: 'Would you like to automatically join: ' + PMR_URL
      , FeedbackId: 'join_meeting'
      , 'Option.1': 'Yes, join meeting'
      , 'Option.2':'No, I will join later'
      }).catch((error) => { console.error(error); });
    })
    .catch((err) => {
      console.log("failed: " + err.message)
      console.log("success: " + result.StatusCode)
      xapi.Command.UserInterface.Message.Alert.Display
        ({ Duration: 3
        , Text: 'Invite was not sent'
        , Title: 'Failure'});
    });

}



// Listen for the SMS_Invite panel and display initial prompt
xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
    if(event.PanelId == 'sms_sandbox'){
      console.log('SMS_Sandbox Selected')
   
      xapi.command("UserInterface Message Prompt Display", {
            Title: "SMS Invite Sandbox"
          , Text: 'Please enter the number you wish to invite'
          , FeedbackId: 'create_invite'
          , 'Option.1': 'Tap to change number: ' + MOBILE
          , 'Option.2': 'Tap to change invite from: '+ PMR_URL
          , 'Option.3': 'Send Invite'
        }).catch((error) => { console.error(error); });

    }
});

// Handle all the Text Inputs
xapi.event.on('UserInterface Message Prompt Response', (event) => {
  console.log('FeedbackId: ' + event.FeedbackId + ' Option: '+ event.OptionId);
  switch(event.FeedbackId){
    case 'create_invite':
      switch(event.OptionId){
        case '1':   // This choice handles a new number input
          xapi.command("UserInterface Message Prompt Display", {
            Title: "SMS Invite Sandbox"
          , Text: 'Please enter the number you wish to invite'
          , FeedbackId: 'create_invite'
          , 'Option.1': 'Tap to change number: ' + MOBILE
          , 'Option.2': 'Tap to change invite from: '+ PMR_URL
          , 'Option.3': 'Send Invite'
        }).catch((error) => { console.error(error); });
          break;
        case '2':   // This choice handles a new PMR input
          xapi.command("UserInterface Message Prompt Display", {
            Title: "SMS Invite Sandbox"
          , Text: 'Please enter the number you wish to invite'
          , FeedbackId: 'create_invite'
          , 'Option.1': 'Tap to change number: ' + MOBILE
          , 'Option.2': 'Tap to change invite from: '+ PMR_URL
          , 'Option.3': 'Send Invite'
        }).catch((error) => { console.error(error); });
          break;
        case '3':   // This choice sends the meeting invitation
          sendInvite();
          break;
      }
      break;
    case 'join_meeting':
      switch(event.OptionId){
        case '1': 
          console.log('PMR:' + PMR_URL);
          console.log('Dialling the PMR: ' + PMR_URL);
          xapi.command('Dial',{
            Number: PMR_URL
          })
          break;
        case '2':
          console.log('Not dialling PMR');
          break;
      }
      break;
    
  }
});
