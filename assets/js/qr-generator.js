document.getElementById('toolContent').innerHTML = `
<div class="qr-wrapper">
    <div class="qr-form">
        <div class="qr-field">
            <label class="qr-label">Text / URL / Data</label>
            <textarea id="qrInput" class="qr-textarea" placeholder="Enter text, URL, or any data...">https://n4kit.n4tzzofficial.my.id</textarea>
        </div>
        
        <div class="qr-row">
            <div class="qr-field">
                <label class="qr-label">Size (px)</label>
                <input type="number" id="qrSize" class="qr-input" value="256" min="128" max="512" step="32">
            </div>
            <div class="qr-field">
                <label class="qr-label">Foreground Color</label>
                <div class="qr-color-group">
                    <input type="color" id="qrColor" class="qr-color-picker" value="#f0a0a0">
                    <input type="text" id="qrColorHex" class="qr-hex-input" value="#f0a0a0" maxlength="7">
                </div>
            </div>
            <div class="qr-field">
                <label class="qr-label">Background Color</label>
                <div class="qr-color-group">
                    <input type="color" id="qrBg" class="qr-color-picker" value="#060210">
                    <input type="text" id="qrBgHex" class="qr-hex-input" value="#060210" maxlength="7">
                </div>
            </div>
        </div>
        
        <button class="qr-generate-btn" onclick="doGenerateQR()">
            <span>🎨</span> Generate QR Code
        </button>
    </div>
    
    <div class="qr-preview" id="qrResult">
        <div class="qr-placeholder">
            <span class="qr-placeholder-icon">📱</span>
            <span class="qr-placeholder-text">Your QR code will appear here</span>
        </div>
    </div>
    
    <div class="qr-actions" id="qrActions" style="display:none">
        <button class="qr-download-btn" onclick="doDownloadQR()">
            <span>📥</span> Download PNG
        </button>
    </div>
    
    <div class="qr-error" id="qrError" style="display:none"></div>
</div>
`;

var qrStyles = document.createElement('style');
qrStyles.textContent = `
    .qr-wrapper { max-width: 560px; margin: 0 auto; }
    
    .qr-form {
        background: var(--surface2);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 20px;
    }
    
    .qr-field { margin-bottom: 16px; }
    .qr-field:last-child { margin-bottom: 0; }
    
    .qr-label {
        display: block;
        font-size: 11px;
        font-weight: 600;
        color: var(--text2);
        text-transform: uppercase;
        letter-spacing: 0.8px;
        margin-bottom: 6px;
    }
    
    .qr-textarea {
        width: 100%;
        min-height: 72px;
        background: var(--surface3);
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 12px 14px;
        color: var(--text);
        font-family: 'Geist Mono', monospace;
        font-size: 13px;
        resize: vertical;
        outline: none;
        transition: all 0.2s;
        line-height: 1.6;
    }
    .qr-textarea:focus { border-color: rgba(240,160,160,0.4); box-shadow: 0 0 0 3px rgba(240,160,160,0.08); }
    .qr-textarea::placeholder { color: var(--text3); }
    
    .qr-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 12px;
    }
    
    .qr-input {
        width: 100%;
        background: var(--surface3);
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 10px 12px;
        color: var(--text);
        font-family: 'Geist Mono', monospace;
        font-size: 13px;
        outline: none;
        transition: all 0.2s;
    }
    .qr-input:focus { border-color: rgba(240,160,160,0.4); box-shadow: 0 0 0 3px rgba(240,160,160,0.08); }
    
    .qr-color-group {
        display: flex;
        gap: 6px;
        align-items: center;
    }
    .qr-color-picker {
        width: 38px;
        height: 38px;
        border: 2px solid var(--border);
        border-radius: 8px;
        cursor: pointer;
        padding: 2px;
        background: transparent;
        transition: all 0.2s;
    }
    .qr-color-picker:hover { border-color: rgba(255,255,255,0.2); }
    .qr-hex-input {
        flex: 1;
        background: var(--surface3);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 8px 10px;
        color: var(--text);
        font-family: 'Geist Mono', monospace;
        font-size: 11px;
        outline: none;
        width: 80px;
        transition: all 0.2s;
    }
    .qr-hex-input:focus { border-color: rgba(240,160,160,0.4); }
    
    .qr-generate-btn {
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, var(--pink), #d88890);
        color: #060210;
        border: none;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 700;
        font-family: 'Geist', sans-serif;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        letter-spacing: -0.2px;
    }
    .qr-generate-btn:hover {
        background: linear-gradient(135deg, var(--pink-bright), #e89098);
        transform: translateY(-1px);
        box-shadow: 0 8px 25px rgba(240,160,160,0.3);
    }
    .qr-generate-btn:active { transform: scale(0.98); }
    
    .qr-preview {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 220px;
        background: var(--surface2);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 16px;
        transition: all 0.3s;
    }
    .qr-preview img {
        border-radius: 12px;
        max-width: 100%;
        height: auto;
    }
    
    .qr-placeholder {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    .qr-placeholder-icon { font-size: 40px; opacity: 0.5; }
    .qr-placeholder-text { font-size: 13px; color: var(--text3); }
    
    .qr-actions {
        display: flex;
        gap: 8px;
        justify-content: center;
        flex-wrap: wrap;
    }
    .qr-download-btn {
        padding: 10px 20px;
        background: rgba(110,231,183,0.08);
        border: 1px solid rgba(110,231,183,0.2);
        color: var(--green);
        border-radius: 10px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'Geist', sans-serif;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .qr-download-btn:hover {
        background: rgba(110,231,183,0.15);
        border-color: rgba(110,231,183,0.4);
        transform: translateY(-1px);
    }
    
    .qr-error {
        color: var(--red);
        background: rgba(248,113,113,0.06);
        border: 1px solid rgba(248,113,113,0.2);
        padding: 12px 16px;
        border-radius: 10px;
        font-size: 13px;
        margin-top: 12px;
    }
    
    @media (max-width: 600px) {
        .qr-row { grid-template-columns: 1fr; }
        .qr-form { padding: 16px; }
    }
`;
document.head.appendChild(qrStyles);

