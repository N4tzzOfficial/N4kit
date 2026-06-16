document.getElementById('toolContent').innerHTML = `
<div class="editor-wrapper">
    <div class="panel">
        <div class="panel-header">
            <span class="panel-title">Markdown Input</span>
            <div class="panel-actions">
                <button class="btn" onclick="loadSample()">Sample</button>
                <button class="btn" onclick="clearAll()">Clear</button>
            </div>
        </div>
        <textarea id="mdInput" placeholder="# Hello N4Kit..."></textarea>
    </div>
    <div class="panel">
        <div class="panel-header"><span class="panel-title">Preview</span></div>
        <div id="mdPreview" style="flex:1;padding:18px;overflow-y:auto;min-height:350px;color:var(--text);line-height:1.8;font-size:14px"></div>
    </div>
</div>
`;

document.getElementById('infoSection').innerHTML = '<h2>Markdown Previewer</h2><p>Write Markdown on the left and see the rendered preview on the right. Great for README files and documentation. Uses the marked.js library.</p><ul><li>Real-time preview</li><li>GitHub Flavored Markdown</li><li>Code blocks with syntax</li><li>Tables, lists, links</li></ul>';

var mdScript = document.createElement('script');
mdScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.0/marked.min.js';
mdScript.onload = function() { document.getElementById('mdInput').addEventListener('input', previewMD); };
document.head.appendChild(mdScript);

function previewMD() {
    var text = document.getElementById('mdInput').value;
    if (typeof marked !== 'undefined') {
        document.getElementById('mdPreview').innerHTML = marked.parse(text);
    } else {
        document.getElementById('mdPreview').innerHTML = '<p style="color:var(--text3)">Loading parser...</p>';
    }
}

function loadSample() {
    document.getElementById('mdInput').value = '# N4Kit\n## Developer Toolkit\n\n**Features:**\n- JSON Formatter\n- JWT Decoder\n- UUID Generator\n\n```javascript\nconsole.log("Hello N4Kit!");\n```\n\n> Built by N4tzzOfficial';
    previewMD();
    showNotification('Sample loaded', 'info');
}

function clearAll() { document.getElementById('mdInput').value = ''; document.getElementById('mdPreview').innerHTML = ''; showNotification('Cleared', 'info'); }