// Standard Hintergrundfarbe
const defaultColor = "#f0f0f0";

// Funktion, um die Hintergrundfarbe zu ändern
function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
  document.getElementById("currentColor").textContent = color;
}

// Zufällige Farbe generieren
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// Event Listener für den Random Color Button
document
  .getElementById("randomColorButton")
  .addEventListener("click", function () {
    const randomColor = getRandomColor();
    changeBackgroundColor(randomColor);
  });

// Event Listener für den Reset Color Button
document
  .getElementById("resetColorButton")
  .addEventListener("click", function () {
    changeBackgroundColor(defaultColor);
  });

// Event Listener für den Set Color Button (benutzerdefinierte Farbe)
document
  .getElementById("setColorButton")
  .addEventListener("click", function () {
    const customColor = document.getElementById("customColor").value;

    // Überprüfen, ob die Eingabe eine gültige Hex-Farbe ist
    const validColor = /^#[0-9A-F]{6}$/i.test(customColor);
    if (validColor) {
      changeBackgroundColor(customColor);
    } else {
      alert("Please enter a valid hex color (e.g., #abcdef).");
    }
  });
