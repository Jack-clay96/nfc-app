/*Backendless: https://backendless.com/docs/js/doc.html#welcome*/

Backendless.initApp("3DCEF922-7E9F-7195-FF0F-9D3ECB207C00","F13A43EA-ED3B-2C2A-FF44-80306BEA1A00"); //AppID then JS API key
document.addEventListener("deviceready", onDeviceReady, false);


function updateDisplay() {
	
}


// device APIs are available
    function onDeviceReady() {
	
	console.log("device ready!");
    
    /* NFC SCANNING*/
    nfc.addNdefListener(callback, [onSuccess], [onFailure]); //TEST ON ACTUAL DEVICE. nfc not defined.
        
}

    function gotError( err ) // see more on error handling
    {
        console.log( "error message - " + err.message );
        console.log( "error code - " + err.statusCode );
    }
