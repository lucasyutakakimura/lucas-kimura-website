(()=>{
  const key='lyk-lang';
  const params=new URLSearchParams(location.search);
  const requested=params.get('lang');
  let lang=(requested==='ja'||requested==='en')?requested:(localStorage.getItem(key)||'en');
  if(lang!=='ja')lang='en';

  const style=document.createElement('style');
  style.id='ja-editorial-style';
  style.textContent=`
    html[data-lang="ja"] body{font-family:'Noto Sans JP',Inter,sans-serif;font-feature-settings:'palt' 1;line-break:strict;word-break:normal}
    html[data-lang="ja"] .top nav{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:.04em;font-weight:600}
    html[data-lang="ja"] .top button{font-family:Inter,'Noto Sans JP',sans-serif;letter-spacing:.04em}
    html[data-lang="ja"] .label,html[data-lang="ja"] .kicker{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:.08em;font-weight:600}
    html[data-lang="ja"] .sub-hero h1{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:-.055em;line-height:1.02;font-weight:600;font-size:clamp(54px,9vw,126px)}
    html[data-lang="ja"] .sub-hero p{font-size:clamp(16px,1.45vw,20px);line-height:1.95;max-width:850px}
    html[data-lang="ja"] .pub-year h2,html[data-lang="ja"] .talk-archive h2{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:-.035em;font-weight:600;line-height:1.15}
    html[data-lang="ja"] .publication-cards h3{font-size:19px;line-height:1.72;font-weight:600;letter-spacing:-.018em}
    html[data-lang="ja"] .talk-archive h3{font-size:clamp(20px,2.1vw,28px);line-height:1.65;letter-spacing:-.025em}
    html[data-lang="ja"] .field-notes h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(30px,3.3vw,46px);line-height:1.35;letter-spacing:-.035em;font-weight:600}
    html[data-lang="ja"] .field-notes p{line-height:1.95}
    html[data-lang="ja"] .about-grid h2{font-family:'Noto Serif JP',serif;font-size:clamp(42px,5.8vw,82px);line-height:1.25;letter-spacing:-.055em;font-weight:600}
    html[data-lang="ja"] .about-grid>div:first-child p{line-height:2;font-size:18px}
    html[data-lang="ja"] .cv h3{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:.06em}
    html[data-lang="ja"] .cv p{line-height:1.9}
    html[data-lang="ja"] .contact>div>span{font-family:'Noto Sans JP',sans-serif;letter-spacing:.06em;font-weight:600}
    html[data-lang="ja"] .contact p{line-height:1.9}
    html[data-lang="ja"] .home-page .hero-kicker{font-family:'Noto Sans JP',sans-serif;letter-spacing:.11em}
    html[data-lang="ja"] .home-page .field{font-family:'Noto Sans JP',sans-serif;font-size:clamp(30px,3.65vw,58px);font-weight:600;letter-spacing:-.035em;line-height:1.18}
    html[data-lang="ja"] .home-page .statement{font-family:'Noto Sans JP',sans-serif;font-size:clamp(25px,2.9vw,44px);line-height:1.4;letter-spacing:-.04em;font-weight:600;max-width:900px}
    html[data-lang="ja"] .home-page .hero-meta{line-height:1.8;letter-spacing:.02em}
    html[data-lang="ja"] .home-page .hero-actions .button{font-family:'Noto Sans JP',sans-serif;letter-spacing:.03em}
    html[data-lang="ja"] .profile-dock-label>span{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:.08em}
    html[data-lang="ja"] .profile-card small{font-size:11px;line-height:1.65}
    html[data-lang="ja"] .home-page .intro h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(34px,4.35vw,66px);line-height:1.35;letter-spacing:-.055em;font-weight:600}
    html[data-lang="ja"] .home-page .intro h2 em{font-family:'Noto Serif JP',serif;font-style:normal}
    html[data-lang="ja"] .home-page .intro .cols{line-height:2;font-size:16px}
    html[data-lang="ja"] .home-page .research-tags>span{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:.04em}
    html[data-lang="ja"] .home-page #research .section-head h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(48px,6.9vw,104px);line-height:1.18;letter-spacing:-.055em;font-weight:600}
    html[data-lang="ja"] .home-page .stories h3{font-family:'Noto Sans JP',sans-serif;font-size:clamp(30px,3vw,48px);line-height:1.25;letter-spacing:-.045em;font-weight:600}
    html[data-lang="ja"] .home-page .stories p{line-height:1.9}
    html[data-lang="ja"] .home-page .news .section-head h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(58px,7.8vw,112px);font-weight:600;letter-spacing:-.055em}
    html[data-lang="ja"] .home-page .news-list h3{font-family:'Noto Sans JP',sans-serif;line-height:1.62;font-weight:600}
    html[data-lang="ja"] .home-page .selected .section-head h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(48px,6.5vw,102px);line-height:1.2;letter-spacing:-.055em;font-weight:600}
    html[data-lang="ja"] .home-page .paper-list h3{font-family:'Noto Sans JP',sans-serif;line-height:1.62;letter-spacing:-.035em}
    html[data-lang="ja"] .home-page .presentation-preview h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(34px,4vw,58px);line-height:1.45;letter-spacing:-.05em;font-weight:600}
    html[data-lang="ja"] .home-page .talk h3{line-height:1.65;letter-spacing:-.025em}
    html[data-lang="ja"] .home-page .field .section-head h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(54px,7vw,110px);line-height:1.15;font-weight:600;letter-spacing:-.05em}
    html[data-lang="ja"] .home-page .field-grid span{font-family:'Noto Sans JP',sans-serif;letter-spacing:.06em}
    html[data-lang="ja"] .home-page .quote p{font-family:'Noto Serif JP',serif;font-size:clamp(34px,4.6vw,68px);line-height:1.55;letter-spacing:-.045em;font-weight:600}
    html[data-lang="ja"] footer nav{font-family:'Noto Sans JP',sans-serif}
    .contact-note{padding:0 7vw 90px;display:grid;grid-template-columns:180px 1fr;gap:40px;font-size:14px}.contact-note>div{font-family:Oswald,'Noto Sans JP',sans-serif;letter-spacing:.08em}.contact-note p{margin:0}.contact-note a{border-bottom:1px solid currentColor}
    @media(max-width:700px){html[data-lang="ja"] .home-page .field{font-size:clamp(27px,8vw,40px)}html[data-lang="ja"] .home-page .statement{font-size:clamp(22px,6vw,31px)}html[data-lang="ja"] .home-page .intro h2{font-size:clamp(30px,8vw,43px)}html[data-lang="ja"] .home-page #research .section-head h2{font-size:clamp(42px,11vw,62px)}.contact-note{grid-template-columns:1fr;gap:12px}}
  `;
  document.head.appendChild(style);

  const apply=()=>{
    document.documentElement.lang=lang;
    document.documentElement.dataset.lang=lang;
    document.querySelectorAll('[data-en]').forEach(el=>{el.style.display=lang==='en'?'':'none';});
    document.querySelectorAll('[data-ja]').forEach(el=>{el.style.display=lang==='ja'?'':'none';});
    document.querySelectorAll('[data-alt-en]').forEach(el=>{el.alt=lang==='ja'?(el.dataset.altJa||el.dataset.altEn):el.dataset.altEn;});
    document.querySelectorAll('[data-aria-en]').forEach(el=>{el.setAttribute('aria-label',lang==='ja'?(el.dataset.ariaJa||el.dataset.ariaEn):el.dataset.ariaEn);});
    document.querySelectorAll('nav[aria-label]').forEach(nav=>nav.setAttribute('aria-label',lang==='ja'?'主要ナビゲーション':'Primary navigation'));
    const body=document.body;
    const title=lang==='ja'?body.dataset.titleJa:body.dataset.titleEn;
    const description=lang==='ja'?body.dataset.descriptionJa:body.dataset.descriptionEn;
    if(title)document.title=title;
    const meta=document.querySelector('meta[name="description"]');if(meta&&description)meta.content=description;
    const b=document.getElementById('lang');if(b){b.textContent=lang==='en'?'日本語':'EN';const label=lang==='en'?'日本語表示に切り替える':'Switch to English';b.setAttribute('aria-label',label);b.title=label;}
  };
  document.addEventListener('DOMContentLoaded',()=>{apply();const b=document.getElementById('lang');if(b)b.addEventListener('click',()=>{lang=lang==='en'?'ja':'en';localStorage.setItem(key,lang);apply();});});
})();