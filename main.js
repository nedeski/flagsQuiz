// get all countires url https://restcountries.com/v3.1/all

const countryContainer = document.querySelector("#countryContainer");

let randomArr = [];
let counter = 1;
let heartCounter = 3;
fetch("https://restcountries.com/v3.1/all?fields=name,flags")
  .then((res) => res.json())
  .then(function (data) {
    allCountries = data.map((obj) => obj);

    getThreeRandomCountries(allCountries);
    renderQuestion();
    renderFlags(randomArr);
    const flag = document.querySelectorAll(".flag");
    flag.forEach((el) => el.addEventListener("click", onClickHandler));
  });

function getThreeRandomCountries(object) {
  for (let i = 0; i < 3; i++) {
    let x = Math.floor(Math.random() * 250);
    let randomObj = object[x];
    randomArr.push(randomObj);
  }
}

function renderQuestion() {
  let x = Math.floor(Math.random() * 3);
  let className = randomArr[x].name.common.replace(/\s/g, "");
  let question = document.createElement("h3");
  countryContainer.appendChild(question);
  question.classList.add(
    `${className}`,
    "question",
    "mt-5",
    "text-center",
    "h2"
  );
  question.innerText = `Which of the flags represents ${randomArr[x].name.common}?`;
}

function renderFlags(arr) {
  arr.forEach((el) => {
    let flagId = el.name.common.replace(/\s/g, "");
    const flagDiv = document.createElement("div");
    countryContainer.appendChild(flagDiv);
    flagDiv.classList.add(
      "col-4",
      "p-4",
      "border",
      "border-light",
      "rounded",
      "shadow-sm",
      "mt-5"
    );
    flagDiv.innerHTML = `<img src="${el.flags.png}" id="${flagId}" class="flag w-100">`;
  });
}

function onClickHandler(event) {
  const score = document.querySelector("b");
  const heartList = document.querySelector(".fa-solid");
  const questionClassList = document.querySelector(".question").classList;
  if (questionClassList.contains(event.target.id)) {
    event.target.parentElement.classList.add("bg-success");
    score.innerText = counter;
    counter++;
  } else {
    event.target.parentElement.classList.add("bg-danger");
    heartList.classList.remove("fa-solid");
    heartList.classList.add("fa-regular");
    heartCounter--;
    if (heartCounter == 0) {
      counter = 1;
      score.innerText = 0;
      alert("GAME OVER! Press OK to play again.");
      let hearts = document.querySelectorAll(".fa-regular");
      hearts.forEach((el) => el.classList.remove("fa-regular"));
      hearts.forEach((el) => el.classList.add("fa-solid"));
      heartCounter = 3;
    }
  }
  setTimeout(rerenderFlags, 1000);
}

function rerenderFlags() {
  countryContainer.innerHTML = "";
  randomArr = [];
  getThreeRandomCountries(allCountries);
  renderQuestion();
  renderFlags(randomArr);
  const flag = document.querySelectorAll(".flag");
  flag.forEach((el) => el.addEventListener("click", onClickHandler));
}

////////////////////////////////////////
// SOLUTION 2

// const flagsContainer = document.getElementById("countryContainer");
// const scoreContainer = document.getElementById("score");
// const livesHarts = document.getElementById("lives").querySelectorAll("i");

// let flagsNum = 3;
// let points = 0;
// let lives = 3;
// let highscore = localStorage.getItem("highscore") || 0;

// scoreContainer.innerHTML = `<p>Corrrect answers: <b>${points}</b></p>
// <p>Current Highscore: <b>${highscore}</b></p>`;
// // Render card with flag function
// const renderFlag = function (country) {
//   const newFlag = `
//   <div role="button" id="${country.ccn3}" class="card col p-3 ">
//        <img src="${country.flags.png}" class="img-fluid border border-dark" style="max-height:250px;" alt="${country.flags.alt}">
//   </div>`;
//   flagsContainer.innerHTML += newFlag;
// };
// // Render question
// const corectFlag = function (correct) {
//   newCountry = `<div class="col-12">
//   <h1 class="h3 text-center my-4">Which of the flags represent <strong>${correct}</strong>?</h1>
// </div>
//   `;
//   flagsContainer.insertAdjacentHTML("afterbegin", newCountry);
// };
// // Shuffle  array function
// function shuffleArray(array) {
//   const max = array.length;
//   for (let i = max - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// // Get all data for all coutries
// async function getCountries() {
//   try {
//     const res = await fetch("https://restcountries.com/v3.1/all");
//     if (!res.ok) {
//       throw new Error("Failed to load Flags");
//     }
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     alert(err.message);
//   }
// }

// // Render three flags
// const renderCountriesFlags = async function () {
//   try {
//     const countries = await getCountries();
//     const randomCountries = shuffleArray(countries).slice(0, flagsNum);

