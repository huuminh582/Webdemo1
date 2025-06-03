document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider functionality
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;
    const autoSlideDelay = 36000; // 5 seconds
    
    // Initialize the slider
    function initSlider() {
        updateSlides();
        startAutoSlide();
    }
    
    // Update slides and indicators
    function updateSlides() {
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.remove('current');
        });
        slides[currentSlide].classList.add('current');
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentSlide) {
                indicator.classList.add('active');
            }
        });
    }
    
    // Go to the next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
        resetAutoSlide();
    }
    
    // Go to the previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
        resetAutoSlide();
    }
    
    // Go to a specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        resetAutoSlide();
    }
    
    // Start auto slide
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, autoSlideDelay);
    }
    
    // Reset auto slide timer
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    // Event listeners for navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Initialize the slider
    initSlider();
    
    // Sticky header on scroll with animation
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            if (!header.classList.contains('sticky')) {
                header.classList.add('sticky');
                header.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    header.style.transition = 'transform 0.3s ease';
                    header.style.transform = 'translateY(0)';
                }, 10);
            }
        } else {
            header.classList.remove('sticky');
            header.style.transition = '';
            header.style.transform = '';
        }
    });
    
    // Pause auto slide when hovering over the slider
    const heroSection = document.querySelector('.hero-section');
    
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    heroSection.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
});
