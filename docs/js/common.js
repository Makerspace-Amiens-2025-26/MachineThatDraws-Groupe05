(function(){
  // Theme toggle
  const t=document.querySelector('[data-theme-toggle]'),r=document.documentElement;
  let d=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
  r.setAttribute('data-theme',d);
  function setIcon(mode){
    if(!t)return;
    t.innerHTML=mode==='dark'
      ?'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      :'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    t.setAttribute('aria-label','Basculer en mode '+(mode==='dark'?'clair':'sombre'));
  }
  setIcon(d);
  t&&t.addEventListener('click',()=>{ d=d==='dark'?'light':'dark'; r.setAttribute('data-theme',d); setIcon(d); });

  // Scrolled header
  const h=document.getElementById('site-header');
  if(h) window.addEventListener('scroll',()=>h.classList.toggle('scrolled',scrollY>10),{passive:true});

  // Mobile nav toggle
  const btn=document.getElementById('nav-toggle'),menu=document.getElementById('tab-menu');
  if(btn&&menu) btn.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    btn.setAttribute('aria-expanded',String(open));
  });
  // Close mobile menu on link click
  menu&&menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

  // Reveal on scroll
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
  }),{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach((el,i)=>{
    el.style.transitionDelay=(i*55)+'ms';
    obs.observe(el);
  });
})();
