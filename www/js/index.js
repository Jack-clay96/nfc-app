/*Backendless: https://backendless.com/docs/js/doc.html#welcome*/
/*https://phonegap.com/blog/2011/09/26/building-an-nfc-enabled-android-application-with-phonegap/*/
Backendless.initApp("3DCEF922-7E9F-7195-FF0F-9D3ECB207C00","F13A43EA-ED3B-2C2A-FF44-80306BEA1A00"); //AppID then JS API key
document.addEventListener("deviceready", onDeviceReady, false);

var message;

function updateDisplay() {
	nfc.removeTagDiscoveredListener();
}


// device APIs are available
    function onDeviceReady() {
	
	console.log("device ready!");
        
     /*Login Page */
     $( "#loginButton" ).click(function() {
        
        console.log("button clicked")
         
        var username = $('#email').val();
        var password = $('#password').val();
        
        function userLoggedIn( user )
        {
            console.log( "user has logged in" + user);
            location.href="#homePage";
        }
 
        console.log( username + ", " + password );
         Backendless.UserService.login( username, password, true )
            .then( userLoggedIn )
            .catch( gotError );
     });
        
        /*Register Page */
    $( "#register" ).click(function() {
        console.log("button clicked")
        var email = $("#emailReg").val();
        var name = $("#nameReg").val();
        var password = $("#passwordReg").val();
        
    function userRegistered( user )
        {
            console.log( "user has been registered" );
            location.href="#loginPage";
        }
 
        var user = new Backendless.User();
        user.email = email;
        user.name = name;
        user.password = password;
 
        Backendless.UserService.register( user ).then( userRegistered ).catch( gotError );
        
    });
        
        
    /* Forgot PWD Page */
    $("#ForgpassBut").click(function(){
        console.log("forgot password button clicked");
        var emailRestPwd= $("#emailPass").val(); //user email here
            
        function passwordRecoverySent()
        {
            console.log( "an email with a link to restore password has been sent to the user" );
            location.href="#loginPage";
        }

         Backendless.UserService.restorePassword(emailRestPwd)
         .then( passwordRecoverySent )
        .catch( gotError );
            
        });
        
    /*Home Page */
    $('#myPanel').enhanceWithin().panel();
    
// Read NDEF formatted NFC Tags
    $( "#read" ).click(function() {
        console.log("Button clicked");
        location.href="#nfcscan";
    nfc.addNdefListener (
        function (nfcEvent) {
            console.log("this function start");
            var tag = nfcEvent.tag,
            ndefMessage = tag.ndefMessage;

            // a payload that can be converted to a string.
            alert(nfc.bytesToString(ndefMessage[0].payload).substring(3)); //Shows the written message of the NFC tag
            console.log("this function end");
        },
        );
        updateDisplay();
});     

    
// Write to NFC tag
    $( "#write" ).click(function() {
        console.log("Button clicked");
        location.href="#nfcwrite";

//Write implementation
        function writeTag (nfcEvent) {
            console.log("writeTag function ran");
            message = [ndef.textRecord("Product"), ndef.textRecord("1")];
            nfc.write(message);
        }
//Listener
        nfc.addNdefListener(
            writeTag
        );
    updateDisplay();
    });
}

    function gotError( err ) // see more on error handling
    {
        console.log( "error message - " + err.message );
        console.log( "error code - " + err.statusCode );
    }