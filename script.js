// ===== 1. Dark / light theme toggle (remembers your choice) =====
(function () {
  var root = document.documentElement;
  var button = document.getElementById("themeToggle");

  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      root.setAttribute("data-theme", saved);
    }
  } catch (e) {
    // Storage may be blocked. The page still works.
  }

  function updateLabel() {
    var isLight = root.getAttribute("data-theme") === "light";
    // The button shows the theme you will switch TO
    button.textContent = isLight ? "Dark" : "Light";
  }

  button.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    updateLabel();
  });

  updateLabel();
})();


// ===== 2. Typing effect for the role line =====
(function () {
  var target = document.getElementById("typed");
  var roles = [
    "Computer Science Engineering Student",
    "Aspiring Software Developer",
    "Python and Web Enthusiast"
  ];

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!target || reduceMotion) return; // keep the static text

  var roleIndex = 0;
  var charIndex = 0;
  var deleting = false;

  function tick() {
    var word = roles[roleIndex];
    target.textContent = word.substring(0, charIndex);
    var delay = deleting ? 35 : 70;

    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1600;               // pause when the word is complete
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;                // short pause before the next word
    } else {
      charIndex += deleting ? -1 : 1;
    }

    setTimeout(tick, delay);
  }

  target.textContent = "";
  tick();
})();


// ===== 3. Highlight the nav link of the section you are viewing =====
(function () {
  var links = document.querySelectorAll(".nav-link");
  var sections = document.querySelectorAll("main section[id]");
  if (!("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        links.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(function (section) { observer.observe(section); });
})();


// ===== 4. Footer year =====
(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();