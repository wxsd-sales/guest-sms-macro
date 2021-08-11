import xapi from 'xapi';


// Add your own PMR information here
const PMR = "MY_PMR@webex.com";

// Add your own IMIConnect Webhook URL here
const URL = 'https://hooks-us.imiconnect.io/events/#########'

const CONTENT_TYPE = "Content-Type: application/json";
let tempPMR = '';
let tempNumber = '';


// This function prepares the invite message and sends it to the
// imiconnect SMS service and the target mobile number
function sendInvite(numb, invite){

  console.log('Sending Invite');
  console.log('Number received: ' + numb);
  console.log('Invite received: ' + invite);

  invite = 'Please join my meeting at: ' + invite;

  var messagecontent = {
      number: numb
    , message: invite
  };

  xapi.command('HttpClient Post', {
    'Header': [CONTENT_TYPE], 
    'Url': URL
    }, 
      JSON.stringify(messagecontent))
    .then((result) => {
      console.log("success: " + result.StatusCode)
      xapi.Command.UserInterface.Message.Alert.Display
        ({ Duration: 3
        , Text: 'Invite sent successfully'
        , Title: 'Success'});
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
    if(event.PanelId == 'sms_invite'){
      console.log('SMS_Invite Selected')
      tempNumber = '';
      tempPMR = '';
      // Creating the default panel
      xapi.command("UserInterface Message Prompt Display", {
            Title: "SMS Invite"
          , Text: 'Please enter the number you wish to invite'
          , FeedbackId: 'create_invite'
          , 'Option.1':'Tap to enter number'
          , 'Option.2':'Tap to change invite from: '+PMR
        }).catch((error) => { console.error(error); });
    }
});


// Handle all the SMS Invite preperation screens
xapi.event.on('UserInterface Message TextInput Response', (event) => {
  switch(event.FeedbackId){
    case 'enter_number':
      tempNumber = event.Text;
      console.log('Number Entered: ' + tempNumber)
      xapi.command("UserInterface Message Prompt Display", {
          Title: "SMS Invite"
        , Text: 'Please enter the number you wish to invite'
        , FeedbackId: 'create_invite'
        , 'Option.1': 'Tap to change number: ' +tempNumber
        , 'Option.2':'Tap to change invite from: '+ ((tempPMR != '') ? tempPMR : PMR)
        , 'Option.3':'Send Invite'
      }).catch((error) => { console.error(error); });
      break;
    case 'enter_pmr':
      tempPMR = event.Text;
      console.log('PMR Entered: ' + tempPMR)
      console.log('Temp Number: ' +tempNumber)
      if(tempNumber === ''){
        xapi.command("UserInterface Message Prompt Display", {
            Title: "SMS Invite"
          , Text: 'Please enter the number you wish to invite'
          , FeedbackId: 'create_invite'
          , 'Option.1': 'Tap to enter number'
          , 'Option.2':'Tap to change invite from: '+ tempPMR
        }).catch((error) => { console.error(error); });
      } else {
        xapi.command("UserInterface Message Prompt Display", {
          Title: "SMS Invite"
        , Text: 'Please enter the number you wish to invite'
        , FeedbackId: 'create_invite'
        , 'Option.1': 'Tap to enter number'
        , 'Option.2':'Tap to change invite from: '+ tempPMR
        , 'Option.3':'Send Invite'
        }).catch((error) => { console.error(error); });
      }
      break;
  }
});


// Handle all the Text Inputs
xapi.event.on('UserInterface Message Prompt Response', (event) => {
  switch(event.FeedbackId){
    case 'create_invite':
      switch(event.OptionId){
        case '1':
          xapi.command('UserInterface Message TextInput Display', {
            FeedbackId: 'enter_number',
            Text: 'Please enter the mobile number to invite',
            InputType: 'Numeric',
            Placeholder: ' ',
            Duration: 0,
          }).catch((error) => { console.error(error); });
          break;
        case '2':
          xapi.command('UserInterface Message TextInput Display', {
            FeedbackId: 'enter_pmr',
            Text: 'Enter alternative PMR',
            InputType: 'SingleLine',
            Placeholder: PMR,
            Duration: 0,
          }).catch((error) => { console.error(error); });
          break;
        case '3':
          
          sendInvite(tempNumber, ((tempPMR != '') ? tempPMR : PMR));
          tempNumber = '';
          tempPMR = '';
          break;
      }
      break;
  }
});