//     // Render cards for random countries flags
//     flagsContainer.innerHTML = "";
//     randomCountries.forEach((country) => {
//       renderFlag(country);
//     });
//     // Choose the correct flag
//     const correctIndex = Math.floor(Math.random() * flagsNum);
//     const correctCountry = randomCountries[correctIndex];
//     corectFlag(correctCountry.name.common);
//     // Add event on falg cards
//     const flagCards = flagsContainer.querySelectorAll(".card");

//     flagCards.forEach((el) => {
//       el.addEventListener(
//         "click",
//         (e) => {
//           const current = e.target.closest("div");
//           if (e.target.closest("div").id === correctCountry.ccn3) {
//             points++;
//             points <= highscore ? (highscore = highscore) : highscore++;
//             localStorage.setItem("highscore", highscore);
//             scoreContainer.innerHTML = `<p>Corrrect answers: <b>${points}</b></p>
//             <p>Current Highscore: <b>${highscore}</b></p>`;
//             current.classList.add("bg-success");
//             setTimeout(() => {
//               renderCountriesFlags();
//             }, 1000);
//           } else {
//             lives--;
//             livesHarts[lives].classList.add("fa-regular");
//             livesHarts[lives].classList.remove("fa-solid");
//             current.classList.add("bg-danger");

//             setTimeout(() => {
//               renderCountriesFlags();
//             }, 1000);
//           }
//           if (!lives) {
//             setTimeout(() => {
//               alert(`Game Over 😭 \nPlay Again`);
//               renderCountriesFlags();
//             }, 0);
//             points = 0;
//             lives = 3;
//             livesHarts.forEach((el) => {
//               el.classList.add("fa-solid");
//               el.classList.remove("fa-regular");
//             });
//             scoreContainer.innerHTML = `<p>Corrrect answers: <b>${points}</b></p>
//             <p>Current Highscore: <b>${highscore}</b></p>`;
//           }
//         },
//         { once: true }
//       );
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// window.addEventListener("load", getCountries);
// renderCountriesFlags();

//////////////////////////////////////////////////////////////////////////////////
// SOLUTION 3

// const rowFlags = document.querySelector("#countryContainer");
// rowFlags.style.backgroundColor = "grey";
// rowFlags.style.width = "100%";
// rowFlags.style.height = "300px";
// const scoreElement = document.querySelector("#score");
// const livesContainer = document.querySelector("#lives");

// let allCountries = [];

// async function getCountries() {
//   try {
//     const response = await fetch(
//       "https://restcountries.com/v3.1/all?fields=name,flags"
//     );
//     const data = await response.json();
//     allCountries = data;
//     getFlags();
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//   }
// }

// function getFlags() {
//   rowFlags.innerHTML = ""; // Clear previous flags
//   const randomCountries = getRandomCountries(3);
//   const correctCountry = randomCountries[Math.floor(Math.random() * 3)];

//   randomCountries.forEach((country) => {
//     const myDiv = document.createElement("div");
//     myDiv.classList.add(
//       "d-flex",
//       "col-4",
//       "justify-content-between",
//       "align-items-center"
//     );
//     myDiv.innerHTML = `<img src="${country.flags.png}" data-country="${country.name.common}" class="flag">`;
//     rowFlags.appendChild(myDiv);
//   });

//   appendQuestion(correctCountry.name.common);
// }

// function appendQuestion(countryName) {
//   const questionElement = document.querySelector("#question");
//   if (!questionElement) {
//     const questionDiv = document.createElement("div");
//     questionDiv.id = "question";
//     questionDiv.innerHTML = `<h2 class="py-3 text-center">Which of the flags represents ${countryName}?</h2>`;
//     livesContainer.insertAdjacentElement("afterend", questionDiv);
//   } else {
//     questionElement.innerHTML = `<h2 class="py-3 text-center">Which of the flags represents ${countryName}?</h2>`;
//   }
// }

// function getRandomCountries(num) {
//   const randomCountries = [];
//   for (let i = 0; i < num; i++) {
//     const randomIndex = Math.floor(Math.random() * allCountries.length);
//     randomCountries.push(allCountries[randomIndex]);
//   }
//   return randomCountries;
// }

// window.addEventListener("DOMContentLoaded", () => {
//   getCountries();
// });

// let score = 0;
// let lives = 3;

// rowFlags.addEventListener("click", (event) => {
//   const clickedFlag = event.target;
//   if (clickedFlag.classList.contains("flag")) {
//     const selectedCountry = clickedFlag.dataset.country;
//     const correctCountry = document
//       .querySelector("#question")
//       .innerText.split(" ")
//       .slice(-1)[0]
//       .replace("?", "");

//     if (selectedCountry === correctCountry) {
//       // Correct answer
//       score++;
//       scoreElement.innerHTML = `Correct answers: <b>${score}</b>`;
//       rowFlags.style.backgroundColor = "green";
//     } else {
//       // Incorrect answer
//       lives--;
//       updateLives();
//       rowFlags.style.backgroundColor = "red";
//     }

