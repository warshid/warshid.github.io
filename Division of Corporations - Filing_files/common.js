function mask(countryObj,textbox,loc,delim){ 
str = textbox.value;
var locs = loc.split(','); 
var isMaskNeeded = false;
str = str.replace('-','');

if (countryObj.selectedIndex==null)return;
var _ddlCountrySelectedValue = countryObj.options[countryObj.selectedIndex].value;
    switch (_ddlCountrySelectedValue) {
        case "US":
            isMaskNeeded = true;
        break; 
        default:
             isMaskNeeded = false;
    }
if (isMaskNeeded)
{    
    for (var i = 0; i <= locs.length; i++){ 
    for (var k = 0; k <= str.length; k++){ 
     if (k == locs[i]){ 
      if (str.substring(k, k+1) != delim){ 
      if (str.substring(k,str.length).length > 0)
        {         
            str = str.substring(0,k) + delim + str.substring(k,str.length) 
        }
      } 
     } 
    } 
    }
 }
textbox.value = str.substring(0,10)  ;
} 
 
function showorg(optorganisation,rfdvalidatorLastname,rfdvalidatorOrganizationName)
{
    document.getElementById('orgname').style.display = 'none';
    document.getElementById('ownername').style.display = 'block';
    document.getElementById(optorganisation.id).checked = false;         
    var oVal = document.getElementById(rfdvalidatorLastname.id);
    ValidatorEnable(oVal, true);    
    var oVal = document.getElementById(rfdvalidatorOrganizationName.id);
    ValidatorEnable(oVal, false);  
}
function hideorg(optindividual,rfdvalidatorOrganizationName,rfdvalidatorLastname)
{
    document.getElementById('orgname').style.display = 'block';
    document.getElementById('ownername').style.display = 'none';
    document.getElementById(optindividual.id).checked = false;    
    var oVal = document.getElementById(rfdvalidatorOrganizationName.id);
    ValidatorEnable(oVal, true);
    var oVal = document.getElementById(rfdvalidatorLastname.id);
    ValidatorEnable(oVal, false); 
}
function showprovince(drpcountry,lblstate ,  txtstate , drpstate ,rfdstatevalidator , rfdvalidatorprovince,drpcounty,rfdpostalcode,rfdcounty)
{

    var myindex  = drpcountry.selectedIndex;
    var SelValue = drpcountry.options[myindex].value;        
     var cbo = document.getElementById(drpstate.id);
     var cboValue = cbo.options[cbo.selectedIndex].value;
        
    
    if (SelValue =='US')
    {
           document.getElementById(drpstate.id).style.display = 'block';             
           document.getElementById(txtstate.id).style.display = 'none';
           document.getElementById(lblstate.id).innerText = "State:";
           var oVal = document.getElementById(rfdpostalcode.id);
           ValidatorEnable(oVal, true);  
           
           var oVal = document.getElementById(rfdstatevalidator.id);
           ValidatorEnable(oVal, true);  
           var oVal = document.getElementById(rfdvalidatorprovince.id);
           ValidatorEnable(oVal, false);             
           document.getElementById(drpstate.id).selectedIndex = 0;
          if (cboValue == 'DE')
          {
                 document.getElementById(drpcounty.id).disabled = false;            
                   var oVal = document.getElementById(rfdcounty.id);
                   ValidatorEnable(oVal, true);                  
           }
          else    
          {                
             document.getElementById(drpcounty.id).selectedIndex = 0;
             document.getElementById(drpcounty.id).disabled = true;                       
              var oVal = document.getElementById(rfdcounty.id);
                   ValidatorEnable(oVal, false);
             }
    }
    else
    {
            //document.getElementById(drpstate.id).style.display = 'none';
            //document.getElementById(txtstate.id).style.display = 'block';
            document.getElementById(lblstate.id).innerText = "Province:"; 
            // var oVal = document.getElementById(rfdpostalcode.id);
           //ValidatorEnable(oVal, false);  
          
            //var oVal = document.getElementById(rfdstatevalidator.id);
            //ValidatorEnable(oVal, false);
            //var oVal = document.getElementById(rfdvalidatorprovince.id);
            //ValidatorEnable(oVal, true);  
             //var oVal = document.getElementById(rfdcounty.id);
                   //ValidatorEnable(oVal, false); 
             //document.getElementById(drpcounty.id).selectedIndex = 0;
             //document.getElementById(drpcounty.id).disabled = true;
    }
}

function Trim(input)
  {
    var lre = /^\s*/; 
    var rre = /\s*$/; 
    input = input.replace(lre, ""); 
    input = input.replace(rre, ""); 
    return input; 
   }
 
   // filter the files before Uploading for text file only  
   function CheckForTestFile(id) 
   {
        var file = id;
        var fileName=id.value;        
        //Checking for file browsed or not 
        if (Trim(fileName) =='' )
        {
            alert("Please select a file to upload!!!");
            file.focus();
            return false;
        }
 
       //Setting the extension array for diff. type of text files 
       var extArray = new Array(".pdf");       
 
       //getting the file name
       while (fileName.indexOf("\\") != -1)
         fileName = fileName.slice(fileName.indexOf("\\") + 1);
 
       //Getting the file extension                     
       var ext = fileName.slice(fileName.indexOf(".")).toLowerCase();
 
       //matching extension with our given extensions.
       for (var i = 0; i < extArray.length; i++) 
       {
         if (extArray[i] == ext) 
         { 
           return true;
         }
       }  
         alert("Please only upload PDF files "  + "\nPlease select a new "
           + "file to upload and submit again.");
           file.focus();
           file.value='';
           return false;                
   }    
