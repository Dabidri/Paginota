document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scroll Animation ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll'); // Base class for most animated elements

    if (typeof IntersectionObserver !== 'undefined') {
        const elementObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        scrollElements.forEach(el => {
            elementObserver.observe(el);
        });
    } else {
        // Fallback for very old browsers (optional)
        scrollElements.forEach(el => el.classList.add('visible'));
    }

    // --- Active Navigation Link ---
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    // More robust way to get the current page name, works even if nested
    const currentPath = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) || 'index.html';
    navLinks.forEach(link => {
        // Normalize the href attribute in case it includes paths
        const linkPath = link.getAttribute('href').substring(link.getAttribute('href').lastIndexOf('/') + 1);
        if (linkPath === currentPath || (currentPath === 'index.html' && linkPath === '')) { // Handle root case
            link.classList.add('active');
        }
    });


    // --- Modal Handling ---
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    const openModal = (modal) => {
        if (modal && modalOverlay) {
            modalOverlay.classList.add('active');
            modal.classList.add('active'); // Show the specific modal content div too
            document.body.style.overflow = 'hidden'; // Disable body scroll
        }
    };

    const closeModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
             // Hide all potential modal content divs within the overlay
            modalOverlay.querySelectorAll('.modal').forEach(modalContent => {
                // Check if modalContent exists before trying to remove class
                if (modalContent) {
                   modalContent.classList.remove('active');
                }
            });
            document.body.style.overflow = ''; // Re-enable body scroll
        }
    };

    // Open modal on trigger click
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            // Don't prevent default here initially, only if necessary
            const modalId = trigger.getAttribute('data-modal-target');
            const modal = document.querySelector(modalId);

            if (modal && modalOverlay) {
                 event.preventDefault(); // Prevent default only if modal exists
                openModal(modal);
            } else {
                 console.error(`Modal target not found: ${modalId}`);
                 // Optionally allow default behavior if modal not found
                 // Or just stop propagation if the trigger itself should not have default action
                 // event.stopPropagation();
            }
        });
    });


    // Close modal on close button click
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal();
        });
    });

    // Close modal on overlay click (outside the modal content)
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            // Check if the clicked target is the overlay itself
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
     document.addEventListener('keydown', (event) => {
         if (event.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
             closeModal();
         }
     });

     // --- Separate Observer for Timeline Items (for individual animation) ---
     // Needed because the parent .timeline might not be `.animate-on-scroll` anymore
     const timelineItems = document.querySelectorAll('.timeline-item');
     if (timelineItems.length > 0 && typeof IntersectionObserver !== 'undefined') {
        const timelineObserver = new IntersectionObserver((entries, observer) => {
             entries.forEach(entry => {
                 if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        timelineItems.forEach(el => {
            timelineObserver.observe(el);
        });
    } else {
         timelineItems.forEach(el => el.classList.add('visible'));
    }


}); // End DOMContentLoaded