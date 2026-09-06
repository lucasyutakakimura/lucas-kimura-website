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