// The code is adopted from the web and mobile module practicals
var correct_answer;
//the following function uploads the data collected from the form to the server
function startDataUpload(correct_answer) {
    var question_title = document.getElementById("question_title").value;
    var question_text = document.getElementById("question_text").value;
    var answer_1 = document.getElementById("answer_1").value;
    var answer_2 = document.getElementById("answer_2").value;
    var answer_3 = document.getElementById("answer_3").value;
    var answer_4 = document.getElementById("answer_4").value;
    var postString = "question_title="+question_title +"&question_text="+question_text+"&answer_1="+answer_1+"&answer_2="+answer_2+"&answer_3="+answer_3+"&answer_4="+answer_4+"&port_id="+httpPortNumber+"&correct_answer="+correct_answer+"&longitude="+point_latlng.lng+"&latitude="+point_latlng.lat;
    processData(postString)
    };

var client; // the global variable that holds the request
// function to send the request of data upload to the server
function processData(postString) {
    client = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/uploadQuestion";
    client.open('POST',url,true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = dataUploaded;
    client.send(postString);
}
// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (client.readyState == 4) {  
    }
}

//Check if the correct answer has been selected, then finds the correct answer and rests the form and deletes the popup from the map and reloads the questions 
function checkAnswer() {
    if (point_latlng){
    correct_answer = 0;
    for (var i=1; i < 5; i++) {
        if (document.getElementById("select_"+i).checked){ 
            correct_answer = i;
            startDataUpload(correct_answer);
            var form = document.getElementById("myform");
            form.reset();
            point_latlng = null;
            mymap.removeLayer(popup);
            loadquestions();
        };};
        if (correct_answer == 0 ) {alert("Please select a correct answer")};
    }
    else { 
        alert("Please Click on the map to select a location for the question");
    };};


