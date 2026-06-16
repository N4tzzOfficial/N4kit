document.getElementById('toolContent').innerHTML = `
<div class="ip-wrapper">
    <div class="ip-form">
        <label class="ip-label">IP Address</label>
        <div class="ip-input-row">
            <input type="text" id="ipInput" class="ip-input" placeholder="Enter IP or leave empty for your IP...">
            <button class="ip-lookup-btn" onclick="doLookup()">
                <span>🔍</span> Lookup
            </button>
        </div>
    </div>
    
    <div class="ip-result" id="ipResult">
        <div class="ip-placeholder">
            <span class="ip-placeholder-icon">🌍</span>
            <span>Click Lookup to see IP information</span>
        </div>
    </div>
</div>
`;

var ipStyle = document.createElement('style');
ipStyle.textContent = `
    .ip-wrapper { max-width: 600px; margin: 0 auto; }
    .ip-form {
        background: var(--surface2); border: 1px solid var(--border);
        border-radius: 16px; padding: 24px; margin-bottom: 20px;
    }
    .ip-label {
        font-size: 11px; font-weight: 600; color: var(--text2);
        text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 8px;
    }
    .ip-input-row { display: flex; gap: 8px; }
    .ip-input {
        flex: 1; background: var(--surface3); border: 1px solid var(--border);
        border-radius: 10px; padding: 12px 16px; color: var(--text);
        font-family: 'Geist Mono', monospace; font-size: 14px; outline: none;
    }
    .ip-input:focus { border-color: rgba(240,160,160,0.4); }
    .ip-input::placeholder { color: var(--text3); }
    .ip-lookup-btn {
        padding: 12px 20px; background: var(--pink); color: #060210;
        border: none; border-radius: 10px; font-size: 14px; font-weight: 700;
        font-family: 'Geist', sans-serif; cursor: pointer; transition: all 0.3s;
        display: flex; align-items: center; gap: 6px; white-space: nowrap;
    }
    .ip-lookup-btn:hover { background: var(--pink-bright); transform: translateY(-1px); }
    
    .ip-result { min-height: 100px; }
    .ip-placeholder {
        text-align: center; padding: 40px; color: var(--text3); font-size: 13px;
        background: var(--surface2); border: 1px dashed var(--border); border-radius: 12px;
    }
    .ip-placeholder-icon { font-size: 32px; display: block; margin-bottom: 8px; }
    
    .ip-result-card {
        background: var(--surface2); border: 1px solid var(--border);
        border-radius: 16px; padding: 24px; animation: ipSlideIn 0.3s ease;
    }
    .ip-result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
    .ip-result-item { }
    .ip-result-item-label { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
    .ip-result-item-value { font-size: 14px; color: var(--text); font-weight: 600; }
    .ip-result-item-value.mono { font-family: 'Geist Mono', monospace; color: var(--green); font-size: 16px; }
    
    .ip-action-row {
        padding-top: 14px; border-top: 1px solid var(--border);
        display: flex; gap: 8px;
    }
    .ip-copy-btn {
        padding: 8px 16px; background: rgba(110,231,183,0.1);
        border: 1px solid rgba(110,231,183,0.2); color: var(--green);
        border-radius: 8px; font-size: 12px; font-weight: 600;
        font-family: 'Geist', sans-serif; cursor: pointer; transition: all 0.2s;
        display: inline-flex; align-items: center; gap: 6px;
    }
    .ip-copy-btn:hover { background: rgba(110,231,183,0.18); }
    .ip-refresh-btn {
        padding: 8px 16px; background: var(--surface3);
        border: 1px solid var(--border); color: var(--text2);
        border-radius: 8px; font-size: 12px; font-weight: 600;
        font-family: 'Geist', sans-serif; cursor: pointer; transition: all 0.2s;
        display: inline-flex; align-items: center; gap: 6px;
    }
    .ip-refresh-btn:hover { border-color: var(--border-hover); }
    
    @keyframes ipSlideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 500px) { .ip-result-grid { grid-template-columns: 1fr; } }
`;
document.head.appendChild(ipStyle);

document.getElementById('infoSection').innerHTML = `
<h2>IP Lookup</h2>
<p>Lookup IP address information including location, ISP, and network details. Uses our secure backend.</p>
<ul><li>IP geolocation & ISP info</li><li>Country, city, region, timezone</li><li>No rate limits</li></ul>
`;

function doLookup() {
    var ip = document.getElementById('ipInput').value.trim();
    var result = document.getElementById('ipResult');
    result.innerHTML = '<div class="ip-placeholder"><span class="ip-placeholder-icon">⏳</span><span>Looking up...</span></div>';
    
    var url = 'https://n4kit.n4tzzofficial.my.id/api/ip-lookup.php';
    if (ip) url += '?ip=' + encodeURIComponent(ip);
    
    fetch(url)
        .then(function(r) { return r.json(); })
        .then(function(d) {
            if (d.error) { result.innerHTML = '<div class="ip-placeholder"><span class="ip-placeholder-icon">❌</span><span>' + d.error + '</span></div>'; return; }
            result.innerHTML = `
                <div class="ip-result-card">
                    <div class="ip-result-grid">
                        <div class="ip-result-item">
                            <div class="ip-result-item-label">IP Address</div>
                            <div class="ip-result-item-value mono">${d.ip}</div>
                        </div>
                        <div class="ip-result-item">
                            <div class="ip-result-item-label">ISP / Org</div>
                            <div class="ip-result-item-value">${d.isp}</div>
                        </div>
                        <div class="ip-result-item">
                            <div class="ip-result-item-label">Country</div>
                            <div class="ip-result-item-value">${d.country}</div>
                        </div>
                        <div class="ip-result-item">
                            <div class="ip-result-item-label">City / Region</div>
                            <div class="ip-result-item-value">${d.city}, ${d.region}</div>
                        </div>
                        <div class="ip-result-item">
                            <div class="ip-result-item-label">Timezone</div>
                            <div class="ip-result-item-value">${d.timezone}</div>
                        </div>
                        <div class="ip-result-item">
                            <div class="ip-result-item-label">Coordinates</div>
                            <div class="ip-result-item-value mono" style="font-size:12px">${d.lat}, ${d.lon}</div>
                        </div>
                    </div>
                    <div class="ip-action-row">
                        <button class="ip-copy-btn" onclick="copyIP('${d.ip}')">📋 Copy IP</button>
                        <button class="ip-refresh-btn" onclick="doLookup()">🔄 Refresh</button>
                    </div>
                </div>
            `;
            showNotification('✅ IP Lookup complete', 'success');
        })
        .catch(function() {
            result.innerHTML = '<div class="ip-placeholder"><span class="ip-placeholder-icon">❌</span><span>Failed. Make sure api/ip-lookup.php exists.</span></div>';
            showNotification('Lookup failed', 'error');
        });
}

function copyIP(ip) {
    navigator.clipboard.writeText(ip).then(function() {
        showNotification('📋 IP copied!', 'success');
    });
}