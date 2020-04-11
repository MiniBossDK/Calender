for (let i = 0; i < document.getElementsByClassName("activitie-day").length; i++) {
    document.getElementsByClassName("activitie-day")[i].addEventListener("click", () => { 
        modal.style.display = "block";
    });
}

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let title = document.getElementById("title-textbox");
let datetime = document.getElementById("datetime-textbox");

span.onclick = () => {
    modal.style.display = "none";
    title.value = "";
    datetime.value = "";
}