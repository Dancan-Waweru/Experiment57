// Global DOM anchors
const usernameInput = document.getElementById('username-field');
const formBody = document.getElementById('terminal-form-body');
const hiddenContainer = document.getElementById('hidden-inputs-container');

/**
 * Parses parameters out of the incoming URL stream and writes hidden inputs into the DOM tree.
 */
function injectMikrotikParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Define the specific tracking keys sent by your gateway template
    const parameters = ['ip', 'mac', 'linkLogin', 'linkOrig'];

    parameters.forEach(param => {
        const val = urlParams.get(param);
        if (val) {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.id = `router-${param}`;
            hiddenInput.name = param;
            hiddenInput.value = val;
            hiddenContainer.appendChild(hiddenInput);
            console.log(`Captured MikroTik tracking vector -> ${param}: ${val}`);
        }
    });
}

/**
 * Simulates a system verification pipeline with a retro terminal progress gauge.
 */
function triggerTerminalBoot() {
    if (document.getElementById('status-panel')) return;

    const statusPanel = document.createElement('div');
    statusPanel.id = 'status-panel';
    statusPanel.className = 'status-neutral';

    const statusText = document.createElement('p');
    statusText.id = 'status-text';
    statusText.textContent = 'initializing validation sequence...';

    const statusBar = document.createElement('p');
    statusBar.id = 'status-bar';
    statusBar.textContent = '[....................]';

    statusPanel.appendChild(statusText);
    statusPanel.appendChild(statusBar);
    formBody.appendChild(statusPanel);

    const bootStages = [
        { text: 'submitting credentials...', bar: '[####................]' },
        { text: 'authenticating credentials...', bar: '[########............]' },
        { text: 'authorizing...', bar: '[############........]' },
        { text: 'checking session...', bar: '[################....]' },
        { text: 'access granted.', bar: '[####################]' }
    ];

    let currentStage = 0;

    const bootTimer = setInterval(async () => {
        if (currentStage < bootStages.length) {
            statusText.textContent = bootStages[currentStage].text;
            statusBar.textContent = bootStages[currentStage].bar;
            currentStage++;
        } else {
            clearInterval(bootTimer);
            
            // Gather structural interface typing data
            const usernameValue = document.getElementById('username-field').value;
            const passwordValue = document.getElementById('password-field').value;

            // Gather the hidden tracking fields if they exist
            const ipValue = document.getElementById('router-ip')?.value || '';
            const macValue = document.getElementById('router-mac')?.value || '';
            const linkLoginValue = document.getElementById('router-linkLogin')?.value || '';
            const linkOrigValue = document.getElementById('router-linkOrig')?.value || '';

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        username: usernameValue, 
                        password: passwordValue,
                        clientIp: ipValue,       // Here is the real device IP from the router
                        clientMac: macValue,     // Here is the device hardware MAC address
                        linkLogin: linkLoginValue,
                        linkOrig: linkOrigValue
                    })
                });

                const serverResult = await response.json();

                if (response.ok && serverResult.success) {
                    const queryParams = new URLSearchParams({
                        username: serverResult.username,
                        bundle: serverResult.bundle
                    }).toString();

                    setTimeout(() => {
                        window.location.href = `/splash.html?${queryParams}`;
                    }, 600);
                } else {
                    statusPanel.className = 'status-error';
                    formBody.classList.add('status-error-active');
                    statusText.innerHTML = `ACCESS DENIED: ${serverResult.message.toUpperCase()}<br>RETRY VALIDATION SEQUENCE...`;
                    statusBar.textContent = '[*******CRITICAL_FAULT*******]';
                }

            } catch (error) {
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

    passwordInput.addEventListener('keydown', function(passEvent) {
        if (passEvent.key === 'Enter') {
            passEvent.preventDefault();
            triggerTerminalBoot();
        }
    });
}

// --- INITIAL ENGINE EXECUTION EVENT HOOKS ---

// Automatically extract the router configuration keys the split second the page mounts
document.addEventListener('DOMContentLoaded', injectMikrotikParameters);

usernameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        initializePasswordPrompt();
    }
});
