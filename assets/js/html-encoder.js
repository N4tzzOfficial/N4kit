document.getElementById('toolContent').innerHTML = `
<div class="editor-wrapper">
    <div class="panel">
        <div class="panel-header"><span class="panel-title">Input</span><div class="panel-actions"><button class="btn" onclick="loadSample()">Sample</button><button class="btn" onclick="clearAll()">Clear</button></div></div>
        <textarea id="htmlInput" placeholder="<div>Hello</div>"></textarea>
    </div>
    <div class="panel">
        <div class="panel-header"><span class="panel-title">Output</span><div class="panel-actions"><button class="btn btn-primary" onclick="encodeHTML()">Encode</button><button class="btn" onclick="decodeHTML()">Decode</button><button class="btn btn-copy" onclick="copyOut()">Copy</button></div></div>
        <div class="output-area" id="htmlOutput"></div>
    </div>
</div>
`;

document.getElementById('infoSection').innerHTML = '<h2>HTML Entity Encoder/Decoder</h2><p>Encode special HTML characters to entities or decode them back. Essential for safe HTML rendering.</p><ul><li>Encode &lt; &gt; &amp; &quot;</li><li>Decode HTML entities</li><li>Prevent XSS in rendering</li><li>100% client-side</li></ul>';

function encodeHTML() {
    var v = document.getElementById('htmlInput').value;
    if (!v) { showNotification('Enter text', 'error'); return; }
    var encoded = v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    document.getElementById('htmlOutput').textContent = encoded;
    showNotification('Encoded', 'success');
}

function decodeHTML() {
    var v = document.getElementById('htmlInput').value.trim();
    if (!v) { showNotification('Enter encoded text', 'error'); return; }
    var txt = document.createElement('textarea');
    txt.innerHTML = v;
    document.getElementById('htmlOutput').textContent = txt.value;
    showNotification('Decoded', 'success');
}

function copyOut() {
    var t = document.getElementById('htmlOutput').textContent;
    if (!t) { showNotification('Nothing to copy', 'error'); return; }
    navigator.clipboard.writeText(t).then(function() { showNotification('Copied!', 'success'); });
}

function loadSample() { document.getElementById('htmlInput').value = '<div class="hello">Hello & Welcome!</div>'; encodeHTML(); showNotification('Sample loaded', 'info'); }
function clearAll() { document.getElementById('htmlInput').value = ''; document.getElementById('htmlOutput').textContent = ''; showNotification('Cleared', 'info'); }