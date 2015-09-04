$(document).ready(function() {
    // View management
    var currentView = "education-view";
    $("#" + currentView).fadeIn();
    $("#header-title").text(viewTitles[currentView]);
    $("#header-title-short").text(viewTitlesShort[currentView]);

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

    // Education timeline
    var tempDate = new Date(educationData[0].periodStart);
    var yearStart = tempDate.getFullYear();
    var tempDate = new Date(educationData[educationData.length - 1].periodEnd);
    var yearEnd = tempDate.getFullYear();

    var educationTimeline = new Timeline(yearStart, yearEnd, educationData, "timeline-large-education");
    educationTimeline.initTimeline();

    // Timeline scrolling
    $("#timeline-large-education").kinetic({y: false});
    // $("#timeline-work-education").kinetic({y: false});

    // Education timeline hover events
    var hovered = false;

    window.setInterval(function () {
        if (hovered) {
            $(document).on("mousemove", function(event){
                $("#timeline-large-education .timeline-large-education-hover").css({top: event.clientY - 0, left: event.clientX + 25});
            });
        }
    }, 250);

    $("#timeline-large-education .timeline-large-education-years-datapoint").hover(function() {
        $("#timeline-large-education .timeline-large-education-hover-text").html($(this).data("hover"));
        $("#timeline-large-education .timeline-large-education-hover").css({top: event.clientY - 0, left: event.clientX + 25}).fadeIn("fast");
        $(this).addClass("z-depth-3");
        hovered = true;
    }, function() {
        $("#timeline-large-education .timeline-large-education-hover").fadeOut("fast");
        $(this).removeClass("z-depth-3");
        hovered = false;
    });
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