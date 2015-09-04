var Timeline = function(startYear, endYear, data, id) {
	var startYear = startYear;
	var endYear = endYear;
	var data = data;
	var timelineElement = "#" + id;
	var timelineElementId = id;
	var timelineYearsElement = timelineElement + "-years";
	var timelineYearsElementId = timelineElementId + "-years";

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

	this.initTimeline = function() {
		// Hover div
		$("<div class='"+ timelineElementId + "-hover'></div>").appendTo($(timelineElement)).css({
			"position": "fixed",
			"display": "none",
			"background-color": "#FFFFFF",
			"padding": "10px",
			"border-radius": "3px",
			"box-shadow": "0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)",
			"z-index": "2000"
		});

		$("<div class='"+ timelineElementId + "-hover-text'></div>").appendTo($(timelineElement + " ." + timelineElementId + "-hover"));

		// Year count for determining width
		var yearCount = endYear - startYear + 1;
		var lineWidth = yearCount * 900 + "px";

		$(timelineElement + "-line").css({
			"width": lineWidth
		})

		$("<div id='" + timelineYearsElementId + "'></div>").appendTo($(timelineElement)).css({
			"width": lineWidth,
			"height": "100%"
		}).addClass("clearfix");

		var yearIterator = startYear;

		while (yearIterator < endYear + 1) {
			this.initYear(yearIterator);
			yearIterator++;
		} 

		this.initData();
	}

	this.initYear = function(year) {
		// Initialize year element
		$("<div id='" + timelineYearsElementId + "-" + year + "'></div>").appendTo($(timelineYearsElement)).css({
			"width": "900px",
			"height": "100%",
			"float": "left",
			"position": "relative"
		});

		// Create year title
		$("<div id='" + timelineYearsElementId + "-" + year + "-title'>" + year + "</div>").appendTo($(timelineYearsElement + "-" + year)).css({
			"font-family": "'Roboto Slab', sans-serif",
			"font-size": "24px",
			"position": "absolute",
			"top": "10px",
			"left": "10px",
			"text-shadow": "0px 2px 10px #bdbdbd"
		});

		// Insert months
		months.forEach(function(month) {
			$("<div id='" + timelineYearsElementId + "-" + year + "-" + month + "'>" + month + "</div>").appendTo($(timelineYearsElement + "-" + year)).css({
				"font-family": "'Roboto Slab', sans-serif",
				"font-size": "12px",
				"margin-top": "125px",
				"width": "75px",
				"height": "100%",
				"float": "left"
			});
		});
	}

	this.initData = function() {
		// Data container
		$("<div id='" + timelineYearsElementId + "-data'></div>").appendTo($(timelineYearsElement)).css({
			"position": "relative"
		});

		// Create each data point
		data.forEach(function(dataElement, index) {
			var tempDate = new Date(dataElement.periodStart);
			var dataStartPosition = (tempDate.getFullYear() - startYear) * 900 + tempDate.getMonth() * 75;
			var tempDate = new Date(dataElement.periodEnd);
			var dataEndPosition = (tempDate.getFullYear() - startYear) * 900 + tempDate.getMonth() * 75 + 70;
			var dataWidth = dataEndPosition - dataStartPosition;

			var currentElement = timelineYearsElementId + "-data-" + index;

			$("<div id='" + currentElement + "'></div>").appendTo($(timelineYearsElement + "-data")).css({
				"position": "absolute",
				"left": dataStartPosition,
				"top": "92px",
				"border-radius": "5px",
				"width": dataWidth,
				"height": "20px"
			}).addClass("grey z-depth-2 " + timelineYearsElementId + "-datapoint").attr("data-hover", "<p><b>" + dataElement.institution + "</b></p><p>" + dataElement.degree + "</p><p>" + dataElement.year + ", " + dataElement.period + "</p><p>" + dataElement.periodStart + " &mdash; " + dataElement.periodEnd + "</p>");

			$("#" + currentElement).attr("data-hover", $("#" + currentElement).attr("data-hover") + "<hr><ul>");

			dataElement.courses.forEach(function(course) {
				$("#" + currentElement).attr("data-hover", $("#" + currentElement).attr("data-hover") + "<li>" + course + "</li>");
			});

			$("#" + currentElement).attr("data-hover", $("#" + currentElement).attr("data-hover") + "</ul>");
		})
	}
}