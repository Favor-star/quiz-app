const qNumber = document.querySelector("[q-number]");
const question = document.querySelector(".question");
const options = document.querySelector(".options");
const nextBtn = document.getElementById("next-btn");
const qSubmit = document.querySelector(".q-submit");
const prevBtn = document.getElementById("prev-btn");
const secondsDiv = document.querySelector(".seconds");
const minutesDiv = document.querySelector(".minutes");
const imageDiv = document.querySelector(".q-image");
// let marks = 0;

window.onload = fetch("./questions.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let entries = Object.entries(data);
    let length = entries.length;
    for (let i = entries.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [entries[i], entries[j]] = [entries[j], entries[i]];
    }

    let q = `qList${Math.floor(1 + Math.random() * length)}`;

    const oneQuestion = Object.fromEntries(entries)[q];

    return oneQuestion.sort(() => {
      return Math.random() - 0.5;
    });

    // let test = new QuizApp(oneQuestion);
  })
  .then((qList) => {
    // console.log(qList);
    class QuizApp {
      constructor(qList) {
        this.qList = qList;
        this.marks = 0;
        this.index = 0;
      }
      // getIndex(val = -1) {
      //   this.index = Number(val);
      //   // console.log(this.index);
      // }
      clearDiv() {
        options.innerHTML = "";
      }
      appendDiv() {
        if (this.index < this.qList.length) {
          if (this.qList[this.index].qImgLink === "N/A") {
            imageDiv.style.display = "none";
          } else {
            imageDiv.innerHTML = "";
            let image = document.createElement("img");
            image.src = `${this.qList[this.index].qImgLink}`;
            console.log(this.qList[this.index].qImgLink);
            image.alt = `image-id-${this.qList[this.index].id}`;
            image.classList.add("image-shown");
            imageDiv.appendChild(image);
            imageDiv.style.display = "block";
          }
          question.textContent = this.qList[this.index].question;
          qNumber.textContent = this.index + 1;
          console.log(this.qList[this.index].correct);
          this.qList[this.index].options.forEach((elem) => {
            let div = document.createElement("div");
            div.setAttribute("class", "choices");
            div.innerHTML = elem;
            options.appendChild(div);
          });
        } else {
          // return;
          this.endQuiz();
        }
        this.getChoice();
        if (this.index === this.qList.length - 1) {
          nextBtn.textContent = "Submit";
          nextBtn.style.background = "#00AA6C";
        }
      }
      nextQuestion() {
        this.index += 1;
        this.appendDiv();
      }
      previousQuestion() {
        this.index -= 1;
        this.appendDiv();
      }

      getChoice() {
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
          });
        });
      }

      updateMarks() {
        // console.log("Update marks called successfully");
        let choices = document.querySelectorAll(".choices");
        choices.forEach((elem) => {
          // console.log(elem.classList.contains("clickedDiv"));
          if (elem.classList.contains("clickedDiv")) {
            // console.log(elem.textContent);
            if (elem.textContent == this.qList[this.index].correct) {
              this.marks += 1;
            } else {
              console.log(this.qList[this.index].correct);
              return;
            }
          }
        });
      }
      endQuiz() {
        question.textContent = "Marks";
        imageDiv.style.display = "none";
        let div = document.createElement("div");
        if (this.marks > this.qList.length / 2) {
          div.style.backgroundColor = "#00AA6C60";
        } else {
          div.style.backgroundColor = "#ff000040";
          div.style.border = "1px solid red";
        }
        div.innerText = this.marks + " out of " + qList.length;
        div.style.pointerEvents = "none";
        div.style.textAlign = "center";
        div.setAttribute("class", "choices");
        options.appendChild(div);
        nextBtn.style.display = "none";
        prevBtn.style.display = "none";

        // let goBack = document.createElement("button");
        // goBack.setAttribute("class", "progress-btn");
        // goBack.id = "go-back";
        // goBack.innerText = "Go back";
        // goBack.onclick;
        // qSubmit.style.justifyContent = "center";
        // qSubmit.appendChild(goBack);
      }
    }

    //
    //
    const quiz = new QuizApp(qList);
    console.log(quiz);

    nextBtn.addEventListener("click", () => {
      quiz.updateMarks();
      quiz.clearDiv();
      quiz.nextQuestion();
      prevBtn.classList.remove("prev-btn");
      console.log(quiz.marks);
    });

    // quiz.previousQuestion();
    prevBtn.addEventListener("click", () => {
      console.log("Quiz index:" + quiz.index);

      if (quiz.index === 0) {
        prevBtn.classList.add("prev-btn");
      } else if (quiz.index > 0) {
        prevBtn.classList.remove("prev-btn");
        quiz.clearDiv();
        quiz.previousQuestion();
        if (quiz.index <= quiz.qList.length) {
          nextBtn.textContent = "Next";
          nextBtn.style.background = "#0a69ed";
        }
      }
    });

    let container = document.querySelector(".container");
    let start = document.querySelector(".start");
    start.addEventListener("click", atStart);

    function atStart() {
      start.style.display = "none";
      container.classList.add("container-shown");
      quiz.updateMarks();
      quiz.clearDiv();
      quiz.appendDiv();
      prevBtn.classList.add("prev-btn");
      startTimer();
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        console.log(true);
        let start = document.querySelector(".start");
        atStart();
      }
    });
    const goBackB = document.getElementById("go-back");
    let second = 5;
    let minutes = 1;
    function startTimer() {
      let time = setInterval(() => {
        // secondsDiv.textContent = Number(secondsDiv.textContent) - 1;
        // if (Number(secondsDiv.textContent) === -1) {
        //   secondsDiv.textContent = 5;
        //   minutesDiv.textContent = Number(minutesDiv.textContent) - 1;
        // }
        // if (
        //   Number(minutesDiv.textContent) === 0 &&
        //   Number(secondsDiv.textContent) === 0
        // ) {
        //   clearInterval(time);
        //   secondsDiv.textContent = 0;
        //   minutesDiv.textContent = 0;
        // }
        secondsDiv.textContent = second < 10 ? "0" + second-- : second--;
        minutesDiv.textContent = minutes < 10 ? "0" + minutes : minutes;
        if (second <= -1) {
          minutes--;
          second = 5;
        }
        if (minutes <= 0) {
          if (second <= 0) {
            clearInterval(time);
            alert("THE TIME IS UP!  :(");
          }

          // secondsDiv.textContent = "00";
          // minutesDiv.textContent = "00";
        }
      }, 1000);
    }
  });
