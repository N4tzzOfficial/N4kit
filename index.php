<?php
/*
 * N4Kit
 * The Open Source Developer Toolkit
 *
 * Copyright (c) 2026 N4tzzOfficial
 * Website: https://n4kit.n4tzzofficial.my.id
 * GitHub: https://github.com/N4tzzOfficial/N4kit
*/
$toolsData = json_decode(file_get_contents('./assets/tools.json'), true);
$tools = $toolsData['tools'];
$categories = $toolsData['categories'];
$snippets = $toolsData['snippets'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>N4Kit — Developer Toolkit | Free Open Source Tools</title>
    <meta name="description" content="N4Kit is a free, open-source developer toolkit with <?php echo count($tools); ?>+ tools. JSON Formatter, JWT Decoder, UUID Generator, and more. No ads, no login.">
    <meta name="keywords" content="developer tools, json formatter, jwt decoder, uuid generator, free online tools, n4kit, n4tzzofficial">
    <meta name="theme-color" content="#060210">
    <meta property="og:title" content="N4Kit — Developer Toolkit">
    <meta property="og:description" content="Free, open-source developer tools. No ads, no login.">
    <meta property="og:url" content="https://n4kit.n4tzzofficial.my.id">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="https://avatars.githubusercontent.com/u/181945053" type="image/png">
    
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
    
    <style>
        :root {
            --bg: #060210;
            --surface: rgba(255,255,255,0.02);
            --surface2: rgba(255,255,255,0.04);
            --surface3: rgba(255,255,255,0.06);
            --border: rgba(255,255,255,0.06);
            --border-hover: rgba(255,255,255,0.14);
            --text: #f2effa;
            --text2: #a89cc4;
            --text3: #6b5f8a;
            --pink: #f0a0a0;
            --pink-bright: #ffb8b8;
            --pink-dim: rgba(240,160,160,0.08);
            --pink-glow: rgba(240,160,160,0.25);
            --purple: #a898d0;
            --green: #6ee7b7;
            --radius: 18px;
            --radius-sm: 12px;
            --radius-lg: 28px;
            --transition: 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body {
            background:var(--bg); color:var(--text);
            font-family:'Geist',sans-serif; -webkit-font-smoothing:antialiased;
            line-height:1.5; overflow-x:hidden;
        }
        ::selection { background:var(--pink-dim); color:var(--pink-bright); }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.06); border-radius:5px; }
        ::-webkit-scrollbar-thumb:hover { background:rgba(255,255,255,0.12); }

        .noise {
            position:fixed; inset:0; z-index:0; pointer-events:none; opacity:0.025;
            background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            background-size:200px;
        }

        #particles { position:fixed; inset:0; z-index:0; pointer-events:none; }

        .glow-orb {
            position:fixed; border-radius:50%; filter:blur(140px);
            pointer-events:none; z-index:0; opacity:0.2;
        }
        .glow-1 { width:700px; height:700px; background:var(--pink); top:-250px; right:-150px; animation:orbFloat1 15s ease-in-out infinite; }
        .glow-2 { width:550px; height:550px; background:var(--purple); bottom:-200px; left:-100px; animation:orbFloat2 20s ease-in-out infinite; }
        .glow-3 { width:400px; height:400px; background:#3d2a6e; top:60%; left:60%; animation:orbFloat3 18s ease-in-out infinite; opacity:0.15; }
        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0)scale(1)} 33%{transform:translate(70px,-50px)scale(1.15)} 66%{transform:translate(-40px,40px)scale(0.9)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)scale(1)} 33%{transform:translate(-60px,30px)scale(1.1)} 66%{transform:translate(50px,-20px)scale(0.85)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0)scale(1)} 50%{transform:translate(-50px,-40px)scale(1.2)} }

        .loader {
            position:fixed; inset:0; z-index:10000; background:var(--bg);
            display:flex; align-items:center; justify-content:center;
            transition:opacity 0.6s ease,visibility 0.6s ease;
        }
        .loader.hidden { opacity:0; visibility:hidden; pointer-events:none; }
        .loader-inner { text-align:center; }
        .loader-logo {
            font-size:80px; font-weight:900; letter-spacing:-3px;
            background:linear-gradient(135deg,var(--pink-bright),var(--purple));
            -webkit-background-clip:text; -webkit-text-fill-color:transparent;
            animation:loaderPulse 1.5s ease-in-out infinite;
        }
        .loader-bar {
            width:180px; height:3px; background:rgba(255,255,255,0.06);
            border-radius:3px; margin:16px auto 0; overflow:hidden;
        }
        .loader-bar-fill {
            width:0%; height:100%; background:linear-gradient(90deg,var(--pink),var(--purple));
            border-radius:3px; animation:loaderFill 1s ease-out 0.2s forwards;
        }
        @keyframes loaderPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.94)} }
        @keyframes loaderFill { to{width:100%} }

        .container { max-width:1280px; margin:0 auto; padding:0 28px; position:relative; z-index:2; }

        .navbar-wrap {
            position:fixed;
            top:20px;
            left:50%;
            transform:translateX(-50%);
            z-index:1000;
            width:auto;
            transition:all 0.8s cubic-bezier(0.22,1,0.36,1);
            will-change:transform, top, width;
        }

        .navbar {
            position:relative;
            background:rgba(10,4,24,0.55);
            backdrop-filter:blur(30px) saturate(180%);
            -webkit-backdrop-filter:blur(30px) saturate(180%);
            border:1px solid rgba(255,255,255,0.08);
            border-radius:999px;
            padding:8px 12px;
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:12px;
            box-shadow:0 8px 32px rgba(0,0,0,0.4);
            transition:all 0.8s cubic-bezier(0.22,1,0.36,1);
            overflow:hidden;
            white-space:nowrap;
            min-height:56px;
        }

        .navbar::before {
            content:"";
            position:absolute;
            inset:0;
            border-radius:inherit;
            background:radial-gradient(circle at center, rgba(240,160,160,0.08), transparent 70%);
            opacity:0;
            transition:opacity 0.8s ease;
            pointer-events:none;
        }

        .navbar-wrap.expanded {
            top:16px;
            width:calc(100% - 40px);
            max-width:720px;
        }

        .navbar-wrap.expanded .navbar {
            background:rgba(10,4,24,0.78);
            backdrop-filter:blur(40px) saturate(220%);
            -webkit-backdrop-filter:blur(40px) saturate(220%);
            border-color:rgba(255,255,255,0.12);
            box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(240,160,160,0.06);
            padding:10px 20px;
            min-height:64px;
        }

        .navbar-wrap.expanded .navbar::before {
            opacity:1;
        }

        .nav-brand {
            display:flex;
            align-items:center;
            gap:10px;
            text-decoration:none;
            color:var(--text);
            font-weight:700;
            font-size:18px;
            letter-spacing:-0.5px;
            transition:all 0.8s cubic-bezier(0.22,1,0.36,1);
        }

        .nav-logo {
            width:38px;
            height:38px;
            border-radius:50%;
            transition:all 0.8s cubic-bezier(0.22,1,0.36,1);
            border:2px solid rgba(255,255,255,0.06);
            flex-shrink:0;
        }

        .navbar-wrap.expanded .nav-logo {
            width:42px;
            height:42px;
            border-color:rgba(255,255,255,0.12);
        }

        .nav-brand-text {
            transition:all 0.8s cubic-bezier(0.22,1,0.36,1);
            font-size:18px;
        }

        .navbar-wrap.expanded .nav-brand-text {
            font-size:20px;
            letter-spacing:-0.3px;
        }

        .nav-links {
            display:flex;
            align-items:center;
            gap:6px;
        }

        .nav-link {
            color:var(--text2);
            text-decoration:none;
            font-size:14px;
            font-weight:500;
            padding:8px 16px;
            border-radius:999px;
            transition:all 0.3s ease;
            position:relative;
        }

        .nav-link:hover {
            color:var(--text);
            background:rgba(255,255,255,0.04);
        }

        .nav-link::after {
            content:'';
            position:absolute;
            bottom:4px;
            left:50%;
            transform:translateX(-50%) scaleX(0);
            width:60%;
            height:2px;
            background:linear-gradient(90deg,var(--pink),var(--purple));
            border-radius:2px;
            transition:transform 0.3s ease;
        }

        .nav-link:hover::after {
            transform:translateX(-50%) scaleX(1);
        }

        .nav-cta {
            background:linear-gradient(135deg,var(--pink),#d88890) !important;
            color:#060210 !important;
            font-weight:600 !important;
            padding:8px 20px !important;
            box-shadow:0 4px 20px var(--pink-glow);
            border-radius:999px !important;
            transition:all 0.3s ease !important;
        }

        .nav-cta::after {
            display:none !important;
        }

        .nav-cta:hover {
            transform:translateY(-2px) scale(1.02);
            box-shadow:0 8px 30px var(--pink-glow) !important;
            background:linear-gradient(135deg,#ffb8b8,#e88890) !important;
        }

        .menu-btn {
            display:none;
            background:none;
            border:none;
            cursor:pointer;
            padding:8px;
            flex-direction:column;
            gap:5px;
            width:28px;
            height:28px;
            justify-content:center;
            align-items:center;
        }

        .menu-btn span {
            display:block;
            width:22px;
            height:2px;
            background:var(--text);
            border-radius:2px;
            transition:all 0.3s ease;
        }

        .menu-btn.active span:nth-child(1) { transform:rotate(45deg) translate(5px,5px); }
        .menu-btn.active span:nth-child(2) { opacity:0; }
        .menu-btn.active span:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); }

        .hero {
            min-height:100vh; display:flex; align-items:center;
            padding:140px 0 100px; position:relative; z-index:2;
        }
        .hero-content { max-width:780px; }
        
        .hero-badge {
            display:inline-flex; align-items:center; gap:8px;
            background:var(--pink-dim); border:1px solid rgba(240,160,160,0.2);
            padding:7px 20px; border-radius:100px; font-size:12px;
            color:var(--pink-bright); margin-bottom:36px; font-weight:500;
            animation:badgeFloat 3s ease-in-out infinite;
        }
        @keyframes badgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .hero-badge .live-dot {
            width:7px; height:7px; background:var(--green); border-radius:50%;
            box-shadow:0 0 8px rgba(110,231,183,0.6); animation:dotPulse 2s infinite;
        }
        @keyframes dotPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        
        .hero h1 {
            font-size:clamp(48px,8vw,90px); font-weight:900;
            line-height:1.02; letter-spacing:-2.5px; margin-bottom:24px;
        }
        .hero h1 .grad {
            background:linear-gradient(135deg,var(--pink-bright) 0%,#d4b8e0 40%,var(--purple) 100%);
            -webkit-background-clip:text; -webkit-text-fill-color:transparent;
            background-clip:text; filter:drop-shadow(0 4px 20px rgba(240,160,160,0.3));
        }
        .hero-desc { font-size:18px; color:var(--text2); max-width:520px; margin-bottom:44px; line-height:1.7; }
        .hero-stats { display:flex; gap:36px; margin-bottom:44px; flex-wrap:wrap; }
        .hero-stat .num { font-size:36px; font-weight:900; color:var(--pink-bright); line-height:1; }
        .hero-stat .lbl { font-size:11px; color:var(--text3); text-transform:uppercase; letter-spacing:1.5px; margin-top:4px; }
        .hero-actions { display:flex; gap:12px; flex-wrap:wrap; }

        .btn {
            display:inline-flex; align-items:center; gap:8px;
            padding:14px 28px; border-radius:100px; font-size:15px;
            font-weight:600; text-decoration:none; transition:all var(--transition);
            cursor:pointer; border:none; font-family:inherit;
            position:relative; overflow:hidden;
        }
        .btn-primary {
            background:linear-gradient(135deg,var(--pink),#d88890);
            color:#060210; box-shadow:0 8px 30px var(--pink-glow);
        }
        .btn-primary:hover { transform:translateY(-3px); box-shadow:0 16px 45px rgba(240,160,160,0.45); }
        .btn-primary:active { transform:scale(0.97); }
        .btn-secondary { background:var(--surface2); color:var(--text); border:1px solid var(--border); }
        .btn-secondary:hover { border-color:var(--border-hover); background:var(--surface3); transform:translateY(-2px); }
        .btn-ghost { color:var(--text2); background:transparent; }
        .btn-ghost:hover { color:var(--text); background:var(--surface); }

        .scroll-hint {
            position:absolute; bottom:30px; left:50%; transform:translateX(-50%);
            display:flex; flex-direction:column; align-items:center; gap:8px;
            animation:fadeInUp 1s ease 1.5s both;
        }
        .scroll-mouse { width:22px; height:34px; border:2px solid var(--border); border-radius:12px; position:relative; }
        .scroll-mouse::after {
            content:''; width:3px; height:6px; background:var(--pink);
            border-radius:3px; position:absolute; top:6px; left:50%;
            transform:translateX(-50%); animation:mouseWheel 1.8s ease infinite;
        }
        @keyframes mouseWheel { 0%{opacity:1;top:6px} 50%{opacity:0.4;top:18px} 100%{opacity:1;top:6px} }
        .scroll-hint span { font-size:10px; color:var(--text3); text-transform:uppercase; letter-spacing:2px; }
        @keyframes fadeInUp { from{opacity:0;transform:translate(-50%,20px)} to{opacity:1;transform:translate(-50%,0)} }

        .section { padding:100px 0; position:relative; z-index:2; }
        .section-header { text-align:center; margin-bottom:52px; }
        .section-tag { display:inline-block; font-size:11px; text-transform:uppercase; letter-spacing:4px; color:var(--pink); margin-bottom:16px; font-weight:600; }
        .section-title { font-size:clamp(32px,5vw,48px); font-weight:800; letter-spacing:-1.5px; margin-bottom:12px; }
        .section-desc { color:var(--text2); font-size:16px; }

        .search-wrap {
            max-width:500px; margin:0 auto 32px;
            background:var(--surface); border:1px solid var(--border);
            border-radius:100px; padding:4px; display:flex; align-items:center;
            transition:all var(--transition);
        }
        .search-wrap:focus-within {
            border-color:rgba(240,160,160,0.3); box-shadow:0 0 0 8px var(--pink-dim);
        }
        .search-wrap input {
            flex:1; background:transparent; border:none; color:var(--text);
            font-size:14px; padding:12px 18px; outline:none; font-family:inherit;
        }
        .search-wrap input::placeholder { color:var(--text3); }
        .kbd {
            font-size:11px; color:var(--text3); padding:5px 12px;
            background:var(--surface3); border-radius:8px; margin-right:4px;
            font-family:'Geist Mono',monospace; letter-spacing:0.5px;
        }

        .filter-bar { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:44px; }
        .filter-btn {
            padding:9px 18px; border-radius:100px; font-size:13px;
            background:var(--surface); color:var(--text2);
            border:1px solid transparent; cursor:pointer;
            font-family:inherit; font-weight:500;
            transition:all var(--transition); white-space:nowrap;
        }
        .filter-btn:hover { border-color:var(--border); color:var(--text); background:var(--surface2); }
        .filter-btn.active {
            background:var(--pink-dim); border-color:rgba(240,160,160,0.3);
            color:var(--pink-bright); font-weight:600;
        }

        .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        .card {
            background:var(--surface); border:1px solid var(--border);
            border-radius:var(--radius); padding:30px 26px;
            text-decoration:none; color:var(--text);
            transition:all var(--transition); display:flex; flex-direction:column;
            position:relative; overflow:hidden;
            backdrop-filter:blur(10px);
        }
        .card::after {
            content:''; position:absolute; inset:0;
            background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(240,160,160,0.06) 0%,transparent 60%);
            opacity:0; transition:opacity 0.5s ease; pointer-events:none;
        }
        .card:hover::after { opacity:1; }
        .card:hover {
            border-color:var(--border-hover); transform:translateY(-8px);
            box-shadow:0 30px 70px rgba(0,0,0,0.5),0 0 40px rgba(240,160,160,0.1);
        }
        .card-icon {
            width:52px; height:52px; background:var(--surface2);
            border-radius:var(--radius-sm); display:flex; align-items:center;
            justify-content:center; font-size:26px; margin-bottom:18px;
            transition:all var(--transition);
        }
        .card:hover .card-icon { background:var(--pink-dim); transform:scale(1.1)rotate(-3deg); box-shadow:0 8px 25px rgba(240,160,160,0.15); }
        .card h3 { font-size:18px; font-weight:600; margin-bottom:6px; letter-spacing:-0.3px; }
        .card p { font-size:13px; color:var(--text2); line-height:1.6; flex:1; margin-bottom:16px; }
        .card-footer { display:flex; align-items:center; justify-content:space-between; padding-top:16px; border-top:1px solid var(--border); }
        .card-tag { font-size:11px; text-transform:uppercase; letter-spacing:0.8px; color:var(--pink); font-weight:600; }
        .card-arrow { font-size:16px; color:var(--text3); transition:all var(--transition); }
        .card:hover .card-arrow { color:var(--pink-bright); transform:translateX(8px); }
        .popular-badge {
            position:absolute; top:16px; right:16px;
            font-size:10px; background:rgba(240,160,160,0.15);
            color:var(--pink-bright); padding:4px 12px;
            border-radius:100px; font-weight:700; letter-spacing:0.5px;
        }

        .snippets-wrap { position:relative; }
        .snippets-scroll {
            display:flex; gap:16px; overflow-x:auto; padding:8px 4px 28px;
            scroll-behavior:smooth; cursor:grab; scrollbar-width:none; -ms-overflow-style:none;
        }
        .snippets-scroll::-webkit-scrollbar { display:none; }
        .snippets-scroll:active { cursor:grabbing; }
        .snippet-card {
            min-width:320px; flex-shrink:0;
            background:var(--surface); border:1px solid var(--border);
            border-radius:var(--radius); padding:24px 22px;
            text-decoration:none; color:var(--text);
            transition:all var(--transition); user-select:none;
            backdrop-filter:blur(10px);
        }
        .snippet-card:hover { border-color:var(--border-hover); transform:translateY(-6px); box-shadow:0 25px 60px rgba(0,0,0,0.5); }
        .snippet-lang { display:inline-block; padding:5px 14px; border-radius:100px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:14px; }
        .snippet-lang.n4lyx{background:rgba(168,152,208,0.15);color:#c0b0e0}
        .snippet-lang.node,.snippet-lang.mongodb{background:rgba(110,231,183,0.1);color:#6ee7b7}
        .snippet-lang.express{background:rgba(240,160,160,0.12);color:var(--pink-bright)}
        .snippet-lang.react{background:rgba(129,199,245,0.1);color:#81c7f5}
        .snippet-lang.python{background:rgba(255,213,79,0.1);color:#ffd54f}
        .snippet-lang.discord{background:rgba(138,148,242,0.1);color:#8a94f2}
        .snippet-lang.docker{background:rgba(79,165,242,0.1);color:#4fa5f2}
        .snippet-card h4 { font-size:16px; font-weight:600; margin-bottom:6px; }
        .snippet-card .snippet-desc { font-size:12px; color:var(--text2); margin-bottom:14px; line-height:1.5; }
        .snippet-card .snippet-code { background:rgba(0,0,0,0.35); border-radius:10px; padding:12px; font-family:'Geist Mono',monospace; font-size:10px; color:var(--text3); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:12px; line-height:1.5; }
        .snippet-card .snippet-meta { display:flex; align-items:center; justify-content:space-between; font-size:11px; color:var(--text3); }
        .snippet-card .copy-hint { color:var(--pink); opacity:0; transition:opacity var(--transition); }
        .snippet-card:hover .copy-hint { opacity:1; }
        .scroll-arrows { display:flex; justify-content:center; gap:10px; margin-top:16px; }
        .scroll-arrows button { width:44px; height:44px; border-radius:50%; background:var(--surface); border:1px solid var(--border); color:var(--text2); cursor:pointer; font-size:18px; transition:all var(--transition); }
        .scroll-arrows button:hover { border-color:var(--border-hover); color:var(--text); background:var(--surface2); }

        .cta-card {
            text-align:center; padding:80px 56px;
            background:var(--surface); border:1px solid var(--border);
            border-radius:var(--radius-lg); position:relative; overflow:hidden;
            backdrop-filter:blur(10px);
        }
        .cta-card::before {
            content:''; position:absolute; inset:0;
            background:radial-gradient(circle at 50% 0%,rgba(240,160,160,0.08) 0%,transparent 60%);
        }
        .cta-card h3 { font-size:clamp(28px,4vw,44px); font-weight:800; margin-bottom:14px; letter-spacing:-1px; position:relative; }
        .cta-card p { color:var(--text2); margin-bottom:36px; font-size:16px; max-width:500px; margin-left:auto; margin-right:auto; position:relative; }
        .cta-card .btn-group { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; position:relative; }

        footer {
            border-top:1px solid var(--border); padding:36px 0;
            color:var(--text3); font-size:13px; position:relative; z-index:2;
        }
        footer .container { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; }
        footer a { color:var(--text2); text-decoration:none; transition:color var(--transition); }
        footer a:hover { color:var(--pink-bright); }

        @media (max-width:900px) {
            .grid { grid-template-columns:repeat(2,1fr); }
            .nav-links {
                display:none;
                position:absolute;
                top:calc(100% + 12px);
                left:0;
                right:0;
                background:rgba(10,4,24,0.95);
                backdrop-filter:blur(30px);
                -webkit-backdrop-filter:blur(30px);
                border:1px solid var(--border);
                border-radius:var(--radius);
                padding:12px;
                flex-direction:column;
                gap:4px;
                min-width:200px;
            }
            .nav-links.open {
                display:flex;
            }
            .nav-link {
                width:100%;
                padding:10px 16px;
                border-radius:8px;
            }
            .nav-link::after {
                display:none;
            }
            .menu-btn { display:flex; }
            .hero h1 { font-size:44px; }
            .cta-card { padding:48px 28px; }
            .snippet-card { min-width:260px; }
        }
        @media (max-width:600px) {
            .grid { grid-template-columns:1fr; }
            .hero-stats { gap:20px; }
            .hero-stat .num { font-size:28px; }
            .scroll-hint { display:none; }
            footer .container { flex-direction:column; text-align:center; }
            .navbar-wrap.expanded {
                width:calc(100% - 20px);
                max-width:100%;
            }
        }
    </style>
</head>
<body>
    <div class="noise"></div>
    <canvas id="particles"></canvas>
    <div class="glow-orb glow-1"></div>
    <div class="glow-orb glow-2"></div>
    <div class="glow-orb glow-3"></div>

    <div class="loader" id="loader">
        <div class="loader-inner">
            <div class="loader-logo">N4Kit</div>
            <div class="loader-bar"><div class="loader-bar-fill"></div></div>
        </div>
    </div>

    <div class="navbar-wrap" id="navbarWrap">
        <nav class="navbar">
            <a href="/" class="nav-brand">
                <img src="https://avatars.githubusercontent.com/u/181945053" alt="N4Kit Logo" class="nav-logo" width="38" height="38">
                <span class="nav-brand-text">N4Kit</span>
            </a>
            <div class="nav-links" id="navLinks">
                <a href="#tools" class="nav-link">Tools</a>
                <a href="https://code.n4tzzofficial.my.id" class="nav-link" target="_blank" rel="noopener">Snippets</a>
                <a href="https://github.com/N4tzzOfficial/N4Kit" class="nav-link" target="_blank" rel="noopener">GitHub</a>
                <a href="https://github.com/N4tzzOfficial/N4Kit" class="nav-link nav-cta" target="_blank" rel="noopener">⭐ Star us</a>
            </div>
            <button class="menu-btn" onclick="toggleMenu()" aria-label="Menu">
                <span></span><span></span><span></span>
            </button>
        </nav>
    </div>

    <section class="hero">
        <div class="container"><div class="hero-content">
            <div class="hero-badge" data-aos="fade-up"><span class="live-dot"></span> Open Source & Free Forever</div>
            <h1 data-aos="fade-up" data-aos-delay="100">Every tool<br><span class="grad">a developer needs</span></h1>
            <p class="hero-desc" data-aos="fade-up" data-aos-delay="200"><?php echo count($tools); ?>+ powerful tools. Format JSON, decode JWT, generate UUIDs, test regex — all in your browser. <strong>No ads. No login. No bullshit.</strong></p>
            <div class="hero-stats" data-aos="fade-up" data-aos-delay="300">
                <div class="hero-stat"><div class="num"><?php echo count($tools); ?>+</div><div class="lbl">Tools</div></div>
                <div class="hero-stat"><div class="num">100%</div><div class="lbl">Free</div></div>
                <div class="hero-stat"><div class="num">MIT</div><div class="lbl">License</div></div>
                <div class="hero-stat"><div class="num">0</div><div class="lbl">Ads</div></div>
            </div>
            <div class="hero-actions" data-aos="fade-up" data-aos-delay="400">
                <a href="#tools" class="btn btn-primary">🔧 Browse Tools →</a>
                <a href="https://code.n4tzzofficial.my.id" class="btn btn-secondary" target="_blank" rel="noopener">📦 View Snippets</a>
                <a href="https://github.com/N4tzzOfficial/N4Kit" class="btn btn-ghost" target="_blank" rel="noopener">⭐ Star</a>
            </div>
        </div></div>
        <div class="scroll-hint"><div class="scroll-mouse"></div><span>Scroll</span></div>
    </section>

    <section id="tools" class="section"><div class="container">
        <div class="section-header" data-aos="fade-up"><span class="section-tag">✦ Toolkit</span><h2 class="section-title">Everything You Need</h2><p class="section-desc">Powerful tools developers use every single day</p></div>
        <div class="search-wrap" data-aos="fade-up" data-aos-delay="100"><input type="text" id="searchInput" placeholder="Search tools... JSON, JWT, UUID..." oninput="filterTools()" autocomplete="off"><span class="kbd">⌘K</span></div>
        <div class="filter-bar" data-aos="fade-up" data-aos-delay="150">
            <?php foreach ($categories as $cat): ?>
            <button class="filter-btn <?php echo $cat['id']==='all'?'active':''; ?>" data-cat="<?php echo htmlspecialchars($cat['id']); ?>" onclick="setCategory('<?php echo htmlspecialchars($cat['id']); ?>',this)"><?php echo htmlspecialchars($cat['icon'].' '.$cat['name']); ?></button>
            <?php endforeach; ?>
        </div>
        <div class="grid" id="toolsGrid">
            <?php foreach ($tools as $i => $tool): ?>
            <a href="/tools/<?php echo htmlspecialchars($tool['id']); ?>/" class="card" data-cat="<?php echo htmlspecialchars($tool['category']); ?>" data-search="<?php echo htmlspecialchars(strtolower($tool['title'].' '.$tool['description'].' '.implode(' ',$tool['tags']))); ?>" data-aos="fade-up" data-aos-delay="<?php echo ($i%6)*60; ?>">
                <?php if($tool['popular']): ?><span class="popular-badge">🔥 Popular</span><?php endif; ?>
                <div class="card-icon"><?php echo htmlspecialchars($tool['icon']); ?></div>
                <h3><?php echo htmlspecialchars($tool['title']); ?></h3>
                <p><?php echo htmlspecialchars($tool['description']); ?></p>
                <div class="card-footer"><span class="card-tag"><?php echo htmlspecialchars($tool['category']); ?></span><span class="card-arrow">→</span></div>
            </a>
            <?php endforeach; ?>
        </div>
    </div></section>

    <section id="snippets" class="section"><div class="container">
        <div class="section-header" data-aos="fade-up"><span class="section-tag">✦ Snippets</span><h2 class="section-title">Ready-to-Use Code</h2><p class="section-desc">Copy-paste snippets. Drag or scroll to explore.</p></div>
        <div class="snippets-wrap" data-aos="fade-up" data-aos-delay="100">
            <div class="snippets-scroll" id="snippetsScroll">
                <?php foreach ($snippets as $snippet): ?>
                <a href="https://code.n4tzzofficial.my.id<?php echo htmlspecialchars($snippet['url']); ?>" class="snippet-card" target="_blank" rel="noopener">
                    <span class="snippet-lang <?php echo htmlspecialchars($snippet['lang']); ?>"><?php echo htmlspecialchars($snippet['lang']); ?></span>
                    <h4><?php echo htmlspecialchars($snippet['title']); ?></h4>
                    <p class="snippet-desc"><?php echo htmlspecialchars($snippet['description']); ?></p>
                    <div class="snippet-code"><?php echo htmlspecialchars(substr($snippet['code'],0,65)).'...'; ?></div>
                    <div class="snippet-meta"><span>📋 <?php echo htmlspecialchars($snippet['uses']); ?> uses</span><span class="copy-hint">View on Code →</span></div>
                </a>
                <?php endforeach; ?>
            </div>
            <div class="scroll-arrows">
                <button onclick="document.getElementById('snippetsScroll').scrollBy({left:-320,behavior:'smooth'})">←</button>
                <button onclick="document.getElementById('snippetsScroll').scrollBy({left:320,behavior:'smooth'})">→</button>
            </div>
        </div>
        <div style="text-align:center;margin-top:32px" data-aos="fade-up"><a href="https://code.n4tzzofficial.my.id" class="btn btn-secondary" target="_blank" rel="noopener">🌐 Browse All Snippets →</a></div>
    </div></section>

    <section class="section"><div class="container"><div class="cta-card" data-aos="zoom-in">
        <h3>Built for developers,<br>by developers</h3>
        <p>N4Kit is and always will be free & open source. Star the repo, contribute a tool, or just use it every day.</p>
        <div class="btn-group">
            <a href="https://github.com/N4tzzOfficial/N4Kit" class="btn btn-primary" target="_blank" rel="noopener">⭐ Star on GitHub</a>
            <a href="https://github.com/N4tzzOfficial/N4Kit/fork" class="btn btn-secondary" target="_blank" rel="noopener">🍴 Fork & Contribute</a>
        </div>
    </div></div></section>

    <footer><div class="container">
        <span>Built with ❤️ by <a href="https://github.com/N4tzzOfficial" target="_blank" rel="noopener">N4tzzOfficial</a> · <a href="https://n4tzzofficial.my.id" target="_blank" rel="noopener">N4tzzNetwork</a></span>
        <span>MIT License · No Ads · No Tracking · No Login</span>
    </div></footer>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <script>
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('loader').classList.add('hidden');
            }, 600);
        });

        AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 30 });

        var canvas = document.getElementById('particles');
        var ctx = canvas.getContext('2d');
        var particles = [];
        
        function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function Particle() {
            this.reset = function() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.s = Math.random() * 1.8 + 0.4;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.o = Math.random() * 0.35 + 0.06;
                this.c = Math.random() > 0.5 ? '240,160,160' : '168,152,208';
            };
            this.reset();
            this.update = function() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
            };
            this.draw = function() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + this.c + ',' + this.o + ')';
                ctx.fill();
            };
        }

        for (var i = 0; i < 60; i++) particles.push(new Particle());

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < particles.length; i++) { particles[i].update(); particles[i].draw(); }
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(240,160,160,' + (0.035 * (1 - dist / 120)) + ')';
                        ctx.lineWidth = 0.4;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        var navbarWrap = document.getElementById('navbarWrap');
        var lastScrollY = 0;
        var ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    var st = window.scrollY;
                    if (st > 50) {
                        navbarWrap.classList.add('expanded');
                    } else {
                        navbarWrap.classList.remove('expanded');
                    }
                    ticking = false;
                });
                ticking = true;
            }
            lastScrollY = st;
        });

        function toggleMenu() {
            var links = document.getElementById('navLinks');
            var btn = document.querySelector('.menu-btn');
            links.classList.toggle('open');
            btn.classList.toggle('active');
        }

        document.querySelectorAll('#navLinks a').forEach(function(l) {
            l.addEventListener('click', function() {
                document.getElementById('navLinks').classList.remove('open');
                document.querySelector('.menu-btn').classList.remove('active');
            });
        });

        var activeCat = 'all';
        function filterTools() {
            var q = document.getElementById('searchInput').value.toLowerCase();
            document.querySelectorAll('#toolsGrid .card').forEach(function(c) {
                var cat = c.getAttribute('data-cat');
                var s = c.getAttribute('data-search');
                var show = (activeCat === 'all' || cat === activeCat) && (!q || s.indexOf(q) !== -1);
                c.style.display = show ? 'flex' : 'none';
            });
        }
        function setCategory(cat, btn) {
            activeCat = cat;
            document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            filterTools();
        }

        var scrollEl = document.getElementById('snippetsScroll');
        var down = false, sx, sl;
        scrollEl.addEventListener('mousedown', function(e) {
            down = true; sx = e.pageX - scrollEl.offsetLeft; sl = scrollEl.scrollLeft;
            scrollEl.style.cursor = 'grabbing';
        });
        scrollEl.addEventListener('mouseleave', function() { down = false; scrollEl.style.cursor = 'grab'; });
        scrollEl.addEventListener('mouseup', function() { down = false; scrollEl.style.cursor = 'grab'; });
        scrollEl.addEventListener('mousemove', function(e) {
            if (!down) return;
            e.preventDefault();
            scrollEl.scrollLeft = sl - (e.pageX - scrollEl.offsetLeft - sx) * 2;
        });
        scrollEl.addEventListener('wheel', function(e) {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                scrollEl.scrollLeft += e.deltaY;
            }
        }, { passive: false });

        document.addEventListener('keydown', function(e) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
            if (e.key === 'Escape') {
                document.getElementById('searchInput').blur();
            }
        });

        document.querySelectorAll('.card').forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
                card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
            });
        });

        console.log('%c⚡ N4Kit %c— Developer Toolkit',
            'font-size:32px;font-weight:900;background:linear-gradient(135deg,#ffb8b8,#a898d0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;',
            'color:#a89cc4;font-size:14px;');
        console.log('%c<?php echo count($tools); ?>+ Tools · 100% Free · MIT · No Ads', 'color:#f0a0a0;');
        console.log('%chttps://github.com/N4tzzOfficial/N4Kit', 'color:#a898d0;');
    </script>
</body>
</html>