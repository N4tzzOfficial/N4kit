document.getElementById('toolContent').innerHTML = `
<div class="pw-wrapper">
    <div class="pw-form">
        <div class="pw-row">
            <div class="pw-field">
                <label class="pw-label">Password Length</label>
                <div class="pw-range-group">
                    <input type="range" id="pwLength" class="pw-range" value="16" min="4" max="64" oninput="updatePwLength()">
                    <span class="pw-range-value" id="pwLengthVal">16</span>
                </div>
            </div>
            <div class="pw-field">
                <label class="pw-label">Quantity</label>
                <input type="number" id="pwQty" class="pw-input" value="1" min="1" max="20">
            </div>
        </div>
        
        <label class="pw-label">Character Types</label>
        <div class="pw-checkboxes">
            <label class="pw-check">
                <input type="checkbox" id="pwUpper" checked> <span>A-Z</span>
            </label>
            <label class="pw-check">
                <input type="checkbox" id="pwLower" checked> <span>a-z</span>
            </label>
            <label class="pw-check">
                <input type="checkbox" id="pwNum" checked> <span>0-9</span>
            </label>
            <label class="pw-check">
                <input type="checkbox" id="pwSym"> <span>!@#$%</span>
            </label>
        </div>
        
        <button class="pw-generate-btn" onclick="doGenPW()">
            <span>🎲</span> Generate Password
        </button>
    </div>
    
    <div class="pw-results" id="pwOutput">
        <div class="pw-placeholder">
            <span class="pw-placeholder-icon">🔑</span>
            <span>Click Generate to create passwords</span>
        </div>
    </div>
</div>
`;

var pwStyle = document.createElement('style');
pwStyle.textContent = `
    .pw-wrapper { max-width: 600px; margin: 0 auto; }
    .pw-form {
        background: var(--surface2);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 20px;
    }
    .pw-row { display: grid; grid-template-columns: 1fr 120px; gap: 16px; margin-bottom: 20px; }
    .pw-field { display: flex; flex-direction: column; gap: 6px; }
    .pw-label {
        font-size: 11px; font-weight: 600; color: var(--text2);
        text-transform: uppercase; letter-spacing: 0.8px;
    }
    .pw-range-group { display: flex; align-items: center; gap: 12px; }
    .pw-range {
        flex: 1; -webkit-appearance: none; height: 6px;
        background: var(--surface3); border-radius: 3px; outline: none;
        accent-color: var(--pink);
    }
    .pw-range-value {
        font-family: 'Geist Mono', monospace; font-size: 18px; font-weight: 700;
        color: var(--pink-bright); min-width: 30px; text-align: center;
    }
    .pw-input {
        background: var(--surface3); border: 1px solid var(--border);
        border-radius: 8px; padding: 8px 12px; color: var(--text);
        font-family: 'Geist Mono', monospace; font-size: 14px; outline: none;
    }
    .pw-input:focus { border-color: rgba(240,160,160,0.4); }
    .pw-checkboxes { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
    .pw-check {
        display: flex; align-items: center; gap: 6px;
        font-size: 13px; color: var(--text2); cursor: pointer;
        padding: 8px 14px; background: var(--surface3); border-radius: 8px;
        border: 1px solid transparent; transition: all 0.2s;
    }
    .pw-check:hover { border-color: var(--border); }
    .pw-check input[type="checkbox"] { accent-color: var(--pink); }
    .pw-generate-btn {
        width: 100%; padding: 14px;
        background: linear-gradient(135deg, var(--pink), #d88890);
        color: #060210; border: none; border-radius: 12px;
        font-size: 14px; font-weight: 700; font-family: 'Geist', sans-serif;
        cursor: pointer; transition: all 0.3s;
        display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .pw-generate-btn:hover {
        background: linear-gradient(135deg, var(--pink-bright), #e89098);
        transform: translateY(-1px); box-shadow: 0 8px 25px rgba(240,160,160,0.3);
    }
    .pw-results { display: flex; flex-direction: column; gap: 8px; }
    .pw-placeholder {
        text-align: center; padding: 40px; color: var(--text3); font-size: 13px;
        background: var(--surface2); border: 1px dashed var(--border); border-radius: 12px;
    }
    .pw-placeholder-icon { font-size: 28px; display: block; margin-bottom: 8px; }
    .pw-result-item {
        display: flex; align-items: center; gap: 10px;
        background: var(--surface2); border: 1px solid var(--border);
        border-radius: 12px; padding: 14px 18px;
        animation: slideIn 0.3s ease;
    }
    .pw-result-text {
        flex: 1; font-family: 'Geist Mono', monospace; font-size: 14px;
        color: var(--green); word-break: break-all;
    }
    .pw-result-copy {
        padding: 8px 14px; background: rgba(110,231,183,0.1);
        border: 1px solid rgba(110,231,183,0.2); color: var(--green);
        border-radius: 8px; font-size: 11px; font-weight: 600; cursor: pointer;
        font-family: 'Geist', sans-serif; transition: all 0.2s;
    }
    .pw-result-copy:hover { background: rgba(110,231,183,0.18); }
    @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 500px) { .pw-row { grid-template-columns: 1fr; } }
`;
document.head.appendChild(pwStyle);

document.getElementById('infoSection').innerHTML = '<h2>Password Generator</h2><p>Generate strong random passwords. Customize length, character types, and generate multiple at once. All generation is 100% client-side.</p>';

function updatePwLength() {
    document.getElementById('pwLengthVal').textContent = document.getElementById('pwLength').value;
}

function doGenPW() {
    var len = parseInt(document.getElementById('pwLength').value) || 16;
    var qty = parseInt(document.getElementById('pwQty').value) || 1;
    var upper = document.getElementById('pwUpper').checked;
    var lower = document.getElementById('pwLower').checked;
    var num = document.getElementById('pwNum').checked;
    var sym = document.getElementById('pwSym').checked;
    
    var chars = '';
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (num) chars += '0123456789';
    if (sym) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (!chars) { showNotification('Select at least one character type', 'error'); return; }
    
    var out = document.getElementById('pwOutput');
    var html = '';
    for (var i = 0; i < qty; i++) {
        var pw = '';
        for (var j = 0; j < len; j++) pw += chars[Math.floor(Math.random() * chars.length)];
        html += '<div class="pw-result-item"><span class="pw-result-text">' + pw + '</span><button class="pw-result-copy" onclick="navigator.clipboard.writeText(\'' + pw + '\').then(function(){showNotification(\'📋 Copied!\',\'success\')})">📋 Copy</button></div>';
    }
    out.innerHTML = html;
    showNotification('✅ ' + qty + ' password(s) generated', 'success');
}