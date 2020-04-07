function createKeyboardElements() {
  const body = document.querySelector("body");

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  body.append(wrapper);

  const textarea = document.createElement("textarea");
  textarea.classList.add("textarea");
  wrapper.append(textarea);

  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  wrapper.append(keyboard);

  const clear = document.createElement("div");
  clear.classList.add("clearfix");
  keyboard.append(clear);

  keyboard.after("Shift + alt - change language");
}
createKeyboardElements();

const KEY_CODE = {
  Backquote: ["tilde", "~", "`", "ё", "Ё"],
  Digit1: ["one", "1", "!", "1", "!"],
  Digit2: ["two", "2", "@", "2", '"'],
  Digit3: ["three", "3", "#", "3", "№"],
  Digit4: ["four", "4", "$", "4", ";"],
  Digit5: ["five", "5", "%", "5", "%"],
  Digit6: ["six", "6", "^", "6", ":"],
  Digit7: ["seven", "7", "&", "7", "?"],
  Digit8: ["eight", "8", "*", "8", "*"],
  Digit9: ["nine", "9", "(", "9", "("],
  Digit0: ["zero", "0", ")", "0", ")"],
  Minus: ["minus", "-", "_", "-", "_"],
  Equal: ["equal", "=", "+", "=", "+"],
  Backspace: ["Backspace"],

  Tab: ["Tab"],
  KeyQ: ["q", "q", "Q", "й", "Й"],
  KeyW: ["w", "w", "W", "ц", "Ц"],
  KeyE: ["e", "e", "E", "у", "У"],
  KeyR: ["r", "r", "R", "к", "К"],
  KeyT: ["t", "t", "T", "е", "Е"],
  KeyY: ["y", "y", "Y", "н", "Н"],
  KeyU: ["u", "u", "U", "г", "Г"],
  KeyI: ["i", "i", "I", "ш", "Ш"],
  KeyO: ["o", "o", "O", "щ", "Щ"],
  KeyP: ["p", "p", "P", "з", "З"],
  BracketLeft: ["ha", "[", "{", "х", "Х"],
  BracketRight: ["strongSign", "]", "}", "ъ", "Ъ"],
  Backslash: ["slash", "\\", "|", "\\", "/"],
  Delete: ["del"],

  CapsLock: ["CapsLock"],
  KeyA: ["a", "a", "A", "ф", "Ф"],
  KeyS: ["s", "s", "S", "ы", "Ы"],
  KeyD: ["d", "d", "D", "в", "В"],
  KeyF: ["f", "f", "F", "а", "А"],
  KeyG: ["g", "g", "G", "п", "П"],
  KeyH: ["h", "h", "H", "р", "Р"],
  KeyJ: ["j", "j", "J", "о", "О"],
  KeyK: ["k", "k", "K", "л", "Л"],
  KeyL: ["l", "l", "L", "д", "Д"],
  Semicolon: ["colon", ";", ":", "ж", "Ж"],
  Quote: ["quotationMarks", "'", '"', "э", "Э"],
  Enter: ["enter", "\n", "\n", "\n", "\n"],

  ShiftLeft: ["shift"],
  KeyZ: ["z", "z", "Z", "я", "Я"],
  KeyX: ["x", "x", "X", "ч", "Ч"],
  KeyC: ["c", "c", "C", "с", "С"],
  KeyV: ["v", "v", "V", "м", "М"],
  KeyB: ["b", "b", "B", "и", "И"],
  KeyN: ["n", "n", "N", "т", "Т"],
  KeyM: ["m", "m", "M", "ь", "Ь"],
  Comma: ["comma", ",", "<", "б", "Б"],
  Period: ["point", ".", ">", "ю", "Ю"],
  Slash: ["questionMark", "/", "?", ".", ","],
  ArrowUp: ["arrowUp", "↑", "↑", "↑", "↑"],
  ShiftRight: ["rShift"],

  ControlLeft: ["ctrl"],
  MetaLeft: ["win"],
  AltLeft: ["alt"],
  Space: ["space", " ", " ", " ", " "],
  AltRight: ["rAlt"],
  ControlRight: ["rCtrl"],
  ArrowLeft: ["arrowLeft", "←", "←", "←", "←"],
  ArrowDown: ["arrowDown", "↓", "↓", "↓", "↓"],
  ArrowRight: ["arrowRight", "→", "→", "→", "→"],
};

