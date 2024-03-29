let playBoard = document.getElementById("cellsForGame");
let buttonNewGame = document.querySelector('.button_startGame');
let resultQuestion = [];
let resultUserAnswer = [];
let numberRandomX, numberRandomY, randomCoordinateAndId;
const memoryNumber = 4; //Константа memoryNumber отвечает за количество ячеек для запоминания
const min = 65; //ASCII   A=65   буквы-названия ячеек
const max = 69; //ASCII   E=69   буквы-названия ячеек
const x = 5; //X - количество строк в таблице игры
const y = 5; //Y - количество столбцов в таблице игры

//функция для создания поля для игры, где X - количество строк, Y-количество столбцов
let titleBoard = document.createElement("h2");
titleBoard.textContent = "Memorize and repeat";
titleBoard.classList = "title-board";

function createFieldForGames(x, y) {
  playBoard.textContent = "";
  playBoard.append(titleBoard);
  for (let i = 0; i < y; i++) {
    let k = 0;
    let stringForBoard = playBoard.appendChild(document.createElement("div"));
    columnBoard = String.fromCharCode(65 + i);
    stringForBoard.className = `column-${columnBoard} cells`;
    for (let j = 0; j < x; j++) {
      let stringTwoForBoard = stringForBoard.appendChild(
        document.createElement("div")
      );
      let stringBoard = String.fromCharCode(65 + k);
      stringTwoForBoard.className = `${stringBoard}-${columnBoard} cells`;
      stringTwoForBoard.id = `${stringBoard}-${columnBoard}`;
      k++;
      functionForClickMemory(stringTwoForBoard);
      getRandomInt(min, max); //(МОЖНО ВЫБРАТЬ ручной режим(для этого нужно закомментить вызов этой функции  getRandomInt))
    }
  }
}

createFieldForGames(x, y);

buttonNewGame.addEventListener("click", () => {
  resultQuestion=[];
  createFieldForGames(x, y);
  addClassRandomElement(resultQuestion);
});

//функция для рандомного задания(нужно запомнить ячейки выделенные красным цветом).

function getRandomInt(min, max) {
  for (resultQuestion; resultQuestion.length < memoryNumber; ) {
    numberRandomX = Math.floor(Math.random() * (max - min + 1)) + min;
    numberRandomY = Math.floor(Math.random() * (max - min + 1)) + min;
    randomCoordinateAndId = `${String.fromCharCode(
      numberRandomX
    )}-${String.fromCharCode(numberRandomY)}`;
    if (resultQuestion.includes(randomCoordinateAndId)) {
      return;
    } else {
      resultQuestion.push(randomCoordinateAndId);
    }
  }
}

//добавляет и удаляет Class ячейкам (согласно рандома)
function addClassRandomElement(resultQuestion) {
  for (
    let indexForClass = 0;
    indexForClass < resultQuestion.length;
    indexForClass++
  ) {
    let numberID = resultQuestion[indexForClass];
    let docForNewClass = document.getElementById(numberID);
    setTimeout(() => {
      docForNewClass.classList.add("active_cells");
    }, 2000);
    setTimeout(() => {
      docForNewClass.classList.remove("active_cells");
    }, 3000);
  }
}

addClassRandomElement(resultQuestion);

//функция для обработки Клика по ячейкам от юзера и сравнение с заданием.
//(МОЖНО ВЫБРАТЬ ручной режим(для этого закомментить getRandomInt))
function functionForClickMemory(stringTwoForBoard) {
  resultUserAnswer = [];
  stringTwoForBoard.onclick = function () {
    //ручной режим выбора ячеек для загадки
    if (resultQuestion.length < memoryNumber) {
      resultQuestion.push(this.id);
      this.classList.add("active_cells");
      setTimeout(() => {
        this.classList.remove("active_cells");
      }, 3000);
    } else if (resultUserAnswer.length < memoryNumber) {
      resultUserAnswer.push(this.id);
      this.classList.add("active_cells_user");
      console.log(resultQuestion);
      console.log(resultUserAnswer);
    }

    function equalArrays(resultQuestion, resultUserAnswer) {
      resultQuestion = resultQuestion.sort();
      resultUserAnswer = resultUserAnswer.sort();
      if (resultQuestion.length === resultUserAnswer.length) {
        //проверка ответа пользователя на соответствие с загаданными ячейками
        let answerResult = document.createElement("p");
        answerResult.classList = 'text-answer';
        for (let i = 0; i < resultQuestion.length; i++) {
          if (resultQuestion[i] !== resultUserAnswer[i]) {
            answerResult.textContent = "Try again!";
            return playBoard.append(answerResult);
          } else {
            if (i === resultQuestion.length - 1) {
              answerResult.textContent = "Good!";
              return playBoard.append(answerResult);
            }
          }
        }
      }
    }
    equalArrays(resultQuestion, resultUserAnswer);
  };
}
