// Import the functions you need from the SDKs you need

import {
  get,
  getDatabase,
  set,
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// import { uuid } from "uuidv4";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOpvftuDWyJZ4ju3PbHeEPLCat90jV14E",
  authDomain: "jsi30-a977d.firebaseapp.com",
  projectId: "jsi30-a977d",
  storageBucket: "jsi30-a977d.appspot.com",
  messagingSenderId: "420126880821",
  appId: "1:420126880821:web:ea3b0c6de841a791db2d7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let submit_btn = document.getElementById("Submit_btn");
let read_btn = document.getElementById("Read_btn");
let task = document.getElementById("task");
let description = document.getElementById("description");
let endTask = document.getElementById("doneDate");
let task_container = document.querySelector(".container_task");

function taskDateEnd() {
  let endDate =
    endTask.value.split("T")[0].split("-")[2] +
    "/" +
    endTask.value.split("T")[0].split("-")[1] +
    "/" +
    endTask.value.split("T")[0].split("-")[0];
  let endTime = endTask.value.split("T")[1];

  let taskDateEnd = endTime + " " + endDate;
  return taskDateEnd;
}

function taskDateStart() {
  let date = new Date();
  let taskDateStart = `${
    date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
  }:${date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()} ${
    date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
  }/${
    date.getMonth() + 1 >= 10
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1)
  }/${
    date.getFullYear() >= 10 ? date.getFullYear() : "0" + date.getFullYear()
  }`;

  return taskDateStart;
}

// Create task
submit_btn.addEventListener("click", async () => {
  // Create unique taskID
  let taskID = window.uuidv4();

  console.log("taskDateStart", taskDateStart());
  console.log("taskDateEnd", taskDateEnd());

  set(ref(database, "All_Task/" + taskID), {
    taskID,
    taskName: task.value,
    taskDescription: description.value,
    taskDateStart: taskDateStart(),
    taskDateEnd: taskDateEnd()
  }).then(() => {
    alert("Add success");
  });
});
// read task
read_btn.addEventListener("click", async function () {
  onValue(ref(database, "All_Task"), async (snap) => {
    let data = snap.val();
    renderTask(data);
  });
});

// Render
function renderTask(data) {
  data = Object.values(data);
  for (let i = 0; i < data.length; i++) {
    let task = document.createElement("div");
    task.className = "task";
    task.innerHTML = `
        <div><b>Task Name:</b> <span>${data[i].taskName}</span></div>
        <div>
          <b>Task Description:</b>
          <span>${data[i].taskDescription}</span>
        </div>
        <div><b>Task End:</b> <span>${data[i].taskDateEnd}</span></div>
      `;

    task_container.appendChild(task);
  }

  active(data);
}

function active(list_task) {
  // let list_task = document.getElementsByClassName("task");
  // console.log(list_task);

  setInterval(function () {
    let currentMoment = taskDateStart();
    console.log(currentMoment);
    for (let i = 0; i < list_task.length; i++) {
      if (currentMoment == list_task[i].taskDateEnd) {
        console.log("Hết giờ");
      }
    }
  }, 1000);
}
