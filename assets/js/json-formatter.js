document.getElementById('toolContent').innerHTML = `
<div class="tool-stats" id="toolStats">
    <div class="stat-item"><span class="stat-icon">📝</span> <span id="charCount">0</span> chars</div>
    <div class="stat-item"><span class="stat-icon">📏</span> <span id="lineCount">0</span> lines</div>
    <div class="stat-item"><span class="stat-icon">📦</span> <span id="sizeCount">0 KB</span></div>
</div>
<div class="editor-wrapper">
    <div class="panel">
        <div class="panel-header">
            <span class="panel-title">📥 Input JSON</span>
            <div class="panel-actions">
                <button class="btn" onclick="loadSample()" title="Load sample data">📦 Sample</button>
                <button class="btn" onclick="clearAll()" title="Clear all">🗑 Clear</button>
                <button class="btn" onclick="pasteFromClipboard()" title="Paste from clipboard">📋 Paste</button>
            </div>
        </div>
        <textarea id="mainInput" placeholder='Paste your JSON here...&#10;&#10;{"name":"N4Kit","version":"1.0"}' oninput="updateStats()"></textarea>
    </div>
    <div class="panel">
        <div class="panel-header">
            <span class="panel-title">📤 Formatted Output</span>
            <div class="panel-actions">
                <button class="btn btn-primary" onclick="formatJSON()" title="Beautify JSON (Ctrl+Enter)">✨ Format</button>
                <button class="btn" onclick="minifyJSON()" title="Minify JSON">🗜 Minify</button>
                <button class="btn btn-copy" onclick="copyOutput()" title="Copy to clipboard">📋 Copy</button>
                <button class="btn" onclick="downloadJSON()" title="Download as .json">💾 Save</button>
            </div>
        </div>
        <div class="output-area" id="mainOutput"></div>
    </div>
</div>
<div class="notification" id="notification"></div>
`;

document.getElementById('infoSection').innerHTML = `
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
    <div>
        <h2 style="font-size:20px;font-weight:700;margin-bottom:12px">📖 How to Use</h2>
        <div class="steps-list">
            <div class="step-item"><span class="step-num">1</span> Paste your JSON in the left panel</div>
            <div class="step-item"><span class="step-num">2</span> Click <strong>Format</strong> or press <strong>Ctrl+Enter</strong></div>
            <div class="step-item"><span class="step-num">3</span> Copy, download, or share the result</div>
        </div>
    </div>
    <div>
        <h2 style="font-size:20px;font-weight:700;margin-bottom:12px">✨ Features</h2>
        <div class="feature-list">
            <div class="feature-item">✅ Syntax highlighting</div>
            <div class="feature-item">✅ Format & Minify</div>
            <div class="feature-item">✅ Auto-validate JSON</div>
            <div class="feature-item">✅ Download as .json file</div>
            <div class="feature-item">✅ 100% Client-side processing</div>
            <div class="feature-item">✅ Keyboard shortcuts</div>
        </div>
    </div>
</div>
`;

var style = document.createElement('style');
style.textContent = `
.tool-stats{display:flex;gap:20px;margin-bottom:16px;flex-wrap:wrap}
.stat-item{background:var(--surface2);border:1px solid var(--border);border-radius:100px;padding:6px 16px;font-size:12px;color:var(--text2);display:flex;align-items:center;gap:6px}
.stat-icon{font-size:14px}
.steps-list{display:flex;flex-direction:column;gap:10px}
.step-item{display:flex;align-items:center;gap:10px;color:var(--text2);font-size:14px;padding:8px 0}
.step-num{width:28px;height:28px;background:var(--surface3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--pink-bright);font-size:13px;flex-shrink:0}
.feature-list{display:flex;flex-direction:column;gap:6px}
.feature-item{color:var(--text2);font-size:14px;padding:4px 0}
.notification{position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px}
.notif-item{background:var(--surface3);border:1px solid var(--border);border-radius:12px;padding:14px 20px;display:flex;align-items:center;gap:10px;font-size:14px;font-weight:500;animation:slideIn 0.3s ease;min-width:280px;box-shadow:0 10px 40px rgba(0,0,0,0.5)}
.notif-item.success{border-color:rgba(110,231,183,0.4);color:var(--green)}
.notif-item.error{border-color:rgba(248,113,113,0.4);color:var(--red)}
.notif-item.info{border-color:rgba(240,160,160,0.4);color:var(--pink-bright)}
@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}
@media(max-width:768px){.notification{left:20px;right:20px}.notif-item{min-width:auto}}
`;
document.head.appendChild(style);

