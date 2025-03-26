// TAS Business Solutions Brochure - Enhanced JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Log that the brochure has loaded
    console.log("TAS Business Solutions Brochure loaded");
    
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add hover effects to process steps
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateY(-5px)';
            const number = step.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1.1)';
            }
        });
        
        step.addEventListener('mouseleave', () => {
            step.style.transform = 'translateY(0)';
            const number = step.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add animation for testimonial quotes
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', () => {
            testimonial.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            testimonial.style.borderLeftWidth = '8px';
        });
        
        testimonial.addEventListener('mouseleave', () => {
            testimonial.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
            testimonial.style.borderLeftWidth = '5px';
        });
    });
    
    // Add scroll reveal effect for sections
    const sections = document.querySelectorAll('.section');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        sectionObserver.observe(section);
    });
    
    // Handle chart animations on scroll
    const charts = document.querySelectorAll('.chart-container');
    
    const animateChart = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For bar charts
                const bars = entry.target.querySelectorAll('rect:not([filter])');
                if (bars.length > 0) {
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            const originalHeight = bar.getAttribute('height');
                            bar.setAttribute('height', '0');
                            
                            // Animate the height
                            let height = 0;
                            const targetHeight = parseFloat(originalHeight);
                            const step = targetHeight / 20;
                            
                            const animation = setInterval(() => {
                                height += step;
                                if (height >= targetHeight) {
                                    height = targetHeight;
                                    clearInterval(animation);
                                }
                                bar.setAttribute('height', height.toString());
                            }, 20);
                        }, index * 200);
                    });
                }
                
                // For line charts
                const lines = entry.target.querySelectorAll('polyline');
                if (lines.length > 0) {
                    lines.forEach(line => {
                        const length = line.getTotalLength();
                        
                        // Set up the starting position
                        line.style.strokeDasharray = length;
                        line.style.strokeDashoffset = length;
                        
                        // Define animation
                        line.animate(
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
                    });
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
});

// Function to adjust container heights for equal card heights
function equalizeHeights(selector) {
    const elements = document.querySelectorAll(selector);
    if (elements.length <= 1) return;
    
    // Reset heights
    elements.forEach(el => {
        el.style.height = 'auto';
    });
    
    // Find tallest element
    let maxHeight = 0;
    elements.forEach(el => {
        const height = el.offsetHeight;
        maxHeight = Math.max(maxHeight, height);
    });
    
    // Set all elements to tallest height
    elements.forEach(el => {
        el.style.height = `${maxHeight}px`;
    });
}

// Apply equal heights on load and resize
window.addEventListener('load', () => {
    if (window.innerWidth >= 768) {
        equalizeHeights('.testimonial');
        equalizeHeights('.service-card');
        equalizeHeights('.case-study');
        equalizeHeights('.expertise-item');
        equalizeHeights('.partner-item');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        equalizeHeights('.testimonial');
        equalizeHeights('.service-card');
        equalizeHeights('.case-study');
        equalizeHeights('.expertise-item');
        equalizeHeights('.partner-item');
    }
});