document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".scroll-anim");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    })
  }, {
    threshold: 0.5
  });

  sections.forEach(section => observer.observe(section))
});

const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close button');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');


function toggleMenu() {
  navLinks.classList.toggle('show');
  navOverlay.classList.toggle('show');
}
navToggle.addEventListener('click', toggleMenu);
navClose.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);
