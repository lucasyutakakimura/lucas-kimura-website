(()=>{
  const visuals=[
    {
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
    },
    {
      selector:'[data-galaxea-prepost]',
      parts:Array.from({length:6},(_,i)=>`assets/images/publications/reefcomparison.${String(i).padStart(2,'0')}.part`)
    }
  ];

  const objectUrls=[];

  function installFigureStyles(){
    if(document.getElementById('galaxea-field-figure-styles')) return;
    const style=document.createElement('style');
    style.id='galaxea-field-figure-styles';
    style.textContent=`
      .galaxea-field-figure{margin:28px 0 26px;padding:14px;background:#fff;border:1px solid #ccd8d6;box-shadow:0 15px 36px rgba(8,31,35,.10)}
      .galaxea-field-figure__label{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0 0 10px;color:#547174;font-size:10px;font-weight:700;letter-spacing:.10em;text-transform:uppercase}
      .galaxea-field-figure__label span:last-child{color:#2f7d86}
      .galaxea-field-figure img{display:block;width:100%;height:auto;aspect-ratio:1250/428;object-fit:cover;background:#d8e4e4}
      .galaxea-field-figure figcaption{margin:12px 1px 0;padding-top:11px;border-top:1px solid #dbe2df;color:#596869;font-size:12px;line-height:1.72}
      html[data-lang="ja"] .galaxea-field-figure__label{text-transform:none;letter-spacing:.04em}
      html[data-lang="ja"] .galaxea-field-figure figcaption{line-height:1.9}
      @media(max-width:720px){.galaxea-field-figure{margin:23px 0;padding:9px}.galaxea-field-figure__label{align-items:flex-start;flex-direction:column;gap:3px}.galaxea-field-figure figcaption{font-size:11px}}
    `;
    document.head.appendChild(style);
  }

  function ensurePrePostFigure(){
    if(document.querySelector('.galaxea-field-figure')) return;
    const summary=document.querySelector('#pub-2024 .pub-feature-copy .summary');
    if(!summary) return;

    const figure=document.createElement('figure');
    figure.className='galaxea-field-figure';
    figure.innerHTML=`
      <div class="galaxea-field-figure__label">
        <span><span data-en>Field evidence</span><span data-ja>現場の変化</span></span>
        <span>Pre → Post Typhoon Khanun</span>
      </div>
      <img data-galaxea-prepost src="assets/images/reef-hero-hq.avif" alt="Representative photographs of the coral reef in Kakinouchi before and after Typhoon Khanun">
      <figcaption>
        <span data-en><strong>Fig. 3.</strong> Representative photographs of the coral reef in Kakinouchi: (A) before and (B) after Typhoon Khanun. Following the typhoon, the reef visibly shifted from a topographically complex coral habitat toward a flatter, rubble-dominated seascape.</span>
        <span data-ja><strong>Fig. 3.</strong> 垣ノ内のサンゴ礁景観。（A）台風Khanun通過前、（B）通過後。台風後には、立体的で複雑なサンゴ群集から、瓦礫が卓越するより平坦な景観への明瞭な変化が確認されました。</span>
      </figcaption>`;
    summary.insertAdjacentElement('afterend',figure);
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
    for(const visual of visuals){
      try{
        const url=await build(visual.parts);
        document.querySelectorAll(visual.selector).forEach(img=>{img.src=url;});
      }catch(error){
        console.warn(`Publication visual could not be assembled for ${visual.selector}; fallback image remains active.`,error);
      }
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();

  window.addEventListener('pagehide',()=>objectUrls.forEach(url=>URL.revokeObjectURL(url)),{once:true});
})();