function deckBuilder() {
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
  const cards = [];

  suits.forEach((suit) => {
    values.forEach((value) => {
      cards.push({ value, suit });
    });
  });

  return cards;
}

// Obtén los elementos relevantes del DOM
const timeLinks = document.querySelectorAll(".dropdown-menu a");
const cardContainer = document.createElement("div");
cardContainer.id = "cardContainer";
document.body.appendChild(cardContainer);

// Variables para controlar el intervalo y el estado del botón
let intervalId = null;
let selectedTime = 0;

// Función para generar una nueva carta
function generateNewCard(cards) {
  const random = Math.floor(Math.random() * 51);
  const cardValue = cards[random].value;
  const cardSuit = cards[random].suit;
  let suitpict; cardSuit === "Diamonds" ? (suitpict = "&diams;") : (suitpict = "&" + cardSuit.toLowerCase() + ";");
  const card = document.createElement("div");
  card.classList.add("card", cardSuit.toLowerCase());
  card.innerHTML = '<span class="card-value-suit top">' + cardValue + suitpict + "</span>" + '<span class="card-suit">' +
    suitpict + "<p class='watermark'>JuliCode®</p></span>" + '<span class="card-value-suit bot">' + cardValue +
    suitpict + "</span>";
  cardContainer.innerHTML = ""; // Eliminar cartas anteriores
  cardContainer.appendChild(card);
}

// Función para iniciar el intervalo
function startInterval(time) {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(function () {
    const cards = deckBuilder();
    generateNewCard(cards);
  }, time);
}

// Función para detener el intervalo
function stopInterval() {
  clearInterval(intervalId);
  intervalId = null;
}

// Función para regenerar la carta al hacer clic en el botón "Regenerate"
function regenerateCard() {
  const cards = deckBuilder();
  generateNewCard(cards);
  stopInterval();
}

// Agrega el evento de clic a las opciones de tiempo
for (let i = 0; i < timeLinks.length; i++) {
  timeLinks[i].addEventListener("click", function (e) {
    e.preventDefault();
    const time = parseInt(this.getAttribute("data-time")) * 1000; // Convertir el tiempo a milisegundos
    selectedTime = time;
    startInterval(time);
  });
}

// Crear contenedor para el botón "Regenerate"
const buttonContainer = document.createElement("div");
buttonContainer.id = "buttonContainer";
document.body.appendChild(buttonContainer);

// Crear botón "Regenerate" dentro del contenedor
const regenerateButton = document.createElement("button");
regenerateButton.textContent = "Regenerate";
regenerateButton.addEventListener("click", regenerateCard);
buttonContainer.appendChild(regenerateButton);
buttonContainer.style.position = "fixed";
buttonContainer.style.bottom = "200px";

// Al cargar la página, iniciar el intervalo con el valor predeterminado (3 segundos)
const defaultTime = 10000; // 3 segundos
selectedTime = defaultTime;
startInterval(defaultTime);

const cards = deckBuilder();
generateNewCard(cards);

// Cambio de color de fondo
const colorButtons = document.querySelectorAll('.color-button');
colorButtons.forEach(button => {
  button.addEventListener('click', function () {
    const color = this.getAttribute('data-color');
    document.body.style.backgroundColor = color;
  });
});