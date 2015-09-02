$(document).ready(function() {
    $(".button-collapse").sideNav();

    var currentView = "portfolio-view"
    $("#" + currentView).show();
    $("#header-title").text(viewTitles[currentView]);

    $("#portfolio-button, #education-button, #skills-button, #about-button").click(function() {
        hideViews();
        currentView = $(this).attr("id").split("-")[0] + "-view";
        $("#" + currentView).show();
        $("#header-title").text(viewTitles[currentView]);
        $(".button-collapse").sideNav("hide");
    });

    $("#home-button").click(function() {
        $("#portfolio-button").click();
    });
});

function hideViews() {
    ["portfolio-view", "education-view", "skills-view", "about-view"].forEach(function(view) {
        $("#" + view).hide();
    });
}

var viewTitles = {
    "portfolio-view": "Portfolio",
    "education-view": "Education and Work Experience", 
    "skills-view": "Technical Skills and Expertise",
    "about-view": "About Me"
}