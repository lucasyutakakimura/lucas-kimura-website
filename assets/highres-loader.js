(()=>{
  const sources={
    hero:{
      type:'image/avif',
      parts:[
        'assets/images/hires2/hero.00.part',
        'assets/images/hires2/hero.01.part',
        'assets/images/hires2/hero.02.part',
        'assets/images/hires2/hero.03.part',
        'assets/images/hires2/hero.04.part'
      ]
    },
    bleaching:{
      type:'image/avif',
      parts:[
        'assets/images/hires3/bleach.00.part',
        'assets/images/hires3/bleach.01.part',
        'assets/images/hires3/bleach.02.part'
      ]
    }
  };

  const objectUrls=[];

  async function assemble(source){
    const chunks=[];
    for(const path of source.parts){
      const response=await fetch(path,{cache:'force-cache'});
      if(!response.ok) throw new Error(`Unable to load ${path}`);
      chunks.push((await response.text()).trim());
    }
    const binary=atob(chunks.join(''));
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
    const url=URL.createObjectURL(new Blob([bytes],{type:source.type}));
    objectUrls.push(url);
    return url;
  }

  function installPhotoStyles(){
    if(document.getElementById('home-hq-photo-styles')) return;
    const style=document.createElement('style');
    style.id='home-hq-photo-styles';
    style.textContent=`
      .home-page .hero>img,
      .home-page .stories article>img,
      .home-page .field-grid img,
      .home-photo-essay img{
        width:100%;height:100%;display:block;object-fit:cover;
        image-rendering:auto;-webkit-font-smoothing:antialiased;
      }
      .home-page .hero>img{object-position:center 53%;transform:scale(1.002)!important;}
      .home-page .stories article:nth-child(1)>img{object-position:center 56%;}
      .home-page .stories article:nth-child(2)>img{object-position:center 50%;}
      .home-page .stories article:nth-child(3)>img{object-position:center 58%;}
      .home-page .field-grid a:nth-child(1) img{object-position:center 48%;}
      .home-page .field-grid a:nth-child(2) img{object-position:center 55%;}
      .home-page .field-grid a:nth-child(3) img{object-position:center 58%;}

      .home-photo-essay{background:#071719;color:#eef8f6;padding:0 0 110px;overflow:hidden;}
      .home-photo-essay__head{width:min(1420px,88vw);margin:0 auto;padding:92px 0 34px;display:flex;align-items:end;justify-content:space-between;gap:28px;border-top:1px solid rgba(255,255,255,.16);}
      .home-photo-essay__kicker{font:700 11px/1.4 Inter,'Noto Sans JP',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#9de0e7;}
      .home-photo-essay__head h2{margin:10px 0 0;font:600 clamp(42px,6vw,86px)/.98 Inter,'Noto Sans JP',sans-serif;letter-spacing:-.055em;}
      .home-photo-essay__head p{max-width:470px;margin:0 0 5px;color:#a9bfbc;font-size:13px;line-height:1.75;}
      .home-photo-essay__grid{width:min(1600px,94vw);margin:0 auto;display:grid;grid-template-columns:1.55fr .9fr .9fr;grid-template-rows:minmax(260px,33vw);gap:10px;}
      .home-photo-essay__item{position:relative;overflow:hidden;background:#0d282c;isolation:isolate;}
      .home-photo-essay__item:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,15,18,.62),transparent 48%);pointer-events:none;}
      .home-photo-essay__item img{transition:transform .8s cubic-bezier(.2,.7,.2,1),filter .5s ease;}
      .home-photo-essay__item:hover img{transform:scale(1.025);filter:saturate(1.05) contrast(1.02);}
      .home-photo-essay__item:first-child img{object-position:center 47%;}
      .home-photo-essay__item:nth-child(2) img{object-position:center 54%;}
      .home-photo-essay__item:nth-child(3) img{object-position:center 58%;}
      .home-photo-essay__caption{position:absolute;z-index:2;left:22px;right:22px;bottom:20px;display:flex;justify-content:space-between;align-items:end;gap:16px;color:#fff;}
      .home-photo-essay__caption span:first-child{font:700 10px/1.4 Inter,'Noto Sans JP',sans-serif;letter-spacing:.13em;text-transform:uppercase;color:#c8f0f3;}
      .home-photo-essay__caption strong{font:500 15px/1.35 Inter,'Noto Sans JP',sans-serif;}
      html[data-lang='ja'] .home-photo-essay__kicker,html[data-lang='ja'] .home-photo-essay__caption span:first-child{text-transform:none;letter-spacing:.07em;}
      html[data-lang='ja'] .home-photo-essay__head h2{line-height:1.2;letter-spacing:-.045em;}
      @media(max-width:900px){
        .home-photo-essay{padding-bottom:78px;}
        .home-photo-essay__head{width:90vw;padding-top:70px;display:block;}
        .home-photo-essay__head p{margin-top:18px;}
        .home-photo-essay__grid{width:90vw;grid-template-columns:1fr 1fr;grid-template-rows:56vw 46vw;}
        .home-photo-essay__item:first-child{grid-column:1/-1;}
      }
      @media(max-width:620px){
        .home-photo-essay__grid{grid-template-columns:1fr;grid-template-rows:68vw 68vw 68vw;}
        .home-photo-essay__item:first-child{grid-column:auto;}
        .home-photo-essay__caption{left:16px;right:16px;bottom:15px;}
      }
    `;
    document.head.appendChild(style);
  }

  function insertPhotoEssay(){
    if(document.querySelector('.home-photo-essay')) return;
    const research=document.querySelector('#research');
    if(!research) return;
    const section=document.createElement('section');
    section.className='home-photo-essay';
    section.setAttribute('aria-label','Field photography from coral reef research');
    section.innerHTML=`
      <div class="home-photo-essay__head">
        <div>
          <div class="home-photo-essay__kicker"><span data-en>FIELD / VISUAL NOTES</span><span data-ja>フィールド / 写真記録</span></div>
          <h2><span data-en>Reefs in view.</span><span data-ja>サンゴ礁を、記録する。</span></h2>
        </div>
        <p><span data-en>Field photographs from Okinawa and the Ryukyu Archipelago—reef structure, fishes and ecological change observed underwater.</span><span data-ja>沖縄・琉球列島の水中調査から。サンゴ礁の構造、魚類群集、そして生態系の変化を写真として記録しています。</span></p>
      </div>
      <div class="home-photo-essay__grid">
        <a class="home-photo-essay__item" href="fieldwork.html">
          <img data-home-hq="hero" src="assets/images/reef-hero-hq.avif" loading="lazy" decoding="async" alt="Reef fishes above coral habitat in Okinawa">
          <div class="home-photo-essay__caption"><span><span data-en>REEF FISHES</span><span data-ja>サンゴ礁魚類</span></span><strong><span data-en>Okinawa</span><span data-ja>沖縄</span></strong></div>
        </a>
        <a class="home-photo-essay__item" href="fieldwork.html">
          <img src="assets/images/reef-ecology-hq.avif" loading="lazy" decoding="async" alt="Coral reef habitat in the Ryukyu Archipelago">
          <div class="home-photo-essay__caption"><span><span data-en>REEF STRUCTURE</span><span data-ja>サンゴ礁構造</span></span><strong><span data-en>Ryukyu Archipelago</span><span data-ja>琉球列島</span></strong></div>
        </a>
        <a class="home-photo-essay__item" href="fieldwork.html">
          <img data-home-hq="bleaching" src="assets/images/coral-bleaching-hires.avif" loading="lazy" decoding="async" alt="Coral bleaching and thermal stress in Okinawa">
          <div class="home-photo-essay__caption"><span><span data-en>ECOLOGICAL CHANGE</span><span data-ja>生態系変化</span></span><strong><span data-en>Thermal stress</span><span data-ja>熱ストレス</span></strong></div>
        </a>
      </div>`;
    research.insertAdjacentElement('afterend',section);
  }

  function applyLanguageAccessibility(){
    const lang=document.documentElement.dataset.lang==='ja'?'ja':'en';
    const essay=document.querySelector('.home-photo-essay');
    if(essay) essay.setAttribute('aria-label',lang==='ja'?'サンゴ礁研究のフィールド写真':'Field photography from coral reef research');
  }

  async function apply(){
    installPhotoStyles();
    insertPhotoEssay();

    let heroUrl=null;
    let bleachingUrl=null;
    try{heroUrl=await assemble(sources.hero);}catch(error){console.warn('High-resolution hero could not be assembled; fallback remains active.',error);}
    try{bleachingUrl=await assemble(sources.bleaching);}catch(error){console.warn('High-resolution bleaching image could not be assembled; fallback remains active.',error);}

    if(heroUrl){
      document.querySelectorAll('.hero>img,.stories article:nth-child(2) img,.field-grid a:nth-child(1) img,[data-home-hq="hero"]').forEach(img=>{
        img.src=heroUrl;
        img.removeAttribute('srcset');
      });
    }
    if(bleachingUrl){
      document.querySelectorAll('.stories article:nth-child(3) img,.field-grid a:nth-child(3) img,[data-home-hq="bleaching"]').forEach(img=>{
        img.src=bleachingUrl;
        img.removeAttribute('srcset');
      });
    }
    applyLanguageAccessibility();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
  document.addEventListener('lyk:languagechange',applyLanguageAccessibility);
  window.addEventListener('pagehide',()=>objectUrls.forEach(url=>URL.revokeObjectURL(url)),{once:true});
})();