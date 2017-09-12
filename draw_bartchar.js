var myData =[
		{ hora: 0, cantidad_robada: 45},
	{ hora: 1, cantidad_robada: 27},
	{ hora: 2, cantidad_robada: 16},
	{ hora: 3, cantidad_robada: 22},
	{ hora: 4, cantidad_robada: 16},
	{ hora: 5, cantidad_robada: 22},
	{ hora: 6, cantidad_robada: 23},
	{ hora: 7, cantidad_robada: 21},
	{ hora: 8, cantidad_robada: 41},
	{ hora: 9, cantidad_robada: 27},
	{ hora: 10, cantidad_robada: 48},
	{ hora: 11, cantidad_robada: 43},
	{ hora: 12, cantidad_robada: 40},
	{ hora: 13, cantidad_robada: 38},
	{ hora: 14, cantidad_robada: 66},
	{ hora: 15, cantidad_robada: 55},
	{ hora: 16, cantidad_robada: 62},
	{ hora: 17, cantidad_robada: 55},
	{ hora: 18, cantidad_robada: 91},
	{ hora: 19, cantidad_robada: 149},
	{ hora: 20, cantidad_robada: 158},
	{ hora: 21, cantidad_robada: 150},
	{ hora: 22, cantidad_robada: 109},
	{ hora: 23, cantidad_robada: 83}
]
var width = 600,
	height = 200,
  margin = {left: 30, right: 20, top: 20, bottom: 20},
	chart = d3.select("#chart")
		.append("svg")
    .attr("width", width )
    .attr("height", height)
    .append("g")
    	.attr("transform", "translate("+ margin.left + "," + margin.top + ")"),
 xAxis = chart.append("g")
   	.attr("class", "x axis")
    .attr("transform", "translate("+ 0 + ","+ (height-margin.top-margin.bottom ) +")"),
   yAxis = chart.append("g")
   	.attr("class", "y axis"),
   widthScale = d3.scaleLinear()
    .range([0, width - margin.left -margin.right]),
   colorScale = d3.scaleOrdinal(d3.schemeCategory20),
   heightScale = d3.scaleLinear()
   	.range([height -margin.top - margin.bottom,0]);	



function update(myData) {
	// Update the scale to the new maximum
	widthScale.domain([0, d3.max(myData, function (d) { return d.hora+1; })])
    heightScale.domain([0, d3.max(myData, function (d) { return d.cantidad_robada; })]);

  var ps = chart.selectAll("rect")
    .data(myData);

	// Actions just for new items
	var psEnter =  ps.enter()
    .append("rect")
    .attr("x", 0)
    .attr("width",20)
    .attr("y", function(d) {return height-margin.top-margin.bottom-d.cantidad_robada;})
    .attr("height", function (d) { return d.cantidad_robada; })
				;


	// Actions for new + updated
  ps.merge(psEnter) 
    .attr("x", function (d)  { return widthScale(d.hora); })
		.transition().duration(2000)  
    .style("fill", function (d, i) { return colorScale(d.hora); })

	// Actions for deleted items
  ps.exit().remove();
    
  xAxis.call(d3.axisBottom(widthScale));
  yAxis.call(d3.axisLeft(heightScale));
}

update(myData);

var myData2 =[
		{ barrio: "CASTILLA LA NUEVA E-8", cantidad_robada: 24},
{ barrio: "GALAN E-16", cantidad_robada: 23},
{ barrio: "TINTAL    E-8", cantidad_robada: 15},
{ barrio: "SANTA ISABEL E-14", cantidad_robada: 12},
{ barrio: "PATIO BONITO I E-8", cantidad_robada: 12},
{ barrio: "SANTA MATILDE I SECTOR E-16", cantidad_robada: 12},
{ barrio: "CASTILLA REAL     E-8", cantidad_robada: 11},
{ barrio: "GRAN GRANADA E-10", cantidad_robada: 10},
{ barrio: "VILLA ALSACIA E-8", cantidad_robada: 9},
{ barrio: "MODELIA E-9", cantidad_robada: 8},
{ barrio: "ALCALÁ E-16", cantidad_robada: 7},
{ barrio: "LAS MARGARITAS E-8", cantidad_robada: 7},
{ barrio: "VILLAS DE GRANADA E-10", cantidad_robada: 7},
{ barrio: "SAN VICENTE FERRER E-6", cantidad_robada: 6},
{ barrio: "CANDELARIA LA NUEVA I SECTOR E-19", cantidad_robada: 6},
{ barrio: "SANTA ISABEL OCCIDENTAL E-16", cantidad_robada: 6},
{ barrio: "CIUDAD JARDIN SUR E-15", cantidad_robada: 6},
{ barrio: "CARVAJAL E-8", cantidad_robada: 6},
{ barrio: "CIUDADELA COLSUBSIDIO E-10", cantidad_robada: 5},
{ barrio: "BAVARIA E-8", cantidad_robada: 5}

]

var width = 600,
	height = 600,
  margin = {left: 200, right: 20, top: 20, bottom: 20},
	chart2 = d3.select("#chart2")
		.append("svg")
    .attr("width", width )
    .attr("height", height)
    .append("g").attr("transform", "translate("+ margin.left + "," + margin.top + ")"),
 xAxis = chart2.append("g")
   	.attr("class", "x axis")
    .attr("transform", "translate("+ 0 + ","+ (height-margin.top-margin.bottom ) +")"),
   yAxis = chart2.append("g")
   	.attr("class", "y axis"),
   widthScale = d3.scaleLinear()
    .range([0, width - margin.left -margin.right]),
   colorScale = d3.scaleOrdinal(d3.schemeCategory20),
   heightScale = d3.scaleBand()
   	.range([0, height -margin.top - margin.bottom]);
    
function update2 (myData2) {
	// Update the scale to the new maximum
	widthScale.domain([0, d3.max(myData2, function (d) { return d.cantidad_robada; })])
   heightScale.domain(myData2.map(function (d) { return d.barrio; }));

  var ps = chart2.selectAll("rect")
    			.data(myData2);

	// Actions just for new items
// Creates items
  ps.enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", function (d)  { return heightScale(d.barrio); })
    .style("fill", function (d, i) { return colorScale(d.barrio); })
    .attr("height", heightScale.bandwidth())    
    .attr("width",0)
    .transition().duration(2000)
    .attr("width", function (d) { return widthScale(d.cantidad_robada); });

  // Updates items
  ps.text(function (d) { return d; })
    .attr("y", function (d)  { return heightScale(d.barrio); })
    .style("fill", function (d, i) { return colorScale(d.barrio); })
    .transition().duration(2000)    
    .attr("width", function (d) { return widthScale(d.cantidad_robada); });

	// Actions for deleted items
  ps.exit().remove();
    
  xAxis.call(d3.axisBottom(widthScale));
  yAxis.call(d3.axisLeft(heightScale));
}   
update2(myData2);