document.getElementById('toolContent').innerHTML = `
<div class="editor-wrapper">
    <div class="panel">
        <div class="panel-header">
            <span class="panel-title">Input Text</span>
            <div class="panel-actions">
                <button class="btn" onclick="loadSample()">Sample</button>
                <button class="btn" onclick="clearAll()">Clear</button>
            </div>
        </div>
        <textarea id="mainInput" placeholder="Enter text or URL..."></textarea>
    </div>
    <div class="panel">
        <div class="panel-header">
            <span class="panel-title">Output</span>
            <div class="panel-actions">
                <button class="btn btn-primary" onclick="encodeURL()">Encode</button>
                <button class="btn" onclick="decodeURL()">Decode</button>
                <button class="btn btn-copy" onclick="copyOut()">Copy</button>
            </div>
        </div>
        <div class="output-area" id="mainOutput"></div>
    </div>
</div>
`;

document.getElementById('infoSection').innerHTML = '<h2>URL Encoder/Decoder</h2><p>Encode special characters for safe URL transmission or decode percent-encoded URLs back to text. All processing happens in your browser.</p><ul><li>Encode URLs for safe transmission</li><li>Decode percent-encoded strings</li><li>Supports full Unicode</li><li>100% client-side</li></ul>';

function encodeURL() {
    var v = document.getElementById('mainInput').value;
    if (!v) { showNotification('Enter text first', 'error'); return; }
    document.getElementById('mainOutput').textContent = encodeURIComponent(v);
    showNotification('Encoded', 'success');
}
function decodeURL() {
    var v = document.getElementById('mainInput').value.trim();
    if (!v) { showNotification('Enter encoded text', 'error'); return; }
    try {
        document.getElementById('mainOutput').textContent = decodeURIComponent(v);
        showNotification('Decoded', 'success');
    } catch (e) {
        showNotification('Invalid encoded text', 'error');
    }
}
function copyOut() {
    var t = document.getElementById('mainOutput').textContent;
    if (!t) { showNotification('Nothing to copy', 'error'); return; }
    navigator.clipboard.writeText(t).then(function() { showNotification('Copied!', 'success'); });
}
function loadSample() { document.getElementById('mainInput').value = 'https://example.com?name=N4tzz&msg=Hello World!'; encodeURL(); showNotification('Sample loaded', 'info'); }
function clearAll() { document.getElementById('mainInput').value = ''; document.getElementById('mainOutput').textContent = ''; showNotification('Cleared', 'info'); }