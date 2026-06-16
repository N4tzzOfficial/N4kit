<?php
/*
 * N4Kit
 * The Open Source Developer Toolkit
 *
 * Copyright (c) 2026 N4tzzOfficial
 * Website: https://n4kit.n4tzzofficial.my.id
 * GitHub: https://github.com/N4tzzOfficial/N4kit
*/
$toolSlug = isset($_GET['tool']) ? $_GET['tool'] : '';
if (empty($toolSlug)) { header('Location: /'); exit; }

$toolsData = json_decode(file_get_contents('../assets/tools.json'), true);
$tool = null;
foreach ($toolsData['tools'] as $t) { if ($t['id'] === $toolSlug) { $tool = $t; break; } }
if (!$tool) { header('Location: /'); exit; }

$siteName = 'N4Kit';
$baseUrl = 'https://n4kit.n4tzzofficial.my.id';
$canonical = $baseUrl . '/tools/' . $tool['id'] . '/';
$pageTitle = $tool['title'] . ' - Free Online ' . $tool['title'] . ' | ' . $siteName;
$pageDesc = $tool['description'] . ' Free online tool, no ads, no login required. Fast and secure.';
$pageKeywords = implode(', ', $tool['tags']) . ', ' . strtolower($tool['title']) . ', free online tool, developer tools, n4kit, n4tzzofficial';
$ogImage = $baseUrl . '/assets/og/' . $tool['id'] . '.png';

