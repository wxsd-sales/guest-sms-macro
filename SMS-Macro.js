import xapi from 'xapi';


// Add your own PMR information here
const PMR = "#########@webex.com";

// Specify the default duration in hours
const DEFAULT_DURATION = '1'; 

// Customise your SMS message
const MESSAGE = 'Please join my meeting at: ';

// Add your own IMIConnect Webhook URL here
const IMI_URL = 'https://hooks-us.imiconnect.io/events/########'
const GUEST_URL = 'https://wxsd.wbx.ninja/wxsd-guest-demo/create_url';


// Temporary values for alternative values
let tempPMR = '';
let tempNumber = '';

// Save the serial number for logging
let serialNumber = '';
xapi.Status.SystemUnit.Hardware.Module.SerialNumber
      .get()
      .then(value => {serialNumber = value;});


// Add the Button to the touch panel
xapi.command('UserInterface Extensions Panel Save', {
    PanelId: 'sms_invite'
}, `<Extensions>
  <Version>1.8</Version>
  <Panel>
    <Order>1</Order>
    <Type>Statusbar</Type>
    <Icon>Input</Icon>
    <Color>#A866FF</Color>
    <Name>SMS Invite</Name>
    <ActivityType>Custom</ActivityType>
  </Panel>
</Extensions>`);

// This function requests the guest link
function getGuestLink(number, pmr){

  console.log('Number: ' + number + ' Link: ' + pmr);

  let data = {
        expire_hours: DEFAULT_DURATION
      , sip_target: pmr
      , serial_number: serialNumber
      };

  console.log(data);

  xapi.command('HttpClient Post', { 
    Header: ["Content-Type: application/json"], 
    Url: GUEST_URL,
    ResultBody: 'plaintext'
  }, 
    JSON.stringify(data))
  .then((result) => {
    //console.log(result.Body);
    var body = JSON.parse(result.Body)
    //console.log(body.urls.Guest[0]);
    sendInvite(number, body.urls.Guest[0]);
  })
  .catch((err) => {
    console.log("Failed: " + JSON.stringify(err));
    console.log(err);
    // Should close panel and notifiy errors

    xapi.Command.UserInterface.Message.Alert.Display
        ({ Duration: 3
        , Text: 'Could not generate meeting link'
        , Title: 'Failure'});
  });
}


// This function prepares the invite message and sends it to the
// imiconnect SMS service to the target mobile number
function sendInvite(number, link){

  console.log('Sending Invite');
  console.log('Number received: ' + number);
  console.log('Link received: ' + link);
  console.log('Current state of PMR: ' + PMR);

  let invite = MESSAGE + link;
  console.log(invite);

  // Prepare the content to be sent to IMIConnect
  var messageContent = {
      number: number
    , message: invite
  };

  xapi.command('HttpClient Post', {
    Header: ["Content-Type: application/json"], 
    Url: IMI_URL
    }, 
      JSON.stringify(messageContent))
    .then((result) => {
      console.log("success: " + result.StatusCode)
   
      xapi.command("UserInterface Message Prompt Display", {
        Title: "Invite sent successfully"
      , Text: 'Would you like to automatically join: ' + ((tempPMR != '') ? tempPMR : PMR)
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


// Handle all the SMS Invite preparation screens
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
        case '1':   // This choice handles a new number input
          xapi.command('UserInterface Message TextInput Display', {
            FeedbackId: 'enter_number',
            Text: 'Please enter the mobile number to invite',
            InputType: 'Numeric',
            Placeholder: ' ',
            Duration: 0,
          }).catch((error) => { console.error(error); });
          break;
        case '2':   // This choice handles a new PMR input
          xapi.command('UserInterface Message TextInput Display', {
            FeedbackId: 'enter_pmr',
            Text: 'Enter alternative PMR',
            InputType: 'SingleLine',
            Placeholder: PMR,
            Duration: 0,
          }).catch((error) => { console.error(error); });
          break;
        case '3':   // This choice sends the meeting invitation

          console.log('PMR Before doing anything: ' + PMR);          
          getGuestLink(tempNumber, ((tempPMR != '') ? tempPMR : PMR));
          break;
      }
      break;
    case 'join_meeting':
      switch(event.OptionId){
        case '1': 
          console.log('PMR:' + PMR);
          console.log('Dialling the PMR: ' + ((tempPMR != '') ? tempPMR : PMR));
          xapi.command('Dial',{
            Number: ((tempPMR != '') ? tempPMR : PMR)
          })
          break;
        case '2':
          console.log('Not dialling PMR');
          break;
      }
      break;
  }
});
