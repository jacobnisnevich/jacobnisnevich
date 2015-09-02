$(document).ready(function() {
    var currentView = "home-view"
    $("#" + currentView);

    $("#home-button, #portfolio-button, #education-button, #skills-button").click(function() {
        hideViews();
        currentView = $(this).attr("id").split("-")[0] + "-view";
        $("#" + currentView);
        $("#header-title").text(viewTitles[currentView]);
    });
});

function hideViews() {
    ["home-view", "portfolio-view", "education-view", "skills-view"].forEach(function(view) {
        $("#" + view);
    });
}

var viewTitles = {
    "home-view": "About Me", 
    "portfolio-view": "Portfolio",
    "education-view": "Education and Work Experience", 
    "skills-view": "Technical Skills and Expertise"
}