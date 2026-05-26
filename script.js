// =========================================
// MALUNGELO PROPERTIES — ENHANCED SCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // ── THEME TOGGLE ──────────────────────
    const toggleBtn = document.getElementById("theme-toggle");

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");
            localStorage.setItem("theme", isLight ? "light" : "dark");
            toggleBtn.innerHTML = isLight
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        });
    }

    // ── NAVBAR SCROLL EFFECT ──────────────
    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 60);
        });
    }

    // ── MOBILE MENU TOGGLE ────────────────
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
        });
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && e.target !== menuBtn) {
                navLinks.classList.remove("active");
            }
        });
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => navLinks.classList.remove("active"));
        });
    }

    // ── SMOOTH SCROLL ─────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({ top: target.offsetTop - 90, behavior: "smooth" });
                }
            }
        });
    });

    // ── TYPEWRITER EFFECT ─────────────────
    const typewriterEl = document.querySelector(".hero-typewriter");
    if (typewriterEl) {
        const phrases = [
            "Home Away from Home",
            "Your Launchpad to Success",
            "Safe. Secure. Connected.",
            "Where Students Thrive"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function type() {
            const current = phrases[phraseIndex];
            if (isDeleting) {
                typewriterEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typewriterEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === current.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }

            setTimeout(type, typingSpeed);
        }
        type();
    }

    // ── ANIMATED COUNTER ──────────────────
    function animateCounter(el, target, duration = 2000) {
        const suffix = el.dataset.suffix || "";
        const prefix = el.dataset.prefix || "";
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            el.textContent = prefix + Math.floor(start) + suffix;
        }, 16);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".count-up").forEach(el => counterObserver.observe(el));

    // ── SCROLL REVEAL ANIMATION ───────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    // ── IMAGE SLIDER ──────────────────────
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.getElementById("slider-dots");

    if (slides.length > 0) {
        let currentSlide = 0;

        if (dotsContainer) {
            slides.forEach((_, i) => {
                const dot = document.createElement("div");
                dot.classList.add("dot");
                if (i === 0) dot.classList.add("active");
                dot.addEventListener("click", () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });
        }

        function goToSlide(index) {
            slides[currentSlide].classList.remove("active");
            if (dotsContainer) dotsContainer.children[currentSlide].classList.remove("active");
            currentSlide = index;
            slides[currentSlide].classList.add("active");
            if (dotsContainer) dotsContainer.children[currentSlide].classList.add("active");
        }

        setInterval(() => goToSlide((currentSlide + 1) % slides.length), 4500);
    }

    // ── PARTICLE CANVAS ───────────────────
    const canvas = document.getElementById("hero-particles");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.gold = Math.random() > 0.6;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.gold
                    ? `rgba(212, 164, 55, ${this.opacity})`
                    : `rgba(255, 255, 255, ${this.opacity * 0.6})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) particles.push(new Particle());

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ── GLOW CURSOR TRAIL ─────────────────
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.addEventListener("mousemove", (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            hero.style.setProperty("--mx", x + "px");
            hero.style.setProperty("--my", y + "px");
        });
    }

    // ── TILT EFFECT ON PROPERTY CARDS ─────
    document.querySelectorAll(".property-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translateY(-6px)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    // ── STAGGER REVEAL ON FEATURE BOXES ───
    document.querySelectorAll(".feature-box").forEach((box, i) => {
        box.style.transitionDelay = `${i * 0.1}s`;
    });

    console.log("Malungelo Properties — Enhanced Script Loaded ✓");
});
