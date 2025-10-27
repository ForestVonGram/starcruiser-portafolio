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
