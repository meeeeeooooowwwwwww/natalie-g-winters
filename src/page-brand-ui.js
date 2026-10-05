export const PAGE_BRAND_STYLES = `
<style>
  .prestige-page{
    --prestige-ink:var(--pub-ink,#181315);
    --prestige-muted:var(--pub-muted,#70656a);
    --prestige-soft:#817279;
    --prestige-line:var(--pub-line,#dccbd2);
    --prestige-line-strong:var(--pub-line-strong,#c8afb9);
    --prestige-accent:var(--pub-pink-dark,#b92861);
    --prestige-surface:rgba(255,255,255,.72);
    --prestige-surface-strong:rgba(255,255,255,.92);
    --prestige-shadow:0 12px 30px rgba(76,39,54,.055);
    padding-top:0;
    background:transparent;
    color:var(--prestige-ink);
  }
  .prestige-shell{max-width:1380px}
  .prestige-hero{
    display:grid;
    grid-template-columns:minmax(0,1fr) 330px;
    gap:54px;
    align-items:start;
    padding:52px 0 36px;
    border-bottom:1px solid var(--prestige-line);
  }
  .prestige-kicker{
    display:block;
    margin-bottom:14px;
    font-size:8px;
    font-weight:800;
    letter-spacing:.2em;
    color:var(--prestige-accent);
  }
  .prestige-hero h1{
    margin:0;
    max-width:980px;
    font-size:clamp(46px,5.2vw,76px);
    line-height:.92;
    letter-spacing:-.055em;
    color:var(--prestige-ink);
    text-wrap:balance;
  }
  .prestige-deck{
    max-width:930px;
    margin:22px 0 0;
    font-size:clamp(17px,1.45vw,21px);
    line-height:1.58;
    color:var(--prestige-muted);
  }
  .prestige-deck strong{color:var(--prestige-ink)}

  .prestige-summary{
    border:1px solid var(--prestige-line);
    background:linear-gradient(160deg,rgba(255,255,255,.88),rgba(247,238,242,.74));
    box-shadow:var(--prestige-shadow);
  }
  .prestige-summary-head{
    padding:18px 20px;
    border-bottom:1px solid var(--prestige-line);
  }
  .prestige-summary-head span{
    font-size:8px;
    font-weight:800;
    letter-spacing:.18em;
    color:var(--prestige-accent);
  }
  .prestige-summary-head strong{
    display:block;
    margin-top:7px;
    font-size:18px;
    line-height:1.2;
    color:var(--prestige-ink);
  }
  .prestige-summary-row{
    padding:13px 20px;
    border-bottom:1px solid rgba(200,175,185,.56);
  }
  .prestige-summary-row:last-child{border-bottom:0}
  .prestige-summary-row span{
    display:block;
    margin-bottom:4px;
    font-size:7px;
    font-weight:800;
    letter-spacing:.14em;
    color:#826f77;
  }
  .prestige-summary-row strong{
    display:block;
    font-size:12px;
    line-height:1.35;
    color:#34272c;
  }

  .brand-ribbon{
    display:grid;
    grid-template-columns:repeat(4,minmax(0,1fr));
    margin-top:28px;
    border:1px solid var(--prestige-line);
    background:rgba(255,255,255,.42);
    box-shadow:0 10px 28px rgba(76,39,54,.035);
  }
  .brand-ribbon-card{
    min-height:184px;
    padding:22px 23px;
    display:flex;
    flex-direction:column;
    text-decoration:none;
    color:var(--prestige-ink);
    border-right:1px solid var(--prestige-line);
    background:rgba(255,255,255,.42);
    transition:background .18s ease,transform .18s ease,border-color .18s ease;
  }
  .brand-ribbon-card:last-child{border-right:0}
  .brand-ribbon-card:hover{
    background:rgba(255,255,255,.88);
    transform:translateY(-2px);
  }
  .brand-ribbon-card>small{
    font-size:7px;
    font-weight:800;
    letter-spacing:.16em;
    color:#67575e;
  }
  .brand-logo-box{
    min-height:70px;
    margin:15px 0 16px;
    padding:9px 11px;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    overflow:hidden;
    border:1px solid rgba(200,175,185,.72);
    border-radius:8px;
    background:rgba(255,255,255,.9);
  }
  .brand-logo-box img{
    display:block;
    width:auto;
    height:auto;
    max-width:92%;
    max-height:58px;
    object-fit:contain;
    object-position:left center;
    opacity:1;
  }
  .brand-logo-box img.reverse{
    filter:grayscale(1) brightness(.28) contrast(1.28);
    opacity:.96;
  }
  .brand-logo-box img.muted{
    filter:grayscale(1) brightness(.62) contrast(1.28);
    opacity:.96;
  }
  .brand-wordmark{
    font-family:Georgia,"Times New Roman",serif;
    font-size:25px;
    line-height:.95;
    letter-spacing:-.035em;
    color:#2b2024;
  }
  .brand-ribbon-card strong.role{
    margin-top:auto;
    font-size:9px;
    letter-spacing:.12em;
    color:var(--prestige-accent);
  }
  .brand-ribbon-card span.detail{
    display:block;
    margin-top:5px;
    font-size:10px;
    line-height:1.45;
    color:#6e6066;
  }

  .prestige-content-grid{
    display:grid;
    grid-template-columns:minmax(0,1fr) 300px;
    gap:54px;
    align-items:start;
    margin-top:44px;
  }
  .prestige-main{min-width:0}
  .prestige-prose{
    font-size:17px;
    line-height:1.76;
    color:#64585d;
  }
  .prestige-prose p{margin:0 0 24px}
  .prestige-prose strong{color:var(--prestige-ink)}
  .prestige-prose a{
    color:var(--prestige-accent);
    text-underline-offset:3px;
  }

  .prestige-rail{
    position:sticky;
    top:82px;
    border:1px solid var(--prestige-line);
    background:rgba(255,255,255,.66);
    box-shadow:var(--prestige-shadow);
  }
  .prestige-rail-head{
    padding:19px 20px;
    border-bottom:1px solid var(--prestige-line);
  }
  .prestige-rail-head span{
    font-size:8px;
    font-weight:800;
    letter-spacing:.18em;
    color:var(--prestige-accent);
  }
  .prestige-rail-head strong{
    display:block;
    margin-top:7px;
    font-size:16px;
    line-height:1.25;
    color:var(--prestige-ink);
  }
  .prestige-rail a,.prestige-rail .rail-static{
    display:block;
    padding:15px 20px;
    border-bottom:1px solid rgba(200,175,185,.54);
    text-decoration:none;
  }
  .prestige-rail a:hover{background:#f7e5ec}
  .prestige-rail a:last-child,.prestige-rail .rail-static:last-child{border-bottom:0}
  .prestige-rail b{
    display:block;
    margin-bottom:4px;
    font-size:8px;
    letter-spacing:.13em;
    color:var(--prestige-accent);
  }
  .prestige-rail span{
    display:block;
    font-size:11px;
    line-height:1.45;
    color:#685b61;
  }

  .prestige-section{
    margin-top:56px;
    padding-top:32px;
    border-top:1px solid var(--prestige-line);
  }
  .prestige-section-head{
    display:grid;
    grid-template-columns:minmax(0,1fr) minmax(260px,.45fr);
    gap:34px;
    align-items:end;
    margin-bottom:24px;
  }
  .prestige-section-head h2{
    margin:0!important;
    font-size:clamp(27px,3vw,39px);
    line-height:1;
    letter-spacing:-.04em;
    color:var(--prestige-ink);
  }
  .prestige-section-head p{
    margin:0;
    text-align:right;
    font-size:11px;
    line-height:1.6;
    color:#74666c;
  }
  .prestige-milestones{
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:12px;
  }
  .prestige-milestone{
    min-height:170px;
    padding:21px;
    border:1px solid var(--prestige-line);
    background:rgba(255,255,255,.62);
    display:flex;
    flex-direction:column;
    box-shadow:0 8px 24px rgba(76,39,54,.035);
  }
  .prestige-milestone span{
    font-size:8px;
    font-weight:800;
    letter-spacing:.14em;
    color:var(--prestige-accent);
  }
  .prestige-milestone strong{
    margin-top:auto;
    font-size:18px;
    line-height:1.22;
    color:var(--prestige-ink);
  }
  .prestige-milestone small{
    margin-top:9px;
    font-size:10px;
    line-height:1.45;
    color:#71646a;
  }

  .visual-feature{
    display:grid;
    grid-template-columns:minmax(300px,.78fr) minmax(0,1.22fr);
    gap:34px;
    align-items:stretch;
    margin-top:32px;
  }
  .visual-feature figure{
    margin:0;
    border:1px solid var(--prestige-line);
    background:#fff;
    overflow:hidden;
    box-shadow:0 10px 28px rgba(76,39,54,.045);
  }
  .visual-feature figure img{
    display:block;
    width:100%;
    height:100%;
    min-height:460px;
    object-fit:cover;
  }
  .visual-feature figcaption{
    padding:10px 13px;
    background:#fff;
    border-top:1px solid var(--prestige-line);
    color:#685b61;
  }
  .visual-feature-copy{
    padding:31px;
    border:1px solid var(--prestige-line);
    background:rgba(255,255,255,.7);
    box-shadow:0 10px 28px rgba(76,39,54,.04);
  }
  .visual-feature-copy .prestige-prose{font-size:16px}

  .logo-proof-grid{
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:12px;
  }
  .logo-proof-card{
    min-height:190px;
    padding:22px;
    border:1px solid var(--prestige-line);
    background:rgba(255,255,255,.62);
    display:flex;
    flex-direction:column;
    text-decoration:none;
    color:var(--prestige-ink);
    box-shadow:0 8px 24px rgba(76,39,54,.03);
  }
  .logo-proof-card:hover{background:#fff;border-color:var(--prestige-line-strong)}
  .logo-proof-card .proof-logo{
    min-height:66px;
    padding:8px 10px;
    display:flex;
    align-items:center;
    margin:10px 0 17px;
    overflow:hidden;
    border:1px solid rgba(200,175,185,.68);
    border-radius:8px;
    background:#fff;
  }
  .logo-proof-card .proof-logo img{
    display:block;
    max-width:86%;
    max-height:56px;
    width:auto;
    height:auto;
    object-fit:contain;
    object-position:left center;
  }
  .logo-proof-card .proof-logo img.reverse{
    filter:grayscale(1) brightness(.28) contrast(1.28);
    opacity:.96;
  }
  .logo-proof-card>span{
    font-size:8px;
    font-weight:800;
    letter-spacing:.14em;
    color:var(--prestige-accent);
  }
  .logo-proof-card strong{
    margin-top:auto;
    font-size:16px;
    line-height:1.25;
    color:var(--prestige-ink);
  }
  .logo-proof-card small{
    margin-top:7px;
    font-size:10px;
    line-height:1.45;
    color:#71646a;
  }

  .appearance-brand-grid{
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:12px;
  }
  .appearance-brand-card{
    min-height:265px;
    padding:22px;
    border:1px solid var(--prestige-line);
    background:rgba(255,255,255,.62);
    display:flex;
    flex-direction:column;
    color:var(--prestige-ink);
  }
  .appearance-brand-top{
    min-height:62px;
    padding:7px 9px;
    display:flex;
    align-items:center;
    margin-bottom:20px;
    border:1px solid rgba(200,175,185,.68);
    border-radius:8px;
    background:#fff;
  }
  .appearance-brand-top img{
    display:block;
    max-height:46px;
    max-width:210px;
    width:auto;
    height:auto;
    object-fit:contain;
  }
  .appearance-brand-top img.reverse{
    filter:grayscale(1) brightness(.28) contrast(1.28);
    opacity:.96;
  }
  .appearance-brand-card>span{
    font-size:8px;
    font-weight:800;
    letter-spacing:.14em;
    color:var(--prestige-accent);
  }
  .appearance-brand-card h3{
    margin:12px 0 10px;
    font-size:22px;
    line-height:1.15;
    color:var(--prestige-ink);
  }
  .appearance-brand-card p{
    margin:0 0 17px;
    font-size:12px;
    line-height:1.62;
    color:#6d6066;
  }
  .appearance-brand-card a{
    margin-top:auto;
    font-size:9px;
    font-weight:800;
    letter-spacing:.12em;
    color:var(--prestige-accent);
    text-decoration:none;
  }

  @media(max-width:1100px){
    .prestige-hero{grid-template-columns:1fr;gap:25px}
    .prestige-summary{max-width:760px}
    .prestige-content-grid{grid-template-columns:1fr}
    .prestige-rail{
      position:static;
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
    }
    .prestige-rail-head{grid-column:1/-1}
    .prestige-rail a,.prestige-rail .rail-static{
      border-right:1px solid var(--prestige-line);
    }
    .brand-ribbon{grid-template-columns:repeat(2,minmax(0,1fr))}
    .brand-ribbon-card:nth-child(2){border-right:0}
    .brand-ribbon-card:nth-child(-n+2){border-bottom:1px solid var(--prestige-line)}
    .visual-feature{grid-template-columns:1fr}
    .visual-feature figure img{min-height:0;max-height:620px;aspect-ratio:16/10}
  }
  @media(max-width:760px){
    .prestige-page{padding-left:14px;padding-right:14px}
    .prestige-hero{padding-top:38px}
    .prestige-hero h1{font-size:clamp(40px,12vw,58px)}
    .prestige-section-head{grid-template-columns:1fr;gap:10px}
    .prestige-section-head p{text-align:left}
    .prestige-milestones,.logo-proof-grid,.appearance-brand-grid{grid-template-columns:1fr}
    .prestige-rail{grid-template-columns:1fr}
    .prestige-rail a,.prestige-rail .rail-static{border-right:0}
  }
  @media(max-width:560px){
    .brand-ribbon{grid-template-columns:1fr}
    .brand-ribbon-card{
      border-right:0;
      border-bottom:1px solid var(--prestige-line);
    }
    .brand-ribbon-card:last-child{border-bottom:0}
  }
</style>
`;
