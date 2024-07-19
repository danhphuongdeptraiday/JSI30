// -setTimeout: hàm dùng để đếm ngược thời gian để thực thi 1 chức năng nào đấy

let h1 = document.getElementsByTagName("h1");
let p = document.querySelector("p");
// setTimeout(function () {
//   h1[0].style.display = "none";
// }, 1000);

// function callBack() {
//   let myTimeout = setTimeout(function () {
//     p.innerText = p.innerText - 1;
//     if (p.innerText > 0) {
//       callBack();
//     }
//   }, 1000);
// }

// callBack();

let myInterval = setInterval(function () {
  if (p.innerText > 0) {
    p.innerText = p.innerText - 1;
  } else {
    clearInterval(myInterval);
  }
}, 1000);
