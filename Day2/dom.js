// let my_element = document.querySelector("#name");
// console.log(my_element);
// console.log(my_element.innerText);

// // Gán cho thẻ 1 giá trị mới:
// my_element.innerText = "Danh Phuong dzai";

// // Thay đổi CSS
// my_element.style.color = "red";
// my_element.style.backgroundColor = "yellow";

// let groupA_element = document.getElementsByClassName("groupA");
// console.log(groupA_element);
// groupA_element[1].style.color = "red";

// let groupB_element = document.querySelectorAll(".groupB");
// console.log(groupB_element);

// Lấy thẻ có class change_font_size
// let change_font_size = document.querySelector(".change_font_size");
// change_font_size.addEventListener("click", function () {
//   console.log("Hello các bạn");

//   let all_element = document.body.getElementsByTagName("*");

//   //   all_element[0].style.fontSize = "20px";
//   //   all_element[1].style.fontSize = "20px";
//   //   all_element[2].style.fontSize = "20px";
//   //   all_element[3].style.fontSize = "20px";
//   //   all_element[4].style.fontSize = "20px";
//   //   all_element[5].style.fontSize = "20px";
//   //   all_element[6].style.fontSize = "20px";

//   for (let i = 0; i < all_element.length; i++) {
//     all_element[i].style.fontSize = "20px";
//   }
// });

let searchBtb = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchInput");
let container = document.querySelector(".container");

// Tạo sẵn 1 trường giá trị trong localStorage để lưu lại những dữ liệu search
// B1: Gọi trường giữ liệu đó ra, nếu chưa có ta sẽ tạo mới
let getSearchList = JSON.parse(localStorage.getItem("search_list"));
if (getSearchList == null) {
  // B2: Tạo nó ra, ở đây mình sẽ set key là search_list và value là []
  localStorage.setItem("search_list", JSON.stringify([]));
  // Dùng reload để code được chạy lại và lúc đó search_list đã tồn tại nên sẽ không
  // bị null nữa
  location.reload();
}

searchBtb.addEventListener("click", function () {
  let newDiv = document.createElement("div");
  newDiv.className = "output";

  newDiv.innerHTML = `
    <div class="output_index">1</div>
    <div class="output_content">${searchInput.value}</div>
  `;

  // Đoạn xử lý thêm vào localStorage
  getSearchList.push(searchInput.value);
  localStorage.setItem("search_list", JSON.stringify(getSearchList));

  // Clear text trong input
  searchInput.value = "";
  container.appendChild(newDiv);
});
