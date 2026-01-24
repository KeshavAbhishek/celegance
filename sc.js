document.addEventListener('DOMContentLoaded', () => {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    lux: {
                        gold: '#D4AF37',
                        goldLight: '#F3E5AB',
                        dark: '#050505',
                        charcoal: '#0a0a0a',
                        purple: '#1a0b2e',
                        glass: 'rgba(255, 255, 255, 0.03)'
                    }
                },
                fontFamily: {
                    display: ['Cinzel', 'serif'],
                    body: ['Space Grotesk', 'sans-serif'],
                },
                animation: {
                    'float': 'float 6s ease-in-out infinite',
                    'spin-slow': 'spin 12s linear infinite',
                },
                keyframes: {
                    float: {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-20px)' },
                    }
                }
            }
        }
    }

    const imageCarousel = document.querySelector('.image-carousel');

    // 1. Loader Logic
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('loader');
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 700);
        }, 0); // make it 1500

    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/80', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/5');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.remove('bg-black/80', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/5');
            navbar.classList.add('py-6');
        }
    });

    // 3. Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
            document.body.style.overflow = 'hidden'; // Stop scrolling
        } else {
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
        });
    });

    // 3.5 DYNAMIC EVENTS GENERATION
    const eventList = [
        'Headshot Arena',
        'Game Fest Royale',
        'Dancing Feet',
        'Khatron Ke Khiladi',
        'Nukkad - Aarohan',
        'Xumberance',
        'Celegance Got Talent',
        'Treasure Hunt',
        'Splitsvilla',
        'Wah Wah Kya Baat Hai',
        'Sargam',
        'Bollywood Deewane'
    ]

    const eventLinks = [
        "https://docs.google.com/forms/d/e/1FAIpQLSeMTBVLH2_KNO4pqwx-3O5cUg6FGE0gQhYXhPPV6zAL7_whDA/viewform",
        "https://docs.google.com/forms/d/e/1FAIpQLSfSXHmeEkWYYUmICF-DeG76aasIMX3ZKA1WJ-bxjVYyGgLOMA/viewform",
        "https://docs.google.com/forms/d/e/1FAIpQLSfTi-yqYura0yXQZBlgkzo31Y1mWzQMGsTLuQyEYZEdftXSeA/viewform",
        "https://docs.google.com/forms/d/e/1FAIpQLSc8cPlHqDZkw0YaiftZGVU-g-8LY3Ja7QqbcqYrTwUq09l6Cw/viewform",
        "https://docs.google.com/forms/d/e/1FAIpQLSclgkm5etqTflpSyHtc9-MSac3RvTIjuI_wGSqyPiiq5sd8MA/viewform",
        "https://docs.google.com/forms/d/e/1FAIpQLSe24qSy32k3MYSl9CfXeg5mqe7dZJpA76ooDyr9apC_tXOJLg/viewform",
        "https://docs.google.com/forms/d/e/1FAIpQLSeuoZAjBYq_pItPC-znMlEmtthFIHSouPVLpNbxUgbvZZkSeQ/viewform",
        "https://docs.google.com/forms/d/e/1FAIpQLSccu6Cg0QXhWPUBCxzZALfxYPLZIsdQU2OvBRdwSS48Eupk0w/viewform",
        "https://docs.google.com/forms/d/e/1FAIpQLSenaIkcvw53IVtJD6e5a8jF-oel5dBn_9tb4aIjvUR2WFjnRA/viewform",
        "https://docs.google.com/forms/d/e/1FAIpQLSeiXMvv-MIO3yKTNY5z5oPbYWLld2swPRdxWSQviv0nAeUgIg/viewform",
        "https://docs.google.com/forms/d/e/1FAIpQLSfy3uU7cO4WgB_jPQAkPI4FHpTjgRsW7WI2GvLKJLDjCwXSww/viewform",
        "https://docs.google.com/forms/d/e/1FAIpQLSc0IW3rXQ8m_jrsVYHJ4-YT84y6_2X8Q3L88c2oY3CXnv52BQ/viewform"
    ]

    const container = document.getElementById('eventsContainer');
    let eventsHTML = '';

    eventList.forEach((event, index) => {
        const imgPath = `./poster/${index + 1}.png`;

        eventsHTML += `
            <div class="reveal w-full group cursor-pointer perspective delay-[${index % 4 * 100}ms]">
                <div class="relative w-full aspect-[1/1.414] rounded-xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-2 border border-white/10">
                    
                    <img src="${imgPath}" alt="${event}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>
                    
                    <div class="absolute bottom-0 p-4 md:p-6 w-full">
                        
                        <span class="text-lux-gold uppercase text-[10px] md:text-xs tracking-widest border-b border-lux-gold pb-1 shadow-black drop-shadow-md text-right registerLink">
                        <a href="${eventLinks[index]}" target="_blank">Register</a>
                        </span>
                    </div>
                </div>
            </div>
            `;
    });

    container.innerHTML = eventsHTML;

    // 4. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve if you only want it to happen once
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Horizontal Scroll Buttons
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    const eventsContainer = document.getElementById('eventsContainer');

    if (scrollLeftBtn && scrollRightBtn && eventsContainer) {
        scrollLeftBtn.addEventListener('click', () => {
            eventsContainer.scrollBy({ left: -400, behavior: 'smooth' });
        });
        scrollRightBtn.addEventListener('click', () => {
            eventsContainer.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }

    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');

        // Create toast element
        const toast = document.createElement('div');

        // Define colors based on type
        const isError = type === 'error';
        const icon = isError ?
            '<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' :
            '<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

        const borderColor = isError ? 'border-red-500/50' : 'border-green-500/50';
        const shadowColor = isError ? 'shadow-red-500/20' : 'shadow-green-500/20';

        // Tailwind classes for the Glass Toast
        toast.className = `
                flex items-center gap-4 px-6 py-4 rounded-xl 
                bg-black/80 backdrop-blur-md border ${borderColor} 
                shadow-lg ${shadowColor} 
                transform transition-all duration-500 translate-x-10 opacity-0
                min-w-[300px] pointer-events-auto
            `;

        toast.innerHTML = `
                ${icon}
                <div>
                    <h4 class="font-bold text-white text-sm uppercase tracking-wider">${isError ? 'Error' : 'Success'}</h4>
                    <p class="text-gray-300 text-sm">${message}</p>
                </div>
            `;

        container.appendChild(toast);

        // Animate In (Slide from right)
        requestAnimationFrame(() => {
            toast.classList.remove('translate-x-10', 'opacity-0');
        });

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('translate-x-10', 'opacity-0');
            setTimeout(() => {
                toast.remove();
            }, 500); // Wait for transition to finish
        }, 3000);
    }

    async function validateAndSubmit() {
        // Get values
        const company = document.getElementById('companyName').value.trim();
        const email = document.getElementById('email').value.trim();
        const mobile = document.getElementById('mobileno').value.trim();
        const message = document.getElementById('message').value.trim();

        // Regex for validations
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        // Validation Logic
        if (!company) { showToast("Company Name is required.", "error"); return; }
        if (!email) { showToast("Email address is required.", "error"); return; }
        else if (!emailRegex.test(email)) { showToast("Please enter a valid email.", "error"); return; }
        if (!mobile) { showToast("Mobile number is required.", "error"); return; }
        else if (!mobileRegex.test(mobile)) { showToast("Please enter a valid 10-digit mobile number.", "error"); return; }
        if (!message) { showToast("Please enter your message.", "error"); return; }

        // --- FIX 2: Match keys to what server.js expects (name, email, message) ---
        const formData = {
            cname: company,
            cemail: email,
            cmobile: mobile,
            cmessage: message
        };

        try {
            // --- FIX 1: Use the secure domain, NOT the IP ---
            const response = await fetch('https://celegance.live/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                // --- FIX 3: Only reset and show success if it actually worked ---
                document.getElementById('partnerForm').reset();
                showToast("Registration Submitted Successfully!", "success");
                document.getElementById("sumbitbutton").innerText = "SUBMIT";
                // alert("Message sent successfully!");
            } else {
                showToast("Server error. Please try again.", "error");
            }
        } catch (error) {
            console.error('Error:', error);
            showToast("Failed to connect to server.", "error");
        }
    }

    document.addEventListener('keydown', function (e) {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            showToast("ACCESS DENIED !!", "error");
        }

        // Ctrl + Shift + I / J / C
        if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) {
            e.preventDefault();
            showToast("ACCESS DENIED !!", "error");
        }

        // Ctrl + U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            showToast("ACCESS DENIED !!", "error");
        }
    });

    // --- Asset & Helper Functions ---
    function preloadImages(urls, callback) {
        let loadedCount = 0;
        const totalImages = urls.length;
        if (totalImages === 0) {
            if (callback) callback();
            return;
        }
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = img.onerror = () => {
                loadedCount++;
                if (loadedCount === totalImages && callback) {
                    callback();
                }
            };
        });
    }

    // --- Infinite Scroll for Image Carousel ---
    function setupInfiniteScroll() {
        if (!imageCarousel) return;

        // Clone images for a seamless loop
        const images = imageCarousel.querySelectorAll('img');
        images.forEach(img => {
            imageCarousel.appendChild(img.cloneNode(true));
        });

        let currentPosition = 0;
        const speed = 0.75;
        let isPaused = false; // Flag to control the animation state

        function animate() {
            // Only update the position if the animation is not paused
            if (!isPaused) {
                currentPosition += speed;
                // Reset position when it completes a full scroll of the original images
                if (currentPosition >= imageCarousel.scrollWidth / 2) {
                    currentPosition = 0;
                }
                imageCarousel.style.transform = `translateX(-${currentPosition}px)`;
            }
            // Continue the animation loop
            requestAnimationFrame(animate);
        }

        // --- Event Listeners for Pausing and Resuming ---

        // 1. Desktop: Pause on hover, resume on mouse leave
        imageCarousel.addEventListener('mouseenter', () => isPaused = true);
        imageCarousel.addEventListener('mouseleave', () => isPaused = false);

        // 2. Mobile: Pause on touch, resume on touch outside
        imageCarousel.addEventListener('touchstart', (e) => {
            // Stop the event from bubbling up to the document listener
            e.stopPropagation();
            isPaused = true;
        }, { passive: true });

        document.addEventListener('touchstart', () => {
            isPaused = false;
        }, { passive: true });

        // Start the animation
        animate();
    }

    function isMobile() {
        return /android|iphone|ipod|blackberry|iemobile|opera mini/i
            .test(navigator.userAgent)
            ? 1
            : 0;
    }

    document.getElementById("sumbitbutton").addEventListener("click", () => {
        document.getElementById("sumbitbutton").innerText = "*-*-*-*";
        validateAndSubmit();
    })

    // --- Initial Setup ---
    // Create a list of all images to load upfront
    const imagesToPreload = [
        // Lock Screen assets
        "./gallery/1.JPG",
        "./gallery/2.JPG",
        "./gallery/3.JPG",
        "./gallery/4.JPG",
        "./gallery/5.JPG",
        "./gallery/6.JPG",
        "./gallery/7.JPG",
        "./gallery/1.JPG",
        "./gallery/2.JPG",
        "./gallery/3.JPG",
        "./gallery/4.JPG",
        "./gallery/5.JPG",
        "./gallery/6.JPG",
        "./gallery/7.JPG",
        "./src/mobile.mp4",
        "./src/web.mp4"
    ];

    // Call the preloader with the full list of images
    preloadImages(imagesToPreload, () => {

        setTimeout(() => {
            setupInfiniteScroll();
        }, 500);
    });

    const footer = document.getElementById("footer");
    // const navbar = document.getElementById("navbar");
    const fab = document.getElementById("nav-fab");

    /* Mobile detection: Mobile = 1, Others = 0 */
    function isMobile() {
        return /android|iphone|ipod|blackberry|iemobile|opera mini/i
            .test(navigator.userAgent)
            ? 1
            : 0;
    }

    /* Safety check */
    if (footer && navbar && fab) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && isMobile() === 1) {
                    navbar.classList.add("nav-collapsed");
                    fab.classList.add("fab-visible");
                } else {
                    navbar.classList.remove("nav-collapsed");
                    fab.classList.remove("fab-visible");
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(footer);

        fab.addEventListener("click", () => {
            window.scrollTo({ top: document.getElementById("navbar").style.height, behavior: "smooth" });
        });
    }

    // ===== GALLERY LIGHTBOX LOGIC =====
    const galleryImages = Array.from(
        document.querySelectorAll('.image-carousel img')
    );

    // Remove duplicates caused by cloning
    const uniqueImages = [...new Set(galleryImages.map(img => img.src))];

    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const btnClose = document.getElementById('lightboxClose');
    const btnPrev = document.getElementById('lightboxPrev');
    const btnNext = document.getElementById('lightboxNext');

    let currentIndex = 0;

    // Open lightbox
    galleryImages.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener('click', () => {
            currentIndex = uniqueImages.indexOf(img.src);
            openLightbox();
        });
    });

    function openLightbox() {
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        lightboxImg.src = uniqueImages[currentIndex];
        document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.classList.remove('no-scroll');
    }

    // Navigation
    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % uniqueImages.length;
        lightboxImg.src = uniqueImages[currentIndex];
    });

    btnPrev.addEventListener('click', () => {
        currentIndex =
            (currentIndex - 1 + uniqueImages.length) % uniqueImages.length;
        lightboxImg.src = uniqueImages[currentIndex];
    });

    // Close actions
    btnClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') btnNext.click();
        if (e.key === 'ArrowLeft') btnPrev.click();
    });


});