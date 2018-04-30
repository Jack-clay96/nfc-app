/*Backendless: https://backendless.com/docs/js/doc.html#welcome*/
/*https://phonegap.com/blog/2011/09/26/building-an-nfc-enabled-android-application-with-phonegap/*/
Backendless.initApp("3DCEF922-7E9F-7195-FF0F-9D3ECB207C00","F13A43EA-ED3B-2C2A-FF44-80306BEA1A00"); //AppID then JS API key
document.addEventListener("deviceready", onDeviceReady, false);

var message;
var partButton = "partButton";
var dataQueryBuilder = Backendless.DataQueryBuilder.create()
dataQueryBuilder.setSortBy( ["created"] );
$(document).on("pageshow","#homePage", onPageShow);
$(document).on("click", "#addConfirmButton", onAddPart);
$(document).on("pageshow","#settingsPage", onsettingPageShow);

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

/* Home Page */
 function onPageShow() {
	console.log("page shown");
    Backendless.Data.of("productInfo").find(dataQueryBuilder).then(processResults).catch(error); // find (...) is used here to order the list by created.
    
    }

//LISTING THE DATABASE
function processResults(productInfo) {
        $("#partList").empty();
        
    for (var i = 0; i<productInfo.length; i++)
        {
            //display the first task in an array of tasks. alert(tasks[2].Task)
            $("#partList").append("<li><a class=" + partButton +" id=" + i  + " >" +productInfo[i].ProductName+"</a></li>"); //#partList where to show list in html. productInfo[i] is database. productInfo is attribute
        }
            
        //refresh the listview
        $("#partList").listview("refresh");
    
    $(".partButton").click(function(){
    var arrayId = this.id + 1;
    console.log(productInfo[arrayId].ProductName);
    //query backendless for parts matching this part ID. FOR GETTING DATA SPECIFIC FOR Part
    Backendless.Data.of( "productInfo" ).findById( productInfo[arrayId].objectId )
    .then( function( result ) {
    //data about event here
    console.log("Name from array: " + productInfo[arrayId].ProductName);
    $("#headerPartName").append(productInfo[arrayId].ProductName);
    })
    .catch( function( error ) {
        
        console.log("db error: " + error);
    });
         
    console.log("button clicked");
    location.href="#partPage";
    });
}

/* SETTINGS PART PAGE */
 function onsettingPageShow() {
	console.log("Setting page shown");
    Backendless.Data.of("productInfo").find(dataQueryBuilder).then(optionListResults).catch(error); // find (...) is used here to order the list by created.
    }
function optionListResults(productInfo){
        $("#selectPartName").empty();
    
    for (var i = 0; i<productInfo.length; i++)
        {
            $("#selectPartName").append("<option>" + productInfo[i].ProductName + "</option>");
        }
            //refresh the listview
        $("#selectPartName").listview("refresh");
}

// ADDING A PART - USING BUTTON
function onAddPart() {
    console.log("add Part button clicked");
    //get text input from field
    var Parttext = $("#newPartName").val();
    var Quantitytext = $("#newQuantity").val();
    var Locationtext = $("#newLocation").val();
    var Descriptiontext = $("#newDescription").val();
    //Adding to backendless
    var newPart = {};
    newPart.ProductName = Parttext;
    newPart.Quantity = Quantitytext;
    newPart.Location = Locationtext;
    newPart.Description = Descriptiontext;
    Backendless.Data.of("productInfo").save(newPart).then(saved).catch(error);
	}

// EDITING A PART - USING BUTTON
function onEditPart() {
    console.log("Edit Part button clicked");
    
    var editPart = {};
    if($("#selectPartName").val() === editPart.ProductName)
        {
            //get text input from field
            var Locationtext = $("#editLocation").val();
            editPart.Location = Locationtext;
            Backendless.Data.of("productInfo").save(editPart).then(saved).catch(error);
        }
}

function saved(savedTask) {
    console.log( "new Contact instance has been saved" + savedTask);
    alert("Database has been updated");
}

/* Errors */
    function error(err) {
        alert("database error: " + err);
    }
    function gotError( err ) // see more on error handling
    {
        console.log( "error message - " + err.message );
        console.log( "error code - " + err.statusCode );
    }