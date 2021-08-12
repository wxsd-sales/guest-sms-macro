import xapi from 'xapi';


// Add your own PMR information here
const PMR = '#########@webex.com";
// Specify the default duration in hours
const Default_Duration = '1'; 
// Customise your SMS message
const Message = 'Please join my meeting at: ';

// Add your own IMIConnect Webhook URL here
const IMI_URL = 'https://hooks-us.imiconnect.io/events/#########'
const GuestURL = 'https://wxsd.wbx.ninja/wxsd-guest-demo/create_url';


// This is the data we will be sending ot IMI Connect
const data = {
        expire_hours: Default_Duration
      , sip_target: PMR
    };

// Temporary values for alternative messages
let tempPMR = '';
let tempNumber = '';


// This function requests the guest link
function getGuestLink(Num, PMR){

  console.log('Num: ' + Num + ' PMR: ' + PMR);
  xapi.command('HttpClient Post', { 
    Header: ["Content-Type: application/json"], 
    Url: GuestURL,
    ResultBody: 'plaintext'
  }, 
    JSON.stringify(data))
  .then((result) => {
      
    var body = JSON.parse(result.Body)
    console.log(body.urls.Guest[0]);
    sendInvite(Num, body.urls.Guest[0]);
  })
  .catch((err) => {
    console.log("Failed: " + JSON.stringify(err));
    console.log(err);
    // Should close panel and notifiy errors
  });
}


// This function prepares the invite message and sends it to the
// imiconnect SMS service to the target mobile number
function sendInvite(Num, Link){

  console.log('Sending Invite');
  console.log('Number received: ' + Num);
  console.log('Link received: ' + Link);

  let invite = Message + Link;
  console.log(invite);

  var messagecontent = {
      number: Num
    , message: invite
  };

  xapi.command('HttpClient Post', {
    Header: ["Content-Type: application/json"], 
    Url: IMI_URL
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
          
          getGuestLink(tempNumber, ((tempPMR != '') ? tempPMR : PMR));
          tempNumber = '';
          tempPMR = '';
          break;
      }
      break;
  }
});
