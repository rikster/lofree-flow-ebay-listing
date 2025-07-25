// Lofree Flow eBay Listing Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
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

    // Feature cards hover animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in animation to sections
    const sections = document.querySelectorAll('.features-section, .specs-section, .included-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add click handlers for CTA buttons
    const buyNowBtn = document.querySelector('.btn-primary');
    const watchlistBtn = document.querySelector('.btn-secondary');

    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            // In a real eBay listing, this would trigger the buy now action
            console.log('Buy Now clicked');
            // You can add eBay-specific JavaScript here
        });
    }

    if (watchlistBtn) {
        watchlistBtn.addEventListener('click', function() {
            // In a real eBay listing, this would add to watchlist
            console.log('Add to Watchlist clicked');
            // You can add eBay-specific JavaScript here
        });
    }

    // Image lazy loading for better performance
    const images = document.querySelectorAll('img');
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

    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add click tracking for analytics (if needed)
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Track feature card clicks
        if (target.closest('.feature-card')) {
            console.log('Feature card clicked:', target.closest('.feature-card').querySelector('h3').textContent);
        }
        
        // Track specification clicks
        if (target.closest('.spec-group')) {
            console.log('Spec group clicked:', target.closest('.spec-group').querySelector('h3').textContent);
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Allow Enter key to trigger button clicks
        if (e.key === 'Enter' && e.target.classList.contains('btn-primary', 'btn-secondary')) {
            e.target.click();
        }
    });

    // Mobile menu toggle (if needed for mobile optimization)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const nav = document.querySelector('.nav-menu');
            nav.classList.toggle('active');
        });
    }

    // Add scroll-to-top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Utility function for smooth animations
function animateElement(element, animation) {
    element.style.animation = animation;
    element.addEventListener('animationend', function() {
        element.style.animation = '';
    }, { once: true });
}

// Function to handle image loading errors
function handleImageError(img) {
    img.style.display = 'none';
    console.log('Image failed to load:', img.src);
}

// Add error handling for all images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
});