function checkFileExtension(elem) {
        var filePath = elem.value;

        if(filePath.indexOf('.') == -1)
            return false;
        
        var validExtensions = new Array();
        var ext = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
        validExtensions[10] = 'pdf';
    
        for(var i = 0; i < validExtensions.length; i++) {
            if(ext == validExtensions[i])
                return true;
        }

        alert('The file extension ' + ext.toUpperCase() + ' is not allowed!' + "\nPlease select  PDF " +
            " file to upload.");
        return false;
    } 
    
    
function isNumberKey(evt)
 {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
   else              
    return true;       
}

function autotabnumber(evt,original,destination)
{
 var charCode = (evt.which) ? evt.which : event.keyCode
 if ((charCode > 47 && charCode < 58) || (charCode > 95 && charCode < 106))
{        
    if (original.getAttribute&&original.value.length==original.getAttribute("maxlength"))
    document.getElementById(destination).focus();
}
}
function autotabtext(evt,original,destination)
{

   var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode != 9) && (charCode != 35) && (charCode != 16) && (charCode != 37)&& (charCode != 38)&& (charCode != 39))
    {
   if (original.getAttribute&&original.value.length==original.getAttribute("maxlength"))
    document.getElementById(destination).focus();
    }
}

// Addition from different files //

// Moved from Filer.aspx //

function FaxValidate(source, clientside_arguments)
   {     

     var phone1 = document.getElementById('<%=txtFax1.ClientID %>');
     var phone2 = document.getElementById('<%=txtFax2.ClientID %>');
     var phone3 = document.getElementById('<%=txtFax3.ClientID %>');
       var phonenumber = phone1.value.length + phone2.value.length + phone3.value.length   
           
       if ((phonenumber < 10) && (phonenumber > 0))
       {
         clientside_arguments.IsValid=false;
       }
       else
       {
        clientside_arguments.IsValid=true;
       }
}      

function PhoneValidate(source, clientside_arguments)
   {     

     var phone1 = document.getElementById('<%=txtphone1.ClientID %>');
     var phone2 = document.getElementById('<%=txtphone2.ClientID %>');
     var phone3 = document.getElementById('<%=txtPhone3.ClientID %>');
       var phonenumber = phone1.value.length + phone2.value.length + phone3.value.length       
       if ((phonenumber < 10) && (phonenumber > 0))
       {
         clientside_arguments.IsValid=false;
       }
       else
       {
        clientside_arguments.IsValid=true;
       }
}      


function validatepage()
{ 
var validationsummary1 = '<%= ValidationSummary1.ClientID %>';
var validationsummary2 = '<%= ValidationSummary2.ClientID %>';
Page_ClientValidate("FilerGroup");
if(Page_IsValid)
{
         if (Page_ClientValidate("ServerSide"))
         {
          return true;
         }
         else         
         {
          document.getElementById(validationsummary1).style.display = 'none';                  
          document.getElementById(validationsummary2).style.display = 'block';  
          return false;
         }
 }
 else
 {
      document.getElementById(validationsummary1).style.display = 'block'; 
      document.getElementById(validationsummary2).style.display = 'none';   
      return false;
 }
 }

// Moved from Debtor.aspx //

function autotab(currentField,nextField)
{
    if (currentField.value.length == currentField.maxLength)
    {
          // Retreive the next field in the tab sequence, and give it the focus.
        document.getElementById(nextField).focus();
    }
    return true;
}
function Validatedate(evt,currentField,nextField)
 {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 46 || charCode > 57))
            return false;
   if (currentField.value.length == currentField.maxLength)
    {
          // Retreive the next field in the tab sequence, and give it the focus.
        document.getElementById(nextField).focus();
    }            
    return true;       
}


// Moved from Collateral.aspx //

function checkFileExtension(elem) {
        var filePath = elem.value;

        if(filePath.indexOf('.') == -1)
            return false;
        
        var validExtensions = new Array();
        var ext = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
        validExtensions[1] = 'pdf';
    
        for(var i = 0; i < validExtensions.length; i++) 
        {
            if(ext == validExtensions[i])
                return true;
        }
        alert('The file extension ' + ext.toUpperCase() + ' is not allowed!' + "\nPlease select  PDF " +
            " file to upload.");            
        elem.value = '';
        return false;
    } 
    
// Moved from Realestatedescription.aspx //

function RealEstateValidate(source, clientside_arguments)
   {     

     var realestatetext = document.getElementById('<%=txtRealEstateDescription.ClientID %>');
     var realestatefile = document.getElementById('<%=FileUploadRealEstate.ClientID %>');

     if (realestatetext && realestatefile) {
         if ((realestatetext.value == '') && (realestatefile.value == '')) {
             clientside_arguments.IsValid = false;
         }
         else {
             clientside_arguments.IsValid = true;
         }
     }
     else {
         clientside_arguments.IsValid = true;
     }
}


      
function ZipCodePostalCodeValidator(source, clientside_arguments) {

    //debugger;
    var sourceClientId = source.id;
    var clientIdPrefix = sourceClientId.replace("vcPostalCode", "");
    var _ddlCountry = document.getElementById(clientIdPrefix + "ddlCountry");
    var _ddlCountrySelectedValue = _ddlCountry.options[_ddlCountry.selectedIndex].value;
    //var mytest = isValidPostalCode(clientside_arguments.Value, _ddlCountrySelectedValue);
    clientside_arguments.IsValid = isValidPostalCode(clientside_arguments.Value, _ddlCountrySelectedValue);
}

function isValidPostalCode(postalCode, countryCode) {
    switch (countryCode) {
        case "US":
            postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
            break;
        case "CA":
            postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
            break;
        default:
            postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
    }
    return postalCodeRegex.test(postalCode);
}
function isEmailValid(str) {
    if (str.length == 0) return true;
    re = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    if (str.match(re)) { return true; } else { return false; };
}
