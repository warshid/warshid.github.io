// MY SCRIPTS
// Use this area to add new scripts that you need for your site

function formatCurrency(num) {
    num = num.toString().replace(/\$|\|\s*,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + '$' + num + '.' + cents);
}


function unformatCurrency(num) {
    return num.toString().replace(/\$|\|\s*,/g, '');
}

// function to format a number with separators. returns formatted number.
// num - the number to be formatted
// decpoint - the decimal point character. if skipped, "." is used
// sep - the separator character. if skipped, "," is used
function formatNumber(num) {

    var decpoint = ".";
    var sep = ",";
    // check for missing parameters and use defaults if so
    if (arguments.length == 2) {
        sep = ",";
    }
    if (arguments.length == 1) {
        sep = ",";
        decpoint = ".";
    }
    // need a string for operations
    num = num.toString().replace(/\s*/g, '');
    // separate the whole number and the fraction if possible
    a = num.split(decpoint);
    x = a[0]; // decimal
    y = a[1]; // fraction
    z = "";


    if (typeof (x) != "undefined") {
        // reverse the digits. regexp works from left to right.
        for (i = x.length - 1; i >= 0; i--)
            z += x.charAt(i);
        // add seperators. but undo the trailing one, if there
        z = z.replace(/(\d{3})/g, "$1" + sep);
        if (z.slice(-sep.length) == sep)
            z = z.slice(0, -sep.length);
        x = "";
        // reverse again to get back the number

        for (i = z.length - 1; i >= 0; i--) {

            if (x == '' && (z.charAt(i) == 0 || isNaN(z.charAt(i)))) {
            }
            else {
                x += z.charAt(i);
            }
        }
        if (x == '' && z != '') {
            x = 0;
        }
        // add the fraction back in, if it was there
        if (typeof (y) != "undefined" && y.length > 0)
            x += decpoint + y;
    }
    return x;
}

function unFormatNumber(num) {
    return num.toString().replace(/\$|\,|\s*/g, '')
}


function helpwindow(theURL, winName, features) {
    window.open(theURL, winName, features);
}


function logout(sIndexNums) {
    computeTotalSharesIssued(sIndexNums);
    var frm = document.forms[0];
    if (confirm("Are you sure you would like to log out?")) {
        frm.hdOperation.value = 'logout';
        frm.submit();
    }
    else {
        return false;
    }
}

function displayDirectorPDFSection() {
/*
    if (document.getElementById('ctl00_ContentPlaceHolder1_btnDisplayDirectorPDF').checked == true) {
        document.getElementById("DisplayDirectorPDF").style.display = "block";
        document.getElementById("DisplayAttachedPDF").style.display = "block";
        document.getElementById("btnDisplayDirectorForm").disabled = true;
        document.getElementById("DisplayDirectorInfo").style.display = "none";
        //Jira:ICISTWO-1480
        document.getElementById("DisplayDirectorPDFsize").style.display = "block";
    }
    else {
        document.getElementById("DisplayDirectorPDF").style.display = "none";
        document.getElementById("DisplayAttachedPDF").style.display = "none";
        document.getElementById("btnDisplayDirectorForm").disabled = false;
        document.getElementById("DisplayDirectorInfo").style.display = "block";
        document.getElementById("hdTotalNumOfDirectors").value = 0;
        //Jira:ICISTWO-1480
        document.getElementById("DisplayDirectorPDFsize").style.display = "none";
    }
*/
    //Jira:ICISTWO-3483/3488
    var elem = document.getElementById('ctl00_ContentPlaceHolder1_FileUploadFilling');
    //checkFilingFileExtension(elem);

    if (elem.files.length > 0) {
        document.getElementById("trattachPdf").style.display = "block";
    }
    
    //Reset the Remove PDF Flag
    document.getElementById('ctl00_ContentPlaceHolder1_chkRemovePDF').checked = false;
    removeAllDirector('directorsList');
    document.getElementById("hdRows").value = 0;

}

function removeDirectorsSection() {
    if (document.getElementById('ctl00_ContentPlaceHolder1_FileUploadFilling').value != '') {
        document.getElementById("DisplayDirectorInfo").style.display = "none";
        document.forms[0].hdTotalNumOfDirectors.value = 0;
        removeAllDirector('directorsList');
        document.getElementById('ctl00_ContentPlaceHolder1_chkRemovePDF').checked = false;
    }
    //document.getElementById("hdRows").value = 0;
}

function hidePDFSection() {
    removePDF = document.getElementById('ctl00_ContentPlaceHolder1_chkRemovePDF').checked;
    if (removePDF) {
        document.getElementById('ctl00_ContentPlaceHolder1_FileUploadFilling').value = '';
        document.getElementById('ctl00_ContentPlaceHolder1_lblFileName').innerText = '';
        document.getElementById('ctl00_ContentPlaceHolder1_trattachPdf').style.display = 'none';
    }
}

function displayDirectorFormSection(obj, twoDelawareCode, countryNames, statesNames, arrayvalues) {


    //document.getElementById("DisplayAttachedPDF").style.display = "none";
    //document.getElementById("DisplayDirectorPDF").style.display = "none";
    document.getElementById("DisplayDirectorInfo").style.display = "block";
    //Remove PDF attached
    document.getElementById('ctl00_ContentPlaceHolder1_chkRemovePDF').checked = false;
    document.getElementById('ctl00_ContentPlaceHolder1_FileUploadFilling').value = '';
    document.getElementById('ctl00_ContentPlaceHolder1_lblFileName').innerText = '';
    document.getElementById('ctl00_ContentPlaceHolder1_trattachPdf').style.display = 'none';
    //    var fil = document.getElementById('ctl00_ContentPlaceHolder1_FileUploadFilling');
    //    fil.select();
    //    var n = fil.createTextRange();
    //    n.execCommand('delete');

    //Create the Number of Record
    CreateDirectorRows(obj, twoDelawareCode, countryNames, statesNames, arrayvalues);
}



function computeTotalSharesIssued(sTotalsIndexNum) {
    if (sTotalsIndexNum.length > 0) {
        var arrIndexNum = sTotalsIndexNum.split("~");
        arrIndexNum.sort(sortNumber);
        var begIndexNum = 1;
        var endIndexNum = 1;
        for (i = 0; i < arrIndexNum.length; i++) {
            endIndexNum = arrIndexNum[i];
            if ((endIndexNum != null) && (endIndexNum.length > 0)) {
                var iTotalShares = 0;
                var emptyFlag = true;
                for (j = begIndexNum; j <= endIndexNum; j++) {
                    var txtNumShares = document.getElementById("number_shares_issued" + j);

                    if (isNaN(txtNumShares.value)) {
                        txtNumShares.value = 0;
                    }
                    var numShares = txtNumShares.value;

                    if ((numShares != null) && (numShares.length > 0)) {
                        var iNumShares = eval(numShares);
                        iTotalShares = parseFloat(iTotalShares) + parseFloat(iNumShares);
                        emptyFlag = false;
                    }
                }
                var txtTotalShares = document.getElementById("total" + endIndexNum);
                if (emptyFlag == false) {
                    txtTotalShares.value = iTotalShares;
                }
                else {
                    txtTotalShares.value = "";

                }
                begIndexNum = eval(eval(endIndexNum) + 1);
            }
        }
    }

}

function callRecalc(sIndexNums) {
    computeTotalSharesIssued(sIndexNums);
    var frm = document.forms[0];
    frm.hdOperation.value = 'recalc';
    frm.submit();
}

function cancelRecalc(sIndexNums) {
    computeTotalSharesIssued(sIndexNums);
    var frm = document.forms[0];
    frm.hdOperation.value = 'cancelRecalc';
    frm.submit();
}

