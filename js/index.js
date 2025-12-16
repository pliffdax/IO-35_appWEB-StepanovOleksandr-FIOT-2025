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
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', href);
  });
})();

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

(function(){
  const form = document.querySelector('.feedback-form');
  if (!form) return;

  const nameInput = form.querySelector('input[name="name"]');
  const reviewInput = form.querySelector('textarea[name="review"]');
  const nameError = document.getElementById('feedback-name-error');
  const reviewError = document.getElementById('feedback-review-error');
  const success = document.getElementById('feedback-success');

  const MIN_NAME = 2;
  const MIN_REVIEW = 15;

  function clearSuccess(){
    if (success) success.textContent = '';
  }

  function setError(input, errorEl, message){
    if (input) input.classList.add('is-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('is-visible');
    }
  }

  function clearError(input, errorEl){
    if (input) input.classList.remove('is-error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('is-visible');
    }
  }

  function validate(){
    clearSuccess();
    let ok = true;

    const name = (nameInput?.value || '').trim();
    if (name.length < MIN_NAME) {
      ok = false;
      setError(nameInput, nameError, `Ім'я має містити щонайменше ${MIN_NAME} символи.`);
    } else {
      clearError(nameInput, nameError);
    }

    const review = (reviewInput?.value || '').trim();
    if (review.length < MIN_REVIEW) {
      ok = false;
      setError(reviewInput, reviewError, `Відгук має містити щонайменше ${MIN_REVIEW} символів.`);
    } else {
      clearError(reviewInput, reviewError);
    }

    return ok;
  }

  nameInput?.addEventListener('input', validate);
  reviewInput?.addEventListener('input', validate);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    form.reset();
    clearError(nameInput, nameError);
    clearError(reviewInput, reviewError);
    if (success) success.textContent = 'Дякуємо! Ваш відгук прийнято.';
  });
})();
