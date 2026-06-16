document.getElementById('toolContent').innerHTML=`
<div class="input-row" style="display:flex;gap:8px;margin-bottom:16px">
    <input type="text" id="jwtInput" placeholder="Paste JWT token here..." style="flex:1;background:var(--surface3);border:1px solid var(--border);border-radius:100px;padding:12px 18px;color:var(--text);font-family:'Geist Mono',monospace;font-size:13px;outline:none">
    <button class="btn btn-primary" onclick="decodeJWT()">Decode</button>
    <button class="btn" onclick="loadSample()">Sample</button>
</div>
<div class="editor-wrapper">
    <div class="panel"><div class="panel-header"><span class="panel-title">📋 Header</span></div><div class="output-area" id="headerOut"></div></div>
    <div class="panel"><div class="panel-header"><span class="panel-title">📦 Payload</span></div><div class="output-area" id="payloadOut"></div></div>
</div>
<div id="claimsOut" style="margin-top:16px"></div>
`;

document.getElementById('infoSection').innerHTML=`
<h2>📖 How to Use JWT Decoder</h2>
<p>Paste your JWT token and click <strong>Decode</strong> to see the header, payload, and claims. All decoding happens in your browser — your tokens never leave your device.</p>
<h3 style="margin-top:12px;color:var(--pink-bright)">✨ Features</h3>
<ul><li>Decode JWT header & payload</li><li>Check token expiration</li><li>View all claims (sub, iss, aud, etc)</li><li>100% client-side</li></ul>
`;

function b64d(s){s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';return decodeURIComponent(escape(atob(s)));}
function sj(o){var j=JSON.stringify(o,null,2);return j.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(m){var c='json-number';if(/^"/.test(m))c=/:$/.test(m)?'json-key':'json-string';else if(/true|false/.test(m))c='json-boolean';else if(/null/.test(m))c='json-null';return'<span class="'+c+'">'+m+'</span>';});}
function decodeJWT(){
    var j=document.getElementById('jwtInput').value.trim();
    var ho=document.getElementById('headerOut');
    var po=document.getElementById('payloadOut');
    var co=document.getElementById('claimsOut');
    if(!j){showNotification('Please enter a JWT token','error');return}
    try{
        var p=j.split('.');if(p.length!==3)throw new Error('Invalid JWT format');
        var h=JSON.parse(b64d(p[0])),pl=JSON.parse(b64d(p[1]));
        ho.innerHTML='<pre style="margin:0">'+sj(h)+'</pre>';
        po.innerHTML='<pre style="margin:0">'+sj(pl)+'</pre>';
        var html='';
        if(pl.iat)html+='<div style="display:flex;justify-content:space-between;padding:10px 16px;background:var(--surface3);border-radius:8px;margin-bottom:6px;font-size:12px"><span style="color:var(--text2)">Issued At</span><span>'+new Date(pl.iat*1000).toLocaleString()+'</span></div>';
        if(pl.exp){var ex=new Date(pl.exp*1000),isEx=Date.now()>pl.exp*1000;html+='<div style="display:flex;justify-content:space-between;padding:10px 16px;background:var(--surface3);border-radius:8px;margin-bottom:6px;font-size:12px"><span style="color:var(--text2)">Expiration</span><span style="color:'+(isEx?'var(--red)':'var(--green)')+'">'+ex.toLocaleString()+(isEx?' ⚠️ EXPIRED':' ✅ Valid')+'</span></div>';}
        if(pl.sub)html+='<div style="display:flex;justify-content:space-between;padding:10px 16px;background:var(--surface3);border-radius:8px;margin-bottom:6px;font-size:12px"><span style="color:var(--text2)">Subject</span><span>'+pl.sub+'</span></div>';
        if(pl.iss)html+='<div style="display:flex;justify-content:space-between;padding:10px 16px;background:var(--surface3);border-radius:8px;margin-bottom:6px;font-size:12px"><span style="color:var(--text2)">Issuer</span><span>'+pl.iss+'</span></div>';
        co.innerHTML=html;
        showNotification('✅ JWT decoded successfully','success');
    }catch(e){ho.innerHTML='';po.innerHTML='';co.innerHTML='';showNotification('❌ '+e.message,'error');}
}
function loadSample(){var h=btoa(JSON.stringify({alg:'HS256',typ:'JWT'})),p=btoa(JSON.stringify({sub:'1234567890',name:'N4tzz',iat:Math.floor(Date.now()/1000)-3600,exp:Math.floor(Date.now()/1000)+7200,iss:'n4kit.n4tzzofficial.my.id'}));document.getElementById('jwtInput').value=h+'.'+p+'.signature';decodeJWT();showNotification('📦 Sample loaded','info');}