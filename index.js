let rowCount = 2;

document.querySelector(".save-button").addEventListener("click", addDelete); //при нажатии на кнопку

document.getElementById("text-input").addEventListener("keydown", (event) => {
  //при нажатии на enter
  if (event.key === "Enter") {
    addDelete();
  }
});

document
  .querySelector(".cleanAll-button")
  .addEventListener("click", deleteAllRows);

document.addEventListener("keydown", (event) => {
  if (event.key === "Delete") {
    deleteAllRows();
  }
});

function deleteAllRows() {
  const tables = [
    document.getElementById("table-ru-body"),
    document.getElementById("table-en-body"),
  ];

  tables.forEach((table) => {
    const rows = table.querySelectorAll("tr");
    for (let i = rows.length - 1; i > 0; i--) {
      rows[i].remove();
    }
  });
}

function addDelete() {
  // при нажатии на кнопку добавить, подключаются функции добавления/удаления/нумерации строк таблицы
  let input = document.getElementById("text-input").value;

  if (input) {
    const rowRu = createTableRow(
      document.getElementById("table-ru-body"),
      rowCount,
      input
    );
    const rowEn = createTableRow(
      document.getElementById("table-en-body"),
      rowCount,
      input,
      true
    );

    deleteRowButton(rowRu, rowEn);
    deleteRowButton(rowEn, rowRu);

    updateRowNumbers();

    rowCount++;
    document.getElementById("text-input").value = "";
  }
}

function createTableRow(tableBody, rowCount, input, isEnglish = false) {
  const row = document.createElement("tr");
  const td = document.createElement("td");
  const cellContent = document.createElement("div");
  cellContent.className = "cell-content";
  const spanContainer = document.createElement("div");
  spanContainer.className = "span-container";
  const spanNum = document.createElement("span");
  spanNum.className = isEnglish ? "mobile-number" : "";
  spanNum.innerText = `${rowCount}. `;

  let displayText = isEnglish ? translit(input) : input;
  let fullText = displayText;

  if (displayText.length > 15) {
    displayText = displayText.slice(0, 12) + "...";
  }
  const spanText = document.createElement("span");
  spanText.innerText = displayText;

  const clue = document.createElement("span");
  clue.innerText = fullText;
  clue.className = "clue";

  if (fullText.length > 15) {
    spanText.appendChild(clue);
    spanText.classList.add("with-clue");
  }

  const img = document.createElement("img");
  img.src = "./icons/delete_icon.svg";
  img.alt = "delete";
  img.className = "clean-button";

  tableBody.appendChild(row);
  row.appendChild(td);
  td.appendChild(cellContent);
  cellContent.appendChild(spanContainer);
  spanContainer.appendChild(spanNum);
  spanContainer.appendChild(spanText);
  cellContent.appendChild(img);

  return row;
}

function deleteRowButton(currentRow, oppositeRow) {
  const deleteButton = currentRow.querySelector(".clean-button");
  deleteButton.addEventListener("click", () => {
    currentRow.remove();
    oppositeRow.remove();
    updateRowNumbers();
  });
}

function updateRowNumbers() {
  const tables = [
    document.getElementById("table-ru-body"),
    document.getElementById("table-en-body"),
  ];

  tables.forEach((table) => {
    const rows = table.querySelectorAll("tr");

    rows.forEach((row, index) => {
      const spanNum = row.querySelector(".span-container span");
      if (spanNum) {
        spanNum.innerText = `${index + 1}. `;
      }
    });
  });
}

function translit(input) {
  const translitAlphabet = {
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "Yo",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Shch",
    Ъ: `"`,
    Ы: "Y",
    Ь: `'`,
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: `"`,
    ы: "y",
    ь: `'`,
    э: "e",
    ю: "yu",
    я: "ya",
  };

  let result = "";

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (translitAlphabet[char]) {
      result += translitAlphabet[char];
    } else {
      result += char;
    }
  }
  return result;
}
