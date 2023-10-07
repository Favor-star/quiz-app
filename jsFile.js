// let clicked = true;
// fetch("./questions.json")
//   .then((data) => {
//     return data.json();
//   })
//   .then((response) => {
//     console.log(response.qList1[0].id);
//     //   let quiz = new Test(response);

//     document.getElementById("div1").innerHTML = response.qList1[0].question;
//     document.getElementById("div2").innerHTML =
//       response.qList1[0].id * Math.random();
//     let length = response.qList1[0].options.length;
//     // let index = Math.floor(Math.random() * length);
//     let op = response.qList1[0].options;
//     console.log(op);
//     // document.getElementById("div3").innerHTML =
//     //   response.qList1[0].options[index];
//       let button = document.getElementById("click");
//       let body = document.querySelector("body");
//       button.addEventListener("click", () => {
//           clicked = !clicked;  
//           append(op);
//       });
//     //   button.addEventListener("click", () => {
//     //       if (clicked) {
//     //           root.innerHTML = "";
//     //           clicked = !clicked;
//     //       }
//     //   });
//   })
//   .then((response) => {});
  
//   // class Test {
//       //     constructor(response) {
//           //         this.response = response;

// //     }
// // }
// const append = (op) => {
//     console.log(clicked);
//     if (!clicked) {
//         let root = document.querySelector(".root");
//         // let sorted = op.sort((a, b) => {
//         //     return Math.random() - 0.5;
            
//         // })
//         op.sort((a,b) => {
//             return Math.random() - 0.5;
//         }).forEach((elem) => {
//             let div = document.createElement("div");
//             div.setAttribute("class", "division");
//             div.innerText = elem;
//         root.appendChild(div);
//         return clicked = !clicked;
//     });
// } else {
//     let root = document.querySelector(".root");
//         root.innerHTML = "";
// }

// };
//FISHER-YATES SORTING ALGORITHIM
let obj = {
  key1: "value1",
  key2: 'value2',
  key3: 'value3',
  key4: "value4",
  key5: "value5",
  
}
let entries = Object.entries(obj) // transform an object into an array of [key-value] pairs

for (let i = entries.length - 1; i > 0; i--){
  const j = Math.floor(Math.random() * (i + 1));
  [entries[i], entries[j]] = [entries[j],entries[i]]
}
let randomlySortedObj = Object.fromEntries(entries);
console.log(randomlySortedObj);