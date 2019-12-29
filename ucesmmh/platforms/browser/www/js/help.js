// The code is adopted from the web and mobile module practicals
// var xhr; // define the global variable to process the AJAX request
// function callHelp() {
// 	xhr = new XMLHttpRequest();
// 	var filename = "help.html";
// 	xhr.open("GET", filename, true);
// 	xhr.onreadystatechange = processHelp;
// 	xhr.send();
// 	}

// function processHelp() {
// 	if (xhr.readyState < 4) // while waiting response from server
// 	document.getElementById('help').innerHTML = "Loading...";
// 	else if (xhr.readyState === 4) { // 4 = Response from server has been completely loaded.
// 		if (xhr.status == 200 && xhr.status < 300)
// 		// http status between 200 to 299 are all successful
// 		document.getElementById('help').innerHTML = xhr.responseText;
// 	}
// }

var htmlstring = '<h3 id="help_top" style="text-align: center">Question Setting App Help </h3><hr><p>This app helps you to <a href="#add_question">add questions </a>which are connected to locations on the shown map. It also will help display the <a href="#last_week">questions which were added last week</a>. Additionally, it will help you find the <a href="#most_diff">most difficult questions which users could not answer correctly and also help you find the participation rates for you and all the other users combined</a>. </p><hr><h5 style="text-align:left" id="add_question"><u>Adding a question</u></h5><p>The follwoing gif shows you how to add a question. Data has been filled in as an example. You can check the detailed steps below</p><br><div  align="center"><img src="images/add_question.gif" alt="Adding a question" style="width:80%"></div><br><hr><p style="margin:0"><i>To add a new question please follow these steps:</i></p><ul style="text-align:left">	<li>Use the displayed map to find the location you wish to add the question at</li>	<li>Click on the location you selected for the question, a popup will show in the map to inform you with the coordinates of your choice</li>	<li>If you are happy with your choice please proceed to the next step, if not, then simply click on your prefered location and the coordinates will be adjusted to the new choice</li>	<li>Start Filling in the name and the title of the question, followed by the possible answers then choose the correct answer</li>	<li>Finally, click on the submit button. The map will reload and your questions will be added to the database</li></ul><p><font color="red"><i>Please note that <b>ALL</b> the fields must be filled for the question to be accepted, this means you must select a <b>point on the map </b>and fill all the details of the question. Some error messages might show in case of errors. These inculde requesting a location and requsting a correct answer</i></font></p><span><a href="javascript:hideHelp();"> Hide Help</a></span><span style="float: right"><a href="#help_top">Back to top</a></span><hr><h5 style="text-align:left" id="last_week"><u>Add/remove Last Week Questions</u></h5><p>The follwoing gif shows you how to add/remove last week questions from the map. You can check the detials below</p><br><div  align="center"><img src="images/add_remove_last_week.gif" alt="Adding a question" style="width:80%"></div><br><hr><p style="margin:0"><i>To add questions of last week to the map, simply click on the <b>Add/Remove Last Week Questions</b> from the menu on the left-hand side. The questions will be added and the map will automatically zoom to the points. If you wish to remove the points from the map, simply click on the same option again. Alternatively, you can Click on <b>All questions by the current user</b> which will remove the last week questions and then add these of the current user.</i></p><span><a href="javascript:hideHelp();"> Hide Help</a></span><span style="float: right"><a href="#help_top">Back to top</a></span><hr><h5 style="text-align:left" id="most_diff"><u>Displaying Most Difficult Questions And The Participation Rates</u></h5><p>The follwoing gif shows you how display both the most difficult questions and the participation rates</p><br><div  align="center"><img src="images/graph_table.gif" alt="Adding a question" style="width:80%"></div><br><hr><p style="margin:0"><i>To find out the top five most difficult questions, simply click on the <b>Show Most Difficult Questions</b> from the menu on the left-hand side. The questions will be below the map in the form of a table displaying the title and the text of the question. The display will scroll automatically to it. Similarly, if you wish to display the participation rates, click on the <b> Show Current User Daily Participation Rates</b> option or the<b> Show All Users Daily Participation Rates</b>, a graph showing the corresponding option will be displayed below the table of the difficult questions, and the display will scroll automatically to it. If you wish to display one of the options then the other, simply click on the required options you wish and the graph will update accordingly.</i></p><span><a href="javascript:hideHelp();"> Hide Help</a></span><span style="float: right"><a href="#help_top">Back to top</a></span><hr><p><i>Please note that the <b>All questions by the current user</b> displayes the map with all the questions you have added previously, which is the same as displayed once the page loads. Both this option and the <b>Add/Remove Last week Questions</b> will scroll automatically to the map. Also if you wish to display the details of any of the questions, simply click on any of the points representing the questions, a popup will show with the details of the question displayed in it.</i></p><hr><br><hr>'

function callHelp(){
	document.getElementById('help').innerHTML = htmlstring;
	helpScroll();
};

function hideHelp(){
	document.getElementById('help').innerHTML = '';
	mapScroll();
};

function helpScroll() {
    document.getElementById("help").scrollIntoView();
};