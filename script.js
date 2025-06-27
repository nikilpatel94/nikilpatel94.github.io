document.addEventListener('DOMContentLoaded', () => {

    // --- Sidebar Navigation Toggle ---
    const nav = document.querySelector("nav");
    const navLinksContainer = nav ? nav.querySelector(".nav-links") : null;
    const sidebarOpenBtn = nav ? nav.querySelector(".sidebarOpen") : null;
    const sidebarCloseBtn = nav ? nav.querySelector(".sidebarClose") : null; // This should be inside .logo-toggle

    if (nav && navLinksContainer && sidebarOpenBtn) {
        // The close button is inside the sidebar, so it might not be found initially by querySelector on 'nav'
        // It's better to find it once the sidebar is structured if it's dynamically added or complex.
        // For now, assuming it's in the initial HTML structure within .logo-toggle as per HTML changes.
        const actualSidebarCloseBtn = navLinksContainer.querySelector(".sidebarClose");

        sidebarOpenBtn.addEventListener("click", () => {
            navLinksContainer.classList.add("active");
        });

        if(actualSidebarCloseBtn) {
            actualSidebarCloseBtn.addEventListener("click", () => {
                navLinksContainer.classList.remove("active");
            });
        } else if (sidebarCloseBtn) { // Fallback if the one in nav was intended
             sidebarCloseBtn.addEventListener("click", () => {
                navLinksContainer.classList.remove("active");
            });
        }


        // Close sidebar when a link is clicked
        navLinksContainer.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                }
            });
        });

        // Close sidebar if clicked outside of it on mobile
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navLinksContainer.classList.contains('active')) {
                 navLinksContainer.classList.remove('active');
            }
        });

    } else {
        console.warn("Sidebar navigation elements not found. Ensure nav, .nav-links, .sidebarOpen are present.");
    }

    // --- Animated Counter for Stats ---
    const statNumbers = document.querySelectorAll(".stat-number.num");
    let statsAnimated = false;

    const animateStats = () => {
        statNumbers.forEach(statDisplay => {
            const dataVal = statDisplay.getAttribute("data-val");
            const endValue = parseInt(dataVal);
            let startValue = 0;
            const durationBetweenIncrements = 20;

            if (isNaN(endValue)) {
                statDisplay.textContent = dataVal;
                return;
            }

            const totalDuration = 1500; // Animate over 1.5 seconds
            const steps = totalDuration / durationBetweenIncrements;
            const increment = Math.max(1, Math.ceil(endValue / steps));

            statDisplay.textContent = startValue + (dataVal.includes('+') ? '+' : '');

            const counter = setInterval(() => {
                startValue += increment;
                if (startValue >= endValue) {
                    startValue = endValue;
                    clearInterval(counter);
                }
                statDisplay.textContent = startValue + (dataVal.includes('+') ? '+' : '');
            }, durationBetweenIncrements);
        });
        statsAnimated = true;
    };

    const statsSection = document.getElementById("EPM_stats");
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% visible

        statsObserver.observe(statsSection);
    } else if (statNumbers.length > 0 && !statsAnimated) {
        // Fallback: if section ID not found, but numbers are, animate them if they become visible.
        // This might be less performant as it observes each number individually.
        statNumbers.forEach(num => {
            const singleStatObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !statsAnimated) {
                        animateStats(); // This will animate ALL stats once the first one is visible
                        statNumbers.forEach(n => singleStatObserver.unobserve(n)); // Unobserve all
                    }
                });
            }, {threshold: 0.1});
            singleStatObserver.observe(num);
        });
    }


    // --- Intersection Observer for Scroll Animations (generic) ---
    const animatedElements = document.querySelectorAll('.animated-img, .animatedcard, .anime');

    if (animatedElements.length > 0) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }
});
