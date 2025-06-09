// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const ctaButton = document.querySelector('.cta-button[href^="#"]');

  function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navHeight = document.querySelector("nav").offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  if (ctaButton) {
    ctaButton.addEventListener("click", smoothScroll);
  }

  // Add active class to navigation based on scroll position
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll('nav a[href^="#"]');

  function highlightNavigation() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos <= bottom) {
        navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${id}`) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavigation);

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".research-item, .publication-item, .credential-item, .timeline-item"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Add hover effects to research items
  const researchItems = document.querySelectorAll(".research-item");
  researchItems.forEach((item) => {
    const visual = item.querySelector(".research-visual");

    item.addEventListener("mouseenter", () => {
      visual.style.transform = "scale(1.02)";
      visual.style.transition = "transform 0.3s ease";
    });

    item.addEventListener("mouseleave", () => {
      visual.style.transform = "scale(1)";
    });
  });

  // Add hover effects to timeline items
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item) => {
    const node = item.querySelector(".timeline-node");
    const content = item.querySelector(".timeline-content");

    item.addEventListener("mouseenter", () => {
      node.style.transform = "scale(1.1)";
      node.style.boxShadow = "0 4px 15px rgba(139, 115, 85, 0.4)";
    });

    item.addEventListener("mouseleave", () => {
      node.style.transform = "scale(1)";
      node.style.boxShadow = "0 2px 8px rgba(139, 115, 85, 0.2)";
    });
  });

  // Add copy email functionality
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const email = link.textContent;
      navigator.clipboard.writeText(email).then(() => {
        // Create temporary notification
        const notification = document.createElement("div");
        notification.textContent = "Email copied to clipboard!";
        notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #8b7355;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 4px;
                    font-size: 14px;
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
          notification.style.opacity = "1";
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
          notification.style.opacity = "0";
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 3000);
      });
    });
  });

  // Add parallax effect to calligraphy elements
  const calligraphyElements = document.querySelectorAll(".calligraphy-element");

  function parallaxScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    calligraphyElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.2;
      element.style.transform = `translateY(${rate * speed}px) rotate(${
        scrolled * 0.01
      }deg)`;
    });
  }

  window.addEventListener("scroll", parallaxScroll);

  // Add typing effect to hero title (optional enhancement)
  const heroTitle = document.querySelector(".hero-text h1");
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = "";

    let index = 0;
    function typeWriter() {
      if (index < originalText.length) {
        heroTitle.innerHTML += originalText.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
  }

  // Add mobile menu toggle (for future mobile optimization)
  function createMobileMenu() {
    const nav = document.querySelector("nav");
    const navList = document.querySelector("nav ul");

    // Create hamburger button
    const hamburger = document.createElement("button");
    hamburger.className = "hamburger";
    hamburger.innerHTML = "☰";
    hamburger.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #2c2c2c;
            cursor: pointer;
        `;

    nav.querySelector(".container").appendChild(hamburger);

    hamburger.addEventListener("click", () => {
      navList.classList.toggle("mobile-open");
    });
  }

  createMobileMenu();

  // Timeline scroll reveal animation
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe timeline items for staggered animation
  const timelineItemsForAnimation = document.querySelectorAll(".timeline-item");
  timelineItemsForAnimation.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    timelineObserver.observe(item);
  });
});

// Add CSS for mobile menu via JavaScript
const mobileStyles = document.createElement("style");
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .hamburger {
            display: block !important;
        }
        
        nav ul {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(250, 249, 247, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 1rem;
            gap: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        nav ul.mobile-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        nav a.active {
            color: #8b7355;
            font-weight: 500;
        }
    }
`;
document.head.appendChild(mobileStyles);
