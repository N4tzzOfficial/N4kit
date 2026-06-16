document.getElementById('toolContent').innerHTML = `
<div style="max-width:600px;margin:0 auto">
    <div style="display:flex;gap:8px;margin-bottom:20px">
        <input type="text" id="colorInput" placeholder="#FF9A8B" value="#FF9A8B" style="flex:1;background:var(--surface3);border:1px solid var(--border);border-radius:10px;padding:14px;color:var(--text);font-family:'Geist Mono',monospace;font-size:14px;outline:none">
        <input type="color" id="colorPicker" value="#FF9A8B" style="width:50px;height:50px;border:none;cursor:pointer;border-radius:10px" onchange="syncColor(this.value)">
    </div>
    <div class="color-preview" id="colorPreview" style="width:100%;height:150px;border-radius:12px;margin-bottom:20px;background:#FF9A8B"></div>
    <div id="colorValues" style="display:flex;flex-direction:column;gap:8px"></div>
</div>
`;

document.getElementById('infoSection').innerHTML = '<h2>Color Converter</h2><p>Convert colors between HEX, RGB, HSL formats. Use the color picker or type a hex code. Real-time preview.</p><ul><li>HEX to RGB</li><li>HEX to HSL</li><li>Color picker</li><li>Live preview</li></ul>';

function syncColor(hex) { document.getElementById('colorInput').value = hex; convertColor(); }
function hexToRgb(hex) { var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16); return { r: r, g: g, b: b }; }
function rgbToHsl(r, g, b) { r /= 255; g /= 255; b /= 255; var max = Math.max(r, g, b), min = Math.min(r, g, b); var h, s, l = (max + min) / 2; if (max === min) { h = s = 0; } else { var d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; case b: h = ((r - g) / d + 4) / 6; break; } } return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }; }

function convertColor() {
    var hex = document.getElementById('colorInput').value.trim();
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) { showNotification('Enter valid HEX (#RRGGBB)', 'error'); return; }
    document.getElementById('colorPicker').value = hex;
    document.getElementById('colorPreview').style.background = hex;
    var rgb = hexToRgb(hex);
    var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    document.getElementById('colorValues').innerHTML = `
        <div style="display:flex;justify-content:space-between;padding:12px;background:var(--surface3);border-radius:8px;font-family:'Geist Mono',monospace;font-size:13px"><span style="color:var(--text2)">HEX</span><span style="color:var(--green)">${hex}</span></div>
        <div style="display:flex;justify-content:space-between;padding:12px;background:var(--surface3);border-radius:8px;font-family:'Geist Mono',monospace;font-size:13px"><span style="color:var(--text2)">RGB</span><span style="color:var(--green)">rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</span></div>
        <div style="display:flex;justify-content:space-between;padding:12px;background:var(--surface3);border-radius:8px;font-family:'Geist Mono',monospace;font-size:13px"><span style="color:var(--text2)">HSL</span><span style="color:var(--green)">hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</span></div>
    `;
    showNotification('Converted', 'success');
}

document.getElementById('colorInput').addEventListener('input', convertColor);
convertColor();