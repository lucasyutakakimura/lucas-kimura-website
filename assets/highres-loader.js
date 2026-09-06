(()=>{
  const manifest={
    hero:['assets/images/hires2/hero.00.part','assets/images/hires2/hero.01.part','assets/images/hires2/hero.02.part'],
    bleaching:['assets/images/hires2/bleaching.00.part','assets/images/hires2/bleaching.01.part','assets/images/hires2/bleaching.02.part'],
    stress:['assets/images/hires2/stress.00.part','assets/images/hires2/stress.01.part'],
    ecology:['assets/images/hires2/ecology.00.part','assets/images/hires2/ecology.01.part']
  };
  const urls={};
  async function makeUrl(name){
    if(urls[name])return urls[name];
    const parts=await Promise.all(manifest[name].map(async path=>{
      const r=await fetch(path,{cache:'force-cache'});
      if(!r.ok)throw new Error(`Unable to load ${path}`);
      return (await r.text()).trim();
    }));
    const binary=atob(parts.join(''));
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    urls[name]=URL.createObjectURL(new Blob([bytes],{type:'image/avif'}));
    return urls[name];
  }
  function assign(selector,url){
    document.querySelectorAll(selector).forEach(img=>{
      if(img.tagName==='IMG'){
        img.src=url;
        img.removeAttribute('srcset');
      }
    });
  }
  async function apply(){
    try{
      // Highest-priority visual first.
      const hero=await makeUrl('hero');
      assign('.hero>img',hero);
      assign('.stories article:nth-child(2) img',hero);
      assign('.field-grid a:nth-child(1) img',hero);
      assign('.field-notes article:nth-child(1) img',hero);

      const [ecology,bleaching,stress]=await Promise.all([
        makeUrl('ecology'),makeUrl('bleaching'),makeUrl('stress')
      ]);
      assign('.stories article:nth-child(1) img',ecology);
      assign('.field-grid a:nth-child(2) img',ecology);
      assign('.field-notes article:nth-child(2) img',ecology);

      assign('.stories article:nth-child(3) img',bleaching);
      assign('.field-grid a:nth-child(3) img',stress);
      assign('.field-notes article:nth-child(3) img',stress);
    }catch(err){
      // Existing optimized images remain as a graceful fallback.
      console.warn('High-resolution field photography could not be loaded.',err);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
  window.addEventListener('pagehide',()=>Object.values(urls).forEach(u=>URL.revokeObjectURL(u)),{once:true});
})();