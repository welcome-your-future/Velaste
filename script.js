// script.js

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.innerText;
        const increment = target / speed;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                setTimeout(updateCounter, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
}

// Accessibility Functions
function toggleAccessibility() {
    alert('सुलभता पर्याय सक्रिय केले आहेत. ही वैशिष्ट्ये लवकरच उपलब्ध होतील.');
}

// Visitor Counter
let visitorCount = 12896;
function updateVisitorCounter() {
    visitorCount++;
    const visitorCounter = document.getElementById('visitorCounter');
    if (visitorCounter) {
        visitorCounter.textContent = visitorCount.toLocaleString('mr-IN');
    }
}

// Load component function
async function loadComponent(elementId, filePath) {
    try {
        console.log(`Loading ${filePath}...`);
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        console.log(`Successfully loaded ${filePath}`);
        
        // Re-initialize AOS for dynamically loaded content
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Update visitor counter if footer was loaded
        if (elementId === 'footer-placeholder') {
            updateVisitorCounter();
        }
        
    } catch (error) {
        console.error('Error loading component:', error);
        document.getElementById(elementId).innerHTML = `
            <div class="alert alert-warning text-center">
                <i class="fas fa-exclamation-triangle me-2"></i>
                ${filePath} लोड करताना त्रुटी आली. कृपया पृष्ठ रीफ्रेश करा.
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing components');
    
    // Initialize counters
    initializeCounters();
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
        console.log('AOS initialized');
    }
    
    // Load header and footer
    loadComponent('header-placeholder', 'Includes/header.html');
});