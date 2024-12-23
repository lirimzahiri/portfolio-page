(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener("click", headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /**
   * Theme and Accent Color Initialization
   */
  document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    // Default Accent Color
    const defaultAccentColor = "#c44bfb";

    // Function: Set Accent Color
    function setAccentColor(color = defaultAccentColor) {
      root.style.setProperty("--accent-color", color);

      // Save selected accent color in Local Storage
      localStorage.setItem("accent-color", color);
    }

    // Function: Update Theme and Icon
    function toggleTheme() {
      const currentTheme = root.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      root.setAttribute("data-theme", newTheme);

      // Update theme toggle icon
      themeToggle.innerHTML =
        newTheme === "dark"
          ? '<i class="bi bi-lightbulb navicon"></i>'
          : '<i class="bi bi-lightbulb-fill navicon"></i>';

      // Save theme in Local Storage
      localStorage.setItem("theme", newTheme);
    }

    // Initialize Theme and Accent Color
    const savedTheme = localStorage.getItem("theme") || "light";
    root.setAttribute("data-theme", savedTheme);

    const savedAccentColor =
      localStorage.getItem("accent-color") || defaultAccentColor;
    setAccentColor(savedAccentColor);

    // Update Theme Toggle Icon on Load
    themeToggle.innerHTML =
      savedTheme === "dark"
        ? '<i class="bi bi-lightbulb navicon"></i>'
        : '<i class="bi bi-lightbulb-fill navicon"></i>';

    // Add Event Listener to Theme Toggle
    themeToggle.addEventListener("click", toggleTheme);

    // Add Event Listener to Accent Color Buttons
    const colorButtons = document.querySelectorAll(".color-btn");
    colorButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedColor = button.getAttribute("data-color");
        setAccentColor(selectedColor);
      });
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener("click", function () {
          isotopeItem
            .querySelector(".isotope-filters .filter-active")
            .classList.remove("filter-active");
          this.classList.add("filter-active");
          initIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          if (typeof aosInit === "function") {
            aosInit();
          }
        });
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function () {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const width = (scrollTop / scrollHeight) * 100;
  document.getElementById("scroll-indicator").style.width = width + "%";
});

// Contact Form //
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const result = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data and convert to JSON
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData));
    result.innerHTML = "Please wait...";

    // Send form data to Web3Forms API
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        const json = await response.json();
        if (response.status === 200) {
          result.innerHTML = "Your message has been sent successfully!";
        } else {
          result.innerHTML = json.message;
        }
      })
      .catch((error) => {
        console.error(error);
        result.innerHTML = "Something went wrong. Please try again.";
      })
      .finally(() => {
        form.reset(); // Reset form fields
        setTimeout(() => {
          result.innerHTML = ""; // Clear result message
        }, 3000);
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const GITHUB_USERNAME = "lirimzahiri";
  const PROFILE_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
  const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

  async function fetchGitHubData() {
    try {
      // GitHub-Profil abrufen
      const profileResponse = await fetch(PROFILE_URL);
      const profileData = await profileResponse.json();

      // Profil-Daten anzeigen
      document.getElementById("github-avatar").src = profileData.avatar_url;
      document.getElementById("github-username").textContent =
        profileData.login;
      document.getElementById("github-bio").textContent = profileData.bio || "";
      document
        .getElementById("github-link")
        .setAttribute("href", profileData.html_url);

      // GitHub-Repositories abrufen
      const reposResponse = await fetch(REPOS_URL);
      const reposData = await reposResponse.json();

      // Repositories anzeigen
      const repoList = document.getElementById("repo-list");
      reposData.forEach((repo) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        repoList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  }

  fetchGitHubData();
});

// Animation initialisieren
const animation = lottie.loadAnimation({
  container: document.getElementById("lottie-arrow"), // Container-Element
  renderer: "svg", // Rendert als SVG
  loop: true, // Endlosschleife
  autoplay: true, // Automatisch abspielen
  path: "assets/img/arrow_animation.json", // Pfad zur Lottie-Animation
});

// Funktion: Setze Farbe für Lottie
function updateLottieColor() {
  const accentColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-color")
    .trim();

  const paths = document.querySelectorAll("#lottie-arrow svg path[stroke]");
  paths.forEach((path) => {
    path.setAttribute("stroke", accentColor);
  });
}

// Warte, bis die Animation geladen ist, und aktualisiere die Farbe
animation.addEventListener("DOMLoaded", updateLottieColor);

// Beobachte Änderungen der Accent-Farbe
const root = document.documentElement;
const observer = new MutationObserver(() => {
  updateLottieColor();
});

// Überwache das Root-Element für Änderungen an Inline-Styles
observer.observe(root, { attributes: true, attributeFilter: ["style"] });

const arrowContainer = document.getElementById("lottie-arrow");