$jsFile = '../assets/js/' . $tool['id'] . '.js';
$jsContent = file_exists($jsFile) ? file_get_contents($jsFile) : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta -->
    <title><?php echo htmlspecialchars($pageTitle); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($pageDesc); ?>">
    <meta name="keywords" content="<?php echo htmlspecialchars($pageKeywords); ?>">
    <meta name="author" content="N4tzzOfficial">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <meta name="theme-color" content="#060210">
    <meta name="application-name" content="N4Kit">
    <link rel="canonical" href="<?php echo $canonical; ?>">
    
    <!-- Open Graph -->
    <meta property="og:title" content="<?php echo htmlspecialchars($pageTitle); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($pageDesc); ?>">
    <meta property="og:url" content="<?php echo $canonical; ?>">
    <meta property="og:type" content="website">
    <meta property="og:image" content="<?php echo $ogImage; ?>">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="N4Kit">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($pageTitle); ?>">
    <meta name="twitter:description" content="<?php echo htmlspecialchars($pageDesc); ?>">
    <meta name="twitter:image" content="<?php echo $ogImage; ?>">
    <meta name="twitter:site" content="@N4tzzOfficial">
    
    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": ["WebApplication", "SoftwareApplication"],
        "name": "<?php echo htmlspecialchars($tool['title']); ?> - N4Kit",
        "description": "<?php echo htmlspecialchars($pageDesc); ?>",
        "url": "<?php echo $canonical; ?>",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "N4tzzOfficial", "url": "https://github.com/N4tzzOfficial" },
        "browserRequirements": "Requires JavaScript"
    }
    </script>
    
    <!-- Breadcrumb Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "<?php echo $baseUrl; ?>/" },
            { "@type": "ListItem", "position": 2, "name": "Tools", "item": "<?php echo $baseUrl; ?>/#tools" },
            { "@type": "ListItem", "position": 3, "name": "<?php echo htmlspecialchars($tool['title']); ?>", "item": "<?php echo $canonical; ?>" }
        ]
    }
    </script>
    
    <!-- FAQ Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is this <?php echo htmlspecialchars($tool['title']); ?> free?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100% free. No ads, no login, no hidden costs." }
            },
            {
                "@type": "Question",
                "name": "Is my data secure using this tool?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. All processing happens in your browser. No data is sent to any server." }
            }
        ]
    }
    </script>
    
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23060210'/><text x='16' y='22' text-anchor='middle' font-size='18' font-weight='bold' fill='%23f0a0a0' font-family='sans-serif'>K</text></svg>">
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    
    <style>
        :root{--bg:#060210;--surface:#0a0418;--surface2:#110922;--surface3:#1a0e30;--border:rgba(255,255,255,0.06);--text:#f2effa;--text2:#a89cc4;--text3:#6b5f8a;--pink:#f0a0a0;--pink-bright:#ffb8b8;--green:#6ee7b7;--red:#f87171;--radius:16px;--transition:0.3s}
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:var(--bg);color:var(--text);font-family:'Geist',sans-serif;min-height:100vh;line-height:1.5;-webkit-font-smoothing:antialiased}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.06);border-radius:5px}
        .container{max-width:1400px;margin:0 auto;padding:0 24px}
        
        header{position:sticky;top:0;z-index:100;background:rgba(6,2,16,0.9);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:10px 0}
        header .container{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
        .logo{font-size:20px;font-weight:700;color:var(--text);text-decoration:none;display:flex;align-items:center;gap:8px}
        .logo-icon{width:28px;height:28px;background:linear-gradient(135deg,var(--pink),#a898d0);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#060210;font-weight:900}
        nav{display:flex;gap:8px;flex-wrap:wrap}
        nav a{color:var(--text2);text-decoration:none;font-size:13px;font-weight:500;padding:6px 14px;border-radius:100px;transition:all var(--transition)}
        nav a:hover{color:var(--text);background:var(--surface3)}
        
        main{padding:40px 0 60px}
        
        .breadcrumb{font-size:12px;color:var(--text3);margin-bottom:8px}
        .breadcrumb a{color:var(--text2);text-decoration:none}
        .breadcrumb a:hover{color:var(--pink-bright)}
        
        .tool-header{text-align:center;margin-bottom:28px}
        .tool-header .icon{font-size:48px;margin-bottom:8px}
        .tool-header h1{font-size:clamp(26px,4vw,38px);font-weight:800;margin-bottom:8px;letter-spacing:-0.5px}
        .tool-header p{color:var(--text2);font-size:15px;max-width:600px;margin:0 auto}
        .tool-tags{display:flex;gap:6px;justify-content:center;margin-top:10px;flex-wrap:wrap}
        .tool-tag{font-size:10px;padding:4px 10px;border-radius:100px;background:rgba(240,160,160,0.1);color:var(--pink-bright);text-transform:uppercase;letter-spacing:0.5px;font-weight:600}
        
        .tool-content{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px;min-height:400px}
        
        footer{border-top:1px solid var(--border);padding:24px 0;text-align:center;color:var(--text3);font-size:12px}
        footer a{color:var(--text2);text-decoration:none}
        
        /* Shared tool styles */
        .editor-wrapper{display:grid;grid-template-columns:1fr 1fr;gap:16px;min-height:400px}
        .panel{background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column}
        .panel-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border);flex-wrap:wrap;gap:8px}
        .panel-title{font-size:12px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:0.5px}
        .panel-actions{display:flex;gap:4px;flex-wrap:wrap}
        .btn{padding:6px 12px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;border:1px solid var(--border);background:var(--surface3);color:var(--text);font-family:'Geist',sans-serif;transition:all var(--transition);white-space:nowrap}
        .btn:hover{border-color:rgba(255,255,255,0.14);background:var(--surface2)}
        .btn-primary{background:var(--pink);color:#060210;border:none;font-weight:700}
        .btn-primary:hover{background:var(--pink-bright)}
        .btn-copy{background:rgba(110,231,183,0.1);border-color:rgba(110,231,183,0.2);color:var(--green)}
        textarea{width:100%;flex:1;background:transparent;border:none;color:var(--text);font-family:'Geist Mono',monospace;font-size:13px;padding:16px;resize:none;outline:none;line-height:1.7;min-height:350px}
        textarea::placeholder{color:var(--text3)}
        .output-area{flex:1;padding:16px;font-family:'Geist Mono',monospace;font-size:13px;line-height:1.7;overflow-y:auto;min-height:350px;word-break:break-all}
        .output-area:empty::before{content:'Output...';color:var(--text3)}
        .json-key{color:#ffb8b8}.json-string{color:#6ee7b7}.json-number{color:#a898d0}.json-boolean{color:#ffd54f}.json-null{color:#f87171}
        
        .info-section{margin-top:28px;padding:24px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
        .info-section h2{font-size:18px;font-weight:700;margin-bottom:12px}
        .info-section p,.info-section ul,.info-section ol{color:var(--text2);font-size:13px;line-height:1.7}
        .info-section ul,.info-section ol{padding-left:20px}
        
        .notification{position:fixed;top:16px;right:16px;z-index:9999;display:flex;flex-direction:column;gap:6px}
        .notif-item{padding:12px 18px;border-radius:12px;font-size:13px;font-weight:500;animation:slideIn 0.3s ease;min-width:250px;box-shadow:0 8px 30px rgba(0,0,0,0.5)}
        .notif-item.success{background:#0a2e1a;border:1px solid rgba(110,231,183,0.4);color:var(--green)}
        .notif-item.error{background:#2e0a0a;border:1px solid rgba(248,113,113,0.4);color:var(--red)}
        .notif-item.info{background:var(--surface3);border:1px solid rgba(240,160,160,0.3);color:var(--pink-bright)}
        @keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        
        @media(max-width:768px){
            .editor-wrapper{grid-template-columns:1fr}
            .notification{left:12px;right:12px}
            .notif-item{min-width:auto}
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <a href="/" class="logo" aria-label="N4Kit Home">
                <div class="logo-icon">K</div>N4Kit
            </a>
            <nav aria-label="Main navigation">
                <a href="/#tools">All Tools</a>
                <a href="/snippets/">Snippets</a>
                <a href="/">← Back</a>
            </nav>
        </div>
    </header>
    
    <main class="container" role="main">
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a> / <a href="/#tools">Tools</a> / <?php echo htmlspecialchars($tool['title']); ?>
        </nav>
        
        <div class="tool-header">
            <div class="icon"><?php echo htmlspecialchars($tool['icon']); ?></div>
            <h1><?php echo htmlspecialchars($tool['title']); ?></h1>
            <p><?php echo htmlspecialchars($tool['description']); ?></p>
            <div class="tool-tags">
                <?php foreach ($tool['tags'] as $tag): ?>
                    <span class="tool-tag"><?php echo htmlspecialchars($tag); ?></span>
                <?php endforeach; ?>
            </div>
        </div>
        
        <div class="tool-content" id="toolContent">
            <p style="color:var(--text3);text-align:center">Loading tool...</p>
        </div>
        
        <div class="info-section" id="infoSection"></div>
    </main>
    
    <footer>
        <div class="container">
            <p>Built with ❤️ by <a href="https://github.com/N4tzzOfficial" target="_blank" rel="noopener noreferrer">N4tzzOfficial</a> · <a href="https://n4tzzofficial.my.id" target="_blank" rel="noopener noreferrer">N4tzzNetwork</a> · MIT License · No Ads · No Tracking</p>
        </div>
    </footer>
    
    <div class="notification" id="notification" aria-live="polite"></div>
    
    <script>
        function showNotification(msg, type) {
            var c = document.getElementById('notification');
            var n = document.createElement('div');
            n.className = 'notif-item ' + (type || 'info');
            n.textContent = msg;
            c.appendChild(n);
            setTimeout(function() { n.style.opacity = '0'; n.style.transition = 'opacity 0.3s'; setTimeout(function() { n.remove(); }, 300); }, 3000);
        }
    </script>
    
    <?php if ($jsContent): ?>
    <script><?php echo $jsContent; ?></script>
    <?php else: ?>
    <script>document.getElementById('toolContent').innerHTML='<p style="color:var(--red);text-align:center">❌ Tool not available</p>';</script>
    <?php endif; ?>
</body>
</html>