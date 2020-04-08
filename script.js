class Today {

    static get year() {
        // 1 year = 31557600000 milisec
        // Starts from the year 1970
        return Math.floor((Date.now()/31557600000)+1970);
    }

    static get month() {
        // 1 month = 2629800000 milisec
        return Math.floor((Date.now()-Date.UTC(this.year, 0))/2629800000);
    }

    static get date() {
        // 1 day = 86400000 milisec
        // 1 hour extra = 3600000 milisec
        return Math.ceil(((Date.now()+3600000)-Date.UTC(this.year, this.month))/86400000);
    }

    static get hour() {
        // 1 hour = 3600000 milisec
        return this.date
    }
    // TODO
    // Add Hours, Minutes

}

class Year {

    constructor(year) {
        this.year = year;
    }

    /**
     * https://en.wikipedia.org/wiki/ISO_week_date#Weeks_per_year
     * 
     */
    get weeksInYear() {
        if (this.getP(this.year) === 4 || this.getP(this.year - 1) === 3) return 53;
        else return 52;
    }
    
    getP(year) {
        return (year + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400)) % 7;
    }

    /**
     * @returns the amount of days in a year
     */
    get daysInYear() {
        return this.isLeapYear ? 366 : 365; 
    }
    /**
     * @returns true if it is leap year and false if it is not leap year.
     * https://en.wikipedia.org/wiki/Leap_year#Gregorian_calendar
     */
    get isLeapYear() {
        return (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0;
    }
}

class Month {
    
    constructor(month, year) {
        this.year = year;
        this.month = month;
        this.monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        this.maxWeeks = 6;
        this.maxDays = 42;
        this.weeks = [];
    }
    /**
     * @returns the amount of days in the current month.
     */
    get length() {
        return new Date(this.year, this.month + 1, 0).getDate();
    }
    /**
     * @returns the name of current month.
     */
    get name() {
        return this.monthNames[this.month];
    }

    
    get createDays() {
        let days = [];
        let firstDay = new Month(this.month, this.year).firstDay-2;
        let month = this.month;
        let year = this.year;
        for (let i = 0; i < this.maxDays; i++) {
            // Change month and year...
            if(i-firstDay <= 0) {
                year = (this.month - 1 === -1) ? this.year - 1 : this.year; //... to the prev year
                month = (this.month - 1 === -1) ? 11 : this.month - 1; //... to the prev month
            }
            else if(i > this.length+firstDay) {
                year = (this.month + 1 === 12) ? this.year + 1 : this.year; //... to the next year
                month = (this.month + 1 === 12) ? 0 : this.month + 1; //... to the next month
            } 
            // Current month and year
            else {
                month = this.month; 
                year = this.year;
            }
            // Insert day objects into a list
            days[i] = new Day(new Date(this.year, this.month, i-firstDay).getDate(), month, year);
            // Set active and isToday
            if(i-firstDay <= 0 || i > this.length+firstDay) days[i].active = false; 
            if(i-firstDay === Today.date && this.month === Today.month && Today.year === this.year) days[i].isToday = true;
        }
        return days;
    }

    
    createMonth() { 
        let days = this.createDays;
        let start = 0; 
        let finish = 7;
        for (let i = 0; i < this.maxWeeks; i++) {
            // Insert days into 6 different week objects
            this.weeks[i] = new Week(new Day(days[finish-1].date, days[finish-1].month, days[finish-1].year).weekNum, this.month, this.year);
            this.weeks[i].createWeeks(i, days.slice(start, finish));
            start += 7;
            finish += 7;  
        }
        
        this.setAttributes(days);
        this.setEventListeners(days);

        this.appendWeeks();
        this.appendDays();
    }

    setAttributes(days) {
        for (let i = 0; i < days.length; i++) {
            if(days[i].active) days[i].dayElement.setAttribute("class", "active");
            else days[i].dayElement.setAttribute("class", "inactive");
            if(days[i].isToday) days[i].dayElement.setAttribute("class", "today");
        }
    }

    setEventListeners(days) {
        for (let i = 0; i < days.length; i++) {
            days[i].dayElement.addEventListener("click", () => {
                console.log(days[i].date, days[i].month, days[i].year);
                console.log(days[i]);
                console.log(days[i].name);
            });
        }
    }

    appendWeeks() {
        for (let i = 0; i < this.weeks.length; i++) { 
            this.weeks[i].daysRowElement[i].appendChild(this.weeks[i].weekElement);
        }
    }

    appendDays() {
        for (let i = 0; i < this.maxWeeks; i++) {
            let week = this.weeks[i];
            for (let j = 0; j < 7; j++) {
                week.days[j].dayElement.innerHTML = week.days[j].date;
                week.daysRowElement[i].appendChild(week.days[j].dayElement);
            }
        }
    }
    
