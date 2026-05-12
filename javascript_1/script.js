// Lazy Hiker Hub — script.js
// Confirms JavaScript is connected
console.log("JavaScript is working");

// -----------------------------------------
// VARIABLES
// -----------------------------------------

// Integer: total number of trails on this page
var totalTrails = 6;

// String: name of the website
var siteName = "Lazy Hiker Hub";

// Boolean: tracks whether the user is logged in
var isLoggedIn = false;

// Math operation: average miles per trail (example data)
var totalMiles = 42.1;
var averageMiles = totalMiles / totalTrails; // math operation stored in variable
console.log("Average trail miles: " + averageMiles);

// -----------------------------------------
// DOM OUTPUT — welcome message on page
// -----------------------------------------

// Checks if we're on the homepage and injects a welcome line
if (document.getElementById("filter-result")) {
    document.getElementById("filter-result").textContent = "Showing all " + totalTrails + " trails on " + siteName + ".";
}

// -----------------------------------------
// TRAIL FILTER BY MILES
// -----------------------------------------

// This function filters the trail cards shown based on the dropdown selection
function filterTrails() {
    var selection = document.getElementById("miles-filter").value;
    var cards = document.querySelectorAll(".trail-card");
    var visibleCount = 0;

    // Loop through every trail card and show/hide based on mileage
    cards.forEach(function(card) {
        var miles = parseFloat(card.getAttribute("data-miles"));
        var show = false;

        // Logical operators used in conditions below (&&)
        if (selection === "all") {
            show = true;
        } else if (selection === "0-5" && miles >= 0 && miles <= 5) {
            show = true;
        } else if (selection === "5-10" && miles > 5 && miles <= 10) {
            show = true;
        } else if (selection === "10-15" && miles > 10 && miles <= 15) {
            show = true;
        } else if (selection === "15plus" && miles > 15) {
            show = true;
        }

        // Show or hide the card
        if (show) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    // Update the DOM output message with how many trails matched
    var resultBox = document.getElementById("filter-result");
    if (resultBox) {
        if (visibleCount === 0) {
            resultBox.textContent = "No trails match that distance range.";
        } else {
            resultBox.textContent = "Showing " + visibleCount + " trail(s) for your selected distance.";
        }
    }
}

// Attach the filter function to the dropdown whenever its value changes
var milesDropdown = document.getElementById("miles-filter");
if (milesDropdown) {
    milesDropdown.addEventListener("change", filterTrails);
}

// -----------------------------------------
// LOGIN / SIGNUP TOGGLE
// -----------------------------------------

// Shows the signup form and hides the login form
function showSignup() {
    var loginBox = document.getElementById("login-box");
    var signupBox = document.getElementById("signup-box");
    if (loginBox && signupBox) {
        loginBox.classList.add("hidden");
        signupBox.classList.remove("hidden");
    }
}

// Shows the login form and hides the signup form
function showLogin() {
    var loginBox = document.getElementById("login-box");
    var signupBox = document.getElementById("signup-box");
    if (loginBox && signupBox) {
        signupBox.classList.add("hidden");
        loginBox.classList.remove("hidden");
    }
}

// -----------------------------------------
// LOGIN HANDLER
// -----------------------------------------

// Runs when the user clicks Sign In — checks that fields are not empty
function handleLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var messageBox = document.getElementById("auth-message");

    // Checks both fields are filled (logical AND)
    if (username !== "" && password !== "") {
        isLoggedIn = true;
        console.log("User logged in: " + username);
        if (messageBox) {
            messageBox.textContent = "Welcome back, " + username + "! ✓";
        }
    } else {
        if (messageBox) {
            messageBox.textContent = "Please fill in all fields.";
        }
    }
}

// -----------------------------------------
// SIGNUP HANDLER
// -----------------------------------------

// Runs when user clicks Sign Up — validates all three fields
function handleSignup() {
    var email = document.getElementById("email-address").value;
    var newUsername = document.getElementById("new-username").value;
    var newPassword = document.getElementById("new-password").value;
    var messageBox = document.getElementById("auth-message");

    // All three fields must be filled
    if (email !== "" && newUsername !== "" && newPassword !== "") {
        console.log("New account created for: " + newUsername);
        if (messageBox) {
            messageBox.textContent = "Account created! Welcome, " + newUsername + " ✓";
            showLogin();
        }
    } else {
        if (messageBox) {
            messageBox.textContent = "Please complete all fields to sign up.";
        }
    }
}