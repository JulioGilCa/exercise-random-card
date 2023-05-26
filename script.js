function deckBuilder() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",];
    const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
    const cards = [];
    for (let s = 0; s < suits.length; s++) {
        for (let v = 0; v < values.length; v++) {
            const value = values[v];
            const suit = suits[s];
            cards.push({ value, suit });
        }
    }
    return cards;
}

function randomCard(cards) {
    const random = Math.floor(Math.random() * 51);
    const cardValue = cards[random].value;
    const cardSuit = cards[random].suit;
    let entity;
    cardSuit === "Diamonds"
        ? (entity = "&diams;")
        : (entity = "&" + cardSuit.toLowerCase() + ";");
    const card = document.createElement("div");
    card.classList.add("card", cardSuit.toLowerCase());
    card.innerHTML = '<span class="card-value-suit top">' + cardValue + entity + "</span>" + '<span class="card-suit">' + entity + "<p class='watermark'>JuliCode®</p></span>" + '<span class="card-value-suit bot">' + cardValue + entity + "</span>";
    document.body.appendChild(card);
}
const cards = deckBuilder();
randomCard(cards);

function changeCardColor() {
    let colorMenu = document.getElementById("colorMenu");
  
    if (!colorMenu) {
      colorMenu = document.createElement("div");
      colorMenu.id = "colorMenu";
      colorMenu.innerHTML = `
        <ul>
          <li><button onclick="changeColor('blue')">Azul</button></li>
          <li><button onclick="changeColor('green')">Verde</button></li>
          <li><button onclick="changeColor('purple')">Violeta</button></li>
          <li><button onclick="changeColor('grey')">Gris</button></li>
        </ul>
      `;
      document.body.appendChild(colorMenu);
    } else {
      colorMenu.remove();
    }
  }
  
  function changeColor(color) {
    document.body.style.backgroundColor = color;
    // Almacena el color seleccionado en una cookie
    document.cookie = `backgroundColor=${color}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  }
  
  function getSavedColor() {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith("backgroundColor=")) {
        const color = cookie.substring("backgroundColor=".length);
        document.body.style.backgroundColor = color;
        break;
      }
    }
  }
  
  const colorButton = document.createElement("button");
  colorButton.textContent = "Cambiar color";
  colorButton.addEventListener("click", changeCardColor);
  document.body.appendChild(colorButton);
  
  // Recupera el color seleccionado al cargar la página
  getSavedColor();
  