function showNotification(msg, type) {
    var container = document.getElementById('notification');
    var notif = document.createElement('div');
    notif.className = 'notif-item ' + (type || 'info');
    var icons = { success: '✅', error: '❌', info: 'ℹ️' };
    notif.innerHTML = '<span style="font-size:18px">' + (icons[type] || '') + '</span> ' + msg;
    container.appendChild(notif);
    setTimeout(function() {
        notif.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(function() { notif.remove(); }, 300);
    }, 3000);
}

function updateStats() {
    var val = document.getElementById('mainInput').value;
    document.getElementById('charCount').textContent = val.length;
    document.getElementById('lineCount').textContent = val ? val.split('\n').length : 0;
    document.getElementById('sizeCount').textContent = (new Blob([val]).size / 1024).toFixed(2) + ' KB';
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'json-number';
        if (/^"/.test(match)) cls = /:$/.test(match) ? 'json-key' : 'json-string';
        else if (/true|false/.test(match)) cls = 'json-boolean';
        else if (/null/.test(match)) cls = 'json-null';
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function formatJSON() {
    var inp = document.getElementById('mainInput');
    var out = document.getElementById('mainOutput');
    var val = inp.value.trim();
    if (!val) {
        showNotification('Please enter JSON data first', 'error');
        return;
    }
    try {
        var parsed = JSON.parse(val);
        var formatted = JSON.stringify(parsed, null, 2);
        out.innerHTML = '<pre style="margin:0;white-space:pre-wrap">' + syntaxHighlight(formatted) + '</pre>';
        showNotification('JSON formatted successfully! ✨', 'success');
    } catch(e) {
        out.innerHTML = '<div style="color:var(--red);padding:12px;background:rgba(248,113,113,0.08);border-radius:8px">❌ Invalid JSON: ' + e.message + '</div>';
        showNotification('Invalid JSON: ' + e.message, 'error');
    }
}

function minifyJSON() {
    var inp = document.getElementById('mainInput');
    var out = document.getElementById('mainOutput');
    var val = inp.value.trim();
    if (!val) {
        showNotification('Please enter JSON data first', 'error');
        return;
    }
    try {
        var parsed = JSON.parse(val);
        var minified = JSON.stringify(parsed);
        out.innerHTML = '<pre style="margin:0;white-space:pre-wrap">' + syntaxHighlight(minified) + '</pre>';
        showNotification('JSON minified! 🗜', 'success');
    } catch(e) {
        showNotification('Invalid JSON: ' + e.message, 'error');
    }
}

function copyOutput() {
    var out = document.getElementById('mainOutput');
    var text = out.textContent || out.innerText;
    if (!text || !text.trim()) {
        showNotification('Nothing to copy', 'error');
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Copied to clipboard! 📋', 'success');
    }).catch(function() {
        showNotification('Failed to copy', 'error');
    });
}

function downloadJSON() {
    var out = document.getElementById('mainOutput');
    var text = out.textContent || out.innerText;
    if (!text || !text.trim()) {
        showNotification('Nothing to download', 'error');
        return;
    }
    var blob = new Blob([text], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Downloaded! 💾', 'success');
}

function loadSample() {
    document.getElementById('mainInput').value = JSON.stringify({
        name: "N4Kit",
        version: "1.0.0",
        active: true,
        features: ["JSON Formatter", "JWT Decoder", "UUID Generator"],
        author: { name: "N4tzzOfficial", url: "https://github.com/N4tzzOfficial" }
    });
    updateStats();
    formatJSON();
    showNotification('Sample data loaded 📦', 'info');
}

function clearAll() {
    document.getElementById('mainInput').value = '';
    document.getElementById('mainOutput').innerHTML = '';
    updateStats();
    document.getElementById('mainInput').focus();
    showNotification('Cleared 🗑', 'info');
}

function pasteFromClipboard() {
    navigator.clipboard.readText().then(function(text) {
        document.getElementById('mainInput').value = text;
        updateStats();
        formatJSON();
        showNotification('Pasted from clipboard! 📋', 'success');
    }).catch(function() {
        showNotification('Failed to paste. Try Ctrl+V', 'error');
    });
}

document.getElementById('mainInput').addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        formatJSON();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        downloadJSON();
    }
});

updateStats();
loadSample();