const qList = [
  {
    id: 0,
    question: "What do you like about me?",
    options: ["styles", "smell", "midset", "sense of humor"],
    correct: "styles",
  },
  {
    id: 1,
    question: "What do you think I like?",
    options: ["Meat", "Rice", "Conversation", "Hug", "none"],
    correct: "none",
  },
  {
    id: 2,
    question: "What the best advice can you give me?",
    options: ["Be humble", "Be nice", "Dress well", "Be social", "No advice"],
    correct: "dress well",
  },
  {
    id: 3,
    question: "What do you do you believe I can change?",
    options: ["styles", "clothes", "shoes", "mental abilities", "none"],
    correct: "none",
  },
  {
    id: 4,
    question: "What do you hate about me?",
    options: ["styles", "smell", "none"],
    correct: "none",
  },
];

const qNumber = document.querySelector("[q-number]");
const question = document.querySelector(".question");
const options = document.querySelector(".options");
const nextBtn = document.getElementById("next-btn");

const prevBtn = document.getElementById("prev-btn");
const timer = document.querySelector(".timer");
let marks = 0;

nextBtn.addEventListener("click", () => {
  console.log("yes" + getAnswer());
  let value = checkQ();
  value += 1;
  appendDiv(value);
});
prevBtn.addEventListener("click", () => {
  let value = checkQ();
  --value;
  appendDiv(value);
});
const checkQ = () => (currentState = Number(qNumber.textContent));
const getChoicesDiv = () => document.querySelector(".choices");

// function checkAnswer() {
//   let index = checkQ();
//   let choices = document.querySelectorAll(".choices");
//   //   console.log(choices);
//   choices.forEach((elem) => {
//     let isChoiceMade = false;
//     elem.addEventListener("click", () => {
//       if (isChoiceMade) {
//         return;
//       } else {
//         isChoiceMade = true;
//         if (elem.innerText == qList[index].correct) {
//           elem.style.border = " 1px solid #00AA6C";
//           elem.style.backgroundColor = "#00AA6C40";
//           marks += 1;
//         } else {
//           elem.style.border = " 1px solid rgb(255,0,0)";
//           elem.style.backgroundColor = "rgb(255,0,0,.4)";
//         }
//         }

//         choices.forEach(elem2 => {
//             // if (elem2 !== elem) {
//                 elem2.style.pointerEvents = "none";
//     // }
// })
//       // console.log(true);
//     });
//   });
// }
function getAnswer() {
  let answer;
  let index = checkQ();
  let marks = 0;
  let choices = document.querySelectorAll(".choices");
  choices.forEach((elem) => {
    elem.addEventListener("click", () => {
      elem.classList.add("clickedDiv");
      //   console.log(elem.parentElement);
      choices.forEach((elem2) => {
        if (elem2 !== elem) {
          elem2.classList.remove("clickedDiv");
          elem.classList.add("clickedDiv");
        }
      });
      answer = elem.textContent;
      //   answer.push(elem);
      //   let newAnswer = answer.filter((e, i) => {
      //     return e.classList.contains("clickedDiv");
      //   });
      //   console.log(newAnswer[0].innerHTML);
      //     return answer.push(newAnswer[0].innerHTML);
    });
      if (answer == qList[index].correct) {
          marks += 1;
      }
  });
  return marks;
}

function appendDiv(index = 0) {
  options.innerHTML = "";
  // index++;
  // if(index )
  if (index === qList.length - 1) {
    console.log("Yes", true);
    //   nextBtn.setAttribute("disabled", true);
    nextBtn.innerText = "Submit";
    nextBtn.style.background = "#00AA6C";

    // return;
  }
  if (index >= 0 && index < qList.length) {
    question.textContent = qList[index].question;
    qNumber.textContent = qList[index].id;
    qList[index].options.forEach((elem) => {
      let div = document.createElement("div");
      div.setAttribute("class", "choices");
      div.innerHTML = elem;
      options.appendChild(div);
    });
  } else {
    if (index === qList.length) {
      nextBtn.style.display = "none";
      prevBtn.style.display = "none";
      hideBody();
      return;
    }
    console.log(index);
    console.log("Length issue");
    return;
  }
  marks = getAnswer();
  //   checkAnswer();
}

appendDiv();

//HIDE BODy FN
const hideBody = () => {
  const qSubmit = document.querySelector(".q-submit");
  question.innerText = "Marks";
  let div = document.createElement("div");
  div.innerText = marks + " out of " + qList.length;
  div.setAttribute("class", "choices");
  options.appendChild(div);
  let goBackBtn = document.createElement("button");
  goBackBtn.setAttribute("class", "progress-btn");
  goBackBtn.textContent = "Go back";
  qSubmit.appendChild(goBackBtn);
  qSubmit.style.justifyContent = "Center";
};
