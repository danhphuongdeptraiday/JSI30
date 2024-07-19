// Promise: có 3 trạng thái
/**
 * - Pending: trạng thái chờ đợi
 * - Resolve: nếu promise dc thực hiện (true) gọi hàm resolve
 * - Reject: nếu promise ko dc thực hiện (false) gọi hàm resolve
 */

const currentPromise = new Promise((resolve, reject) => {
  //   const condition = false;
  //   if (condition) {
  //     setTimeout(() => {
  //       resolve("Success");
  //     }, 3000);
  //   } else {
  //     reject("Fail");
  //   }
});

// currentPromise
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function executeGetRequestHttp(http) {
//   return await fetch(`${http}`).then();
// }

// console.log(executeGetRequestHttp("https://picsum.photos/200/300"));

// giả sử trong 1 chuỗi đồng bộ xử lý lý await, nếu request đường link đầu sai mà k muốn làm ảnh hưởng đến thg dưới
// dùng try catch

async function execute() {
  try {
    let promise1 = await fetch("https://picsum.photos/200/300");
    document.getElementsByTagName("img")[0].src = promise1.url;
    console.log(promise1);

    let promise2 = await fetch("https://picsum.photos/200/300");
    document.getElementsByTagName("img")[1].src = promise2.url;

    let promise3 = await fetch("https://picsum.photos/200/300");
    document.getElementsByTagName("img")[2].src = promise3.url;
  } catch (err) {
    console.log(err);
  }
}

execute();
