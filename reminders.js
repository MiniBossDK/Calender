class Category {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    

}

class Reminder {

    constructor(title, date, month, year, durationHour, durationMin, category) {
        this.date = date;
        this.month = month;
        this.year = year;
        this.durationHour = durationHour;
        this.durationMin = durationMin; 
        this.title = title;
        this.category = category;
        this.reminderBox = document.createElement("div");
    }

    insertReminder() {

    }

    buildReminderBox() {
        
        reminderBox.setAttribute("class", "ReminderBox");
    }
}

let reminders = [];

function pixelsToHour(hourPixels) {
    return Math.floor(hourPixels/(timeBox.offsetHeight/24));
}

function pixelsToMin(minPixels) {
    return Math.floor((60/(timeBox.offsetHeight/24))*minPixels)
}

function hoursToPixels(hour) {
    return hour*(timeBox.offsetHeight/24);
}

function minToPixels(min) {
    return ((timeBox.offsetHeight/24)/60)*min;
}
