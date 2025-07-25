// Lofree Flow eBay Listing V2 - Minimal Interactive Features
// Designed to match the original website's clean, minimal aesthetic

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for any anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Subtle fade-in animations for sections as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply subtle fade-in to main sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(section);
    });

    // Image lazy loading with intersection observer
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Apply lazy loading to images (if data-src is used)
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // eBay-specific button handlers
    const buyNowBtn = document.querySelector('.btn-buy-now');
    const addCartBtn = document.querySelector('.btn-add-cart');
    const watchlistBtn = document.querySelector('.btn-watchlist');

    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            // In actual eBay listing, this would trigger eBay's buy now functionality
            console.log('Buy It Now clicked');
            // Add eBay-specific tracking or actions here
        });
    }

    if (addCartBtn) {
        addCartBtn.addEventListener('click', function() {
            // In actual eBay listing, this would add item to cart
            console.log('Add to Cart clicked');
            // Add eBay-specific tracking or actions here
        });
    }

    if (watchlistBtn) {
        watchlistBtn.addEventListener('click', function() {
            // In actual eBay listing, this would add to watchlist
            console.log('Add to Watchlist clicked');
            // Add eBay-specific tracking or actions here
        });
    }

    // Subtle parallax effect for hero section (very minimal)
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const rate = scrolled * -0.1; // Very subtle parallax
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }

    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestParallaxUpdate);

    // Minimal hover effects for images
    const productImages = document.querySelectorAll('.feature-image, .product-hero-image, .showcase-image');
    productImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Button hover effects (subtle)
    const buttons = document.querySelectorAll('.btn-buy-now, .btn-add-cart, .btn-watchlist');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('btn-buy-now') || 
                focusedElement.classList.contains('btn-add-cart') || 
                focusedElement.classList.contains('btn-watchlist')) {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });

    // Error handling for images
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            // Could add a placeholder or hide the image
            this.style.opacity = '0.5';
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Scroll progress indicator (very subtle)
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: #0071e3;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll-heavy functions
    const debouncedScrollHandler = debounce(function() {
        // Any heavy scroll operations can go here
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);

    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        // Clean up any intervals, observers, etc.
        fadeInObserver.disconnect();
        imageObserver.disconnect();
    });

    // Add focus styles for better accessibility
    const style = document.createElement('style');
    style.textContent = `
        .btn-buy-now:focus,
        .btn-add-cart:focus,
        .btn-watchlist:focus {
            outline: 2px solid #0071e3;
            outline-offset: 2px;
        }
        
        img:focus {
            outline: 2px solid #0071e3;
            outline-offset: 4px;
        }
    `;
    document.head.appendChild(style);

    console.log('Lofree Flow eBay listing initialized');
});