if (localStorage.lang === undefined) localStorage.lang = "ENG";
let isShift = false;
let shiftCaseLeft = false;
let altCaseLeft = false;
let changeLangUpKeyFlag = false;
let isCapsLock = false;

const textarea = document.querySelector(".textarea");
const keyboard = document.querySelector(".keyboard");
const clear = document.querySelector(".clearfix");
let lastPress = "";

class Button {
  constructor({ code, key, style, ...arg }) {
    this.className = `button ${style}`;
    this.key = key;
    this.code = code;
  }

  generateButton() {
    let div = document.createElement("div");
    div.className = this.className;
    div.dataset.key = this.key;
    div.dataset.code = this.code;
    div.innerHTML = this.code;
    return div;
  }
}

function createButtons() {
  let ar = [];
  let arr = Object.keys(KEY_CODE);
  arr.forEach((el) => {
    ar.push(
      new Button({
        code: el,
        key: KEY_CODE[el][0],
        style: KEY_CODE[el][0],
      })
    );
  });
  ar.forEach((el) => {
    keyboard.append(el.generateButton());
  });
}

createButtons();
addKeysOnKeyboard();
textarea.focus();
addListenersOnKeys();

function addKeysOnKeyboard() {
  let arrayValues = Object.values(KEY_CODE);

  arrayValues.forEach((el) => {
    if (el[0] === "rShift") {
      document.querySelector(".rShift").after(clear);
    }
  });

  if (isShift === false && localStorage.lang === "ENG") {
    arrayValues.forEach((el) => {
      const x = document.querySelector(`.${el[0]}`);
      if (el.length < 2) {
        x.innerText = el[0];
      } else if (el[0] === "enter") {
      } else if (el[1] !== undefined) {
        x.innerText = el[1];
      }
    });
  }

  if (isShift === true && localStorage.lang === "ENG") {
    arrayValues.forEach((el) => {
      const x = document.querySelector(`.${el[0]}`);
      if (el.length < 2) {
        x.innerText = el[0];
      } else if (el[0] === "enter") {
      } else if (el[2] !== undefined) {
        x.innerText = el[2];
      }
    });
  }

  if (isShift === false && localStorage.lang === "RUS") {
    arrayValues.forEach((el) => {
      const x = document.querySelector(`.${el[0]}`);
      if (el.length < 2) {
        x.innerText = el[0];
      } else if (el[0] === "enter") {
      } else if (el[3] !== undefined) {
        x.innerText = el[3];
      }
    });
  }

  if (isShift === true && localStorage.lang === "RUS") {
    arrayValues.forEach((el) => {
      const x = document.querySelector(`.${el[0]}`);
      if (el.length < 2) {
        x.innerText = el[0];
      } else if (el[0] === "enter") {
      } else if (el[4] !== undefined) {
        x.innerText = el[4];
      }
    });
  }
}

function addListenersOnKeys() {
  keyboard.addEventListener("mousedown", function (event) {
    textarea.focus();
    if (event.target.classList[0] === "keyboard") return;
    lastPress = event.target;
    setStyle(event.target, true);
    identifyKey(event.target.dataset, "down");
    addKeysOnKeyboard();
  });

  keyboard.addEventListener("mouseup", function (event) {
    textarea.focus();
    if (event.target.dataset.code === "CapsLock") return;
    removeStyle();
    identifyKey(event.target.dataset, "up");
    addKeysOnKeyboard();
  });

  document.addEventListener("keydown", function (event) {
    if (event.repeat) return;
    event.preventDefault();
    setStyle(document.querySelector(`.${KEY_CODE[event.code][0]}`), true);
    identifyKey(event, "down");
    checkLang();
    addKeysOnKeyboard();
  });

  document.addEventListener("keyup", function (event) {
    if (event.repeat) return;
    if (event.key === "CapsLock") return;
    setStyle(document.querySelector(`.${KEY_CODE[event.code][0]}`), false);
    identifyKey(event, "up");
    checkLang();
    addKeysOnKeyboard();
  });
}

