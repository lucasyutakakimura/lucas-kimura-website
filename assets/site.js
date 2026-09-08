(()=>{
  const key='lyk-lang';
  const params=new URLSearchParams(location.search);
  const requested=params.get('lang');
  let lang=(requested==='ja'||requested==='en')?requested:(localStorage.getItem(key)||'en');
  if(lang!=='ja') lang='en';

  // Global visual refinement shared by English and Japanese.
  if(!document.querySelector('link[href="assets/refinement.css"]')){
    const refinement=document.createElement('link');
    refinement.rel='stylesheet';
    refinement.href='assets/refinement.css';
    document.head.appendChild(refinement);
  }

  const editorial=document.createElement('style');
  editorial.id='ja-editorial-style';
  editorial.textContent=`
    html[data-lang="en"] [data-ja],html:not([data-lang]) [data-ja]{display:none!important}
    html[data-lang="ja"] [data-en]{display:none!important}
    html[data-lang="ja"] [data-ja]{display:revert!important}
    html[data-lang="en"] [data-en]{display:revert!important}
    html[data-lang="ja"] body{font-family:'Noto Sans JP',Inter,sans-serif;font-feature-settings:'palt' 1;line-break:strict;word-break:normal}
    html[data-lang="ja"] .top nav{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:.035em;font-weight:600}
    html[data-lang="ja"] .top button{font-family:Inter,'Noto Sans JP',sans-serif;letter-spacing:.04em}
    html[data-lang="ja"] .label,html[data-lang="ja"] .kicker{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:.06em;font-weight:600}
    html[data-lang="ja"] .sub-hero h1{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:-.055em;line-height:1.08;font-weight:600;font-size:clamp(54px,9vw,126px)}
    html[data-lang="ja"] .sub-hero p{font-size:clamp(16px,1.45vw,20px);line-height:1.95;max-width:850px}
    html[data-lang="ja"] .pub-year h2,html[data-lang="ja"] .talk-archive h2{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:-.035em;font-weight:600;line-height:1.15}
    html[data-lang="ja"] .publication-cards h3{font-size:19px;line-height:1.72;font-weight:600;letter-spacing:-.018em}
    html[data-lang="ja"] .talk-archive h3{font-size:clamp(20px,2.1vw,28px);line-height:1.65;letter-spacing:-.025em}
    html[data-lang="ja"] .field-notes h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(30px,3.3vw,46px);line-height:1.35;letter-spacing:-.035em;font-weight:600}
    html[data-lang="ja"] .field-notes p{line-height:1.95}
    html[data-lang="ja"] .about-grid h2{font-family:'Noto Serif JP',serif;font-size:clamp(42px,5.8vw,82px);line-height:1.25;letter-spacing:-.055em;font-weight:600}
    html[data-lang="ja"] .about-grid>div:first-child p{line-height:2;font-size:18px}
    html[data-lang="ja"] .cv h3{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:.045em}
    html[data-lang="ja"] .cv p{line-height:1.9}
    html[data-lang="ja"] .contact>div>span{font-family:'Noto Sans JP',sans-serif;letter-spacing:.045em;font-weight:600}
    html[data-lang="ja"] .contact p{line-height:1.9}
    html[data-lang="ja"] .home-page .field{font-family:'Noto Sans JP',sans-serif;font-size:clamp(30px,3.65vw,58px);font-weight:600;letter-spacing:-.04em;line-height:1.2}
    html[data-lang="ja"] .home-page .statement{font-family:'Noto Sans JP',sans-serif;font-size:clamp(25px,2.9vw,44px);line-height:1.42;letter-spacing:-.045em;font-weight:600;max-width:900px}
    html[data-lang="ja"] .home-page .hero-meta{line-height:1.8;letter-spacing:.01em}
    html[data-lang="ja"] .home-page .hero-actions .button{font-family:'Noto Sans JP',sans-serif;letter-spacing:.02em}
    html[data-lang="ja"] .profile-dock-label>span{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:.06em}
    html[data-lang="ja"] .profile-card small{font-size:11px;line-height:1.65}
    html[data-lang="ja"] .home-page .intro h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(30px,3.75vw,56px);line-height:1.42;letter-spacing:-.045em;font-weight:600}
    html[data-lang="ja"] .home-page .intro h2 em{font-family:'Noto Serif JP',serif;font-style:normal}
    html[data-lang="ja"] .home-page .intro .cols{line-height:2;font-size:16px}
    html[data-lang="ja"] .home-page .research-tags>span{font-family:'Noto Sans JP',sans-serif;text-transform:none;letter-spacing:.03em}
    html[data-lang="ja"] .home-page #research .section-head h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(42px,5.15vw,76px);line-height:1.24;letter-spacing:-.055em;font-weight:600}
    html[data-lang="ja"] .home-page .stories h3{font-family:'Noto Sans JP',sans-serif;font-size:clamp(30px,3vw,48px);line-height:1.3;letter-spacing:-.045em;font-weight:600}
    html[data-lang="ja"] .home-page .stories p{line-height:1.9}
    html[data-lang="ja"] .home-page .news .section-head h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(58px,7.8vw,112px);font-weight:600;letter-spacing:-.055em}
    html[data-lang="ja"] .home-page .news-list h3{font-family:'Noto Sans JP',sans-serif;line-height:1.62;font-weight:600}
    html[data-lang="ja"] .home-page .selected .section-head h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(48px,6.5vw,102px);line-height:1.2;letter-spacing:-.055em;font-weight:600}
    html[data-lang="ja"] .home-page .paper-list h3{font-family:'Noto Sans JP',sans-serif;line-height:1.62;letter-spacing:-.035em}
    html[data-lang="ja"] .home-page .presentation-preview h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(34px,4vw,58px);line-height:1.45;letter-spacing:-.05em;font-weight:600}
    html[data-lang="ja"] .home-page .talk h3{line-height:1.65;letter-spacing:-.025em}
    html[data-lang="ja"] .home-page .field .section-head h2{font-family:'Noto Sans JP',sans-serif;font-size:clamp(54px,7vw,110px);line-height:1.15;font-weight:600;letter-spacing:-.05em}
    html[data-lang="ja"] .home-page .field-grid span{font-family:'Noto Sans JP',sans-serif;letter-spacing:.04em}
    html[data-lang="ja"] .home-page .quote p{font-family:'Noto Serif JP',serif;font-size:clamp(34px,4.6vw,68px);line-height:1.55;letter-spacing:-.045em;font-weight:600}
    html[data-lang="ja"] footer nav{font-family:'Noto Sans JP',sans-serif}
    @media(max-width:700px){html[data-lang="ja"] .home-page .field{font-size:clamp(27px,8vw,40px)}html[data-lang="ja"] .home-page .statement{font-size:clamp(22px,6vw,31px)}html[data-lang="ja"] .home-page .intro h2{font-size:clamp(29px,8.2vw,38px)}html[data-lang="ja"] .home-page #research .section-head h2{font-size:clamp(34px,9.4vw,47px)}}
  `;
  document.head.appendChild(editorial);

  function syncInternalLinks(){
    document.querySelectorAll('a[href]').forEach(a=>{
      const raw=a.getAttribute('href');
      if(!raw||raw.startsWith('#')||raw.startsWith('mailto:')||raw.startsWith('http://')||raw.startsWith('https://')) return;
      try{
        const u=new URL(raw,location.href);
        if(u.origin===location.origin){
          u.searchParams.set('lang',lang);
          a.setAttribute('href',u.pathname.split('/').pop()+(u.search||'')+(u.hash||''));
        }
      }catch(e){}
    });
  }

  function setImage(selector,src,altEn,altJa){
    document.querySelectorAll(selector).forEach(img=>{
      if(img.tagName!=='IMG') return;
      img.src=src;
      img.removeAttribute('srcset');
      if(altEn) img.dataset.altEn=altEn;
      if(altJa) img.dataset.altJa=altJa;
      img.alt=lang==='ja'?(altJa||altEn):(altEn||img.alt);
      img.decoding='async';
    });
  }

  function applyHighResolutionPhotography(){
    const fish='assets/images/reef-fish-2048.avif';
    const healthy='assets/images/reef-healthy-2048.avif';
    // The Home hero intentionally uses the image referenced directly in index.html.
    // Do not overwrite it here; this keeps the user's uploaded full-resolution photograph authoritative.
    setImage('.stories article:nth-child(1) img',healthy,'Structurally complex coral reef habitat in Okinawa','沖縄の立体的で健全なサンゴ礁生息場');
    setImage('.stories article:nth-child(2) img',fish,'Reef fishes above branching corals','枝状サンゴ上を泳ぐサンゴ礁魚類');
    setImage('.field-grid a:nth-child(1) img',fish,'Coral reef and fishes in Okinawa','沖縄のサンゴ礁と魚類');
    setImage('.field-grid a:nth-child(2) img',healthy,'Healthy coral reef in the Ryukyu Archipelago','琉球列島の健全なサンゴ礁');
    setImage('.field-notes article:nth-child(1) img',fish,'Reef fish field survey habitat','サンゴ礁魚類調査のフィールド');
    setImage('.field-notes article:nth-child(2) img',healthy,'Healthy coral reef habitat','健全なサンゴ礁生息場');
  }

  function refineNavigationAndHome(){
    document.querySelectorAll('a[href*="fieldwork.html"]').forEach(a=>{
      const en=a.querySelector('[data-en]');
      const ja=a.querySelector('[data-ja]');
      if(en) en.textContent='Field Journal';
      if(ja) ja.textContent='フィールド記録';
    });
    const homeKicker=document.querySelector('.home-page .hero-kicker');
    if(homeKicker) homeKicker.remove();
  }

  const apply=()=>{
    document.documentElement.lang=lang;
    document.documentElement.dataset.lang=lang;
    document.querySelectorAll('[data-en]').forEach(el=>{el.style.display=lang==='en'?'revert':'none';});
    document.querySelectorAll('[data-ja]').forEach(el=>{el.style.display=lang==='ja'?'revert':'none';});
    document.querySelectorAll('[data-alt-en]').forEach(el=>{el.alt=lang==='ja'?(el.dataset.altJa||el.dataset.altEn):el.dataset.altEn;});
    document.querySelectorAll('[data-aria-en]').forEach(el=>{el.setAttribute('aria-label',lang==='ja'?(el.dataset.ariaJa||el.dataset.ariaEn):el.dataset.ariaEn);});
    document.querySelectorAll('nav[aria-label]').forEach(nav=>nav.setAttribute('aria-label',lang==='ja'?'主要ナビゲーション':'Primary navigation'));
    const body=document.body;
    const title=lang==='ja'?body.dataset.titleJa:body.dataset.titleEn;
    const description=lang==='ja'?body.dataset.descriptionJa:body.dataset.descriptionEn;
    if(title) document.title=title;
    const meta=document.querySelector('meta[name="description"]'); if(meta&&description) meta.content=description;
    const button=document.getElementById('lang');
    if(button){
      button.textContent=lang==='en'?'日本語':'EN';
      const label=lang==='en'?'日本語表示に切り替える':'Switch to English';
      button.setAttribute('aria-label',label); button.title=label;
    }
    try{localStorage.setItem(key,lang);}catch(e){}
    const url=new URL(location.href); url.searchParams.set('lang',lang); history.replaceState(null,'',url);
    syncInternalLinks();
  };

  document.addEventListener('DOMContentLoaded',()=>{
    refineNavigationAndHome();
    applyHighResolutionPhotography();
    apply();
    const button=document.getElementById('lang');
    if(button) button.addEventListener('click',()=>{lang=lang==='en'?'ja':'en';apply();});
  });
})();