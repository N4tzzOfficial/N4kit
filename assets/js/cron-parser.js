document.getElementById('toolContent').innerHTML = `
<div style="max-width:600px;margin:0 auto">
    <div style="display:flex;gap:8px;margin-bottom:20px">
        <input type="text" id="cronInput" placeholder="* * * * *" style="flex:1;background:var(--surface3);border:1px solid var(--border);border-radius:10px;padding:14px;color:var(--text);font-family:'Geist Mono',monospace;font-size:14px;outline:none">
        <button class="btn btn-primary" onclick="parseCron()" style="padding:14px 24px;font-size:14px">Parse</button>
    </div>
    <div id="cronResult" style="padding:16px;background:var(--surface2);border:1px solid var(--border);border-radius:12px;min-height:60px;font-family:'Geist Mono',monospace;font-size:13px;line-height:1.8"></div>
    <div style="margin-top:20px;display:flex;flex-wrap:wrap;gap:8px">
        <span style="color:var(--text3);font-size:12px">Examples:</span>
        <button class="btn" onclick="setCron('* * * * *')">Every min</button>
        <button class="btn" onclick="setCron('0 * * * *')">Hourly</button>
        <button class="btn" onclick="setCron('0 0 * * *')">Daily</button>
        <button class="btn" onclick="setCron('0 0 * * 0')">Weekly</button>
        <button class="btn" onclick="setCron('0 0 1 * *')">Monthly</button>
    </div>
</div>
`;

document.getElementById('infoSection').innerHTML = '<h2>Cron Expression Parser</h2><p>Parse and understand cron expressions in human-readable language. See what each field means and when the job will run.</p><ul><li>Parse standard cron syntax</li><li>Human-readable explanation</li><li>Quick example buttons</li><li>100% client-side</li></ul>';

function setCron(v) { document.getElementById('cronInput').value = v; parseCron(); }

function parseCron() {
    var v = document.getElementById('cronInput').value.trim();
    var result = document.getElementById('cronResult');
    var parts = v.split(/\s+/);
    if (parts.length !== 5) { result.innerHTML = '<span style="color:var(--red)">Invalid cron: need 5 fields (minute hour day month weekday)</span>'; return; }
    var fields = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week'];
    var html = '';
    for (var i = 0; i < 5; i++) {
        var desc = '';
        if (parts[i] === '*') desc = 'every';
        else if (parts[i].includes('/')) desc = 'every ' + parts[i].split('/')[1] + ' starting at ' + parts[i].split('/')[0];
        else if (parts[i].includes('-')) desc = 'from ' + parts[i].split('-')[0] + ' to ' + parts[i].split('-')[1];
        else if (parts[i].includes(',')) desc = 'at ' + parts[i];
        else desc = 'at ' + parts[i];
        html += '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)"><span style="color:var(--text2)">' + fields[i] + '</span><span style="color:var(--green)">' + desc + '</span></div>';
    }
    html += '<div style="margin-top:12px;color:var(--pink-bright)">Summary: Runs ' + parts[0] + ' ' + parts[1] + ' ' + parts[2] + ' ' + parts[3] + ' ' + parts[4] + '</div>';
    result.innerHTML = html;
    showNotification('Parsed', 'success');
}