function proceedToReview(sIndexNums) {
    computeTotalSharesIssued(sIndexNums);
    var frm = document.forms[0];
    frm.hdOperation.value = 'review';
    frm.submit();
}

function openDirectorsPDF() {
    window.open("viewDirectorsPDF", "DirectorsPDF", "resizable=1,width=600,height=600");
}

function openHelpImage(sImageName, sImagePath) {
    var win = window.open("", "HelpImage", "resizable=1,width=850,height=650,location=no");
    win.document.write("<HTML><HEAD><TITLE>" + sImageName + "</TITLE></HEAD><BODY><IMG SRC='" + sImagePath + "'></IMG></BODY></HTML>");

}

function openDirectorsHelpPDF() {
    window.open("viewDirectorsHelpPDF", "DirectorsHelpPDF", "resizable=1,width=800,height=600");
}

function openContactUs()		// Adding Contact us button.
{
    window.open("viewContactUsCLF", "windowViewContactUs", "resizable=1,width=650,height=250");
}

function displayHelpText(i) {
    var hrefURL = "viewHelpText?Help=" + i;
    var windowName = "HelpText" + i;
    window.open(hrefURL, windowName, "resizable=1,width=450,height=150,left=300,top=300,scrollbars=1");
}

function finalSubmit() {
    if (confirm("Are you sure you want to do final Submission ?"))
        return true;
    else
        return false;
}

function forward(url) {
    window.location = url;
}

function SetNonUSPrin() {
    frm = document.forms[0];
    //Changes for Netscape and Firefox browser compatibity
    var NON_USPrin = document.getElementById('NON_USPrin');
    var USPrin = document.getElementById('USPrin');
    var NON_USPrinPhone = document.getElementById('NON_USPrinPhone');
    var USPrinPhone = document.getElementById('USPrinPhone');
    //END - Changes for Netscape and Firefox browser compatibity
    if (frm.chkNonUSPrin.checked) {
        NON_USPrin.style.display = "block";
        USPrin.style.display = "none";

        NON_USPrinPhone.style.display = "block";
        USPrinPhone.style.display = "none";

        //Setting the States Text to Empty when NON-US is checked
        //var txtStates = document.getElementById("txtPrinPlaceBusinessState");	// Changes for Netscape and Firefox browser compatibity
        var txtStates = document.getElementById("NON_USPrin");
        txtStates.value = "";

    }
    else {
        NON_USPrin.style.display = "none";
        USPrin.style.display = "block";

        NON_USPrinPhone.style.display = "none";
        USPrinPhone.style.display = "block";

        //Setting the States Dropdown to US when NON-US is unchecked
        //var drpStates = document.getElementById("drpPrinPlaceBusinessStates");	//Changes for Netscape and Firefox browser compatibity
        var drpStates = document.getElementById("USPrin");
        drpStates.value = "DE";

        //Setting the Country Dropdown to US when NON-US is unchecked
        var drpCountry = document.getElementById("drpPrinPlaceBusinessCountry");
        drpCountry.value = "US";

    }
}

function checkPrinPlaceBusinessUS() {
    var drpCountry = document.getElementById("drpPrinPlaceBusinessCountry");
    var chkNonUS = document.getElementById('chkNonUSPrin');

    if ((drpCountry.value != "US") && (!chkNonUS.checked)) {
        drpCountry.value = "US";
        alert('Since Non-US Checkbox is not checked, you can select only UNITED STATES');
    }
}

function moveToPrinPhone2() {
    var frm = document.forms[0];
    var phone1 = frm.txtPrinPlaceBusinessUSPh1.value;
    if (phone1.length == 3) {
        frm.txtPrinPlaceBusinessUSPh2.focus();
    }
}

function moveToPrinPhone3() {
    var frm = document.forms[0];
    var phone2 = frm.txtPrinPlaceBusinessUSPh2.value;
    if (phone2.length == 3) {
        frm.txtPrinPlaceBusinessUSPh3.focus();
    }
}


function checkOfficerUS() {
    var drpCountry = document.getElementById("drpOfficerCountry");
    var chkNonUS = document.getElementById('chkNonUSOfficer');

    if ((drpCountry.value != "US") && (!chkNonUS.checked)) {
        drpCountry.value = "US";
        alert('Since Non-US Checkbox is not checked, you can select only UNITED STATES');
    }
}


function SetNoAppointedOfficer() {
    frm = document.forms[0];
    var DisplayOfficer = document.getElementById('DisplayOfficer'); 	//Changes for Netscape and Firefox browser compatibity
    if (frm.chkNoAppointedOfficer.checked) {
        DisplayOfficer.style.display = "none";
    }
    else {
        DisplayOfficer.style.display = "block";
    }
}

function SetNoAppointedDirector(object) {

    frm = document.forms[0];
    var DisplayDirectorInfo = document.getElementById('DisplayDirectorInfo');
    var DisplayDirectorPDF = document.getElementById('DisplayDirectorPDF');
    var DisplayAttachedPDF = document.getElementById('DisplayAttachedPDF');

    if (object.checked) {

        DisplayDirectorInfo.style.display = "none";
        DisplayDirectorPDF.style.display = "none";
        DisplayAttachedPDF.style.display = "none";

        var displayNumOfDir = document.getElementById("ctl00_ContentPlaceHolder1_txtTotalNumOfDirectors").value;

        var numOfDir = 0;
        document.getElementById("hdTotalNumOfDirectors").value = 0;
        document.getElementById("hdRows").value = 0;
        document.getElementById("hdTotalNumOfDirectors").value = 0;
        document.getElementById("ctl00_ContentPlaceHolder1_txtTotalNumOfDirectors").value = 0;

        removeAllDirector('directorsList');

        var pdfdirector = document.getElementById('ctl00_ContentPlaceHolder1_btnDisplayDirectorPDF');
        var nodirectorcheck = document.getElementById('ctl00_ContentPlaceHolder1_chkNoAppointedDirector');

        document.getElementById('ctl00_ContentPlaceHolder1_chkRemovePDF').checked = false;

        if (pdfdirector != null) {
            if (pdfdirector.checked == false) {
                if (nodirectorcheck != null) {
                    if (nodirectorcheck.checked == true) {
                        document.getElementById('ctl00_ContentPlaceHolder1_chkRemovePDF').checked = true;
                    }
                }
            }
        }

        document.getElementById("btnDisplayDirectorForm").disabled = true
        document.getElementById("tdSubmitTD").style.display = "none";
        document.getElementById("tblDirectorTitle").style.display = "none";


    }
    else {
        //document.getElementById('ctl00_ContentPlaceHolder1_btnDisplayDirectorPDF').checked = false;
        document.getElementById("btnDisplayDirectorForm").disabled = false
        document.getElementById("tdSubmitTD").style.display = "block";
        document.getElementById("tblDirectorTitle").style.display = "block";

    }
}


function SetNonUSOfficer() {
    frm = document.forms[0];
    //Changes for Netscape and Firefox browser compatibity
    var NON_USOfficer = document.getElementById('NON_USOfficer');
    var USOfficer = document.getElementById('USOfficer');
    //END - Changes for Netscape and Firefox browser compatibity
    if (frm.chkNonUSOfficer.checked) {
        NON_USOfficer.style.display = "block";
        USOfficer.style.display = "none";


        //Setting the States Text to Empty when NON-US is checked
        //var txtStates = document.getElementById("txtOfficerState");	//Changes for Netscape and Firefox browser compatibity
        var txtStates = document.getElementById("NON_USOfficer");
        txtStates.value = "";

    }
    else {
        NON_USOfficer.style.display = "none";
        USOfficer.style.display = "block";

        //Setting the States Dropdown to US when NON-US is unchecked
        //var drpStates = document.getElementById("drpOfficerStates");	//Changes for Netscape and Firefox browser compatibity
        var drpStates = document.getElementById("USOfficer");
        drpStates.value = "DE";

        //Setting the Country Dropdown to US when NON-US is unchecked
        var drpCountry = document.getElementById("drpOfficerCountry");
        drpCountry.value = "US";
    }
}


