$(document).ready(function() {
    // Default view
    var currentView = "portfolio-view";
    $("#" + currentView).fadeIn();
    $("#header-title").text(viewTitles[currentView]);
    $("#header-title-short").text(viewTitlesShort[currentView]);

    // View management
    $("#portfolio-button, #education-button, #skills-button, #about-button").click(function() {
        hideViews();

        currentView = $(this).attr("id").split("-")[0] + "-view";
        $("#" + currentView).fadeIn();
        $("#header-title").text(viewTitles[currentView]);
        $("#header-title-short").text(viewTitlesShort[currentView]);

        $(".button-collapse").sideNav("hide");
    });

    $("#home-button").click(function() {
        $("#portfolio-button").click();
    });

    // Side nav initialization
    $(".button-collapse").sideNav();

    // Portfolio icon tooltips
    $(".portfolio-item-description-button").tipsy({gravity: 'n', fade: true, offset: 7});
    $(".portfolio-item-code-button").tipsy({gravity: 'n', fade: true, offset: 7});
    $(".portfolio-item-launch-button").tipsy({gravity: 'n', fade: true, offset: 7});

    // Portfolio toggles
    $(".portfolio-item-description-button").click(function() {
        var item = $(this).closest(".portfolio-item");
        var description = item.find(".portfolio-item-description");
        if (!description.is(":visible")) {
            description.fadeIn();
        } else {
            description.fadeOut();
        }
    });

    // Portfolio image links
    $(".portfolio-item-image").click(function() {
        var item = $(this).closest(".portfolio-item");
        var launchButton = item.find(".portfolio-item-launch-button")[0];
        launchButton.click();
    });

    // Timeline initialization
    var tempDate = new Date(educationData[0].periodStart);
    var yearStart = tempDate.getFullYear();
    var tempDate = new Date(educationData[educationData.length - 1].periodEnd);
    var yearEnd = tempDate.getFullYear();

    var educationTimeline = new Timeline(yearStart, yearEnd, educationData, "timeline-large-education", "education");
    educationTimeline.initTimeline();
    var workTimeline = new Timeline(yearStart, yearEnd, workData, "timeline-large-work", "work");
    workTimeline.initTimeline();

    // Timeline scrolling
    $("#timeline-large").kinetic({y: false});

    // Education timeline hover events
    var educationHovered = false;

    window.setInterval(function () {
        if (educationHovered) {
            $(document).on("mousemove", function(event){
                $("#timeline-large-education .timeline-large-education-hover").css({top: event.clientY - 0, left: event.clientX + 25});
            });
        }
    }, 250);

    $("#timeline-large-education .timeline-large-education-years-datapoint").hover(function() {
        $("#timeline-large-education .timeline-large-education-hover-text").html($(this).data("hover"));
        $("#timeline-large-education .timeline-large-education-hover").css({top: event.clientY - 0, left: event.clientX + 25}).fadeIn("fast");
        $(this).addClass("z-depth-3");
        educationHovered = true;
    }, function() {
        $("#timeline-large-education .timeline-large-education-hover").fadeOut("fast");
        $(this).removeClass("z-depth-3");
        educationHovered = false;
    });

    // Work timeline hover events
    var workHovered = false;

    window.setInterval(function () {
        if (workHovered) {
            $(document).on("mousemove", function(event){
                $("#timeline-large-work .timeline-large-work-hover").css({top: event.clientY - 325, left: event.clientX + 25});
            });
        }
    }, 250);

    $("#timeline-large-work .timeline-large-work-years-datapoint").hover(function() {
        $("#timeline-large-work .timeline-large-work-hover-text").html($(this).data("hover"));
        $("#timeline-large-work .timeline-large-work-hover").css({top: event.clientY - 325, left: event.clientX + 25}).fadeIn("fast");
        $(this).addClass("z-depth-3");
        workHovered = true;
    }, function() {
        $("#timeline-large-work .timeline-large-work-hover").fadeOut("fast");
        $(this).removeClass("z-depth-3");
        workHovered = false;
    });

    // Technical Skills charts
    var programmingLanguagesChartData = {
        "datasets": {
            "values": [100, 75, 60, 55, 40, 30, 25],
            "labels": [
                "C++", 
                "C", 
                "Ruby", 
                "JavaScript",
                "C#",
                "Python",
                "VBScript"
            ],
            "color": "grey"
        },
        "noY": true,
        "noHover": true,
        "height": "240px",
        "width": "400px",
        "background": "#EEEEEE",
        "shadowDepth": "0"
    };

    MaterialCharts.bar("#programming-languages-chart", programmingLanguagesChartData)

    var frontendFrameworks = {
        "datasets": {
            "values": [90, 75, 35, 15],
            "labels": [
                "jQuery",
                "Materialize",
                "Bootstrap",
                "AngularJS"
            ],
            "color": "grey"
        },
        "noY": true,
        "noHover": true,
        "height": "240px",
        "width": "400px",
        "background": "#EEEEEE",
        "shadowDepth": "0"
    };

    MaterialCharts.bar("#frontend-frameworks-chart", frontendFrameworks);

    var backendFrameworks = {
        "datasets": {
            "values": [75, 55, 45, 40],
            "labels": [
                "Sinatra",
                "Express",
                "ASP.NET",
                "ASP (Classic)"
            ],
            "color": "grey"
        },
        "noY": true,
        "height": "240px",
        "width": "400px",
        "background": "#EEEEEE",
        "shadowDepth": "0"
    };

    MaterialCharts.bar("#backend-frameworks-chart", backendFrameworks);

    var operatingSystems = {
        "datasets": {
            "values": [95, 85, 10],
            "labels": [
                "Windows",
                "Linux",
                "Mac OS",
            ],
            "color": "grey"
        },
        "noY": true,
        "noHover": true,
        "height": "240px",
        "width": "400px",
        "background": "#EEEEEE",
        "shadowDepth": "0"
    };

    MaterialCharts.bar("#operating-systems-chart", operatingSystems);
    $("#operating-systems-tooltip").tipsy({gravity: 'n', fade: true, offset: 7});
});

function hideViews() {
    ["portfolio-view", "education-view", "skills-view", "about-view"].forEach(function(view) {
        $("#" + view).fadeOut();
    });
}

var viewTitles = {
    "portfolio-view": "Portfolio",
    "education-view": "Education and Work Experience", 
    "skills-view": "Technical Skills and Expertise",
    "about-view": "About Me"
}

var viewTitlesShort = {
    "portfolio-view": "Portfolio",
    "education-view": "Education", 
    "skills-view": "Technical Skills",
    "about-view": "About Me"
}