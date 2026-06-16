document.getElementById('toolContent').innerHTML = `
<div class="editor-wrapper">
    <div class="panel">
        <div class="panel-header"><span class="panel-title">Original Text</span><div class="panel-actions"><button class="btn" onclick="loadSample()">Sample</button></div></div>
        <textarea id="diffLeft" placeholder="Original text..."></textarea>
    </div>
    <div class="panel">
        <div class="panel-header"><span class="panel-title">Modified Text</span><div class="panel-actions"><button class="btn btn-primary" onclick="compareDiff()">Compare</button></div></div>
        <textarea id="diffRight" placeholder="Modified text..."></textarea>
    </div>
</div>
<div id="diffResult" style="margin-top:16px;padding:16px;background:var(--surface2);border:1px solid var(--border);border-radius:12px;min-height:100px;font-family:'Geist Mono',monospace;font-size:13px;white-space:pre-wrap;line-height:1.6"></div>
`;

document.getElementById('infoSection').innerHTML = '<h2>Diff Checker</h2><p>Compare two texts and find differences. Lines added are shown in green, removed in red. Simple line-by-line comparison.</p><ul><li>Line-by-line comparison</li><li>Added lines in green</li><li>Removed lines in red</li><li>100% client-side</li></ul>';

function compareDiff() {
    var left = document.getElementById('diffLeft').value.split('\n');
    var right = document.getElementById('diffRight').value.split('\n');
    var result = document.getElementById('diffResult');
    var html = '';
    var max = Math.max(left.length, right.length);
    for (var i = 0; i < max; i++) {
        var l = left[i] || '';
        var r = right[i] || '';
        if (l === r) {
            html += '<div>' + (i + 1) + ': ' + l + '</div>';
        } else {
            if (l) html += '<div style="background:rgba(248,113,113,0.15);color:var(--red)">- ' + (i + 1) + ': ' + l + '</div>';
            if (r) html += '<div style="background:rgba(110,231,183,0.1);color:var(--green)">+ ' + (i + 1) + ': ' + r + '</div>';
        }
    }
    result.innerHTML = html || '<div style="color:var(--text3)">Texts are identical</div>';
    showNotification('Compared', 'success');
}

function loadSample() {
    document.getElementById('diffLeft').value = 'Hello N4Kit\nThis is line 2\nThis line stays\nOld line to remove';
    document.getElementById('diffRight').value = 'Hello N4Kit\nThis is line 2 (modified)\nThis line stays\nNew line added';
    compareDiff();
    showNotification('Sample loaded', 'info');
}