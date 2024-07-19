// fetch(url)
//  .then(res => res.json())
// .then(data => {
//  })

fetch("https://jsonplaceholder.typicode.com/photos")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data.splice(0, 5)[0].thumbnailUrl);
  })
  .catch((err) => {
    console.log(err);
  });

// function printName(user_name) {
//   console.log(`Tôi tên là: ${user_name}`);
// }

// ES6
// arrow function
const printName = (user_name) => console.log(`Tôi tên là: ${user_name}`);

printName("Phương");

