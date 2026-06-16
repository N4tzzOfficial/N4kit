document.getElementById('toolContent').innerHTML=`
<div class="editor-wrapper">
    <div class="panel"><div class="panel-header"><span class="panel-title">📥 Input</span><div class="panel-actions"><button class="btn" onclick="loadSample()">Sample</button><button class="btn" onclick="clearAll()">Clear</button></div></div><textarea id="mainInput" placeholder="Enter text..."></textarea></div>
    <div class="panel"><div class="panel-header"><span class="panel-title">📤 Output</span><div class="panel-actions"><button class="btn btn-primary" onclick="encode()">Encode</button><button class="btn" onclick="decode()">Decode</button><button class="btn btn-copy" onclick="copyOut()">📋 Copy</button></div></div><div class="output-area" id="mainOutput"></div></div>
</div>
`;

document.getElementById('infoSection').innerHTML=`
<h2>📖 How to Use Base64 Encoder/Decoder</h2>
<p>Enter text and click <strong>Encode</strong> to convert to Base64, or paste Base64 and click <strong>Decode</strong> to convert back. Supports Unicode text.</p>
<ul><li>✅ Encode text to Base64</li><li>✅ Decode Base64 to text</li><li>✅ Supports Unicode/UTF-8</li><li>✅ 100% client-side</li></ul>
`;

function encode(){var v=document.getElementById('mainInput').value;if(!v){showNotification('Enter text','error');return}try{var e=btoa(unescape(encodeURIComponent(v)));document.getElementById('mainOutput').textContent=e;showNotification('✅ Encoded','success');}catch(e){showNotification('❌ '+e.message,'error');}}
function decode(){var v=document.getElementById('mainInput').value.trim();if(!v){showNotification('Enter Base64 text','error');return}try{var d=decodeURIComponent(escape(atob(v)));document.getElementById('mainOutput').textContent=d;showNotification('✅ Decoded','success');}catch(e){showNotification('❌ Invalid Base64','error');}}
function copyOut(){var t=document.getElementById('mainOutput').textContent;if(!t){showNotification('Nothing to copy','error');return}navigator.clipboard.writeText(t).then(function(){showNotification('📋 Copied!','success');});}
function loadSample(){document.getElementById('mainInput').value='Hello N4Kit! 🚀';encode();showNotification('📦 Sample loaded','info');}
function clearAll(){document.getElementById('mainInput').value='';document.getElementById('mainOutput').textContent='';document.getElementById('mainInput').focus();showNotification('🗑 Cleared','info');}