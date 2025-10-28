document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('#hero .hero-image img');

  function updateHeroImage() {
    if (window.innerWidth <= 900) {
      img.src = 'assets/images/bouquet-mobile.png';
    } else {
      img.src = 'assets/images/bouquet-desktop.png';
    }
  }

  updateHeroImage();
  window.addEventListener('resize', updateHeroImage);
});

(function(){
  const btn = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');
  if(!btn || !nav) return;

  function toggle(){
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    nav.dataset.state = open ? 'closed' : 'open';

    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    document.body.style.overflow = (!open && isMobile) ? 'hidden' : '';
  }

  btn.addEventListener('click', toggle);

  nav.addEventListener('click', (e)=>{
    if(e.target.closest('a')){
      btn.setAttribute('aria-expanded','false');
      nav.dataset.state='closed';
      document.body.style.overflow='';
    }
  });

  window.addEventListener('resize', ()=>{
    if (window.matchMedia('(min-width: 901px)').matches) {
      document.body.style.overflow='';
      nav.dataset.state='closed';
      btn.setAttribute('aria-expanded','false');
    }
  });
})();
