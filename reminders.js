class Reminder extends Day {

    constructor(date, month, year, startHour, endHour) {
        super(date, month, year);
        this.startHour = startHour;
        this.endHour = endHour; 
        this.title = title;
    }

    BuildReminderBox() {
        let reminderBox = document.createElement("div");
        

        reminderBox.setAttribute("class", "ReminderBox");
        
    }

    get duration() {
        return this.startHour-this.endHour;
    }
}

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


class Template extends Reminder {
    
    constructor(templateName) {
      this.template = templateName;  
    }
    
}