function checkAuthorizationUS() {
    var drpCountry = document.getElementById("drpAuthorizationCountry");
    var chkNonUS = document.getElementById('chkNonUSAuthorization');

    if ((drpCountry.value != "US") && (!chkNonUS.checked)) {
        drpCountry.value = "US";
        alert('Since Non-US Checkbox is not checked, you can select only UNITED STATES');
    }
}

function SetNonUSAuthorization() {
    frm = document.forms[0];
    //BEGIN - Changes for Netscape and Firefox browser compatibity
    var NON_USAuthorization = document.getElementById('NON_USAuthorization');
    var USAuthorization = document.getElementById('USAuthorization');
    //END - Changes for Netscape and Firefox browser compatibity
    if (frm.chkNonUSAuthorization.checked) {
        NON_USAuthorization.style.display = "block";
        USAuthorization.style.display = "none";

        //Setting the States Text to Empty when NON-US is checked
        //var txtStates = document.getElementById("txtAuthorizationState");	//Changes for Netscape and Firefox browser compatibity
        var txtStates = document.getElementById("NON_USAuthorization");
        txtStates.value = "";

    }
    else {
        NON_USAuthorization.style.display = "none";
        USAuthorization.style.display = "block";

        //Setting the States Dropdown to US when NON-US is unchecked
        //var drpStates = document.getElementById("drpAuthorizationStates");	//Changes for Netscape and Firefox browser compatibity
        var drpStates = document.getElementById("USAuthorization");
        drpStates.value = "DE";

        //Setting the Country Dropdown to US when NON-US is unchecked
        var drpCountry = document.getElementById("drpAuthorizationCountry");
        drpCountry.value = "US";
    }
}





//**************DIRECTORS CODE********************//**************DIRECTORS CODE********************
//**************DIRECTORS CODE********************//**************DIRECTORS CODE********************

//Changes for Netscape and Firefox browser compatibity - DUMMY CODE
function SetNonUSDir() {
    frm = document.forms[0];
    if (frm.chkNonUSDir.checked) {
        NON_USDir.style.display = "block";
        USDir.style.display = "none";
    }
    else {
        NON_USDir.style.display = "none";
        USDir.style.display = "block";
    }
}

function rowIDNotDeleted(rowNum) {
    var AvlRowID = rowNum;
    var removedRow = document.forms[0].hdRowsRemoved.value;
    if ((removedRow != null) && (removedRow.length > 0)) {
        var removedRowArray = removedRow.split('~');
        removedRowArray.sort(sortNumber);
        removedRowArray.reverse();
        for (i = 0; i < removedRowArray.length; i++) {
            //alert('removedRowArray[i]'+removedRowArray[i]);
            //alert('AvlRowID'+AvlRowID);
            if (AvlRowID > (removedRowArray[i] - 0)) {
                break;
            }
            if ((removedRowArray[i] != '') && (AvlRowID == removedRowArray[i])) {
                //alert('Matches so deducting 1 from AvlRowID');
                AvlRowID = AvlRowID - 1;
            }
        }
    }

    return AvlRowID;
}

//Dummy function to force Numeric sort on Array in rowIDNotDeleted function
function sortNumber(a, b) {
    return a - b
}


function copyPreviousRow(rowNum) {
    var chkCopy = document.getElementById('chkDirectorCopy' + rowNum);
    if (chkCopy.checked) {
        prevRowNum = rowIDNotDeleted(rowNum - 1);

        if (prevRowNum >= 0) {

            var prevAddress = document.getElementById('txtDirectorAddress' + prevRowNum);
            var currAddress = document.getElementById('txtDirectorAddress' + rowNum);
            currAddress.value = prevAddress.value;


            var prevCity = document.getElementById('txtDirectorCity' + prevRowNum);
            var currCity = document.getElementById('txtDirectorCity' + rowNum);
            currCity.value = prevCity.value;

            var prevZip = document.getElementById('txtDirectorZip' + prevRowNum);
            var currZip = document.getElementById('txtDirectorZip' + rowNum);
            currZip.value = prevZip.value;

            var prevNonUS = document.getElementById('chkDirectorNonUS' + prevRowNum);


            if (prevNonUS.checked) {
                var currNonUS = document.getElementById('chkDirectorNonUS' + rowNum);
                currNonUS.checked = true;
                var DivUS = document.getElementById("USStates" + rowNum);
                DivUS.style.display = "none";
                var DivNonUS = document.getElementById("NonUSStates" + rowNum);
                DivNonUS.style.display = "block";

                var prevStates = document.getElementById('txtDirectorStates' + prevRowNum);
                var currStates = document.getElementById('txtDirectorStates' + rowNum);
                currStates.value = prevStates.value;

            }
            else {
                var currNonUS = document.getElementById('chkDirectorNonUS' + rowNum);
                currNonUS.checked = false;

                var DivUS = document.getElementById("USStates" + rowNum);
                DivUS.style.display = "block";
                var DivNonUS = document.getElementById("NonUSStates" + rowNum);
                DivNonUS.style.display = "none";

                var prevStates = document.getElementById('drpDirectorStates' + prevRowNum);
                var currStates = document.getElementById('drpDirectorStates' + rowNum);
                currStates.value = prevStates.value;

            }

            var prevCountry = document.getElementById('drpDirectorCountry' + prevRowNum);
            var currCountry = document.getElementById('drpDirectorCountry' + rowNum);
            currCountry.value = prevCountry.value;
            currCountry.disabled = false;

        }
        else {
            alert('There is no previous row to copy from');
        }
    }
    else {


        var currAddress = document.getElementById('txtDirectorAddress' + rowNum);
        currAddress.value = '';

        var currCity = document.getElementById('txtDirectorCity' + rowNum);
        currCity.value = '';

        var currZip = document.getElementById('txtDirectorZip' + rowNum);
        currZip.value = '';

        var currCountry = document.getElementById('drpDirectorCountry' + rowNum);

        currCountry.value = 'US';

        currCountry.disabled = true;

        var currNonUS = document.getElementById('chkDirectorNonUS' + rowNum);
        currNonUS.checked = false;
        var DivUS = document.getElementById("USStates" + rowNum);
        DivUS.style.display = "block";
        var DivNonUS = document.getElementById("NonUSStates" + rowNum);
        DivNonUS.style.display = "none";

        var currStates = document.getElementById('drpDirectorStates' + rowNum);
        currStates.value = '';


    }
}


function CheckPostalCodeForDirector(evt, rowNum) {

    frm = document.forms[0];
    var NonUSName = 'chkDirectorNonUS' + rowNum;
    var chkNonUS = document.getElementById(NonUSName);
    if (chkNonUS.checked == false) {
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        else
            return true;
    }
    else {
        return true;
    }
}

