//// Determine if website is on mobile or not
let mobile = navigator.userAgent.toLowerCase().includes("mobile");

//// If mobile hide desktop form else show mobile form
if (mobile) {
    document.getElementById("time_form").style.display = "none";
} else {
    document.getElementById("time_form_mobile").style.display = "none";
}


// Set variables of interest

//// Desktop form times and padding
const pe_start = document.getElementById("pe_start");
const te_start = document.getElementById("te_start");
const te_end   = document.getElementById("te_end");
const pe_end   = document.getElementById("pe_end");
const padding  = document.getElementById("padding");

//// Mobile form dates times and padding
const pe_start_date  = document.getElementById("pe_start_date");
const pe_start_time  = document.getElementById("pe_start_time");
const te_start_date  = document.getElementById("te_start_date");
const te_start_time  = document.getElementById("te_start_time");
const te_end_date    = document.getElementById("te_end_date");
const te_end_time    = document.getElementById("te_end_time");
const pe_end_date    = document.getElementById("pe_end_date");
const pe_end_time    = document.getElementById("pe_end_time");
const padding_mobile = document.getElementById("padding_mobile");

//// Countdown locations
const pe_start_timer = document.getElementById("pe_start_timer");
const te_start_timer = document.getElementById("te_start_timer");
const te_end_timer   = document.getElementById("te_end_timer");
const pe_end_timer   = document.getElementById("pe_end_timer");

//// Audio files
const pe_end_audio   = document.getElementById("pe_end_audio");
const pe_start_audio = document.getElementById("pe_start_audio");
const te_end_audio   = document.getElementById("te_end_audio");
const te_start_audio = document.getElementById("te_start_audio");

//// Define interval
let intervals = [0, 0, 0, 0];


// Define a general countdown function
function countdown(datetime_target, date_target, time_target, timer, interval, padding_factor, audio) {

    // Define target time for mobile or 
    let target;
    if (mobile) {
        let target_string = date_target.value + "T" + time_target.value;
        target = new Date(target_string).getTime() + Number(padding_mobile.value) * padding_factor;
    } else {
        target = new Date(datetime_target.value).getTime() + Number(padding.value) * padding_factor;
    }

    let play_audio = true

    // Create a loop that runs every 100 miliseconds
    intervals[interval] = setInterval(function() {
        // Get Current time and find number of miliseconds from now to target time
        let now = new Date().getTime();
        let distance = target - now;

        // Calculate time units
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 100) /10;

        if (distance > 0) {
            timer.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
            if ((distance < audio.duration * 1000) && play_audio) {
                audio.play();
                play_audio = false;
            }
        } else {
            clearInterval(intervals[interval])
            timer.innerHTML = "EXPIRED"
        }
    }, 100);
}


// Define a function to start the timers
function start_countdowns() {
    // Start timers
    countdown(pe_start, pe_start_date, pe_start_time, pe_start_timer, 0, 0,     pe_start_audio);
    countdown(te_start, te_start_date, te_start_time, te_start_timer, 1, 1000,  te_start_audio);
    countdown(te_end,   te_end_date,   te_end_time,   te_end_timer,   2, -1000, te_end_audio);
    countdown(pe_end,   pe_end_date,   pe_end_time,   pe_end_timer,   3, 0,     pe_end_audio);

    // Hide inputs and show timers
    document.getElementById("time_form").style.display = 'none';
    document.getElementById("time_form_mobile").style.display = "none";
    document.getElementById("countdown_div").style.display = 'block';
}

// Define cancelation function
function cancel_countdowns() {
    // Cancel countdowns
    clearInterval(intervals[0]);
    clearInterval(intervals[1]);
    clearInterval(intervals[2]);
    clearInterval(intervals[3]);

    // Hide timers and show inputs
    document.getElementById("countdown_div").style.display = 'none';
    if (mobile) {
        document.getElementById("time_form_mobile").style.display = "block";
    } else {
        document.getElementById("time_form").style.display = "block";
    }
}
