class Reminder extends Day {

    constructor(date, month, year, startTime, endTime) {
        super(date, month, year);
        this.startTime = startTime;
        this.endTime = endTime; 
        this.title = title;
    }

    BuildReminderBox() {
        let body = document.createElement("div");
        
        body.setAttribute("class", "ReminderBox");
        
    }

}

class Template extends Reminder {
    
    constructor(templateName) {
      this.template = templateName;  
    }
    
}