function hideShowStates(rowNum) {
    //alert('hideShowStates='+rowNum);
    frm = document.forms[0];
    var NonUSName = 'chkDirectorNonUS' + rowNum;
    //alert('NonUSName='+NonUSName);
    var chkNonUS = document.getElementById(NonUSName);
    //alert('chkNonUS.checked='+chkNonUS);

    //added for ICIS-4131    
    var dirzip = document.getElementById("txtDirectorZip" + rowNum);

    if (dirzip != null)
        dirzip.value = '';

    if (chkNonUS.checked) {
        var DivUS = document.getElementById("USStates" + rowNum);
        DivUS.style.display = "none";
        var DivNonUS = document.getElementById("NonUSStates" + rowNum);
        DivNonUS.style.display = "block";

        //Setting the States Text to Empty when NON-US is checked
        var txtStates = document.getElementById("txtDirectorStates" + rowNum);
        txtStates.value = "";

        document.getElementById('ctl00_ContentPlaceHolder1_lbldirState').innerText = "State/Province";

        //ICISTWO-1522
        //KPG 10-29-2015
        document.getElementById('ctl00_ContentPlaceHolder1_lbldirState').nextSibling.style.display = "none";


        var drpDirectorCountry = document.getElementById("drpDirectorCountry" + rowNum);
        drpDirectorCountry.selectedIndex = -1;
        //added for jira:icis-8342
        drpDirectorCountry.disabled = false;

        dirzip.maxLength = 10;
    }
    else {
        var DivUS = document.getElementById("USStates" + rowNum);
        DivUS.style.display = "block";
        var DivNonUS = document.getElementById("NonUSStates" + rowNum);
        DivNonUS.style.display = "none";

        //reset State Dropdown to DE
        var drpStates = document.getElementById("drpDirectorStates" + rowNum);
        drpStates.value = "Select State";

        //reset Country Dropdown to US
        var drpCountry = document.getElementById("drpDirectorCountry" + rowNum);
        drpCountry.value = "US";

        //added for jira:icis-8342
        drpCountry.disabled = true;
        document.getElementById('ctl00_ContentPlaceHolder1_lbldirState').innerText = "State";
        document.getElementById('ctl00_ContentPlaceHolder1_lbldirState').nextSibling.style.display = "block";

        dirzip.maxLength = 9;
    }

}


//this functions adds or removes rows from DirectorList
function CreateDirectorRows(obj, twoDelawareCode, countryNames, statesNames, arrayValues) {
    frm = document.forms[0];

    var arrayTwoDelawareCode = twoDelawareCode.split("#");
    var arrayCountryNames = countryNames.split("#");
    var arrayStatesNames = statesNames.split("#");


    var numOfDir = eval(document.getElementById('ctl00_ContentPlaceHolder1_txtTotalNumOfDirectors').value);
    if (numOfDir >= 0) {
        if (numOfDir == 0) {
            alert('To generate rows for Directors, please enter a number greater than Zero in Total Number of Directors');
        }

        var currNumOfDirectors = eval(frm.hdTotalNumOfDirectors.value);
        if ((numOfDir - currNumOfDirectors) > 0) {
            createDirectors(obj, (numOfDir - currNumOfDirectors), arrayTwoDelawareCode, arrayCountryNames, arrayStatesNames, arrayValues);

        }
        else if ((numOfDir - currNumOfDirectors) < 0) {
            var highestRowID = eval(frm.hdRows.value);
            var i = currNumOfDirectors - numOfDir;
            while (i > 0) {
                var avlHighestRowID = rowIDNotDeleted(highestRowID);
                if (avlHighestRowID >= 0) {
                    removeDirector(obj, avlHighestRowID);
                }
                i--;
            }
        }

        frm.hdTotalNumOfDirectors.value = numOfDir;
        frm.hdRowsRemoved.value = '';

    }
    else {
        alert('Please enter a number greater than or equal to Zero for Total Number of Directors');
    }

}


function FormatZip(original) {
    //Jira:ICISTWO-1911 -- KPG 11/24/15
    //Do not fomat non-US zip codes
    var nonUSchk;
    switch (original.id) {
        case "txtZipPrincipal":
            nonUSchk = document.getElementById('chkNonUSPrincipal');
            break;
        case "txtZipOfficer":
            nonUSchk = document.getElementById('chkNonUSOfficer');
            break;
        case "txtZipAuthorization":
            nonUSchk = document.getElementById('chkNonUSAuthorization');
            break;
        default:
            //Check for directorsX
            var dirZipNum;
            if (original.toString().startsWith("txtDirectorZip")) {
                dirZipNum = original.substr(original.indexOf("Zip") + 3);
                nonUSchk = document.getElementById('chkDirectorNonUS' + dirZipNum);
            }
            break;
    }

    if (!nonUSchk.checked) {

        if (original.value.length == original.getAttribute("maxlength")) {
            original.value = original.value.substring(0, 5) + '-' + original.value.substring(5);
        }
    }
}
function UnFormatZip(original) {
    //Jira:ICISTWO-1911 -- KPG 11/24/15
    //Do not fomat non-US zip codes
    var nonUSchk;
    switch (original.id) {
        case "txtZipPrincipal":
            nonUSchk = document.getElementById('chkNonUSPrincipal');
            break;
        case "txtZipOfficer":
            nonUSchk = document.getElementById('chkNonUSOfficer');
            break;
        case "txtZipAuthorization":
            nonUSchk = document.getElementById('chkNonUSAuthorization');
            break;
        default:
            //Check for directorsX
            var dirZipNum;
            if (original.toString().startsWith("txtDirectorZip")) {
                dirZipNum = original.substr(original.indexOf("Zip") + 3);
                nonUSchk = document.getElementById('chkDirectorNonUS' + dirZipNum);
            }
            break;
    }

    if (!nonUSchk.checked) {
        original.value = original.value.replace('-', '');
    }
}


