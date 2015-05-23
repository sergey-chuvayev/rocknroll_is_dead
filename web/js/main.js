var width = 700;
var height = 300;

var svg = d3.select('body')
			.append('svg')
			.attr('width', width)
			.attr('height', height);

svg.selectAll('rect')
	.data(data)
	.enter()
	.append('rect')
	.attr('width','10px')
	.attr('height','10px')
	.classed('square', true)
	.attr('x', function(d) {
		return d.death_year - 1500
	})