    get firstWeek() {
        return Math.floor((new Day(1, this.month, this.year).ordinalDate - new Date(this.year, this.month, 1).getDay() + 10)/7);
    }

    get firstDay() {
        return  (new Date(this.year, this.month, 1).getDay() === 0) ? 7 : new Date(this.year, this.month, 1).getDay();
    }

    get lastDay() {
        return new Date(this.year, this.month + 1, 0).getDay();
    }

}

class Week {

    constructor(week, month, year) {
        this.year = year;
        this.month = month;
        this.week = week;
        this.weekIndex = 0;
        this.daysRowElement = document.getElementsByClassName("days-row");
        this.weekElement = document.createElement("span");
        this.days = [];
    }

    set value(value) {
        this.weekElement.innerHTML = value;
    }

    get value() {
        return this.weekElement.innerHTML;
    }

    /**
     * @param {} weekIndex - The index of the week in the calender UI
     * @param {} days - The list that contains day objects 
     */
    createWeeks(weekIndex, days) {
        this.weekIndex = weekIndex;
        this.value = this.week;
        this.days = days;
    }
}

class Day {

    constructor(date, month, year) {
        this.date = date;
        this.month = month;
        this.year = year;
        this.isToday = false;
        this.dayElement = document.createElement('div');
        this.dayNames = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        this.active = true; 
    }
    
    get weekNum() {    
       // https://www.epochconverter.com/weeknumbers 
       let target = new Date(this.year, this.month, this.date);
       let dayNr = this.weekday;
       target.setDate(target.getDate() - dayNr + 3);
       let firstThursday = target.valueOf();
       target.setMonth(0, 1);
       if (target.getDay() != 4) {
           target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
       }
       return 1 + Math.ceil((firstThursday - target) / 604800000);
    }

    get weekday() {
       return (new Date(this.year, this.month, this.date).getDay() + 6) % 7;
    } 

    
    set value(value) {
        this.dayElement.innerHTML = value;
    }

    get value() {
        return this.dayElement.innerHTML; 
    }
    
    get name() {
        return this.dayNames[new Date(this.year, this.month, this.date).getDay()];
    }
    
    get ordinalDate() {
        return Math.floor((Date.UTC(this.year, this.month, this.date) - Date.UTC(this.year, 0, 1))/86400000) + 1;
    }
}

class Calender extends Month {

    constructor(date, month, year) {
        super(date, month, year);
        this.year = year;
        this.month = month;
        this.date = date;
        this.date_header = document.getElementById("date-header");
        this.left_arrow = document.getElementById("left-arrow");
        this.right_arrow = document.getElementById("right-arrow");
    }
    /**
     * Remove the days from the calender
     */
    removeDays() {
        for (let i = 0; i < 6; i++) {
            document.getElementsByClassName("days-row")[i].innerHTML = "";
        }
    }

    setheader(month, year) {
        this.date_header.innerHTML = month + "  " + year;
    }

    get header() {
        return this.date_header.innerHTML;
    }

    nextMonth() {
        this.removeDays();
        // if the next month is the next year
        if(this.month === 11) { 
            this.year += 1;
            this.month = 0; 
        } else {
            this.month += 1;
        }
        this.setheader(this.name, this.year);
        this.createMonth();
    }

    previousMonth() {
        this.removeDays();
        // if the next month is the previous year
        if(this.month === 0) {
            this.year -= 1;
            this.month = 11; 
        } else {
            this.month -= 1;
        }
        this.setheader(this.name, this.year);
        this.createMonth();
    }
    
    today() {
        this.removeDays();
        this.month = Today.month;
        this.year = Today.year;
        this.setheader(this.name, this.year);
        this.createMonth();
    }
}

class Reminder extends Day {

    constructor(date, month, year, startTime, endTime) {
        super(date, month, year)
        this.startTime = startTime;
        this.endTime = endTime; 
        this.title = title;
        this.templates = ["Reminder", "Event", "Task"];
        this.reminderElement = document.createElement("div");
    }
}

class Template extends Reminder {
    
    constructor(templateName) {
      this.template = templateName;  
    }
    
}



let calender = new Calender(Today.date, Today.month, Today.year);

calender.left_arrow.addEventListener("click", () => { // When the left arrow has been clicked
    calender.previousMonth();
});

calender.right_arrow.addEventListener("click", () => { // When the right arrow has been clicked
    calender.nextMonth();
});

calender.date_header.addEventListener("click", () => { // When the header has been clicked
    calender.today();
});

window.onload = () => { // When the page loads
    calender.today();
} 
