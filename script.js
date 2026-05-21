// WEBSITE LOADED
window.addEventListener("load", () => {

    console.log("Website Loaded Successfully");

});


// BUTTON ANIMATION
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "scale(1.05)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "scale(1)";

    });

});


// SMOOTH SCROLL (FIXED & SAFE)
const links = document.querySelectorAll("nav a");

links.forEach(link => {
    link.addEventListener("click", function(e) {

        const href = this.getAttribute("href");

        // only scroll if it's a section (#something)
        if (href && href.startsWith("#")) {
            e.preventDefault();

            const target = document.querySelector(href);

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100, // better spacing
                    behavior: "smooth"
                });
            }
        }

        // external links (Google Maps, etc) work normally
    });
});
// SCROLL ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});

const elements = document.querySelectorAll(".feature-box, .property-card, .gallery-container img");

elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    el.style.transition = "0.6s ease";
    observer.observe(el);
});
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const icon = toggleBtn.querySelector("i");

    if(document.body.classList.contains("light-mode")){
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else{
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
});