// Drag n' Drop - (Source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable)
function dragElement(elmnt) {
    let pos2 = 0, pos4 = 0;
    elmnt.onmousedown = dragOnMouseDown;
  
  function dragOnMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;
    // set the element's new position:
    if((elmnt.offsetTop - pos2)+elmnt.offsetHeight >= timeBox.offsetHeight) {
      elmnt.style.top = timeBox.offsetHeight-elmnt.offsetHeight + "px";
    } else if((elmnt.offsetTop - pos2) <= 0) {
      elmnt.style.top = 0; 
    } else {
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    }

    let startPixelHour = (elmnt.offsetTop - pos2 <= 0) ? 0 : elmnt.offsetTop - pos2;
    let endPixelHour = elmnt.offsetHeight;
    let startHour = pixelsToHour(startPixelHour);
    let startMin = pixelsToMin(startPixelHour%timeBoxesHeight);
    let endHour = pixelsToHour(startPixelHour+endPixelHour);
    let endMin = pixelsToMin(startPixelHour%timeBoxesHeight);
    elmnt.getElementsByClassName("ReminderBox-Time")[0].innerHTML = 
    `${isTwoDecimal(startHour) ? startHour : "0"+startHour}:${isTwoDecimal(startMin) ? startMin : "0"+startMin}-${isTwoDecimal(endHour) ? endHour : "0"+endHour}:${isTwoDecimal(endMin) ? endMin : "0"+endMin}`;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function isTwoDecimal(number) {
  if(number.toString().length === 2) return true;
  return false;
}