(()=>{
  const parts=[
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
  ];
  let objectUrl=null;
  async function build(){
    const chunks=[];
    for(const path of parts){
      const response=await fetch(path,{cache:'force-cache'});
      if(!response.ok) throw new Error(`Unable to load ${path}`);
      chunks.push((await response.text()).trim());
    }
    const binary=atob(chunks.join(''));
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
    objectUrl=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
    return objectUrl;
  }
  async function apply(){
    try{
      const url=await build();
      document.querySelectorAll('[data-galaxea-visual]').forEach(img=>{img.src=url;});
    }catch(error){
      console.warn('Galaxea publication visual could not be assembled; fallback image remains active.',error);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  window.addEventListener('pagehide',()=>{if(objectUrl)URL.revokeObjectURL(objectUrl);},{once:true});
})();