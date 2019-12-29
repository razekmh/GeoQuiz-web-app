// The code is adopted from the web and mobile module practicals
// showing where the user clicks
    // create a custom popup
    var popup = L.popup();
    var point_latlng;
    var currentLayer; 
    // create an event detector to wait for the user's click event and then use the popup to show them where they clicked
    // note that you don't need to do any complicated maths to convert screen coordinates to real world     coordiantes - the Leaflet API does this for you
    function onMapClick(e) {
        point_latlng = e.latlng
        popup
        .setLatLng(point_latlng)
        .setContent("You clicked the map at " + point_latlng.toString())
        .openOn(mymap);
        // document.getElementById("location").innerHTML ="Your loaction is "+ point_latlng.lat + " and " + point_latlng.lng;
    }
    // now add the click event detector to the map
        mymap.on('click', onMapClick);

//the following function loads the points to the map
function loadquestions() {
    // call the getEarthquakes code
    // keep the alert message so that we know something is happening
    getQuestions();
    mapScroll();
};

// create the code to get the Earthquakes data using an XMLHttpRequest
function getQuestions() {
    client = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/getQuizPoints/"+ httpPortNumber;
    client.open('GET',url,true);
    client.onreadystatechange = questionsResponse; // note don't use questionsResponse() with brackets as that doesn't work
    client.send();
};
    

// create the code to wait for the response from the data server, and process the response once it is received
function questionsResponse() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (client.readyState == 4) {
    // once the data is ready, process the data
    var questionsdata = client.responseText;
    if (currentLayer){
        currentLayer.clearLayers();
    }
    loadQuestionsLayer(questionsdata);
    }
};

function loadQuestionsLayer(questionsdata) {
    // convert the text to JSON
    var questionsjson = JSON.parse(questionsdata);
    // add the JSON layer onto the map - it will appear using the default icons
    currentLayer = L.geoJson(questionsjson,{
        // use point to layer to create the points
        pointToLayer: function (feature, latlng){
            // in this case, we build an HTML DIV string
            // using the values in the data
            //console.log(feature.properties.correct_answer);
            var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h5>" + feature.properties.question_title + "</h5><br>";
            htmlString = htmlString + "<h6>"+feature.properties.question_text + "</h6><hr>";
            htmlString = htmlString + "<p id='"+feature.properties.id+"_1'>"+"Answer 1 is " + feature.properties.answer_1+"</p>";
            htmlString = htmlString + "<p id='"+feature.properties.id+"_1'>"+"Answer 2 is " + feature.properties.answer_2+"</p>";
            htmlString = htmlString + "<p id='"+feature.properties.id+"_1'>"+"Answer 3 is " + feature.properties.answer_3+"</p>";
            htmlString = htmlString + "<p id='"+feature.properties.id+"_1'>"+"Answer 4 is " + feature.properties.answer_4+"</p>";
            //htmlString = htmlString + "<button onclick='checkAnswer(" +feature.properties.id + ");return false;'>Submit Answer</button>";
            // now include a hidden element with the answer
            // in this case the answer is alwasy the first choice
            // for the assignment this will of course vary - you can use feature.properties.correct_answer
            htmlString = htmlString + "<p id=answer" + feature.properties.id + " >"+"Correct answer is number " +feature.properties.correct_answer+ "</p>";
            htmlString = htmlString + "</div>";
            return L.marker(latlng, {icon:testMarkerBlue}).bindPopup(htmlString);
            
            
        },
        
    }).addTo(mymap);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(currentLayer.getBounds());
};

var testMarkerRed = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'red'
    });
var testMarkerBlue = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'blue'
    });
var testMarkerGreen = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'green'
    });
//scrol to the map
function mapScroll() {
        document.getElementById("mapid").scrollIntoView();
    };