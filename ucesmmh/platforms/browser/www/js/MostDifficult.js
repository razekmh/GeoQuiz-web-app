// The code is adopted from the web and mobile module practicals
var mostDifficultjson

//Send request to get the data from the server
var mostDifficultClient; // the global variable that holds the request
function getmostDifficult() {
    mostDifficultClient = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/getMostDifficult/";
    mostDifficultClient.open('GET',url,true);
    mostDifficultClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    mostDifficultClient.onreadystatechange = mostDifficultUploaded;
    mostDifficultClient.send();
}
// wait for the response from the data server, and process the response once it is received
function mostDifficultUploaded() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (mostDifficultClient.readyState == 4) {
    // pass the server response fot the processing function 
    mostDifficultdata= mostDifficultClient.responseText;
    loadmostDifficult(mostDifficultdata);
    }
}
// the table code is adopted from https://www.w3schools.com/html/html_tables.asp
// Load the response data in a table and change a div to display it. 
function loadmostDifficult(mostDifficultdata) {
    // convert the text to JSON
    mostDifficultjson = JSON.parse(mostDifficultdata);
    // console.log(mostDifficultjson);
    htmlstring = '<h5 style="text-align: center">Top FIve Most Difficult Questions </h5> <table> <tr> <th>Question title</th> <th>Question text</th> </tr>';
    for (var i = 0; i < 5; i ++){
        questionTitle = mostDifficultjson[0].array_to_json[i].question_title;
        questionText = mostDifficultjson[0].array_to_json[i].question_text;
        htmlstring = htmlstring + "<tr> <td> "+ questionTitle +"</td> <td>" + questionText +"</td> </tr>";
    };
    htmlstring = htmlstring + "</table><hr>";
    document.getElementById("mostDifficultTable").innerHTML = htmlstring;
    tableScroll();
};

// scroll the page to show the table in display
function tableScroll() {
    document.getElementById("mostDifficultTable").scrollIntoView();
};