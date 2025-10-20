
document.addEventListener('DOMContentLoaded', () => {
  // mobile menu
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  toggle && toggle.addEventListener('click', () => links.classList.toggle('open'));

  // smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){ e.preventDefault(); document.querySelector(href).scrollIntoView({behavior:'smooth'}); }
    });
  });

  // register service worker
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(()=>{});
  }
});

function submitForm(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const note = document.getElementById('formNote');
  if(!name||!email||!message){ note.textContent = 'Please fill required fields.'; return; }
  const body = encodeURIComponent('Name: '+name+'\nEmail: '+email+'\nMessage:\n'+message);
  window.location.href = 'mailto:jaimeetechnolabs@gmail.com?subject='+encodeURIComponent('Demo request')+'&body='+body;
  note.textContent = 'Opening email client to send your request.';
}