//     setTimeout(() => {
//       rowFlags.style.backgroundColor = "";
//       getCountries();
//     }, 1000);
//   }
// });

// function updateLives() {
//   const hearts = document.querySelectorAll("#lives i");
//   hearts[lives].classList.replace("fas", "far"); // Change solid heart to outlined heart

//   if (lives === 0) {
//     setTimeout(() => {
//       alert("Game over");
//       resetGame();
//     }, 1000);
//   }
// }

// function resetGame() {
//   score = 0;
//   lives = 3;
//   scoreElement.innerHTML = `Correct answers: <b>${score}</b>`;
//   const hearts = document.querySelectorAll("#lives i");
//   hearts.forEach((heart) => heart.classList.replace("far", "fas")); // Reset hearts to solid
//   getCountries();
// }

//////////////////////////////////////////////////////////////SOLUTION  4 ////////////////////////////////////////////////////////////
// let correctAnswer;
// let score = 0;
// let lives = 3;

// /////////////////////////////////////////////////////////Ovde FETCHUVAM i go HENDLAM errorot
// async function getAllCountries() {
//   try {
//     const response = await fetch("https://restcountries.com/v3.1/all");
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//     return [];
//   }
// }
// //////////////////////////////////////////////////////////////////////Generiram RANDOM zemji koristam ...SPREAD
// function getRandomCountries(countries, count = 3) {
//   const shuffled = [...countries].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// }
// /////////////////////////////////////////////////////////////////////Kreiram prasanje
// function createQuestionElement(questionText) {
//   const questionDiv = document.createElement("div");
//   questionDiv.id = "question";
//   questionDiv.classList.add("question", "text-center", "mt-4");
//   questionDiv.innerHTML = `<h2>${questionText}</h2>`;
//   return questionDiv;
// }
// ////////////////////////////////////////////////////////////////////Prikazuvam Znaminja
// function displayFlags(randomCountries) {
//   const container = document.getElementById("countryContainer");
//   container.innerHTML = randomCountries
//     .map(
//       (country) => `
//       <img
//         src="${country.flags.svg}"
//         data-country="${country.name.common}"
//         class="img-fluid m-2 border border-dark rounded"
//         style="max-width: 200px; max-height: 100px;"
//       >`
//     )
//     .join("");
// }
// ////////////////////////////////////////////////////////////////////////UPDATIRAM novo prasanje i novi zemji
// async function updateGame() {
//   try {
//     const countries = await getAllCountries();
//     const randomCountries = getRandomCountries(countries);
//     correctAnswer =
//       randomCountries[Math.floor(Math.random() * randomCountries.length)];
//     document
//       .getElementById("question")
//       .querySelector(
//         "h2"
//       ).textContent = `Which of the flags represents ${correctAnswer.name.common}?`;
//     displayFlags(randomCountries);
//   } catch (error) {
//     console.error("Error updating the game: ", error);
//   }
// }
// ///////////////////////////////////////////////////////////////////////Hendlam klik na zname
// function handleFlagClick(event) {
//   if (event.target.tagName !== "IMG") return;
//   const clickedCountry = event.target.dataset.country;
//   const isCorrect = clickedCountry === correctAnswer.name.common;
//   const resultClass = isCorrect ? "bg-success" : "bg-danger";
//   if (isCorrect) {
//     score++;
//     document.getElementById(
//       "score"
//     ).innerHTML = `Correct answers: <b>${score}</b>`;
//   } else {
//     lives--;
//     updateLivesDisplay();
//   }
//   event.target.classList.add(resultClass);
//   setTimeout(() => {
//     event.target.classList.remove(resultClass);

//     if (!isCorrect && lives <= 0) {
//       alert("Game Over");
//       resetGame();
//     } else {
//       updateGame();
//     }
//   }, 1000);
// }
// ////////////////////////////////////////////////////////////////Gi updateiram zivotite "Srcinjata"
// function updateLivesDisplay() {
//   const hearts = document.querySelectorAll("#lives .fa-heart");
//   hearts.forEach((heart, index) => {
//     heart.classList.toggle("fas", index < lives);
//     heart.classList.toggle("far", index >= lives);
//   });
// }

// ///////////////////////////////////////////////////////////////RESETIRAM
// function resetGame() {
//   score = 0;
//   lives = 3;
//   document.getElementById(
//     "score"
//   ).innerHTML = `Correct answers: <b>${score}</b>`;
//   updateLivesDisplay();
//   updateGame();
// }
// ////////////////////////////////////////////////////////////Inicijaliziram igra
// async function initGame() {
//   const container = document.querySelector(".container");
//   const questionDiv = createQuestionElement("Loading...");
//   container.insertBefore(
//     questionDiv,
//     document.getElementById("countryContainer")
//   );

//   await updateGame();
//   document
//     .getElementById("countryContainer")
//     .addEventListener("click", handleFlagClick);
// }
// initGame();
