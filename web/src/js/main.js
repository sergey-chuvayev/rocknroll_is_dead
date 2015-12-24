var width = 1000;
var height = 400;

d3.json('/js/data.json', function(resp){
	main(resp);
});

function main(data){

	var dataLength = data.length;

	var svg = d3.select('svg')
		.attr('width', width)
		.attr('height', height);

	var xScale = d3.time.scale()
		.domain([d3.min(data, function(d){
			return new Date(d.death_date)
		}), d3.max(data, function(d){
			return new Date(d.death_date)
		})])
		.range([0, width]);


	var yScale = d3.scale.linear()
		.domain([d3.min(data, function(d){
			return d.age
		}), d3.max(data, function(d){
			return d.age
		})])
		.range([0, height]);


	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('top')
		.ticks(d3.time.years, 3)
		// .tickFormat(d3.time.format('%yyyy'))
		// .tickSize(5)
		// .tickPadding(8);

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('right')
		.tickPadding(8);


	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0, ' + height + ')')
		.call(xAxis);

	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis);


	var gPoints = svg.selectAll('svg')
		.data(data)
		.enter()
		.append('g').attr('class','point-g');

	gPoints.append('circle')
		.attr('r',5)
		.attr('class', 'point')
		.attr('cx', function(d){
			return xScale(new Date(d.death_date));
		})
		.attr('cy', function(d){
			return yScale(d.age);
		})
		.on('mouseover', function(){
			$(this).next().show();
		})
		.on('mouseout', function(){
			$(this).next().hide();
		});

	gPoints.append('text').attr('class','circle-text')
		.text(function(d){
			return d.name
		})
		.attr('x', function(d){
			return xScale(new Date(d.death_date)) + 10;
		})
		.attr('y', function(d){
			return yScale(d.age);
		});

}

