let activitieDay = document.getElementsByClassName("activitie-day");
let timeBox = document.getElementsByClassName("time-column")[0];
let timeBoxesHeight = Math.round((timeBox.offsetHeight/24)*10)/10;

for (let i = 0; i < reminders.length; i++) {
  dragElement(reminders[i]);
}

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let saveBtn = document.getElementById("Save");
let title = document.getElementById("title-textbox");
let startDate = document.getElementById("StartDate");
let startTime = document.getElementById("StartTime");
let endDate = document.getElementById("EndDate");
let endTime = document.getElementById("EndTime");
let AddReminderButtonElement = document.getElementsByClassName("AddReminderButton")[0];

AddReminderButtonElement.onclick = () => {
  modal.style.display = "block";
}

startDate.onchange = () => {
  endDate.value = startDate.value;
}

endDate.onchange = () => {
  startDate.value = endDate.value;
}

saveBtn.onclick = () => {
  let dateList = startDate.value.split('-'); // MM-DD-YYYY
  let startTimeList = startTime.value.split(':'); // HH:MM
  let endTimeList = endTime.value.split(':'); // HH:MM
  reminders.push(new Reminder(
  title.value,
  parseInt(dateList[2]), parseInt(dateList[1]), parseInt(dateList[0]), 
  parseInt(endTimeList[0])-parseInt(startTimeList[0]), // Hour
  parseInt(endTimeList[1])-parseInt(startTimeList[1]), // Min
  "School" 
  ));

  console.log(reminders);
  //modal.style.display = "none";
  //makeFieldsDefault();
}

span.onclick = () => {
  modal.style.display = "none";
  makeFieldsDefault();
}

function calculateTime(startMin, endMin, startHour, endHour) {
  
  return 
}

function makeFieldsDefault() {
    title.value = "";
    startDate.value = "";
    startTime.value = "";
    endDate.value = "";
    endTime.value = "";
}
