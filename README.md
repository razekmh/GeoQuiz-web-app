# ucesmmh_questions
*Please check the [README file of the Server Repository](https://github.com/ucl-geospatial/ucesmmh_server/blob/master/README.md) first, Before reading this file.*

## System Requirements:
This application is desinged to run both on phones through the PhoneGap application and on PCs through web browsers. Therefore no additional requirments are needed if the ones mentioned in the [server repository](https://github.com/ucl-geospatial/ucesmmh_server) are satisfied 

## Deploying and Testing the code:
Please refer to the [README file of the Server Repository](https://github.com/ucl-geospatial/ucesmmh_server/blob/master/README.md)

## Files in the repository:
The repository contains serveral files and folders, most of which are created by the phoneGap application automatically. Yet a few files are created or modifed by the develpoer. These files are hosted in the directory `ucesmmh_questions/ucesmmh/www/`, and the following is a list of these files: 

#### HTML files 
File name | File Role
----------|----------
index | The main application file which contains the basic material design elements, the map and the HTML DIVs which hosts all the items of the application 
help | An Idential copy of the HTML code compresed in the [help.js](https://github.com/ucl-geospatial/ucesmmh_questions/blob/master/ucesmmh/www/js/help.js) file. The purpose of this file is test the help page on the computer before publishing it to the phone.

#### JavaScript files
File name | File Role
----------|----------
MostDifficult.js | Send request to the server to get the five most difficult questions and then add it to the index page in a table format 
PastWeekRate.js | Send request to the server to get the participation rates of the all the users or a spesific user based on the choice clicked in the menu, and then receive the data from the server and display it in a graph.
formtFunctions.js | Collects the input from the _add questions form_ and send it to the server to be added in the database
help.js | Pushing the compressed HTML page to be displayed in the help DIV on the index page
index.js | Added by PhoneGap
lastWeek.js | Collects teh questions added last week from the server and display them on the map. 
leaflet.awesome-markers.js | Display awesome markers which are used throughout the application 
leaflet.js | Hosts the basic layer display of the map
leafletFunctions.js | Hosts the display function of the defualt view of showing the questions added by the user
startup.js | Listen to the page and loads the map once the page is loaded
utilities.js | Gets the port number 

#### CSS files 
File name | File Role
----------|----------
index.css | Added by phoneGap
ionicons.min.css | Getting Ion Icons
leaflet.awesome-markers.css | Style for the Awesome markers
styles.css | Style for material design 

#### XML fiels
File name | File Role
----------|----------
config.xml | Handeling phoneGap extension  
port.xml | Hosted at `ucesmmh_questions/ucesmmh/www/res/` to get the port id

## Third Party code:
Source  | Used in 
--------|----------
Web and Mobile Module Practicals | All the JS and HTML files
[Group bar chart with tooltip](https://bl.ocks.org/Alireza-Dezfoolian/a1a7337cf9efd76dfc79c6ff9805dcf4) on 23/03/2019 | Draw the graphs in PastWeekRate.js
d3.js | Draw the graphs in PastWeekRate.js
Material Design | In the index.html 
Leaflet | In All JS files dealing with the map and the index.html file 
