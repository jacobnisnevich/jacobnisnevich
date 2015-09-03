$(document).ready(function() {
    // View management
    var currentView = "portfolio-view";
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

    $(".portfolio-item-image").click(function() {
        var item = $(this).closest(".portfolio-item");
        var launchButton = item.find(".portfolio-item-launch-button")[0];
        launchButton.click();
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