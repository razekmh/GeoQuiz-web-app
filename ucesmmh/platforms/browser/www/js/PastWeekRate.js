// The code is adopted from the web and mobile module practicals
var pastWeekRatejson;
var pastWeekRateClient; // the global variable that holds the request

//send request to the server to get the data of last week questions for the current user  
function getUserPastWeekRate() {
    // closeDrawers();
    pastWeekRateClient = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/getPastWeekRate/" + "?port_id=" + httpPortNumber;
    pastWeekRateClient.open('GET',url,true);
    //pastWeekRateClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    pastWeekRateClient.onreadystatechange = pastWeekRateUploaded;
    pastWeekRateClient.send();
};

//send request to the server to get the data of last week questions for all users 
function getAllPastWeekRate() {    
    // closeDrawers();
    pastWeekRateClient = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/getPastWeekRate/" ;
    pastWeekRateClient.open('GET',url,true);
    //pastWeekRateClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    pastWeekRateClient.onreadystatechange = pastWeekRateUploaded;
    pastWeekRateClient.send();
};

//wait for the response from the data server for both the functions, and process the response once it is received
function pastWeekRateUploaded() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (pastWeekRateClient.readyState == 4) {
    pastWeekRatedata= pastWeekRateClient.responseText;
    loadpastWeekRate(pastWeekRatedata);    
    }
};

//conver the respons into JSON, pass it to the graph drawing function and resets the div to get the new graph, and then scroll to the graph loaction 
function loadpastWeekRate(pastWeekRatedata) {
    // convert the text to JSON
    pastWeekRatejson = JSON.parse(pastWeekRatedata);
    document.getElementById("graph").innerHTML = "";
    graph(pastWeekRatejson);
    graphScroll();
};

// Scroll to the graph div and display it on the screen 
function graphScroll() {
    document.getElementById("graph").scrollIntoView();
};

//draw the graph -  adopted from https://bl.ocks.org/Alireza-Dezfoolian/a1a7337cf9efd76dfc79c6ff9805dcf4 on 23/03/2019
function graph(pastWeekRatejson){ 
    var data = pastWeekRatejson[0].array_to_json; 
    
    data = data.map(function(elem) {if (elem.port_id){
        document.getElementById("graphTitle").innerHTML = "<h5>Current user daily participation rates for the past week</h5>";
        delete elem.port_id; return elem;}
        else{
            document.getElementById("graphTitle").innerHTML = "<h5>All users daily participation rates for the past week</h5>";
            delete elem.port_id; return elem;}
        });

    const keys = Object.keys(data[0]).slice(1);
        
    const tip = d3.tip().html(d=> d.value);
    
    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
        },
        width = 400,
        height = 400,
        innerWidth = width - margin.left - margin.right,
        innerHeight = height - margin.top - margin.bottom,
        svg = d3.select('#graph').append('svg').attr('width', width).attr('height', height)
        g = svg.append('g');
        
    svg.call(tip);
    
    const x0 = d3.scaleBand()
        .rangeRound([0, innerWidth])
        .paddingInner(.1);
    
    const x1 = d3.scaleBand()
        .padding(.05);
    
    const y = d3.scaleLinear()
        .rangeRound([innerHeight, 0]);
    
    const z = d3.scaleOrdinal()
        // .range(['#AA8139', '#AA9439', '#3C3176', '#2C4770', '#96A537', '#68266F', '#492E74'])
        .range(['#00A0B0', '#CC333F']);
        
        x0.domain(data.map(d => d.day));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(data, d => d3.max(keys, key=> d[key]))]).nice();
    
    g.append('g')
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', d => 'translate(' + x0(d.day) + ',0)')
        .selectAll('rect')
        .data(d => keys.map(key => {return {key: key, value: d[key]}}))
        .enter().append('rect')
        .attr('x', d => x1(d.key))
        .attr('y', d => y(d.value))
        .attr('width', x1.bandwidth())
        .attr('height', d => innerHeight - y(d.value))
        .attr('fill', d =>  z(d.key))
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
    
    g.append('g')
        .attr('class', 'axis-bottom')
        .attr('transform', 'translate(0,' + innerHeight + ')')
        .call(d3.axisBottom(x0));
    
    g.append('g')
        .attr('class', 'axis-left')
        .call(d3.axisLeft(y).ticks(null, 's'))
        .append('text')
        .attr('x', 10)
        .attr('y', y(y.ticks().pop()) + 10)
        .attr('dy', '0.32em')
        .attr('fill', '#000')
        .style('transform', 'rotate(-90deg)')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'end');
    
    const legend = g.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('text-anchor', 'end')
        .selectAll('g')
        .data(keys.slice().reverse())
        .enter().append('g')
        .attr('transform', (d, i) => 'translate(0,' + i * 20 + ')');
    
    legend.append('rect')
        .attr('x', innerWidth - 19)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', z);
    
    legend.append('text')
        .attr('x', innerWidth - 32)
        .attr('y', 6)
        .attr('dy', '0.32em')
        .text(d => d);
    
    };