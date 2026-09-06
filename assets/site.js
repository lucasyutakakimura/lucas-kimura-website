(()=>{
  const key='lyk-lang';
  const params=new URLSearchParams(location.search);
  const requested=params.get('lang');
  let lang=(requested==='ja'||requested==='en')?requested:(localStorage.getItem(key)||'en');

  const apply=()=>{
    document.documentElement.lang=lang;
    document.documentElement.dataset.lang=lang;
    document.querySelectorAll('[data-en]').forEach(el=>{el.style.display=lang==='en'?'':'none';});
    document.querySelectorAll('[data-ja]').forEach(el=>{el.style.display=lang==='ja'?'':'none';});

    document.querySelectorAll('[data-alt-en]').forEach(el=>{
      el.alt=lang==='ja'?(el.dataset.altJa||el.dataset.altEn):el.dataset.altEn;
    });
    document.querySelectorAll('[data-aria-en]').forEach(el=>{
      el.setAttribute('aria-label',lang==='ja'?(el.dataset.ariaJa||el.dataset.ariaEn):el.dataset.ariaEn);
    });

    const body=document.body;
    const title=lang==='ja'?body.dataset.titleJa:body.dataset.titleEn;
    const description=lang==='ja'?body.dataset.descriptionJa:body.dataset.descriptionEn;
    if(title)document.title=title;
    const meta=document.querySelector('meta[name="description"]');
    if(meta&&description)meta.content=description;

    const b=document.getElementById('lang');
    if(b){
      b.textContent=lang==='en'?'日本語':'EN';
      const label=lang==='en'?'日本語表示に切り替える':'Switch to English';
      b.setAttribute('aria-label',label);
      b.title=label;
    }
  };

  document.addEventListener('DOMContentLoaded',()=>{
    apply();
    const b=document.getElementById('lang');
    if(b)b.addEventListener('click',()=>{
      lang=lang==='en'?'ja':'en';
      localStorage.setItem(key,lang);
      apply();
    });
  });
})();