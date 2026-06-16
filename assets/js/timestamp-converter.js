document.getElementById('toolContent').innerHTML=`
<div style="max-width:600px;margin:0 auto">
    <div style="margin-bottom:20px">
        <label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:6px">Unix Timestamp → Date</label>
        <div style="display:flex;gap:8px"><input type="number" id="tsInput" placeholder="e.g. 1700000000" style="flex:1;background:var(--surface3);border:1px solid var(--border);border-radius:10px;padding:12px;color:var(--text);font-family:'Geist Mono',monospace;font-size:13px;outline:none"><button class="btn btn-primary" onclick="tsToDate()">Convert</button></div>
        <div id="tsResult" style="margin-top:10px;padding:14px;background:var(--surface3);border-radius:10px;font-family:'Geist Mono',monospace;font-size:13px;color:var(--green);min-height:40px"></div>
    </div>
    <div style="border-top:1px solid var(--border);padding-top:20px">
        <label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:6px">Date → Unix Timestamp</label>
        <div style="display:flex;gap:8px"><input type="datetime-local" id="dtInput" style="flex:1;background:var(--surface3);border:1px solid var(--border);border-radius:10px;padding:12px;color:var(--text);font-family:'Geist Mono',monospace;font-size:13px;outline:none"><button class="btn btn-primary" onclick="dateToTs()">Convert</button></div>
        <div id="dtResult" style="margin-top:10px;padding:14px;background:var(--surface3);border-radius:10px;font-family:'Geist Mono',monospace;font-size:13px;color:var(--green);min-height:40px"></div>
    </div>
    <div style="text-align:center;margin-top:16px;font-size:12px;color:var(--text3)">Current: <span id="currentTs" style="color:var(--pink-bright);cursor:pointer" onclick="document.getElementById('tsInput').value=Math.floor(Date.now()/1000);tsToDate()"></span></div>
</div>
`;

document.getElementById('infoSection').innerHTML='<h2>📖 How to Use</h2><p>Convert Unix timestamps to human dates and vice versa. Click the current timestamp to use it.</p><ul><li>✅ Unix → Date</li><li>✅ Date → Unix</li><li>✅ Shows current timestamp</li></ul>';

function tsToDate(){var v=document.getElementById('tsInput').value;if(!v){showNotification('Enter timestamp','error');return}var d=new Date(parseInt(v)*1000);document.getElementById('tsResult').innerHTML='<strong>UTC:</strong> '+d.toUTCString()+'<br><strong>Local:</strong> '+d.toLocaleString()+'<br><strong>ISO:</strong> '+d.toISOString();showNotification('✅ Converted','success');}
function dateToTs(){var v=document.getElementById('dtInput').value;if(!v){showNotification('Select date','error');return}var ts=Math.floor(new Date(v).getTime()/1000);document.getElementById('dtResult').textContent=ts;showNotification('✅ Converted','success');}
setInterval(function(){document.getElementById('currentTs').textContent=Math.floor(Date.now()/1000);},1000);