function createDirectors(obj, numOfDir, arrayTwoDelawareCode, arrayCountryNames, arrayStatesNames, arrayValues) {


    var iNum = eval(numOfDir);
    var arrayvalues;
    var dirvalues;
    if (arrayValues != '') {
        arrayvalues = arrayValues.split(";;");
        dirvalues = new Array(iNum);
    }

    if ((arrayvalues != undefined) && (arrayvalues != '')) {
        for (i = 0; i <= iNum; i++) {
            dirvalues[i] = arrayvalues[i].split("|");
        }
    }
    if (numOfDir > 0) {
        var currRowNum = eval(frm.hdRows.value);
        var iCurrNum = eval(currRowNum);
        var finalRowNum = iNum + iCurrNum;
        frm.hdRows.value = finalRowNum;


        for (i = (currRowNum + 1); i <= finalRowNum; i++) {

            var tableobj = document.getElementById(obj);
            var row1 = document.createElement('tr')
            row1.id = 'TRD' + i;

            //One Cell With the chkRemoveDirector
            var cell1 = document.createElement('td')
            var chkTempRemoveDirector = document.createElement('INPUT');

            cell1.className = "franchisetabledatatax";
            cell1.width = '6%';
            chkTempRemoveDirector.type = "checkbox";
            chkTempRemoveDirector.id = 'chkRemoveDirector' + i;
            chkTempRemoveDirector.name = 'chkRemoveDirector' + i;
            chkTempRemoveDirector.onclick = new Function("testRemoveDirector", "removeDirector('" + obj + "', " + i + ");");
            cell1.appendChild(chkTempRemoveDirector);

            row1.appendChild(cell1);

            //One Cell With the txtFirstName
            var cell2 = document.createElement('td')
            cell2.width = '8%';
            cell2.className = "franchisetabledatatax";
            var txtTempName = document.createElement('INPUT');
            txtTempName.width = '60';
            txtTempName.type = "text";
            txtTempName.id = 'txtDirectorName' + i;
            txtTempName.name = 'txtDirectorName' + i;
            if (dirvalues != undefined) {
                txtTempName.value = dirvalues[i - 1][2];
            }
            txtTempName.Size = 5;
            txtTempName.maxLength = 40;
            cell2.appendChild(txtTempName);

            row1.appendChild(cell2);

            //Middle Name//

            var cellMiddle = document.createElement('td')
            cellMiddle.width = '12%';
            cellMiddle.className = "franchisetabledatatax";
            cellMiddle.align = 'center';
            var txtMiddleName = document.createElement('INPUT');
            txtMiddleName.width = '60';
            txtMiddleName.type = "text";
            txtMiddleName.id = 'txtMiddleName' + i;
            txtMiddleName.name = 'txtMiddleName' + i;
            if (dirvalues != undefined) {
                txtMiddleName.value = dirvalues[i - 1][4];
            }
            txtMiddleName.size = 5;
            txtMiddleName.maxLength = 30;
            cellMiddle.appendChild(txtMiddleName);

            row1.appendChild(cellMiddle);
            //End middle Name //

            //Last Name

            var cellLastName = document.createElement('td')
            cellLastName.width = '8%';
            cellLastName.className = "franchisetabledatatax";
            var txtcellLastName = document.createElement('INPUT');
            txtcellLastName.width = '60';
            txtcellLastName.type = "text";
            txtcellLastName.id = 'txtLastName' + i;
            txtcellLastName.name = 'txtLastName' + i;
            txtcellLastName.Size = 5;
            txtcellLastName.maxLength = 40;
            if (dirvalues != undefined) {
                txtcellLastName.value = dirvalues[i - 1][3];
            }
            cellLastName.appendChild(txtcellLastName);

            row1.appendChild(cellLastName);

            //End


            //One Cell With the chkDirectorCopy
            var cell3 = document.createElement('td')

            cell3.className = "franchisetabledatatax";
            cell3.width = '6%';
            var chkTempCopy = document.createElement('INPUT');
            chkTempCopy.id = 'chkDirectorCopy' + i;
            chkTempCopy.name = 'chkDirectorCopy' + i;

            //Added for Jira:ICIS-8497    
            if (i == 1) {
                chkTempCopy.type = "hidden";
            }
            else {
                chkTempCopy.type = "checkbox";
                chkTempCopy.onclick = new Function("test", "copyPreviousRow(" + i + ");");
            }

            cell3.appendChild(chkTempCopy);

            row1.appendChild(cell3);


            //One Cell With the chkDirectorNonUS
            var cell4 = document.createElement('td')
            cell4.className = "franchisetabledatatax";
            cell4.width = '8%';
            var chkTempNonUS = document.createElement('INPUT');
            chkTempNonUS.type = "checkbox";
            chkTempNonUS.id = 'chkDirectorNonUS' + i;
            chkTempNonUS.name = 'chkDirectorNonUS' + i;
            chkTempNonUS.value = 'Y';
            chkTempNonUS.onclick = new Function("testNonUS", "hideShowStates(" + i + ");");

            cell4.appendChild(chkTempNonUS);

            row1.appendChild(cell4);

            //One Cell With the txtDirectorAddress
            var cell5 = document.createElement('td')
            cell5.className = "franchisetabledatatax";
            cell5.width = '17%';
            cell5.align = 'center';
            var txtTempAddress = document.createElement('INPUT');
            txtTempAddress.width = '142';
            txtTempAddress.type = "text";
            txtTempAddress.id = 'txtDirectorAddress' + i;
            txtTempAddress.name = 'txtDirectorAddress' + i;

            if (dirvalues != undefined) {
                txtTempAddress.value = dirvalues[i - 1][0];
            }
            txtTempAddress.size = 24;
            //ICISTWO-452
            //JIRA-2960: Restricting Max length for Director's Address to 50
            txtTempAddress.maxLength = 50; //100;
            cell5.appendChild(txtTempAddress);

            row1.appendChild(cell5);

            //One Cell With the txtDirectorCity
            var cell6 = document.createElement('td')
            cell6.className = "franchisetabledatatax";
            cell6.width = '9%';
            var txtTempCity = document.createElement('INPUT');
            txtTempCity.width = '90';
            txtTempCity.type = "text";
            txtTempCity.id = 'txtDirectorCity' + i;
            txtTempCity.name = 'txtDirectorCity' + i;
            txtTempCity.size = 15;
            txtTempCity.maxLength = 25;
            if (dirvalues != undefined) {
                txtTempCity.value = dirvalues[i - 1][1];
            }
            cell6.appendChild(txtTempCity);

            row1.appendChild(cell6);

            var cell999 = document.createElement('td');  //Changes for Netscape and Firefox browser compatibity 
            //One Cell With the txtDirectorStates - ID="NonUSStates0" style="display:none" 
            var cell6A = document.createElement('td')		//Changes for Netscape and Firefox browser compatibity
            //var cell6A = document.createElement('div')		// Changes for Netscape and Firefox browser compatibity
            cell6A.id = "NonUSStates" + i;
            cell999.className = "franchisetabledatatax";
            //cell6A.className = "franchisetabledatatax";
            cell6A.width = '10%';
            cell6A.style.display = "none";
            var txtTempStates = document.createElement('INPUT');
            txtTempStates.width = '90';
            txtTempStates.type = "text";
            txtTempStates.id = 'txtDirectorStates' + i;
            txtTempStates.name = 'txtDirectorStates' + i;
            txtTempStates.size = 10;
            txtTempStates.maxLength = 25;
            if (dirvalues != undefined) {
                txtTempStates.value = dirvalues[i - 1][6];
            }
            cell6A.appendChild(txtTempStates);


            cell999.appendChild(cell6A); 		//Changes for Netscape and Firefox browser compatibity

            //One Cell With the drpDirectorStates -  ID="USStates0" style="display:block"
            var cell6B = document.createElement('td')		//Changes for Netscape and Firefox browser compatibity

            cell6B.id = "USStates" + i;
            //cell6B.className = "franchisetabledatatax";
            cell6B.width = '10%';
            cell6B.style.display = "block";
            var drpTempStates = document.createElement('SELECT');
            drpTempStates.id = 'drpDirectorStates' + i;
            drpTempStates.name = 'drpDirectorStates' + i;


            for (j = 0; j < drpState.options.length; j++) {
                var optTempStates = document.createElement("OPTION");
                optTempStates.setAttribute("value", drpState.options[j].value);
                var txtTempStates = document.createTextNode(drpState.options[j].text);
                optTempStates.appendChild(txtTempStates);
                drpTempStates.appendChild(optTempStates);
            }
            if (dirvalues != undefined) {
                drpTempStates.value = dirvalues[i - 1][5];
            }
            else {
                drpTempStates.value = 'Select State';
            }
            cell6B.appendChild(drpTempStates);



            cell999.appendChild(cell6B); 	//Changes for Netscape and Firefox browser compatibity

            row1.appendChild(cell999); 		//Changes for Netscape and Firefox browser compatibity				

            //One Cell With the txtDirectorZip
            var cell7 = document.createElement('td')
            cell7.className = "franchisetabledatatax";
            cell7.width = '12%';
            cell7.align = 'center';
            var txtTempZip = document.createElement('INPUT');
            txtTempZip.width = '100';
            txtTempZip.type = "text";
            txtTempZip.id = 'txtDirectorZip' + i;
            txtTempZip.name = 'txtDirectorZip' + i;

            //Replace isnumericKey function to CheckPostalCodeForDirector for ICIS-4131
            txtTempZip.onkeypress = new Function("testNumber", "return CheckPostalCodeForDirector(event," + i + ")");

            txtTempZip.size = 5;
            txtTempZip.maxLength = 9;

            //Added for Jira:ICIS-7421
            txtTempZip.onblur = new Function("testNumber1", "FormatZip(this)");
            txtTempZip.onfocus = new Function("testNumber2", "UnFormatZip(this)");


            if (dirvalues != undefined) {
                txtTempZip.value = dirvalues[i - 1][7];
            }
            cell7.appendChild(txtTempZip);

            row1.appendChild(cell7);

            //One Cell With the txtDirectorCountry
            var cell8 = document.createElement('td')
            cell8.className = "franchisetabledatatax";
            cell8.width = '12%';
            var drpTempCountry = document.createElement('SELECT');
            drpTempCountry.id = 'drpDirectorCountry' + i;
            drpTempCountry.name = 'drpDirectorCountry' + i;
            drpTempCountry.className += 'selectwidth';
            for (j = 0; j < drpCountry.options.length; j++) {
                var optTempCountry = document.createElement("OPTION");

                optTempCountry.setAttribute("value", drpCountry.options[j].value);
                var txtTempCountry = document.createTextNode(drpCountry.options[j].text);
                optTempCountry.appendChild(txtTempCountry);
                drpTempCountry.appendChild(optTempCountry);
            }
            drpTempCountry.onchange = new Function("testUSDRP", "checkDirectorUS(" + i + ");");

            if (dirvalues != undefined) {
                drpTempCountry.value = dirvalues[i - 1][8];
            }
            else {
                drpTempCountry.value = 'US';
            }
            cell8.appendChild(drpTempCountry);
            row1.appendChild(cell8);


            tableobj.appendChild(row1);
            if (dirvalues != undefined) {
                if ((dirvalues[i - 1][6] != null) && (dirvalues[i - 1][6] != '') || dirvalues[i - 1][8] != 'US') {
                    chkTempNonUS.checked = true;
                    var DivUS = document.getElementById("USStates" + i);
                    DivUS.style.display = "none";
                    var DivNonUS = document.getElementById("NonUSStates" + i);
                    DivNonUS.style.display = "block";
                    document.getElementById('ctl00_ContentPlaceHolder1_lbldirState').innerText = "State/Province";
                    document.getElementById('ctl00_ContentPlaceHolder1_lbldirState').nextSibling.style.display = "none";
                }
            }

            //Added for jira:icis-8342
            if (chkTempNonUS.checked) {
                drpTempCountry.disabled = false;
            }
            else {
                drpTempCountry.disabled = true;
            }



        }



    }
}


