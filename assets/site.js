(()=>{
  const key='lyk-lang';
  const params=new URLSearchParams(location.search);
  const requested=params.get('lang');
  let lang=(requested==='ja'||requested==='en')?requested:(localStorage.getItem(key)||'en');
  if(lang!=='ja')lang='en';

  const loadStyle=(href,marker)=>{
    if(document.querySelector(`link[${marker}]`))return;
    const link=document.createElement('link');
    link.rel='stylesheet'; link.href=href; link.setAttribute(marker,'true');
    document.head.appendChild(link);
  };
  const loadScript=(src,marker)=>{
    if(document.querySelector(`script[${marker}]`))return;
    const script=document.createElement('script');
    script.src=src; script.defer=true; script.setAttribute(marker,'true');
    document.head.appendChild(script);
  };

  loadStyle('assets/polish.css','data-lyk-polish');
  loadScript('assets/japanese-polish.js','data-lyk-japanese-polish');
  loadScript('assets/highres-loader.js','data-lyk-hires');

  const apply=()=>{
    document.documentElement.lang=lang;
    document.documentElement.dataset.lang=lang;

    // Visibility is controlled by language-aware CSS. Clear legacy inline styles.
    document.querySelectorAll('[data-en],[data-ja]').forEach(el=>el.style.removeProperty('display'));

    document.querySelectorAll('[data-alt-en]').forEach(el=>{
      el.alt=lang==='ja'?(el.dataset.altJa||el.dataset.altEn):el.dataset.altEn;
    });
    document.querySelectorAll('[data-aria-en]').forEach(el=>{
      el.setAttribute('aria-label',lang==='ja'?(el.dataset.ariaJa||el.dataset.ariaEn):el.dataset.ariaEn;
    });
    document.querySelectorAll('nav[aria-label]').forEach(nav=>{
      nav.setAttribute('aria-label',lang==='ja'?'主要ナビゲーション':'Primary navigation');
    });

    const body=document.body;
    const title=lang==='ja'?body.dataset.titleJa:body.dataset.titleEn;
    const description=lang==='ja'?body.dataset.descriptionJa:body.dataset.descriptionEn;
    if(title)document.title=title;
    const meta=document.querySelector('meta[name="description"]');
    if(meta&&description)meta.content=description;
    const ogTitle=document.querySelector('meta[property="og:title"]');
    if(ogTitle&&title)ogTitle.content=title;
    const ogDescription=document.querySelector('meta[property="og:description"]');
    if(ogDescription&&description)ogDescription.content=description;

    const b=document.getElementById('lang');
    if(b){
      b.textContent=lang==='en'?'日本語':'EN';
      const label=lang==='en'?'日本語表示に切り替える':'Switch to English';
      b.setAttribute('aria-label',label);
      b.title=label;
    }
    try{localStorage.setItem(key,lang);}catch(e){}
  };

  document.documentElement.lang=lang;
  document.documentElement.dataset.lang=lang;

  document.addEventListener('DOMContentLoaded',()=>{
    apply();
    const b=document.getElementById('lang');
    if(b)b.addEventListener('click',()=>{
      lang=lang==='en'?'ja':'en';
      apply();
    });
  });
})();