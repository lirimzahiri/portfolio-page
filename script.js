document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector("#dark-mode-toggle");

  toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Ändert den Button-Text je nach Modus
    if (document.body.classList.contains("dark-mode")) {
      toggleButton.textContent = "Light Mode";
    } else {
      toggleButton.textContent = "Dark Mode";
    }
  });
});
