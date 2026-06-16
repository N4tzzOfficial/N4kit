document.getElementById('toolContent').innerHTML = `
<div style="max-width:900px;margin:0 auto">
    <div style="display:flex;gap:10px;margin-bottom:16px">
        <input type="text" id="regexPattern" placeholder="Pattern (e.g. \\d+)" style="flex:1;background:var(--surface3);border:1px solid var(--border);border-radius:10px;padding:14px;color:var(--text);font-family:'Geist Mono',monospace;font-size:14px;outline:none">
        <input type="text" id="regexFlags" placeholder="Flags (g,i,m)" style="width:100px;background:var(--surface3);border:1px solid var(--border);border-radius:10px;padding:14px;color:var(--text);font-family:'Geist Mono',monospace;font-size:14px;outline:none">
        <button class="btn btn-primary" onclick="testRegex()" style="padding:14px 24px;font-size:14px">Test</button>
    </div>
    <textarea id="regexInput" placeholder="Test text..." style="width:100%;min-height:200px;background:var(--surface3);border:1px solid var(--border);border-radius:12px;padding:16px;color:var(--text);font-family:'Geist Mono',monospace;font-size:13px;resize:vertical;outline:none"></textarea>
    <div id="regexResult" style="margin-top:16px;padding:16px;background:var(--surface2);border:1px solid var(--border);border-radius:12px;min-height:60px;font-family:'Geist Mono',monospace;font-size:13px"></div>
</div>
`;

document.getElementById('infoSection').innerHTML = '<h2>Regex Tester</h2><p>Test regular expressions in real-time. Enter a pattern, optional flags, and test text. See matches instantly.</p><ul><li>Real-time regex testing</li><li>Support for flags (g, i, m, s, u)</li><li>Match highlighting</li><li>100% client-side</li></ul>';

function testRegex() {
    var pattern = document.getElementById('regexPattern').value;
    var flags = document.getElementById('regexFlags').value;
    var text = document.getElementById('regexInput').value;
    var result = document.getElementById('regexResult');
    if (!pattern) { showNotification('Enter regex pattern', 'error'); return; }
    try {
        var regex = new RegExp(pattern, flags);
        var matches = text.match(regex);
        if (matches) {
            var highlighted = text.replace(regex, function(m) { return '<span style="background:rgba(240,160,160,0.3);color:#ffb8b8;padding:2px 4px;border-radius:3px">' + m + '</span>'; });
            result.innerHTML = '<div style="margin-bottom:8px;color:var(--green)">Matches: ' + matches.length + '</div><div style="white-space:pre-wrap">' + (highlighted || text) + '</div>';
            showNotification('Found ' + matches.length + ' match(es)', 'success');
        } else {
            result.innerHTML = '<div style="color:var(--text3)">No matches found</div>';
            showNotification('No matches', 'info');
        }
    } catch (e) {
        result.innerHTML = '<div style="color:var(--red)">Invalid regex: ' + e.message + '</div>';
        showNotification('Invalid regex', 'error');
    }
}