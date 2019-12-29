// The code is adopted from the web and mobile module practicals
var lastWeeklayer
var lastWeekjson

//check if the last week questions are already loaded and are the current displayed points on the map 
function checklastWeek(){
    if (mymap.hasLayer(lastWeeklayer) && currentLayer == lastWeeklayer){
        mymap.removeLayer(lastWeeklayer);
        mapScroll();
    }
    else {getlastWeek();
    }
}

// Check if there's a layer of points currently displayed, and remove it before adding the new layer
function getlastWeek() {
    if (currentLayer)  {
        currentLayer.clearLayers();
    };
    processlastWeek();
    };


var lastWeekClient; // the global variable that holds the request
//Send the request to the server to get the last week questions
function processlastWeek() {
    lastWeekClient = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/getlastWeek/";
    lastWeekClient.open('GET',url,true);
    lastWeekClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    lastWeekClient.onreadystatechange = lastWeekUploaded;
    lastWeekClient.send();
};

// wait for the response from the data server, and process the response once it is received
function lastWeekUploaded() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (lastWeekClient.readyState == 4) {
        lastWeekdata= lastWeekClient.responseText;
        loadlastWeek(lastWeekdata);
        mapScroll();
    }
}

//Process the server response and add the questions to the map
function loadlastWeek(lastWeekdata) {
    // convert the text to JSON
    var lastWeekjson = JSON.parse(lastWeekdata);
    // add the JSON layer onto the map - it will appear using the default icons
    currentLayer = L.geoJson(lastWeekjson,{
        // use point to layer to create the points
        pointToLayer: function (feature, latlng){
            var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h4>" + feature.properties.question_title + "</h4>";
            htmlString = htmlString + "<h5>"+feature.properties.question_text + "</h5>";
            htmlString = htmlString + "<h6 id='"+feature.properties.id+"_1'>"+"Answer 1 is " + feature.properties.answer_1+"</h6>";
            htmlString = htmlString + "<h6 id='"+feature.properties.id+"_1'>"+"Answer 2 is " + feature.properties.answer_2+"</h6>";
            htmlString = htmlString + "<h6 id='"+feature.properties.id+"_1'>"+"Answer 3 is " + feature.properties.answer_3+"</h6>";
            htmlString = htmlString + "<h6 id='"+feature.properties.id+"_1'>"+"Answer 4 is " + feature.properties.answer_4+"</h6>";
            htmlString = htmlString + "<h6 id=answer" + feature.properties.id + " >"+"Correct answer is number " +feature.properties.correct_answer+ "</h6>";
            htmlString = htmlString + "</div>";
            return L.marker(latlng, {icon:testMarkerBlue}).bindPopup(htmlString);
        },
        
    }).addTo(mymap);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(currentLayer.getBounds());
    lastWeeklayer = currentLayer
};