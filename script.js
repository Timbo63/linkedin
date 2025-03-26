// TAS Business Solutions Brochure - Professional JavaScript Implementation

/**
 * Main application script for TAS Business Solutions Brochure
 * Provides enhanced interactivity, animations, and responsive behavior
 */

// Wait for DOM content to be fully loaded before executing
document.addEventListener('DOMContentLoaded', initBrochure);

/**
 * Initialize all brochure functionality
 */
function initBrochure() {
    console.log("TAS Business Solutions Brochure initialized");
    
    // Initialize all interactive components
    initSmoothScrolling();
    initProcessStepInteractions();
    initTestimonialEffects();
    initScrollRevealEffects();
    initChartAnimations();
    
    // Apply initial element height equalization for desktop
    if (window.innerWidth >= 768) {
        equalizeAllHeights();
    }
    
    // Register resize handler with debounce for performance
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth >= 768) {
                equalizeAllHeights();
            } else {
                // Reset heights on mobile for better responsiveness
                resetAllHeights();
            }
        }, 250); // Debounce for better performance
    });
    
    // Add page load complete animation
    document.body.classList.add('loaded');
}

/**
 * Initialize smooth scrolling for all anchor links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset to account for fixed headers if present
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add interactive effects to process steps
 */
function initProcessStepInteractions() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        // Apply staggered entrance animation
        step.style.transitionDelay = `${index * 0.1}s`;
        
        // Add hover interactions
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateY(-8px)';
            const number = step.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1.15)';
                number.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
            }
        });
        
        step.addEventListener('mouseleave', () => {
            step.style.transform = 'translateY(0)';
            const number = step.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1)';
                number.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }
        });
    });
}

/**
 * Add interactive effects to testimonials
 */
function initTestimonialEffects() {
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', () => {
            testimonial.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            testimonial.style.borderLeftWidth = '8px';
            testimonial.style.transform = 'translateY(-5px) scale(1.02)';
            
            // Enhance the quote symbol
            const quoteEl = testimonial.querySelector('.testimonial-text');
            if (quoteEl) {
                quoteEl.style.fontStyle = 'italic';
                quoteEl.style.color = '#0F766E';
            }
        });
        
        testimonial.addEventListener('mouseleave', () => {
            testimonial.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
            testimonial.style.borderLeftWidth = '5px';
            testimonial.style.transform = 'translateY(0) scale(1)';
            
            // Reset quote styling
            const quoteEl = testimonial.querySelector('.testimonial-text');
            if (quoteEl) {
                quoteEl.style.fontStyle = 'italic';
                quoteEl.style.color = '';
            }
        });
    });
}

/**
 * Add scroll reveal animations to page sections
 */
function initScrollRevealEffects() {
    const sections = document.querySelectorAll('.section');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation to children
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                // Main section reveal
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
        rootMargin: '-50px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        
        // Prepare children for staggered animation
        Array.from(section.children).forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        sectionObserver.observe(section);
    });
}

/**
 * Add chart animations triggered on scroll
 */
function initChartAnimations() {
    const charts = document.querySelectorAll('.chart-container');
    
    const animateChart = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle bar charts
                const bars = entry.target.querySelectorAll('rect:not([filter])');
                if (bars.length > 0) {
                    animateBarChart(bars);
                }
                
                // Handle line charts
                const lines = entry.target.querySelectorAll('polyline, path:not([fill])');
                if (lines.length > 0) {
                    animateLineChart(lines);
                }
                
                // Handle pie/donut charts
                const pieSegments = entry.target.querySelectorAll('path[fill]:not([stroke-width="0"])');
                if (pieSegments.length > 0) {
                    animatePieChart(pieSegments);
                }
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    const chartObserver = new IntersectionObserver(animateChart, {
        root: null,
        threshold: 0.5
    });
    
    charts.forEach(chart => {
        chartObserver.observe(chart);
    });
}

/**
 * Animate bar chart elements
 * @param {NodeList} bars - The bar elements to animate
 */
