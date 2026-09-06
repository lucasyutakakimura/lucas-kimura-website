(()=>{
  const key='lyk-lang';
  const params=new URLSearchParams(location.search);
  const requested=params.get('lang');
  let lang=(requested==='ja'||requested==='en')?requested:(localStorage.getItem(key)||'en');
  if(lang!=='ja')lang='en';

  // Load the editorial polish / bilingual typography layer on every page.
  if(!document.querySelector('link[data-lyk-polish]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='assets/polish.css';
    link.dataset.lykPolish='true';
    document.head.appendChild(link);
  }

  // Load the high-resolution field-photo replacement layer.
  if(!document.querySelector('script[data-lyk-hires]')){
    const script=document.createElement('script');
    script.src='assets/highres-loader.js';
    script.defer=true;
    script.dataset.lykHires='true';
    document.head.appendChild(script);
  }

  const apply=()=>{
    document.documentElement.lang=lang;
    document.documentElement.dataset.lang=lang;

    // CSS in polish.css controls visibility. Remove any stale inline display
    // values left by older versions of the language switcher.
    document.querySelectorAll('[data-en],[data-ja]').forEach(el=>{
      el.style.removeProperty('display');
    });

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

  // Set the document language immediately, then apply once DOM is available.
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