<!DOCTYPE html>
<meta charset="utf-8">
<style>

body {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.x.axis path {
  display: none;
}

</style>

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
<body>




  <div class="row">
    <div class="col s4">
      <div class="row" style="margin-left: 20px;">
  <select class="input-field col s12" id="annee" onchange="bubble()">
    <option selected disabled value="">Choisir une annee</option>
    
    <option>Dakar</option>
    <option>2011</option>
    

   <Span>

  </select>


</div>
</div>
</div>
<div>
  <svg>
    
  </svg>
</div>
<script src="https://d3js.org/d3.v3.min.js"></script>
<script>
var annee ='Dakar'
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .tickSize(0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var color = d3.scale.ordinal()
    .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);

var svg = d3.select('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("test.csv", function(error, data) {

  data = data.filter(function(d){return d.admname == annee;})
  console.log(data)

data2 = d3.nest().key(function(d) {return d.date}).entries(data);

console.log(data2)


  var dates = 
  data.map(item => item.date)
  .filter((value, index, self) => self.indexOf(value) === index);
  var cat = data.map(item => item.cmname)
  .filter((value, index, self) => self.indexOf(value) === index);
console.log(cat,dates)

  x0.domain(dates);
  x1.domain(cat).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data2, function(key) { return d3.max(key.values, function(d) { return d.price; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .style('opacity','0')
      .call(yAxis)
  .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style('font-weight','bold')
      .text("Value");

  svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

  var slice = svg.selectAll(".slice")
      .data(data2)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x0(d.key) + ",0)"; });

  slice.selectAll("rect")
      .data(function(d) { return d.values; })
  .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.cmname); })
      .style("fill", function(d) { return color(d.cmname) })
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return height - y(0); })
      .on("mouseover", function(d) {
          d3.select(this).style("fill", d3.rgb(color(d.cmname)).darker(2));
      })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.cmname));
      });

  slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("y", function(d) { return y(d.price); })
      .attr("height", function(d) { return height - y(d.price); });

  //Legend
  var legend = svg.selectAll(".legend")
      .data(data2[0].values.map(function(d) { return d.cmname; }).reverse())
  .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
      .style("opacity","0");

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return color(d); });

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });

  legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

});


function bubble(){
var selectElmt = document.getElementById("annee");
annee = selectElmt.options[selectElmt.selectedIndex].text;
var text = selectElmt.options[selectElmt.selectedIndex].text;

console.log(annee)
}


</script>
 </body>