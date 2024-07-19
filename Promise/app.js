// const currentPromise = new Promise(function (resolve, reject) {
//   let notice = "Anh Phương đã k up code";

//   if (notice == "Anh Phương hứa up code") {
//     resolve("Anh Phương up rồi check lại đi");
//   } else if (notice != "Anh Phương hứa up code") {
//     reject("Anh Phương thất hứa hiu hiu ");
//   }
// });

// Xử lý các Promise mình có 2 cách
// Cách 1 là dùng then và catch
// - then(): xử lý Promise chạy thành công
// - catch(): xử lý Promise thất bại
// console.log(currentPromise);

// currentPromise
//   .then(function (output) {
//     // success
//     console.log(output);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// fetch("https://picsum.photos/200/300")
//   .then(function (res) {
//     return res;
//   })
//   .then(function (data) {
//     let img = document.createElement("img");
//     img.src = data.url;
//     document.body.appendChild(img);
//   });

// // Cach 2 async await

// async function execute() {
//   let promise1 = await fetch("https://picsum.photos/200/300");
//   document.getElementsByTagName("img")[0].src = promise1.url;

//   let promise2 = await fetch("https://picsum.photos/200/300");
//   document.getElementsByTagName("img")[1].src = promise2.url;

//   let promise3 = await fetch("https://picsum.photos/200/300");
//   document.getElementsByTagName("img")[2].src = promise3.url;
// }

// let list_p = document.getElementsByTagName("p");
// // console.log(list_p);

// fetch("https://geocoding-api.open-meteo.com/v1/search?name=tokyo")
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     list_p[0].innerHTML = `Place: <b>${data.results[0].name}</b>`;
//     list_p[1].innerHTML = `Latitude: <b>${data.results[0].latitude}</b>`;
//     list_p[2].innerHTML = `Longitude: <b>${data.results[0].longitude}</b>`;

//     fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current_weather=true`
//     )
//       .then((res) => {
//         return res.json();
//       })
//       .then((data1) => {
//         console.log(data1);
//         list_p[3].innerHTML = `Temperature: <b>${data1.current_weather.temperature}</b>`;
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

let container_history_search_weather = document.querySelector(
  ".container_history_search_weather"
);

let search_btn = document.getElementById("search_btn");
let search_place = document.getElementById("search_place");

// Xử lý lưu vào localStorage

let getStorageWeather = JSON.parse(
  localStorage.getItem("data_history_weather")
);

if (getStorageWeather == null) {
  localStorage.setItem("data_history_weather", JSON.stringify([]));
  window.location.reload();
}

// Cách 2
const getWeatherData = async (place) => {
  try {
    // Gọi api lần 1
    const dataWeather = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${place}`
    );
    const data = await dataWeather.json();
    // Gọi api lần 2
    const newData = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current_weather=true`
    );
    const data1 = await newData.json();
    let history_div = document.createElement("div");
    history_div.className = "history";
    history_div.innerHTML = `
    <p>Place: <b>${data.results[0].name}</b></p>
    <p>Latitude: <b>${data.results[0].latitude}</b></p>
    <p>Longitude: <b>${data.results[0].longitude}</b></p>
    <p>Temperature: <b>${data1.current_weather.temperature}</b> độ C</p>
    `;

    getStorageWeather.push({
      place: data.results[0].name,
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
      temperature: data1.current_weather.temperature
    });
    // Bước lưu
    localStorage.setItem(
      "data_history_weather",
      JSON.stringify(getStorageWeather)
    );

    container_history_search_weather.appendChild(history_div);
  } catch (err) {
    console.log(err);
  }
};

// Handle search
search_btn.addEventListener("click", function () {
  getWeatherData(search_place.value);
});

function render_history_weather() {
  getStorageWeather.forEach((weather) => {
    let history_div = document.createElement("div");
    history_div.className = "history";
    history_div.innerHTML = `
    <p>Place: <b>${weather.name}</b></p>
    <p>Latitude: <b>${weather.latitude}</b></p>
    <p>Longitude: <b>${weather.longitude}</b></p>
    <p>Temperature: <b>${weather.temperature}</b> độ C</p>
    `;

    container_history_search_weather.appendChild(history_div);
  });
}

render_history_weather();

// execute();