function animateBarChart(bars) {
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const originalHeight = bar.getAttribute('height');
            const originalY = bar.getAttribute('y');
            const fullHeight = parseFloat(originalHeight);
            
            // Set initial state
            bar.setAttribute('height', '0');
            bar.setAttribute('y', parseFloat(originalY) + fullHeight);
            
            // Create and configure animation
            const animation = bar.animate(
                [
                    { 
                        height: 0, 
                        y: parseFloat(originalY) + fullHeight 
                    },
                    { 
                        height: fullHeight, 
                        y: parseFloat(originalY) 
                    }
                ],
                {
                    duration: 1000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    fill: 'forwards'
                }
            );
            
            // Set final state at the end of animation
            animation.onfinish = () => {
                bar.setAttribute('height', originalHeight);
                bar.setAttribute('y', originalY);
            };
        }, index * 100);
    });
}

/**
 * Animate line chart elements
 * @param {NodeList} lines - The line elements to animate
 */
function animateLineChart(lines) {
    lines.forEach(line => {
        // Get the total length of the path
        const length = line.getTotalLength ? line.getTotalLength() : 1000;
        
        // Set up initial state
        line.style.strokeDasharray = length;
        line.style.strokeDashoffset = length;
        
        // Create animation
        const animation = line.animate(
            [
                { strokeDashoffset: length },
                { strokeDashoffset: 0 }
            ],
            {
                duration: 1500,
                fill: 'forwards',
                easing: 'ease-out'
            }
        );
        
        // Set final state at the end of animation
        animation.onfinish = () => {
            line.style.strokeDasharray = 'none';
            line.style.strokeDashoffset = '0';
        };
    });
}

/**
 * Animate pie chart segments
 * @param {NodeList} segments - The pie segments to animate
 */
function animatePieChart(segments) {
    segments.forEach((segment, index) => {
        // Store original opacity
        const originalOpacity = segment.getAttribute('opacity') || 1;
        
        // Set initial state
        segment.style.opacity = 0;
        segment.style.transform = 'scale(0.8)';
        segment.style.transformOrigin = 'center';
        segment.style.transition = `opacity 0.3s ease, transform 0.5s ease`;
        segment.style.transitionDelay = `${index * 0.1}s`;
        
        // Trigger animation
        setTimeout(() => {
            segment.style.opacity = originalOpacity;
            segment.style.transform = 'scale(1)';
        }, 100);
    });
}

/**
 * Equalize heights for all matching elements
 * @param {string} selector - CSS selector for elements to equalize
 */
function equalizeHeights(selector) {
    const elements = document.querySelectorAll(selector);
    if (elements.length <= 1) return;
    
    // Reset heights first
    elements.forEach(el => {
        el.style.height = 'auto';
    });
    
    // Measure natural heights
    let maxHeight = 0;
    elements.forEach(el => {
        const height = el.scrollHeight; // Use scrollHeight for more accurate measurement
        maxHeight = Math.max(maxHeight, height);
    });
    
    // Apply equal height to all elements
    elements.forEach(el => {
        el.style.height = `${maxHeight}px`;
    });
}

/**
 * Reset heights for responsive layouts
 * @param {string} selector - CSS selector for elements to reset
 */
function resetHeights(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        el.style.height = 'auto';
    });
}

/**
 * Equalize heights for all component types
 */
function equalizeAllHeights() {
    // Apply with slight delay to ensure content is fully rendered
    setTimeout(() => {
        equalizeHeights('.testimonial');
        equalizeHeights('.service-card');
        equalizeHeights('.case-study');
        equalizeHeights('.expertise-item');
        equalizeHeights('.partner-item');
    }, 100);
}

/**
 * Reset heights for all component types
 */
function resetAllHeights() {
    resetHeights('.testimonial');
    resetHeights('.service-card');
    resetHeights('.case-study');
    resetHeights('.expertise-item');
    resetHeights('.partner-item');
}

// Add print-specific adjustments
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
    // Ensure all content is visible in print view
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'none';
    });
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Add accessibility improvements
document.addEventListener('keydown', function(e) {
    // Add keyboard navigation for interactive elements
    if (e.key === 'Enter' && document.activeElement.classList.contains('process-step')) {
        document.activeElement.click();
    }
});