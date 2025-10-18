// Conversion function
function convert() {
    const milesInput = document.getElementById('milesInput');
    const resultDiv = document.getElementById('result');
    const kmResult = document.getElementById('kmResult');
    const conversionText = document.getElementById('conversionText');
    
    const miles = parseFloat(milesInput.value);
    
    if (isNaN(miles) || miles < 0) {
        alert('Please enter a valid number of miles');
        return;
    }
    
    // 1 mile = 1.60934 kilometers
    const kilometers = miles * 1.60934;
    
    kmResult.textContent = kilometers.toFixed(2);
    conversionText.textContent = `${miles} miles =`;
    resultDiv.classList.add('show');
    
    // Save to history (optional)
    saveToHistory(miles, kilometers);
}

// Share functionality
function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'Mile to KM Converter',
            text: 'Check out this cool Mile to Kilometer converter app!',
            url: window.location.href
        })
        .then(() => console.log('Shared successfully'))
        .catch(error => console.log('Sharing failed:', error));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Link copied to clipboard! 📋\nShare it with your friends!'))
            .catch(() => alert(`Share this link: ${window.location.href}`));
    }
}

// Save conversion history (optional feature)
function saveToHistory(miles, km) {
    let history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    history.unshift({
        miles: miles,
        kilometers: km,
        date: new Date().toLocaleString()
    });
    
    // Keep only last 10 conversions
    history = history.slice(0, 10);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
}

// PWA Installation
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installBtn.style.display = 'none';
        }
        deferredPrompt = null;
    }
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Keyboard support
document.getElementById('milesInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convert();
    }
});