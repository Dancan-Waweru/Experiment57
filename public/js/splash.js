document.addEventListener('DOMContentLoaded', () => {
    // 1. Target the raw browser address window parameter map
    const urlParams = new URLSearchParams(window.location.search);
    
    // 2. Extract explicit key data fields passed from your login phase
    const username = urlParams.get('username');
    const bundle = urlParams.get('bundle');

    // 3. Select your HTML element anchors
    const userDisplay = document.getElementById('display-user');
    const bundleDisplay = document.getElementById('display-bundle');

    // 4. Safely populate layout components or apply security fallback routes
    if (username) {
        userDisplay.textContent = username;
    } else {
        userDisplay.textContent = 'UNKNOWN NODE';
    }

    if (bundle) {
        bundleDisplay.textContent = bundle;
    } else {
        bundleDisplay.textContent = 'UNALLOCATED DATA BUNDLE';
    }
    
    console.log(`Node authorized. Active Session: ${username || 'anonymous'}`);
});