function checkDirectorUS(rowno) {
    var drpCountry = document.getElementById("drpDirectorCountry" + rowno);
    var chkNonUS = document.getElementById('chkDirectorNonUS' + rowno);

    if ((drpCountry.value != "US") && (!chkNonUS.checked)) {
        drpCountry.value = "US";
        alert('Since Non-US Checkbox is not checked, you can select only UNITED STATES');
    }
    else if ((drpCountry.value == "US") && (chkNonUS.checked)) {
        drpCountry.focus();
        //Added for jira:ICIS-8342
        drpCountry.selectedIndex = -1;
        alert('Since Non-US Checkbox is checked, you cannot select UNITED STATES');
    }
}


function removeDirector(objName, rowNum) {

    var TRobj = document.getElementById('TRD' + rowNum);

    if (TRobj) {
        while (TRobj.hasChildNodes()) {
            TRobj.removeChild(TRobj.lastChild);
        }
        var objID = document.getElementById(objName);
        objID.removeChild(TRobj);
    }
    document.forms[0].hdRowsRemoved.value = document.forms[0].hdRowsRemoved.value + '~' + rowNum;


    document.forms[0].hdTotalNumOfDirectors.value = (document.forms[0].hdTotalNumOfDirectors.value - 1);
    document.getElementById("ctl00_ContentPlaceHolder1_txtTotalNumOfDirectors").value = document.getElementById("hdTotalNumOfDirectors").value;
    document.getElementById("hdRows").value = document.getElementById("hdTotalNumOfDirectors").value;


    if (objID.rows.length > 1) {
        for (ii = 1; ii < objID.rows.length; ii++) {
            for (ch = 0; ch < objID.rows[ii].cells.length; ch++) {

                for (c = 0; c < objID.rows[ii].cells[ch].children.length; c++) {
                    var matches = objID.rows[ii].cells[ch].children[c].id.match(/\d+$/);
                    if (matches) {
                        //alert(matches[0]);

                        objID.rows[ii].cells[ch].children[c].id = objID.rows[ii].cells[ch].children[c].id.replace(matches[0], ii);
                        //alert(objID.rows[ii].cells[ch].children[c].id);
                        //check further childnodes

                        for (v = 0; v < objID.rows[ii].cells[ch].children[c].children.length; v++) {

                            var childmatches = objID.rows[ii].cells[ch].children[c].children[v].id.match(/\d+$/);
                            if (childmatches) {
                                //alert(childmatches[0]);

                                objID.rows[ii].cells[ch].children[c].children[v].id = objID.rows[ii].cells[ch].children[c].children[v].id.replace(childmatches[0], ii);
                                //alert(objID.rows[ii].cells[ch].children[c].children[v].id );


                            }
                        }
                    }
                }
            }
        }
    }
    else if (objID.rows.length == 1) {
        document.getElementById("DisplayDirectorInfo").style.display = "none";
    }

}

function removeAllDirector(objName) {
    var objID = document.getElementById(objName);
    for (var i = objID.rows.length - 1; i > 0; i--) {
        objID.deleteRow(i);
    }
}




function clearDirectorRow0() {
    var frm = document.forms[0];
    frm.chkRemoveDirector0.checked = false;
    frm.txtDirectorName0.value = '';
    frm.chkDirectorNonUS0.checked = false;
    frm.txtDirectorAddress0.value = '';
    frm.txtDirectorCity0.value = '';
    frm.txtDirectorStates0.value = '';
    frm.drpDirectorStates0.value = '';
    frm.txtDirectorZip0.value = '';
    frm.drpDirectorCountry0.value = 'US';

    var DivUS = document.getElementById("USStates0");
    DivUS.style.display = "block";
    var DivNonUS = document.getElementById("NonUSStates0");
    DivNonUS.style.display = "none";
}

//**************DIRECTORS CODE********************//**************DIRECTORS CODE********************
//**************DIRECTORS CODE********************//**************DIRECTORS CODE********************

function moveToCorporationPhoneFirst() {
    var frm = document.forms[0];
    var phone1 = frm.corporation_phone_area.value;
    if (phone1.length == 3) {
        frm.corporation_phone_first.focus();
    }
}

function moveToCorporationPhoneLast() {
    var frm = document.forms[0];
    var phone2 = frm.corporation_phone_first.value;
    if (phone2.length == 3) {
        frm.corporation_phone_last.focus();
    }
}


// BEGIN Numeric fields - allow only numerics to be keyed in
function extractNumber(obj, decimalPlaces, allowNegative) {
    var temp = obj.value;

    // avoid changing things if already formatted correctly
    var reg0Str = '[0-9]*';
    if (decimalPlaces > 0) {
        reg0Str += '\\.?[0-9]{0,' + decimalPlaces + '}';
    } else if (decimalPlaces < 0) {
        reg0Str += '\\.?[0-9]*';
    }
    reg0Str = allowNegative ? '^-?' + reg0Str : '^' + reg0Str;
    reg0Str = reg0Str + '$';
    var reg0 = new RegExp(reg0Str);
    if (reg0.test(temp)) return true;

    // first replace all non numbers
    var reg1Str = '[^0-9' + (decimalPlaces != 0 ? '.' : '') + (allowNegative ? '-' : '') + ']';
    var reg1 = new RegExp(reg1Str, 'g');
    temp = temp.replace(reg1, '');

    if (allowNegative) {
        // replace extra negative
        var hasNegative = temp.length > 0 && temp.charAt(0) == '-';
        var reg2 = /-/g;
        temp = temp.replace(reg2, '');
        if (hasNegative) temp = '-' + temp;
    }

    if (decimalPlaces != 0) {
        var reg3 = /\./g;
        var reg3Array = reg3.exec(temp);
        if (reg3Array != null) {
            // keep only first occurrence of .
            //  and the number of places specified by decimalPlaces or the entire string if decimalPlaces < 0
            var reg3Right = temp.substring(reg3Array.index + reg3Array[0].length);
            reg3Right = reg3Right.replace(reg3, '');
            reg3Right = decimalPlaces > 0 ? reg3Right.substring(0, decimalPlaces) : reg3Right;
            temp = temp.substring(0, reg3Array.index) + '.' + reg3Right;
        }
    }

    obj.value = temp;
}

