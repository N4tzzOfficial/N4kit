document.getElementById('toolContent').innerHTML = `
<div class="lorem-wrapper">
    <div class="lorem-form">
        <div class="lorem-row">
            <div class="lorem-field">
                <label class="lorem-label">Generate</label>
                <input type="number" id="loremCount" class="lorem-input" value="3" min="1" max="50">
            </div>
            <div class="lorem-field">
                <label class="lorem-label">Type</label>
                <select id="loremType" class="lorem-select">
                    <option value="paragraphs">Paragraphs</option>
                    <option value="sentences">Sentences</option>
                    <option value="words">Words</option>
                </select>
            </div>
        </div>
        
        <button class="lorem-generate-btn" onclick="doLorem()">
            <span>📝</span> Generate Lorem Ipsum
        </button>
    </div>
    
    <div class="lorem-result" id="loremResult">
        <div class="lorem-placeholder">
            <span class="lorem-placeholder-icon">📄</span>
            <span>Generated text will appear here</span>
        </div>
    </div>
</div>
`;

var loremStyle = document.createElement('style');
loremStyle.textContent = `
    .lorem-wrapper { max-width: 700px; margin: 0 auto; }
    .lorem-form {
        background: var(--surface2); border: 1px solid var(--border);
        border-radius: 16px; padding: 24px; margin-bottom: 20px;
    }
    .lorem-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    .lorem-field { display: flex; flex-direction: column; gap: 6px; }
    .lorem-label {
        font-size: 11px; font-weight: 600; color: var(--text2);
        text-transform: uppercase; letter-spacing: 0.8px;
    }
    .lorem-input, .lorem-select {
        background: var(--surface3); border: 1px solid var(--border);
        border-radius: 8px; padding: 10px 14px; color: var(--text);
        font-family: 'Geist Mono', monospace; font-size: 14px; outline: none;
    }
    .lorem-input:focus, .lorem-select:focus { border-color: rgba(240,160,160,0.4); }
    .lorem-generate-btn {
        width: 100%; padding: 14px;
        background: linear-gradient(135deg, var(--pink), #d88890);
        color: #060210; border: none; border-radius: 12px;
        font-size: 14px; font-weight: 700; font-family: 'Geist', sans-serif;
        cursor: pointer; transition: all 0.3s;
        display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .lorem-generate-btn:hover {
        background: linear-gradient(135deg, var(--pink-bright), #e89098);
        transform: translateY(-1px); box-shadow: 0 8px 25px rgba(240,160,160,0.3);
    }
    
    .lorem-result {
        background: var(--surface2); border: 1px solid var(--border);
        border-radius: 16px; padding: 24px; min-height: 100px;
        font-size: 14px; line-height: 1.8; color: var(--text2);
        max-height: 500px; overflow-y: auto;
    }
    .lorem-placeholder { text-align: center; color: var(--text3); padding: 20px; }
    .lorem-placeholder-icon { font-size: 32px; display: block; margin-bottom: 8px; }
    .lorem-result p { margin-bottom: 14px; }
    .lorem-result p:last-child { margin-bottom: 0; }
`;
document.head.appendChild(loremStyle);

document.getElementById('infoSection').innerHTML = '<h2>Lorem Ipsum Generator</h2><p>Generate placeholder text for designs and mockups. Choose between paragraphs, sentences, or individual words.</p><ul><li>Classic Lorem Ipsum text</li><li>Customizable quantity</li><li>Multiple formats</li><li>100% client-side</li></ul>';

var loremText = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum';

function doLorem() {
    var count = parseInt(document.getElementById('loremCount').value) || 3;
    var type = document.getElementById('loremType').value;
    var words = loremText.split(' ');
    var result = document.getElementById('loremResult');
    var output = '';
    
    if (type === 'words') {
        var selected = [];
        for (var i = 0; i < count; i++) selected.push(words[Math.floor(Math.random() * words.length)]);
        output = selected.join(' ');
    } else if (type === 'sentences') {
        for (var i = 0; i < count; i++) {
            var len = 8 + Math.floor(Math.random() * 15);
            var sentence = [];
            for (var j = 0; j < len; j++) sentence.push(words[Math.floor(Math.random() * words.length)]);
            output += sentence.join(' ').charAt(0).toUpperCase() + sentence.join(' ').slice(1).toLowerCase() + '. ';
        }
    } else {
        for (var i = 0; i < count; i++) output += '<p>' + loremText + '</p>';
    }
    
    result.innerHTML = output || '<p>Lorem ipsum dolor sit amet...</p>';
    showNotification('✅ Generated ' + count + ' ' + type, 'success');
}

doLorem();