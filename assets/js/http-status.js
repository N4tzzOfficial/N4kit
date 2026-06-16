document.getElementById('toolContent').innerHTML = `
<div style="max-width:700px;margin:0 auto">
    <div style="display:flex;gap:8px;margin-bottom:20px">
        <input type="text" id="statusSearch" placeholder="Search by code or description..." style="flex:1;background:var(--surface3);border:1px solid var(--border);border-radius:100px;padding:14px 18px;color:var(--text);font-size:14px;outline:none" oninput="filterStatus()">
    </div>
    <div id="statusList" style="display:flex;flex-direction:column;gap:6px;max-height:600px;overflow-y:auto"></div>
</div>
`;

document.getElementById('infoSection').innerHTML = '<h2>HTTP Status Reference</h2><p>Complete reference of all HTTP status codes with descriptions. Search by code number or description.</p><ul><li>All HTTP status codes (1xx-5xx)</li><li>Searchable</li><li>Color-coded by category</li></ul>';

var httpCodes = [
    {code:100,text:'Continue',cat:'1xx'},{code:101,text:'Switching Protocols',cat:'1xx'},{code:200,text:'OK',cat:'2xx'},{code:201,text:'Created',cat:'2xx'},{code:204,text:'No Content',cat:'2xx'},{code:301,text:'Moved Permanently',cat:'3xx'},{code:302,text:'Found',cat:'3xx'},{code:304,text:'Not Modified',cat:'3xx'},{code:400,text:'Bad Request',cat:'4xx'},{code:401,text:'Unauthorized',cat:'4xx'},{code:403,text:'Forbidden',cat:'4xx'},{code:404,text:'Not Found',cat:'4xx'},{code:405,text:'Method Not Allowed',cat:'4xx'},{code:429,text:'Too Many Requests',cat:'4xx'},{code:500,text:'Internal Server Error',cat:'5xx'},{code:502,text:'Bad Gateway',cat:'5xx'},{code:503,text:'Service Unavailable',cat:'5xx'}
];

function renderStatus(filter) {
    var list = document.getElementById('statusList');
    var filtered = httpCodes;
    if (filter) {
        var q = filter.toLowerCase();
        filtered = httpCodes.filter(function(c) { return c.code.toString().includes(q) || c.text.toLowerCase().includes(q); });
    }
    var colors = {'1xx':'#81c7f5','2xx':'#6ee7b7','3xx':'#ffd54f','4xx':'#ffb8b8','5xx':'#f87171'};
    list.innerHTML = filtered.map(function(c) {
        return '<div style="display:flex;align-items:center;gap:12px;padding:10px 16px;background:var(--surface3);border-radius:8px"><span style="font-family:Geist Mono,monospace;font-weight:700;color:'+colors[c.cat]+';min-width:50px">'+c.code+'</span><span style="flex:1">'+c.text+'</span><span style="font-size:10px;color:var(--text3)">'+c.cat+'</span></div>';
    }).join('');
}

function filterStatus() { renderStatus(document.getElementById('statusSearch').value); }
renderStatus();