function setStyle(code, bool) {
  if (bool) code.classList.add("active");
  else code.classList.remove("active");
}

function removeStyle() {
  lastPress.classList.remove("active");
}

function identifyKey(event, updown) {
  if (event.code === "ShiftLeft") {
    if (shiftCaseLeft && shiftCaseLeft) shiftCaseLeft = false;
    else shiftCaseLeft = true;
  }

  if (event.code === "AltLeft") {
    if (altCaseLeft) altCaseLeft = false;
    else altCaseLeft = true;
  }

  if (event.code === "CapsLock") {
    if (isCapsLock === true) {
      setStyle(document.querySelector(`.${KEY_CODE[event.code][0]}`), false);
      document.querySelector(".CapsLock").classList.remove("caps-active");
    } else document.querySelector(".CapsLock").classList.add("caps-active");
    capsButtonIsPress();
  }

  if (
    event.key === "shift" ||
    event.key === "rShift" ||
    event.key === "Shift"
  ) {
    capsButtonIsPress();
    return;
  }

  if (updown === "down") {
    if (event.code === "Tab") {
      tabCase();
    }

    if (event.code === "Backspace") {
      backspaceButton();
    }

    if (event.code === "Delete") {
      deleteButton();
    }

    if (isShift === false && localStorage.lang === "ENG") {
      if (KEY_CODE[event.code][1] !== undefined) {
        printKeyCode(KEY_CODE[event.code][1]);
      }
    }

    if (isShift === true && localStorage.lang === "ENG") {
      if (KEY_CODE[event.code][2] !== undefined) {
        printKeyCode(KEY_CODE[event.code][2]);
      }
    }

    if (isShift === false && localStorage.lang === "RUS") {
      if (KEY_CODE[event.code][3] !== undefined) {
        printKeyCode(KEY_CODE[event.code][3]);
      }
    }

    if (isShift === true && localStorage.lang === "RUS") {
      if (KEY_CODE[event.code][4] !== undefined) {
        printKeyCode(KEY_CODE[event.code][4]);
      }
    }
  }
}

function printKeyCode(key) {
  let arr = textarea.value.split("");
  let pos = textarea.selectionStart;
  arr.splice(pos, 0, key);
  textarea.value = arr.join("");
  textarea.selectionStart = textarea.selectionEnd = pos + 1;
}

function checkLang() {
  if (changeLangUpKeyFlag && altCaseLeft === false && shiftCaseLeft === false) {
      changeLangUpKeyFlag = false;
      changeLang();
      addKeysOnKeyboard();
  } else if (altCaseLeft === true && shiftCaseLeft === true) {
    changeLangUpKeyFlag = true;
  } else return;
}

function changeLang() {
  localStorage.lang = localStorage.lang === "ENG" ? "RUS" : "ENG";
}

function capsButtonIsPress() {
 isCapsLock = isCapsLock === true ? false :  true;
 isShift = isShift === true ? false : true;    
}

function tabCase() {
  let arr = textarea.value.split("");
  let position = textarea.selectionStart;
  arr.splice(position, 0, "    ");
  textarea.value = arr.join("");
  textarea.selectionStart = textarea.selectionEnd = position + 4;
}

function backspaceButton() {
  let arr = textarea.value.split("");
  let position = textarea.selectionStart;
  if (position === 0) return;
  arr.splice(position - 1, 1);
  textarea.value = arr.join("");
  textarea.selectionStart = textarea.selectionEnd = position - 1;
}

function deleteButton() {
  let arr = textarea.value.split("");
  let position = textarea.selectionStart;
  arr.splice(position, 1);
  textarea.value = arr.join("");
  textarea.selectionStart = textarea.selectionEnd = position;
}
