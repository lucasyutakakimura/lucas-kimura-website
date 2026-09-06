(()=>{
  const galaxeaVisual={
    selector:'[data-galaxea-visual]',
    parts:[
      'assets/images/publications/galaxea.00.part',
      'assets/images/publications/galaxea.01.part',
      'assets/images/publications/galaxea.02.part',
      'assets/images/publications/galaxea.03.part',
      'assets/images/publications/galaxea.04.part',
      'assets/images/publications/galaxea.05.part',
      'assets/images/publications/galaxea.06.part',
      'assets/images/publications/galaxea.07.part',
      'assets/images/publications/galaxea.08.part',
      'assets/images/publications/galaxea.09.part',
      'assets/images/publications/galaxea.10a.part',
      'assets/images/publications/galaxea.10b.part',
      'assets/images/publications/galaxea.11.part'
    ]
  };

  const objectUrls=[];

  function installFigureStyles(){
    if(document.getElementById('galaxea-field-figure-styles')) return;
    const style=document.createElement('style');
    style.id='galaxea-field-figure-styles';
    style.textContent=`
      .galaxea-field-figure{max-width:1260px;margin:34px auto 0;padding:18px;background:#f4f1ea;color:#102023;border:1px solid rgba(255,255,255,.16);box-shadow:0 28px 75px rgba(0,0,0,.18)}
      .galaxea-field-figure__head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding:4px 2px 14px}
      .galaxea-field-figure__kicker{margin:0;color:#327986;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
      .galaxea-field-figure__transition{margin:0;color:#244447;font-size:12px;font-weight:700;letter-spacing:.05em}
      .galaxea-field-figure a{display:block;overflow:hidden;background:#d8e4e4}
      .galaxea-field-figure img{display:block;width:100%;height:auto;aspect-ratio:1502/512;object-fit:cover;object-position:center;background:#d8e4e4;transition:transform .35s ease}
      .galaxea-field-figure a:hover img{transform:scale(1.006)}
      .galaxea-field-figure figcaption{margin:15px 2px 1px;padding-top:14px;border-top:1px solid #d4ddda;color:#596869;font-size:12px;line-height:1.78}
      html[data-lang="ja"] .galaxea-field-figure__kicker{text-transform:none;letter-spacing:.04em}
      html[data-lang="ja"] .galaxea-field-figure figcaption{line-height:1.95}
      @media(max-width:720px){
        .galaxea-field-figure{margin-top:22px;padding:10px}
        .galaxea-field-figure__head{align-items:flex-start;flex-direction:column;gap:4px;padding:3px 1px 9px}
        .galaxea-field-figure img{aspect-ratio:auto}
        .galaxea-field-figure figcaption{font-size:11px;margin-top:10px;padding-top:10px}
      }
    `;
    document.head.appendChild(style);
  }

  function ensurePrePostFigure(){
    if(document.querySelector('.galaxea-field-figure')) return;
    const feature=document.querySelector('#pub-2024 .pub-feature');
    if(!feature) return;

    const figure=document.createElement('figure');
    figure.className='galaxea-field-figure';
    figure.innerHTML=`
      <div class="galaxea-field-figure__head">
        <p class="galaxea-field-figure__kicker"><span data-en>Field evidence · Kakinouchi</span><span data-ja>現場写真 · 垣ノ内</span></p>
        <p class="galaxea-field-figure__transition"><span data-en>Before → After Typhoon Khanun</span><span data-ja>台風Khanun 通過前 → 通過後</span></p>
      </div>
      <a href="https://www.jstage.jst.go.jp/article/galaxea/26/1/26_G26N-3/_article/-char/ja/" target="_blank" rel="noopener" aria-label="Open the Galaxea paper on J-STAGE">
        <img src="assets/images/publications/galaxea-prepost.png" loading="lazy" decoding="async" alt="Representative photographs of the coral reef at Kakinouchi before and after Typhoon Khanun">
      </a>
      <figcaption>
        <span data-en><strong>Field comparison.</strong> Representative reef photographs from Kakinouchi before (A) and after (B) Typhoon Khanun. The paired images provide a direct visual context for the ecological and acoustic changes reported in the study.</span>
        <span data-ja><strong>現場比較。</strong> 垣ノ内における台風Khanun通過前（A）と通過後（B）の代表的なサンゴ礁景観。本研究で報告した生態学的・音響学的変化を、現場の景観変化とあわせて視覚的に示しています。</span>
      </figcaption>`;
    feature.insertAdjacentElement('afterend',figure);
  }

  async function build(parts){
    const chunks=[];
    for(const path of parts){
      const response=await fetch(path,{cache:'force-cache'});
      if(!response.ok) throw new Error(`Unable to load ${path}`);
      chunks.push((await response.text()).trim());
    }
    const binary=atob(chunks.join(''));
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
    const url=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
    objectUrls.push(url);
    return url;
  }

  async function apply(){
    installFigureStyles();
    ensurePrePostFigure();
    try{
      const url=await build(galaxeaVisual.parts);
      document.querySelectorAll(galaxeaVisual.selector).forEach(img=>{img.src=url;});
    }catch(error){
      console.warn('Galaxea publication visual could not be assembled; fallback image remains active.',error);
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();

  window.addEventListener('pagehide',()=>objectUrls.forEach(url=>URL.revokeObjectURL(url)),{once:true});
})();