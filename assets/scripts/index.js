// Set variables of interest

//// User Defined times
const pe_start = document.getElementById("pe_start");
const te_start = document.getElementById("te_start");
const te_end   = document.getElementById("te_end");
const pe_end   = document.getElementById("pe_end");

// Padding
const padding  = document.getElementById("padding");

//// Countdown Locations
const pe_start_timer = document.getElementById("pe_start_timer");
const te_start_timer = document.getElementById("te_start_timer");
const te_end_timer   = document.getElementById("te_end_timer");
const pe_end_timer   = document.getElementById("pe_end_timer");


// Define a general countdown function
function countdown(target, timer) {
    // Parse given time into target time
    let target_time = new Date(target.value).getTime();
    
    // Create a loop that runs every 100 miliseconds
    let interval = setInterval(function() {
        // Get Current time and find number of miliseconds from now to target time
        let now = new Date().getTime();
        let distance = target_time - now;

        // Calculate time units
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 100) /10;

        if (distance > 0) {
            timer.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        } else {
            clearInterval(interval)
            timer.innerHTML = "EXPIRED"
        }
    }, 100);
}


// Define a function to start the timers
function start_countdowns() {
    // Start timers
    countdown(pe_start, pe_start_timer);
    countdown(te_start, te_start_timer);
    countdown(te_end,   te_end_timer);
    countdown(pe_end,   pe_end_timer);
}
