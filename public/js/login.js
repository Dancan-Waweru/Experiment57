// Global DOM anchors
const usernameInput = document.getElementById('username-field');
const formBody = document.getElementById('terminal-form-body');

/**
 * Simulates a system verification pipeline with a retro terminal progress gauge.
 */
function triggerTerminalBoot() {
    // Prevent duplicate progress bars from spinning up if user mashes Enter
    if (document.getElementById('status-panel')) return;

    // 1. Build the status container box
    const statusPanel = document.createElement('div');
    statusPanel.id = 'status-panel';
    statusPanel.className = 'status-neutral';

    // 2. Build the dynamic log text element
    const statusText = document.createElement('p');
    statusText.id = 'status-text';
    statusText.textContent = 'initializing validation sequence...';

    // 3. Build the raw progress meter block
    const statusBar = document.createElement('p');
    statusBar.id = 'status-bar';
    statusBar.textContent = '[....................]'; // 20 units wide canvas

    // Assemble and render directly below your interactive forms
    statusPanel.appendChild(statusText);
    statusPanel.appendChild(statusBar);
    formBody.appendChild(statusPanel);

    // 4. Define the array of execution sequence checkpoints
    const bootStages = [
        { text: 'submitting credentials...', bar: '[####................]' },
        { text: 'authenticating credentials...', bar: '[########............]' },
        { text: 'authorizing...', bar: '[############........]' },
        { text: 'checking session...', bar: '[################....]' },
        { text: 'access granted.', bar: '[####################]' }
    ];

    let currentStage = 0;


    // 5. Fire up the ticker interval to step through the array frames smoothly
    const bootTimer = setInterval(async () => {
        if (currentStage < bootStages.length) {
            statusText.textContent = bootStages[currentStage].text;
            statusBar.textContent = bootStages[currentStage].bar;
            currentStage++;
        } else {
            clearInterval(bootTimer);
            
            // Gather values directly from your interface elements
            const usernameValue = document.getElementById('username-field').value;
            const passwordValue = document.getElementById('password-field').value;

            // ... rest of your existing progress ticker setup remains identical above ...
            
            // Dispatch the payload safely over to your backend server architecture
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: usernameValue, password: passwordValue })
                });

                const serverResult = await response.json();

               if (response.ok && serverResult.success) {
                    console.log("Validation approved by database core.");
                    
                    // Encode strings safely to pass them cleanly as standard URL URL parameters
                    const queryParams = new URLSearchParams({
                        username: serverResult.username,
                        bundle: serverResult.bundle
                    }).toString();

                    // Trigger redirection directly to the target splash page alongside parameters
                    setTimeout(() => {
                        window.location.href = `/splash.html?${queryParams}`;
                    }, 600);
                }
                else {
                    // Failure Path (Desktop-15)
                    console.warn("Validation denied by database core.");
                    
                    // 1. Shift the main layout wrapper tracking state to amber
                    statusPanel.className = 'status-error';
                    formBody.classList.add('status-error-active');

                    // 2. Output the error warning directly to the terminal screen
                    statusText.innerHTML = `ACCESS DENIED: ${serverResult.message.toUpperCase()}<br>RETRY VALIDATION SEQUENCE...`;
                    
                    // 3. Transform progress gauge indicators into error nodes
                    statusBar.textContent = '[*******CRITICAL_FAULT*******]';
                }

            } catch (error) {
                // Catching hardware disconnects or server down events
                statusPanel.className = 'status-error';
                statusText.textContent = 'CRITICAL CORRUPT SYSTEM TIMEOUT';
                statusBar.textContent = '[xxxxxxxxxxxxxxxxxxxx]';
            }
        }
    }, 800); 
}


/**
 * Constructs the password markup flow and attaches its standalone listener.
 */
function initializePasswordPrompt() {
    if (document.getElementById('password-field')) return;

    const passwordContainer = document.createElement('div');
    passwordContainer.className = 'input-container';
    passwordContainer.id = 'password-container';

    const label = document.createElement('label');
    label.setAttribute('for', 'password-field');
    label.textContent = 'enter your password';

    const interactiveLine = document.createElement('div');
    interactiveLine.className = 'interactive-line';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password-field';
    passwordInput.name = 'password';
    passwordInput.required = true;

    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';

    interactiveLine.appendChild(passwordInput);
    interactiveLine.appendChild(cursor);
    passwordContainer.appendChild(label);
    passwordContainer.appendChild(interactiveLine);
    
    formBody.appendChild(passwordContainer);
    passwordInput.focus();

    // Secondary Event Hook: Listens for password submittal execution
    passwordInput.addEventListener('keydown', function(passEvent) {
        if (passEvent.key === 'Enter') {
            passEvent.preventDefault();
            console.log("password has been provided");
            
            // Execute our self-contained fake progress engine
            triggerTerminalBoot();
        }
    });
}

// --- PRIMARY INTERACTION HOOK ---
usernameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log("username added first");
        initializePasswordPrompt();
    }
});
