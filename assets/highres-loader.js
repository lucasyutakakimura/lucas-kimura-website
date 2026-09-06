(()=>{
  const parts=[
    'assets/images/hires2/hero.00.part',
    'assets/images/hires2/hero.01.part',
    'assets/images/hires2/hero.02.part',
    'assets/images/hires2/hero.03.part',
    'assets/images/hires2/hero.04.part'
  ];
  let objectUrl=null;

  async function buildHero(){
    const chunks=[];
    for(const path of parts){
      const response=await fetch(path,{cache:'force-cache'});
      if(!response.ok) throw new Error(`Unable to load ${path}`);
      chunks.push((await response.text()).trim());
    }
    const binary=atob(chunks.join(''));
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
    objectUrl=URL.createObjectURL(new Blob([bytes],{type:'image/avif'}));
    return objectUrl;
  }

  async function apply(){
    try{
      const url=await buildHero();
      document.querySelectorAll('.hero>img,.stories article:nth-child(2) img,.field-grid a:nth-child(1) img,.field-notes article:nth-child(1) img').forEach(img=>{
        img.src=url;
        img.removeAttribute('srcset');
      });
    }catch(error){
      console.warn('High-resolution hero image could not be assembled; optimized fallback remains active.',error);
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
  window.addEventListener('pagehide',()=>{if(objectUrl)URL.revokeObjectURL(objectUrl);},{once:true});
})();