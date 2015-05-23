var width = $('body').width();
var height = 400;

var dataLength = data.length;

var svg = d3.select('body')
			.append('svg')
			.attr('width', width)
			.attr('height', height);

var xScale = d3.scale.linear()
					.domain([d3.min(data, function(d){
						return d.death_year
					}), d3.max(data, function(d){
						return d.death_year
					})])
					.range([0, width]);

var yScale = d3.scale.linear()
					.domain([d3.min(data, function(d){
						return d.age
					}), d3.max(data, function(d){
						return d.age
					})])
					.range([0, height]);

var xAxis = function() {
			return d3.svg.axis()
			.scale(xScale)
			.ticks(5)
			.innerTickSize(-height)
			.outerTickSize(0)
			.tickFormat("");
		};

var yAxis = function() {
			return d3.svg.axis()
			.scale(yScale)
			.ticks(5)
			.orient("left")
			.innerTickSize(-width)
			.outerTickSize(0)
			.tickFormat("");
		};

svg.append("svg:g")
			.attr("class", "grid")
			.attr("transform", "translate(10,10)")
			.call(xAxis().ticks(10));

svg.append("svg:g")
			.attr("class", "x axis")
			.attr("transform", "translate(10,10)")
			.call(xAxis());

svg.selectAll('rect')
	.data(data)
	.enter()
	.append('rect')
	.classed('bar',true)
	.attr('width',10)
	.attr('height',function(d){
		return yScale(d.age)
	})
	.attr('x',function(d){
		return xScale(d.death_year)
	});

svg.selectAll('text')
	.data(data)
	.enter()
	.append('text')
	.attr('x',function(d){
		return xScale(d.death_year)
	})
	.attr('y',function(d){
		return yScale(d.age) + 10
	})
	.classed('name-text',true)
	.text(function(d){
		return d.name + " " + d.age
	});
