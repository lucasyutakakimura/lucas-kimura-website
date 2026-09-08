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

  function installStyles(){
    if(document.getElementById('home-hq-photo-styles')) return;
    const style=document.createElement('style');
    style.id='home-hq-photo-styles';
    style.textContent=`
      .home-page .hero>img,
      .home-page .stories article>img{
        width:100%;height:100%;display:block;object-fit:cover;image-rendering:auto;
      }
      .home-page .hero>img{object-position:center 53%;transform:scale(1.002)!important;}
      .home-page .stories article:nth-child(1)>img{object-position:center 56%;}
      .home-page .stories article:nth-child(2)>img{object-position:center 50%;}
      .home-page .stories article:nth-child(3)>img{object-position:center 58%;}
    `;
    document.head.appendChild(style);
  }

  async function apply(){
    installStyles();
    let heroUrl=null;
    let bleachingUrl=null;
    try{heroUrl=await assemble(sources.hero);}catch(error){console.warn('High-resolution hero could not be assembled; fallback remains active.',error);}
    try{bleachingUrl=await assemble(sources.bleaching);}catch(error){console.warn('High-resolution bleaching image could not be assembled; fallback remains active.',error);}

    if(heroUrl){
    document.querySelectorAll('.stories article:nth-child(2) img').forEach(img=>{
  img.src=heroUrl;
  img.removeAttribute('srcset');
});
    }
    if(bleachingUrl){
      document.querySelectorAll('.stories article:nth-child(3) img').forEach(img=>{
        img.src=bleachingUrl;
        img.removeAttribute('srcset');
      });
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
  window.addEventListener('pagehide',()=>objectUrls.forEach(url=>URL.revokeObjectURL(url)),{once:true});
})();
