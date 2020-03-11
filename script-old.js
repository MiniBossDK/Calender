"use strict";
(function() {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    Date.prototype.getMonthName = function() {
        return months[ this.getMonth() ];
    };

    Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };

})();

let date = new Date();
let today = new Date();

let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let currentDate = date.getDate();
let currentMonthName = date.getMonthName();
let currentDayName = date.getDayName();

function getMonthFirstDayName(year, month) {
    return new Date(year, month, 1).getDayName();
}

function getMonthLastDay(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

document.getElementById("date-header").innerHTML = months[currentMonth] + "  " + currentYear;

function createCalender() {
    let dayPos;
    days.forEach( (item, index) => {
        if(item === getMonthFirstDayName(currentYear, currentMonth)) {
            dayPos = index + 1;
        }
    });
    document.getElementById("days-container").innerHTML = ""; // Remove old Calender ...
    // ... then create a new calender
    for (let i = 1; i <= 42; i++) {
        let element = document.createElement('div');
        if (i >= dayPos && i-dayPos < getMonthLastDay(currentYear, currentMonth)) {
            element.innerHTML = i-dayPos+1;
            if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && i-dayPos+1 === today.getDate()) {
                element.style.backgroundColor = "#d00000";
            }
            
        } else {
            if (i < dayPos) {
                element.innerHTML = getMonthLastDay(currentYear, currentMonth - 1) - dayPos + 1 + i;
            } else {
                element.innerHTML = i/i;
            }
            element.style.backgroundColor = "#32292f";
        }
        document.getElementById("days-container").appendChild(element);  // Construct Calender
    } 
}

createCalender();

function changeMonthForward() {
    if (currentMonth == 11) {
        currentMonth = 0;
        date.setDate(currentYear++, currentMonth, currentDate);
    } else {
        date.setDate(currentYear, currentMonth++, currentDate);
    }
    createCalender(); 
    document.getElementById("date-header").innerHTML = months[currentMonth] + "  " + currentYear;
}


function changeMonthBackwards() {
    if (currentMonth == 0) {
        currentMonth = 11;
        date.setDate(currentYear--, currentMonth, currentDate);
    } else {
        date.setDate(currentYear, currentMonth--, currentDate);
    }
    createCalender(); 
    document.getElementById("date-header").innerHTML = months[currentMonth] + "  " + currentYear;
}