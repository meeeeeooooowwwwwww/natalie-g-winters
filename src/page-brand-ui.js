export const PAGE_BRAND_STYLES = `
<style>
  .prestige-page{padding-top:0;background:linear-gradient(180deg,rgba(4,2,5,.96),rgba(0,0,0,.94))}
  .prestige-shell{max-width:1380px}
  .prestige-hero{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:54px;align-items:end;padding:58px 0 42px;border-bottom:1px solid rgba(255,255,255,.09)}
  .prestige-kicker{display:block;margin-bottom:14px;font-size:8px;font-weight:800;letter-spacing:.2em;color:#c8a65c}
  .prestige-hero h1{margin:0;max-width:980px;font-size:clamp(46px,5.2vw,76px);line-height:.92;letter-spacing:-.055em;color:#f7f4f1;text-wrap:balance}
  .prestige-deck{max-width:930px;margin:22px 0 0;font-size:clamp(17px,1.45vw,21px);line-height:1.58;color:#aaa2a7}
  .prestige-deck strong{color:#f5f1ed}
  .prestige-summary{border:1px solid rgba(255,255,255,.1);background:linear-gradient(160deg,rgba(255,255,255,.034),rgba(200,166,92,.025));box-shadow:0 22px 60px rgba(0,0,0,.22)}
  .prestige-summary-head{padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.08)}
  .prestige-summary-head span{font-size:8px;font-weight:800;letter-spacing:.18em;color:#c8a65c}
  .prestige-summary-head strong{display:block;margin-top:7px;font-size:18px;line-height:1.2;color:#f0ecef}
  .prestige-summary-row{padding:13px 20px;border-bottom:1px solid rgba(255,255,255,.06)}
  .prestige-summary-row:last-child{border-bottom:0}
  .prestige-summary-row span{display:block;margin-bottom:4px;font-size:7px;font-weight:800;letter-spacing:.14em;color:#696267}
  .prestige-summary-row strong{display:block;font-size:12px;line-height:1.35;color:#ded8dc}

  .brand-ribbon{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin-top:34px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.015)}
  .brand-ribbon-card{min-height:170px;padding:22px 23px;display:flex;flex-direction:column;text-decoration:none;border-right:1px solid rgba(255,255,255,.075);transition:background .18s ease,transform .18s ease}
  .brand-ribbon-card:last-child{border-right:0}
  .brand-ribbon-card:hover{background:rgba(200,166,92,.04);transform:translateY(-2px)}
  .brand-ribbon-card>small{font-size:7px;font-weight:800;letter-spacing:.16em;color:#696267}
  .brand-logo-box{height:67px;margin:16px 0;display:flex;align-items:center;justify-content:flex-start;overflow:hidden}
  .brand-logo-box img{display:block;width:auto;height:auto;max-width:92%;max-height:60px;object-fit:contain;object-position:left center;opacity:.9}
  .brand-logo-box img.reverse{filter:grayscale(1) brightness(0) invert(1)}
  .brand-logo-box img.muted{filter:grayscale(1);opacity:.75}
  .brand-wordmark{font-family:Georgia,"Times New Roman",serif;font-size:25px;line-height:.95;letter-spacing:-.035em;color:#f3efeb}
  .brand-ribbon-card strong.role{margin-top:auto;font-size:9px;letter-spacing:.12em;color:#c8a65c}
  .brand-ribbon-card span.detail{display:block;margin-top:5px;font-size:10px;line-height:1.45;color:#827a80}

  .prestige-content-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:54px;align-items:start;margin-top:52px}
  .prestige-main{min-width:0}
  .prestige-prose{font-size:17px;line-height:1.76;color:#aaa3a8}
  .prestige-prose p{margin:0 0 24px}
  .prestige-prose strong{color:#f6f2ef}
  .prestige-prose a{color:#fff;text-underline-offset:3px}
  .prestige-rail{position:sticky;top:82px;border:1px solid rgba(255,255,255,.09);background:linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.008))}
  .prestige-rail-head{padding:19px 20px;border-bottom:1px solid rgba(255,255,255,.075)}
  .prestige-rail-head span{font-size:8px;font-weight:800;letter-spacing:.18em;color:#c8a65c}
  .prestige-rail-head strong{display:block;margin-top:7px;font-size:16px;line-height:1.25;color:#eee8eb}
  .prestige-rail a,.prestige-rail .rail-static{display:block;padding:15px 20px;border-bottom:1px solid rgba(255,255,255,.06);text-decoration:none}
  .prestige-rail a:hover{background:rgba(200,166,92,.045)}
  .prestige-rail a:last-child,.prestige-rail .rail-static:last-child{border-bottom:0}
  .prestige-rail b{display:block;margin-bottom:4px;font-size:8px;letter-spacing:.13em;color:#c8a65c}
  .prestige-rail span{display:block;font-size:11px;line-height:1.45;color:#8e878c}

  .prestige-section{margin-top:66px;padding-top:32px;border-top:1px solid rgba(255,255,255,.08)}
  .prestige-section-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,.45fr);gap:34px;align-items:end;margin-bottom:24px}
  .prestige-section-head h2{margin:0!important;font-size:clamp(27px,3vw,39px);line-height:1;letter-spacing:-.04em;color:#f4f0ed}
  .prestige-section-head p{margin:0;text-align:right;font-size:11px;line-height:1.6;color:#746d72}
  .prestige-milestones{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
  .prestige-milestone{min-height:170px;padding:21px;border:1px solid rgba(255,255,255,.085);background:linear-gradient(150deg,rgba(255,255,255,.025),rgba(255,255,255,.008));display:flex;flex-direction:column}
  .prestige-milestone span{font-size:8px;font-weight:800;letter-spacing:.14em;color:#c8a65c}
  .prestige-milestone strong{margin-top:auto;font-size:18px;line-height:1.22;color:#eee9ec}
  .prestige-milestone small{margin-top:9px;font-size:10px;line-height:1.45;color:#746d72}

  .visual-feature{display:grid;grid-template-columns:minmax(300px,.78fr) minmax(0,1.22fr);gap:34px;align-items:stretch;margin-top:38px}
  .visual-feature figure{margin:0;border:1px solid rgba(255,255,255,.09);background:#050505;overflow:hidden}
  .visual-feature figure img{display:block;width:100%;height:100%;min-height:460px;object-fit:cover}
  .visual-feature figcaption{padding:10px 13px;background:#050505;border-top:1px solid rgba(255,255,255,.07)}
  .visual-feature-copy{padding:31px;border:1px solid rgba(255,255,255,.09);background:linear-gradient(155deg,rgba(255,255,255,.028),rgba(255,255,255,.008))}
  .visual-feature-copy .prestige-prose{font-size:16px}

  .logo-proof-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
  .logo-proof-card{min-height:180px;padding:22px;border:1px solid rgba(255,255,255,.085);background:rgba(255,255,255,.014);display:flex;flex-direction:column;text-decoration:none}
  .logo-proof-card:hover{background:rgba(200,166,92,.035)}
  .logo-proof-card .proof-logo{height:62px;display:flex;align-items:center;margin:10px 0 17px;overflow:hidden}
  .logo-proof-card .proof-logo img{display:block;max-width:86%;max-height:58px;width:auto;height:auto;object-fit:contain;object-position:left center}
  .logo-proof-card .proof-logo img.reverse{filter:grayscale(1) brightness(0) invert(1)}
  .logo-proof-card>span{font-size:8px;font-weight:800;letter-spacing:.14em;color:#c8a65c}
  .logo-proof-card strong{margin-top:auto;font-size:16px;line-height:1.25;color:#eee9ec}
  .logo-proof-card small{margin-top:7px;font-size:10px;line-height:1.45;color:#756f73}

  .appearance-brand-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
  .appearance-brand-card{min-height:265px;padding:22px;border:1px solid rgba(255,255,255,.085);background:linear-gradient(150deg,rgba(255,255,255,.024),rgba(255,255,255,.008));display:flex;flex-direction:column}
  .appearance-brand-top{height:50px;display:flex;align-items:center;margin-bottom:20px}
  .appearance-brand-top img{display:block;max-height:46px;max-width:210px;width:auto;height:auto;object-fit:contain}
  .appearance-brand-top img.reverse{filter:grayscale(1) brightness(0) invert(1)}
  .appearance-brand-card>span{font-size:8px;font-weight:800;letter-spacing:.14em;color:#c8a65c}
  .appearance-brand-card h3{margin:12px 0 10px;font-size:22px;line-height:1.15;color:#f0ecef}
  .appearance-brand-card p{margin:0 0 17px;font-size:12px;line-height:1.62;color:#817a7f}
  .appearance-brand-card a{margin-top:auto;font-size:9px;font-weight:800;letter-spacing:.12em;color:#ddd;text-decoration:none}

  @media(max-width:1100px){
    .prestige-hero{grid-template-columns:1fr;gap:25px}.prestige-summary{max-width:760px}
    .prestige-content-grid{grid-template-columns:1fr}.prestige-rail{position:static;display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.prestige-rail-head{grid-column:1/-1}.prestige-rail a,.prestige-rail .rail-static{border-right:1px solid rgba(255,255,255,.06)}
    .brand-ribbon{grid-template-columns:repeat(2,minmax(0,1fr))}.brand-ribbon-card:nth-child(2){border-right:0}.brand-ribbon-card:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.075)}
    .visual-feature{grid-template-columns:1fr}.visual-feature figure img{min-height:0;max-height:620px;aspect-ratio:16/10}
  }
  @media(max-width:760px){
    .prestige-page{padding-left:14px;padding-right:14px}.prestige-hero{padding-top:38px}.prestige-hero h1{font-size:clamp(40px,12vw,58px)}
    .prestige-section-head{grid-template-columns:1fr;gap:10px}.prestige-section-head p{text-align:left}
    .prestige-milestones,.logo-proof-grid,.appearance-brand-grid{grid-template-columns:1fr}
    .prestige-rail{grid-template-columns:1fr}.prestige-rail a,.prestige-rail .rail-static{border-right:0}
  }
  @media(max-width:560px){.brand-ribbon{grid-template-columns:1fr}.brand-ribbon-card{border-right:0;border-bottom:1px solid rgba(255,255,255,.075)}.brand-ribbon-card:last-child{border-bottom:0}}
</style>
`;
