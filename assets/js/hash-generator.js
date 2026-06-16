document.getElementById('toolContent').innerHTML = `
<div class="hash-wrapper">
    <div class="hash-form">
        <label class="hash-label">Text to Hash</label>
        <textarea id="hashInput" class="hash-textarea" placeholder="Enter text to generate hash..."></textarea>
        
        <label class="hash-label">Algorithm</label>
        <div class="hash-buttons">
            <button class="hash-btn" onclick="doHash('MD5')">
                <span>🔒</span> MD5
            </button>
            <button class="hash-btn" onclick="doHash('SHA-1')">
                <span>🔐</span> SHA-1
            </button>
            <button class="hash-btn" onclick="doHash('SHA-256')">
                <span>🛡️</span> SHA-256
            </button>
            <button class="hash-btn" onclick="doHash('SHA-512')">
                <span>🔑</span> SHA-512
            </button>
        </div>
    </div>
    
    <div class="hash-results" id="hashResults">
        <div class="hash-placeholder">
            <span class="hash-placeholder-icon">#️⃣</span>
            <span>Select an algorithm and generate</span>
        </div>
    </div>
</div>
`;

var hashStyle = document.createElement('style');
hashStyle.textContent = `
    .hash-wrapper { max-width: 700px; margin: 0 auto; }
    .hash-form {
        background: var(--surface2);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 20px;
    }
    .hash-label {
        display: block;
        font-size: 11px;
        font-weight: 600;
        color: var(--text2);
        text-transform: uppercase;
        letter-spacing: 0.8px;
        margin-bottom: 8px;
    }
    .hash-textarea {
        width: 100%;
        min-height: 90px;
        background: var(--surface3);
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 14px;
        color: var(--text);
        font-family: 'Geist Mono', monospace;
        font-size: 13px;
        resize: vertical;
        outline: none;
        transition: all 0.2s;
        line-height: 1.6;
        margin-bottom: 20px;
    }
    .hash-textarea:focus { border-color: rgba(240,160,160,0.4); box-shadow: 0 0 0 3px rgba(240,160,160,0.08); }
    .hash-textarea::placeholder { color: var(--text3); }
    
    .hash-buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .hash-btn {
        padding: 12px 8px;
        background: var(--surface3);
        border: 1px solid var(--border);
        border-radius: 10px;
        color: var(--text);
        font-family: 'Geist', sans-serif;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
    }
    .hash-btn:hover {
        border-color: rgba(240,160,160,0.4);
        background: rgba(240,160,160,0.08);
        color: var(--pink-bright);
        transform: translateY(-1px);
    }
    .hash-btn:active { transform: scale(0.97); }
    
    .hash-results { display: flex; flex-direction: column; gap: 10px; }
    .hash-placeholder {
        text-align: center;
        padding: 40px;
        color: var(--text3);
        font-size: 13px;
        background: var(--surface2);
        border: 1px dashed var(--border);
        border-radius: 12px;
    }
    .hash-placeholder-icon { font-size: 28px; display: block; margin-bottom: 8px; }
    
    .hash-result-item {
        background: var(--surface2);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 16px;
        animation: slideIn 0.3s ease;
    }
    .hash-result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    .hash-algo-badge {
        font-size: 12px;
        font-weight: 700;
        color: var(--pink-bright);
        background: rgba(240,160,160,0.1);
        padding: 4px 12px;
        border-radius: 100px;
    }
    .hash-value {
        font-family: 'Geist Mono', monospace;
        font-size: 12px;
        color: var(--green);
        word-break: break-all;
        line-height: 1.6;
        background: var(--surface3);
        padding: 10px 14px;
        border-radius: 8px;
    }
    .hash-copy-btn {
        padding: 6px 12px;
        background: rgba(110,231,183,0.1);
        border: 1px solid rgba(110,231,183,0.2);
        color: var(--green);
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        font-family: 'Geist', sans-serif;
        transition: all 0.2s;
    }
    .hash-copy-btn:hover { background: rgba(110,231,183,0.18); }
    
    @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 500px) { .hash-buttons { grid-template-columns: repeat(2, 1fr); } }
`;
document.head.appendChild(hashStyle);

document.getElementById('infoSection').innerHTML = '<h2>Hash Generator</h2><p>Generate secure hashes using MD5, SHA-1, SHA-256, or SHA-512. All hashing is done server-side for accuracy.</p><ul><li>MD5 (128-bit)</li><li>SHA-1 (160-bit)</li><li>SHA-256 (256-bit)</li><li>SHA-512 (512-bit)</li></ul>';

function doHash(algo) {
    var text = document.getElementById('hashInput').value;
    if (!text) { showNotification('Enter text first', 'error'); return; }
    
    var results = document.getElementById('hashResults');
    var existing = results.querySelector('[data-algo="' + algo + '"]');
    if (existing) {
        var loading = existing.querySelector('.hash-loading');
        if (loading) loading.style.display = 'inline';
    }
    
    fetch('https://n4kit.n4tzzofficial.my.id/api/hash.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'text=' + encodeURIComponent(text) + '&algo=' + algo
    })
    .then(function(r) { return r.json(); })
    .then(function(d) {
        if (d.error) { showNotification(d.error, 'error'); return; }
        
        var html = `
            <div class="hash-result-item" data-algo="${d.algo}">
                <div class="hash-result-header">
                    <span class="hash-algo-badge">🔒 ${d.algo}</span>
                    <button class="hash-copy-btn" onclick="navigator.clipboard.writeText('${d.hash}').then(function(){showNotification('📋 Copied!','success')})">📋 Copy</button>
                </div>
                <div class="hash-value">${d.hash}</div>
            </div>
        `;
        
        var existingEl = results.querySelector('[data-algo="' + d.algo + '"]');
        if (existingEl) {
            existingEl.outerHTML = html;
        } else {
            results.insertAdjacentHTML('afterbegin', html);
        }
        
        showNotification('✅ ' + d.algo + ' generated', 'success');
    })
    .catch(function() {
        showNotification('Server error. Make sure api/hash.php exists.', 'error');
    });
}