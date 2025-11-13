// Google Translate Initialization Script
// This ensures Google Translate works on all pages

(function() {
    'use strict';
    
    // Function to initialize Google Translate
    function initGoogleTranslate() {
        const translateElement = document.getElementById('google_translate_element');
        
        if (!translateElement) {
            console.warn('Google Translate element not found. Retrying...');
            return false;
        }
        
        // Check if already initialized
        if (document.querySelector('.goog-te-combo')) {
            console.log('Google Translate already initialized');
            return true;
        }
        
        // Check if Google Translate API is loaded
        if (typeof google === 'undefined' || !google.translate) {
            console.warn('Google Translate API not loaded yet');
            return false;
        }
        
        try {
            new google.translate.TranslateElement({
                pageLanguage: 'mr',
                includedLanguages: 'mr,en,hi',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
            
            console.log('✅ Google Translate initialized successfully');
            return true;
        } catch (error) {
            console.error('Error initializing Google Translate:', error);
            return false;
        }
    }
    
    // Try to initialize with retries
    function tryInitialize(attempts = 0, maxAttempts = 10) {
        if (attempts >= maxAttempts) {
            console.error('Failed to initialize Google Translate after', maxAttempts, 'attempts');
            return;
        }
        
        const success = initGoogleTranslate();
        
        if (!success) {
            setTimeout(() => {
                tryInitialize(attempts + 1, maxAttempts);
            }, 500);
        }
    }
    
    // Start initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => tryInitialize(), 1000);
        });
    } else {
        setTimeout(() => tryInitialize(), 1000);
    }
    
    // Also expose global function for manual initialization
    window.googleTranslateElementInit = function() {
        setTimeout(() => tryInitialize(), 100);
    };
})();
