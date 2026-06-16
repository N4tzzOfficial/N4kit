document.getElementById('toolContent').innerHTML=`
<div style="text-align:center;max-width:600px;margin:0 auto">
    <div class="version-tabs" style="display:inline-flex;background:var(--surface3);border-radius:100px;padding:4px;margin-bottom:24px">
        <button class="version-tab active" onclick="sv('v4',this)" style="padding:10px 22px;border-radius:100px;font-size:14px;font-weight:600;cursor:pointer;border:none;background:transparent;color:var(--text2);font-family:'Geist',sans-serif">UUID v4</button>
        <button class="version-tab" onclick="sv('v7',this)" style="padding:10px 22px;border-radius:100px;font-size:14px;font-weight:600;cursor:pointer;border:none;background:transparent;color:var(--text2);font-family:'Geist',sans-serif">UUID v7</button>
    </div>
    <div id="uuidDisp" style="background:var(--surface3);border:1px solid var(--border);border-radius:12px;padding:20px;font-family:'Geist Mono',monospace;font-size:clamp(16px,3vw,22px);color:var(--pink-bright);word-break:break-all;margin-bottom:20px;text-align:center;min-height:60px;display:flex;align-items:center;justify-content:center">Click Generate</div>
    <div class="btn-group" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:20px">
        <button class="btn btn-primary" onclick="gen()">🎲 Generate</button>
        <button class="btn btn-copy" onclick="copyU()">📋 Copy</button>
        <button class="btn" onclick="bulk(5)">5x</button>
        <button class="btn" onclick="bulk(10)">10x</button>
        <button class="btn" onclick="bulk(50)">50x</button>
    </div>
    <div id="histSec" style="text-align:left;display:none"><h4 style="color:var(--text2);font-size:14px;margin-bottom:10px">📜 History</h4><div id="histList" style="display:flex;flex-direction:column;gap:4px;max-height:300px;overflow-y:auto"></div></div>
</div>
`;

document.getElementById('infoSection').innerHTML=`
<h2>📖 How to Use UUID Generator</h2>
<p>Click <strong>Generate</strong> to create a UUID, or use bulk buttons for multiple. <strong>UUID v4</strong> is random, <strong>UUID v7</strong> is time-based (sortable, great for databases).</p>
<h3 style="margin-top:12px;color:var(--pink-bright)">💡 Use Cases</h3>
<ul><li><strong>v4:</strong> Session IDs, filenames, general-purpose</li><li><strong>v7:</strong> Database primary keys, sortable IDs</li></ul>
`;

var cv='v4',hist=[],cu='';
function sv(v,b){cv=v;document.querySelectorAll('.version-tab').forEach(function(t){t.classList.remove('active');t.style.background='transparent';t.style.color='var(--text2)';});b.classList.add('active');b.style.background='var(--pink)';b.style.color='#060210';}
function gv4(){return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c==='x'?r:(r&0x3|0x8);return v.toString(16);});}
function gv7(){var t=Date.now().toString(16).padStart(12,'0');return t.substring(0,8)+'-'+t.substring(8,12)+'-7'+Math.random().toString(16).substring(2,6)+'-8'+Math.random().toString(16).substring(2,6)+'-'+Math.random().toString(16).substring(2,14);}
function gen(){cu=cv==='v7'?gv7():gv4();document.getElementById('uuidDisp').textContent=cu;ah(cu);}
function bulk(n){var uu=[];for(var i=0;i<n;i++){var u=cv==='v7'?gv7():gv4();uu.push(u);ah(u);}document.getElementById('uuidDisp').textContent=uu.join('\n');cu=uu[0];showNotification('✅ Generated '+n+' UUIDs','success');}
function copyU(){if(!cu){showNotification('Generate first','error');return;}navigator.clipboard.writeText(cu).then(function(){showNotification('📋 Copied!','success');});}
function ah(u){hist.unshift({uuid:u,version:cv});if(hist.length>30)hist.pop();rh();}
function rh(){var s=document.getElementById('histSec'),l=document.getElementById('histList');if(hist.length===0){s.style.display='none';return;}s.style.display='block';l.innerHTML=hist.map(function(h){return'<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 14px;background:var(--surface3);border-radius:8px;font-family:Geist Mono,monospace;font-size:11px"><span style="overflow:hidden;text-overflow:ellipsis">'+h.uuid+'</span><span style="font-size:9px;padding:2px 8px;border-radius:100px;background:rgba(240,160,160,0.15);color:var(--pink-bright);margin-left:8px">'+h.version+'</span></div>';}).join('');}
gen();