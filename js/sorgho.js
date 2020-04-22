d3.csv('data/Sorgho.csv')
    .row(function(d){return{date:d.date,prix:d.price};})
    .get(function(error,data){

       var margin = {top: 20, right: 20, bottom: 30, left: 70},
        width = 600- margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
        

        var maxDate = d3.max(data,function(d){return d.date; });
        var minDate = d3.min(data,function(d){return d.date; });
        var maxPrix = d3.max(data,function(d){return d.prix; });
        console.log(maxDate);
        console.log(minDate);
        console.log(maxPrix);

       
        var y = d3v5.scaleLinear()
                .domain([0,maxPrix])
                .range([height,0]);
        
        var x = d3v5.scaleLinear()
                .domain([minDate,maxDate])
                .range([0,width]);
                
        var xAxis = d3v5.axisBottom(x);
        var yAxis = d3v5.axisLeft(y);

        var yAxis2 = d3v5.axisRight(y)
      .tickSize(width)
      .tickSizeOuter (0);

      
        var svg = d3v5.select('svg')
                    .attr('height',"600")
                    .attr('width',"1000");

        var chart = svg.append('g').attr('transform', 'translate(400,' + margin.top + ')');

        var line = d3v5.line()
                        .x(function(d){return x(d.date); })
                        .y(function(d){return y(d.prix); });

        chart.append('path').attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 3)
        .attr('d', line(data));
    

        chart.append('g').attr('class','x axis').attr('transform','translate(0,'+height+')').call(xAxis);
        chart.append('g').attr('class','axe').call(yAxis);
        chart.append('g').call(yAxis2).style("font-size",1).call(g => g.selectAll(".tick:not(:first-of-type) line")
        .attr("stroke-opacity", 0.5)
        .attr("stroke-dasharray", "2,2"));


        chart.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Années");

// Y axis label:
chart.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+30)
    .attr("x", -margin.top)
    .text("Prix en FCFA");

    chart.append("text").attr("x", 220).attr("y", 400).text("Evolution Prix Sorgho ").style("font-size", "15px").attr("alignment-baseline","middle")



    var focus = chart.append("g")
    .attr("class", "focus")
    .style("display", "none");

focus.append("circle")
    .attr("r", 5);

focus.append("rect")
    .attr("class", "tooltip")
    .attr("width", 100)
    .attr("height", 50)
    .attr("x", 10)
    .attr("y", -22)
    .attr("rx", 4)
    .attr("ry", 4);

focus.append("text")
    .attr("class", "tooltip-date")
    .attr("x", 65)
    .attr("y", -2);

focus.append("text")
    .attr("x", 18)
    .attr("y", 18)
    .text("Prix:");

    focus.append("text")
    .attr("x", 15)
    .attr("y", -2)
    .text("Année:");

focus.append("text")
    .attr("class", "tooltip-likes")
    .attr("x", 50)
    .attr("y", 18);

chart.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", function() { focus.style("display", null); })
    .on("mouseout", function() { focus.style("display", "none"); })
    .on("mousemove", mousemove);
   var tooltip = { width: 100, height: 100, x: 10, y: -30 };
   var bisectDate = d3.bisector(function(d) { return d.date; }).left;
function mousemove() {
    var x0 = x.invert(d3v5.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.prix) + ")");
    focus.select(".tooltip-date").text(d.date);
    focus.select(".tooltip-likes").text(parseInt(d.prix)+" FCFA");
}
    }) ;    