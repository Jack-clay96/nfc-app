/*Backendless: https://backendless.com/docs/js/doc.html#welcome*/
/*https://phonegap.com/blog/2011/09/26/building-an-nfc-enabled-android-application-with-phonegap/*/
Backendless.initApp("3DCEF922-7E9F-7195-FF0F-9D3ECB207C00","F13A43EA-ED3B-2C2A-FF44-80306BEA1A00"); //AppID then JS API key
document.addEventListener("deviceready", onDeviceReady, false);


function updateDisplay() {
	
}


// device APIs are available
    function onDeviceReady() {
	
	console.log("device ready!");
    
// Read NDEF formatted NFC Tags
    $( "#read" ).click(function() {
        console.log("Button clicked");
        location.href="#nfcscan";
        
    nfc.addNdefListener (
        function (nfcEvent) {
            console.log("this function start");
            var tag = nfcEvent.tag,
            ndefMessage = tag.ndefMessage;

            // dump the raw json of the message
            // note: real code will need to decode
            // the payload from each record
            //alert(JSON.stringify(ndefMessage)); //Shows other info about the NFC tag

            // assuming the first record in the message has
            // a payload that can be converted to a string.
            alert(nfc.bytesToString(ndefMessage[0].payload).substring(3)); //Shows the written message of the NFC tag
            console.log("this function end");
        },
        );
        nfc.removeNdefListener(nfcEvent);
}); 
        
    
   /* //Write to NFC tag
    $( "#write" ).click(function() {
        nfc.addNdefListener(
            writeTag,

            function() {
                console.log("Success.");
            },
            function() {
                console.log("Fail.");
            }
        ),
    });*/
}

