// Main JavaScript File - Dark Modern Software Engineer Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Typewriter / Code Reveal Animation for Hero Title "NAVEEN J"
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const fullText = "NAVEEN J";
        heroTitle.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-cursor">|</span>';
        const textContainer = heroTitle.querySelector('.typewriter-text');
        
        let charIndex = 0;
        const typeSpeed = 100; // ms per char

        function typeChar() {
            if (charIndex < fullText.length) {
                textContainer.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typeSpeed);
            } else {
                // Ensure text is clean & stable
                setTimeout(() => {
                    const cursor = heroTitle.querySelector('.typewriter-cursor');
                    if (cursor) {
                        cursor.style.animation = 'cursorBlink 1.2s infinite';
                    }
                }, 500);
            }
        }

        // Trigger typewriter animation smoothly
        setTimeout(typeChar, 300);
    }

    // IntersectionObserver Scroll Reveal Animations
    const revealTargets = document.querySelectorAll(
        '.section-title, .skill-card, .project-card, .education-card, .stat-card, .experience-card, .achievement-card, .cert-card, .contact-card, .strength-card, .objective-text'
    );

    revealTargets.forEach(el => el.classList.add('reveal-item'));

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target); // Reveal once naturally
                }
            });
        }, observerOptions);

        revealTargets.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        revealTargets.forEach(el => el.classList.add('in-view'));
    }

    // Lightbox Functionality
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const previewableImages = document.querySelectorAll('.previewable-image');

    if (lightbox && lightboxImg && lightboxClose) {
        // Open lightbox
        previewableImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        };

        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close on clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // Project Modals Functionality
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const projectModals = document.querySelectorAll('.project-modal-overlay');
    const closeModalBtns = document.querySelectorAll('.project-modal-close');

    if (openModalBtns.length > 0 && projectModals.length > 0) {
        // Open modal
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = btn.getAttribute('data-modal');
                const targetModal = document.getElementById(modalId);
                if (targetModal) {
                    targetModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });

        // Close modal function
        const closeProjectModals = () => {
            projectModals.forEach(modal => {
                modal.classList.remove('active');
            });
            // Only restore scrolling if image lightbox is also closed
            if (!document.getElementById('image-lightbox')?.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        };

        // Close via button
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeProjectModals);
        });

        // Close via clicking outside
        projectModals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeProjectModals();
                }
            });
        });

        // Close via Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeProjectModals();
            }
        });
    }
});