document.getElementById('infoSection').innerHTML = `
<div class="qr-info">
    <h2>📖 How to Use QR Generator</h2>
    <div class="qr-steps">
        <div class="qr-step">
            <span class="qr-step-num">1</span>
            <div><strong>Enter Data</strong><p>Type any text, URL, or data you want to encode.</p></div>
        </div>
        <div class="qr-step">
            <span class="qr-step-num">2</span>
            <div><strong>Customize</strong><p>Choose size and colors to match your style.</p></div>
        </div>
        <div class="qr-step">
            <span class="qr-step-num">3</span>
            <div><strong>Download</strong><p>Save as PNG for websites, prints, or sharing.</p></div>
        </div>
    </div>
</div>
`;

var infoStyle = document.createElement('style');
infoStyle.textContent = `
    .qr-info h2 { font-size: 18px; font-weight: 700; margin-bottom: 16px; }
    .qr-steps { display: flex; flex-direction: column; gap: 12px; }
    .qr-step { display: flex; gap: 12px; align-items: flex-start; }
    .qr-step-num {
        width: 32px; height: 32px; background: var(--surface3); border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-weight: 700; color: var(--pink-bright); font-size: 14px; flex-shrink: 0;
    }
    .qr-step strong { color: var(--pink-bright); font-size: 13px; display: block; margin-bottom: 2px; }
    .qr-step p { color: var(--text2); font-size: 12px; margin: 0; }
`;
document.head.appendChild(infoStyle);

document.getElementById('qrColor').addEventListener('input', function() {
    document.getElementById('qrColorHex').value = this.value;
});
document.getElementById('qrBg').addEventListener('input', function() {
    document.getElementById('qrBgHex').value = this.value;
});
document.getElementById('qrColorHex').addEventListener('input', function() {
    var v = this.value;
    if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
        document.getElementById('qrColor').value = v;
    }
});
document.getElementById('qrBgHex').addEventListener('input', function() {
    var v = this.value;
    if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
        document.getElementById('qrBg').value = v;
    }
});

function doGenerateQR() {
    var text = document.getElementById('qrInput').value.trim();
    var size = document.getElementById('qrSize').value || 256;
    var color = document.getElementById('qrColorHex').value.replace('#', '');
    var bg = document.getElementById('qrBgHex').value.replace('#', '');
    var result = document.getElementById('qrResult');
    var actions = document.getElementById('qrActions');
    var error = document.getElementById('qrError');
    
    error.style.display = 'none';
    
    if (!text) {
        error.textContent = 'Please enter text or URL';
        error.style.display = 'block';
        showNotification('Enter text first', 'error');
        return;
    }
    
    result.innerHTML = '<div class="qr-placeholder"><span class="qr-placeholder-icon">⏳</span><span class="qr-placeholder-text">Generating...</span></div>';
    
    var url = 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size + '&color=' + color + '&bgcolor=' + bg + '&data=' + encodeURIComponent(text);
    
    var img = new Image();
    img.onload = function() {
        result.innerHTML = '';
        result.appendChild(img);
        img.style.maxWidth = '100%';
        img.style.borderRadius = '12px';
        actions.style.display = 'flex';
        showNotification('✅ QR Code generated!', 'success');
    };
    img.onerror = function() {
        result.innerHTML = '<div class="qr-placeholder"><span class="qr-placeholder-icon">❌</span><span class="qr-placeholder-text">Failed to generate</span></div>';
        error.textContent = 'Generation failed. Check your connection or try different text.';
        error.style.display = 'block';
        showNotification('Generation failed', 'error');
    };
    img.src = url;
}

function doDownloadQR() {
    var img = document.querySelector('#qrResult img');
    if (!img) { showNotification('Generate QR first', 'error'); return; }
    
    fetch(img.src)
        .then(function(r) { return r.blob(); })
        .then(function(blob) {
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'qrcode.png';
            a.click();
            URL.revokeObjectURL(url);
            showNotification('📥 Downloaded!', 'success');
        })
        .catch(function() {
            window.open(img.src, '_blank');
            showNotification('📥 Downloaded!', 'success');
        });
}

document.getElementById('qrInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) { e.preventDefault(); doGenerateQR(); }
});