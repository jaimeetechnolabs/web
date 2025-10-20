
/* main.js - navigation, form handling, pwa registration */
document.addEventListener('DOMContentLoaded', function(){
  // mobile nav toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if(hamburger){
    hamburger.addEventListener('click', ()=> {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
        if(navLinks.classList.contains('open')){
          navLinks.classList.remove('open');
        }
      }
    });
  });

  // simple form handling - mailto fallback
  window.submitForm = function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');
    if(!name||!email||!message){
      formMessage.textContent = 'Please complete required fields.';
      return;
    }
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
    const mailto = `mailto:jaimeetechnolabs@gmail.com?subject=${encodeURIComponent('New project inquiry from website')}&body=${body}`;
    formMessage.innerHTML = 'Opening email client...';
    window.location.href = mailto;
  };

  // register service worker
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(()=>{console.log('SW failed');});
  }
});