function blockNonNumbers(obj, e, allowDecimal, allowNegative) {
    var key;
    var isCtrl = false;
    var keychar;
    var reg;

    if (window.event) {
        key = e.keyCode;
        isCtrl = window.event.ctrlKey
    }
    else if (e.which) {
        key = e.which;
        isCtrl = e.ctrlKey;
    }

    if (isNaN(key)) return true;

    keychar = String.fromCharCode(key);

    // check for backspace or delete, or if Ctrl was pressed
    if (key == 8 || isCtrl) {
        return true;
    }

    reg = /\d/;
    var isFirstN = allowNegative ? keychar == '-' && obj.value.indexOf('-') == -1 : false;
    var isFirstD = allowDecimal ? keychar == '.' && obj.value.indexOf('.') == -1 : false;

    return isFirstN || isFirstD || reg.test(keychar);
}


function createReadOnlyDirectors(obj, numOfDir, arrayValues) {
    var frm = document.forms[0];
    var iNum = eval(numOfDir);
    var arrayvalues;
    var dirvalues;
    if (arrayValues != '') {
        arrayvalues = arrayValues.split(";;");
        dirvalues = new Array(iNum);
    }

    //KPG 10/20/15 -- Jira:ICISTWO-479
    //delimit the inner array by | instead of ,
    //if (arrayvalues && arrayvalues[0].replace(/,/g, "").length > 0)
    if (arrayvalues && arrayvalues[0].replace(/[|]/g, "").length > 0) {
        if ((arrayvalues != undefined) && (arrayvalues != '')) {
            for (i = 0; i < iNum; i++) {
                //dirvalues[i] = arrayvalues[i].split(",");
                dirvalues[i] = arrayvalues[i].split("|");
            }
        }
        if (numOfDir > 0) {
            var currRowNum = eval(frm.hdRows.value);
            //alert('Sai'+currRowNum);
            var iCurrNum = eval(currRowNum);
            var finalRowNum = iNum + iCurrNum;
            frm.hdRows.value = finalRowNum;
            //alert('Sai'+finalRowNum);

            //Names Start with 0; RowNums Start with 1
            for (i = (currRowNum + 1); i <= finalRowNum; i++) {

                var tableobj = document.getElementById(obj);
                var row1 = document.createElement('tr')
                row1.id = 'TR' + i;
                //var display1 = document.createTextNode("Inspection: ");
                //cell1.appendChild(display1);	



                //One Cell With the txtFirstName
                var cell2 = document.createElement('td')
                cell2.width = '8%';
                cell2.className = "franchisetabledatatax";

                if (dirvalues != undefined) {
                    cell2.innerHTML = dirvalues[i - 1][2];
                }
                row1.appendChild(cell2);

                //Middle Name//

                var cellMiddle = document.createElement('td')
                cellMiddle.width = '8%';
                cellMiddle.className = "franchisetabledatatax";

                if (dirvalues != undefined) {
                    cellMiddle.innerHTML = dirvalues[i - 1][4];
                }


                row1.appendChild(cellMiddle);
                //End middle Name //

                //Last Name

                var cellLastName = document.createElement('td')
                cellLastName.width = '8%';
                cellLastName.className = "franchisetabledatatax";

                if (dirvalues != undefined) {
                    cellLastName.innerHTML = dirvalues[i - 1][3];
                }


                row1.appendChild(cellLastName);

                //End



                //One Cell With the chkDirectorNonUS
                var cell4 = document.createElement('td')
                cell4.className = "franchisetabledatatax";
                cell4.width = '8%';
                var chkTempNonUS = document.createElement('INPUT');
                chkTempNonUS.type = "checkbox";
                chkTempNonUS.id = 'chkDirectorNonUS' + i;
                chkTempNonUS.name = 'chkDirectorNonUS' + i;


                chkTempNonUS.disabled = true;
                //alert('chkTempNonUS.name='+chkTempNonUS.name);				
                cell4.appendChild(chkTempNonUS);
                if (dirvalues != undefined) {
                    if (dirvalues[i - 1][7] == "US") {
                        chkTempNonUS.checked = '';
                    }
                    else {
                        chkTempNonUS.checked = "checked";
                    }
                }
                row1.appendChild(cell4);

                //One Cell With the txtDirectorAddress
                var cell5 = document.createElement('td')
                cell5.className = "franchisetabledatatax";
                cell5.width = '17%';

                if (dirvalues != undefined) {
                    cell5.innerHTML = dirvalues[i - 1][0];
                }


                row1.appendChild(cell5);

                //One Cell With the txtDirectorCity
                var cell6 = document.createElement('td')
                cell6.className = "franchisetabledatatax";
                cell6.width = '9%';
                if (dirvalues != undefined) {
                    cell6.innerHTML = dirvalues[i - 1][1];
                }


                row1.appendChild(cell6);


                //One Cell With the state or province
                var cell6 = document.createElement('td')
                cell6.className = "franchisetabledatatax";
                cell6.width = '10%';


                if (dirvalues != undefined) {
                    cell6.innerHTML = dirvalues[i - 1][5];
                }
                //				cell7.appendChild(txtTempZip);

                row1.appendChild(cell6);






                //One Cell With the txtDirectorZip
                var cell7 = document.createElement('td')
                cell7.className = "franchisetabledatatax";
                cell7.width = '10%';


                if (dirvalues != undefined) {
                    cell7.innerHTML = dirvalues[i - 1][6];
                }
                //				cell7.appendChild(txtTempZip);

                row1.appendChild(cell7);

                //One Cell With the txtDirectorCountry
                var cell8 = document.createElement('td')
                cell8.className = "franchisetabledatatax";
                cell8.width = '8%';
                if (dirvalues != undefined) {
                    cell8.innerHTML = dirvalues[i - 1][7];
                }
                row1.appendChild(cell8);


                //tableobj.tBodies(0).appendChild(row1);
                tableobj.appendChild(row1);

            }
        }
    }
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function createStockDetails(obj, numOfDir, arrayValues) {

    var frm = document.forms[0];
    var iNum = eval(numOfDir);
    var arrayvalues;
    var dirvalues;
    if (arrayValues != '') {
        arrayvalues = arrayValues.split(";");
        dirvalues = new Array(iNum);
    }



    if ((arrayvalues != undefined) && (arrayvalues != '')) {
        for (i = 0; i < iNum; i++) {
            dirvalues[i] = arrayvalues[i].split(",");
        }
    }
    if (numOfDir > 0) {
        var currRowNum = eval(frm.hdstockRows.value);
        //alert('Sai'+currRowNum);
        var iCurrNum = eval(currRowNum);
        var finalRowNum = iNum + iCurrNum;
        //frm.hdstockRows.value = finalRowNum;
        //alert('Sai'+finalRowNum);

        //Names Start with 0; RowNums Start with 1
        for (i = (currRowNum + 1); i <= finalRowNum; i++) {
            var tableobj = document.getElementById(obj);
            var row1 = document.createElement('tr')
            row1.id = 'TR' + i;
            //var display1 = document.createTextNode("Inspection: ");
            //cell1.appendChild(display1);	



            //One Cell With the txtFirstName
            var cell1 = document.createElement('td')
            if (i == finalRowNum) {
                cell1.setAttribute("style", "border-right:1px solid black;");
            }
            else {
                cell1.setAttribute("style", "border-bottom:1px solid black;border-right:1px solid black;");
            }


            cell1.width = '27%';
            cell1.className = "franchisetabledata";
            cell1.id = "StockClass" + i;
            if (dirvalues != undefined) {
                if (dirvalues[i - 1][0].length == 0) {
                    cell1.innerHTML = "COMMON";
                }
                else {
                    cell1.innerHTML = dirvalues[i - 1][0];
                }
            }


            row1.appendChild(cell1);

            //Middle Name//
            var noOfShares = "";
            var cell2 = document.createElement('td')

            if (i == finalRowNum) {
                cell2.setAttribute("style", "border-right:1px solid black;");
            }
            else {
                cell2.setAttribute("style", "border-bottom:1px solid black;border-right:1px solid black;");
            }



            cell2.width = '20%';
            cell2.className = "franchisetabledata";
            cell2.id = "StockShares" + i;
            cell2.align = "right";
            if (dirvalues != undefined) {
                cell2.innerHTML = addCommas(dirvalues[i - 1][1]);
                noOfShares = dirvalues[i - 1][1];
            }


            row1.appendChild(cell2);
            //End middle Name //

            //Last Name

            var cell3 = document.createElement('td')

            if (i == finalRowNum) {
                cell3.setAttribute("style", "border-right:1px solid black;");
            }
            else {
                cell3.setAttribute("style", "border-bottom:1px solid black;border-right:1px solid black;");
            }


            cell3.width = '20%';
            cell3.className = "franchisetabledata";
            cell3.id = "StockParvalue" + i;
            cell3.align = "right";
            if (dirvalues != undefined) {
                cell3.innerHTML = dirvalues[i - 1][2];
            }


            row1.appendChild(cell3);

            //End



            //One Cell With the chkDirectorNonUS
            var cell4 = document.createElement('td')

            if (i != finalRowNum) {
                cell4.setAttribute("style", "border-bottom:1px solid black;");
            }



            cell4.className = "franchisetabledata";
            cell4.width = '33%';
            cell4.align = "center";
            var txtTempSharesIssued = document.createElement('INPUT');
            txtTempSharesIssued.width = '70';
            txtTempSharesIssued.type = "text";
            txtTempSharesIssued.dir = 'rtl';
            txtTempSharesIssued.id = 'txtTempSharesIssued' + i;
            txtTempSharesIssued.name = 'txtTempSharesIssued' + i;
            txtTempSharesIssued.size = 10;
            txtTempSharesIssued.maxLength = 9;

            //start//
            //http://jira.alliance-consulting.com/browse/ICIS-3353
            //IE BUG                   
            //txtTempSharesIssued.setAttribute("onkeypress", " return isNumberKey('this')");
            //txtTempSharesIssued.setAttribute("onchange", "return checkValue(txtTempSharesIssued" + i + "," + noOfShares +")");

            txtTempSharesIssued.onkeypress = function() {
                return isNumberKeyFiling('this'); //Ori function not available on render, created new functions in Filing.aspx
            };
            txtTempSharesIssued.onchange = function() {
                return checkValueFiling(txtTempSharesIssued.id, noOfShares);  //Ori function not available on render, created new functions in Filing.aspx
            };
            //end//

            if (dirvalues != undefined) {
                txtTempSharesIssued.value = dirvalues[i - 1][3];
            }
            cell4.appendChild(txtTempSharesIssued);

            row1.appendChild(cell4);




            //tableobj.tBodies(0).appendChild(row1);
            tableobj.appendChild(row1);

        }

    }
}

function isNumberKey(evt, cvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    else
        return true;
}

function checkValue(controlId, cvalue) {
    if (controlId != null) {
        if (parseInt(controlId.value) > parseInt(cvalue)) {
            alert("No of Issued shares can not be greater then no of shares");
            controlId.value = "";
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }

}


function createStockDetailsReport(obj, numOfDir, arrayValues) {

    var frm = document.forms[0];
    var iNum = eval(numOfDir);
    var arrayvalues;
    var dirvalues;
    if (arrayValues != '') {
        arrayvalues = arrayValues.split(";");
        dirvalues = new Array(iNum);
    }

    if ((arrayvalues != undefined) && (arrayvalues != '')) {
        for (i = 0; i < iNum; i++) {
            dirvalues[i] = arrayvalues[i].split(",");
        }
    }
    if (numOfDir > 0) {
        var currRowNum = eval(frm.hdstockReportRows.value);
        //alert('Sai'+currRowNum);
        var iCurrNum = eval(currRowNum);
        var finalRowNum = iNum + iCurrNum;
        frm.hdstockReportRows.value = finalRowNum;
        //alert('Sai'+finalRowNum);

        //Names Start with 0; RowNums Start with 1
        for (i = (currRowNum + 1); i <= finalRowNum; i++) {
            var tableobj = document.getElementById(obj);
            var row1 = document.createElement('tr')
            row1.id = 'TR' + i;
            //var display1 = document.createTextNode("Inspection: ");
            //cell1.appendChild(display1);	



            //One Cell With the txtFirstName
            var cell1 = document.createElement('td')
            cell1.width = '30%';
            cell1.className = "franchisetabledata";

            if (dirvalues != undefined) {
                cell1.innerHTML = dirvalues[i - 1][0];
            }
            row1.appendChild(cell1);

            //Middle Name//

            var cell2 = document.createElement('td')
            cell2.width = '25%';
            cell2.className = "franchisetabledata";
            cell2.align = "right";

            if (dirvalues != undefined) {
                cell2.innerHTML = addCommas(dirvalues[i - 1][1]);
            }


            row1.appendChild(cell2);
            //End middle Name //

            //Last Name

            var cell3 = document.createElement('td')
            cell3.width = '21%';
            cell3.className = "franchisetabledata";
            cell3.align = "right";

            if (dirvalues != undefined) {
                cell3.innerHTML = dirvalues[i - 1][2];
            }


            row1.appendChild(cell3);

            //End



            //One Cell With the chkDirectorNonUS
            var cell4 = document.createElement('td')
            cell4.className = "franchisetabledata";
            cell4.width = '24%';
            cell4.align = "right";

            if (dirvalues != undefined) {
                cell4.innerHTML = dirvalues[i - 1][3];
            }
            row1.appendChild(cell4);



            //tableobj.tBodies(0).appendChild(row1);
            tableobj.appendChild(row1);

        }

    }
}
function checkFilingFileExtension(elem) {
    var filePath = elem.value;
    document.getElementById('ctl00_ContentPlaceHolder1_lblFileName').innerText = '';
    if (filePath.indexOf('.') == -1) {
        document.getElementById('ctl00_ContentPlaceHolder1_trattachPdf').style.display = 'none';
        return false;
    }

    var validExtensions = new Array();
    var ext = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
    validExtensions[1] = 'pdf';

    for (var i = 0; i < validExtensions.length; i++) {
        if (ext == validExtensions[i]) {
            document.getElementById('ctl00_ContentPlaceHolder1_trattachPdf').style.display = 'block';
            var fileName = '';
            fileName = filePath.split('\\').pop();
            document.getElementById('ctl00_ContentPlaceHolder1_lblFileName').innerText = fileName;
            return true;
        }
    }
    document.getElementById('ctl00_ContentPlaceHolder1_lblFileName').innerText = '';
    document.getElementById('ctl00_ContentPlaceHolder1_trattachPdf').style.display = 'none';
    alert('The file extension ' + ext.toUpperCase() + ' is not allowed!' + "\nPlease select  PDF " +
            " file to upload.");
    elem.value = '';
    return false;
}



// END Numeric fields - allow only numerics to be keyed in
   
   
