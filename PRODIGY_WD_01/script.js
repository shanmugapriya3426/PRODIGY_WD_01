document.addEventListener('DOMContentLoaded', function(){
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav ul');
  const navLinks = document.querySelectorAll('.nav a');

  function onScroll(){
    if(window.scrollY > 50) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  }

  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  navToggle.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });

  document.addEventListener('click', function(e){
    if(!e.target.closest('.header')){
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    }
  });

  navLinks.forEach(link =>{
    link.addEventListener('mouseenter', ()=> link.classList.add('hovered'));
    link.addEventListener('mouseleave', ()=> link.classList.remove('hovered'));
    link.addEventListener('focus', ()=> link.classList.add('hovered'));
    link.addEventListener('blur', ()=> link.classList.remove('hovered'));
    link.addEventListener('click', ()=>{
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    });
  });

  // ------- Contact form + image preview/upload (client-side demo) -------
  const form = document.getElementById('contact-form');
  const photosInput = document.getElementById('photos');
  const preview = document.getElementById('preview');
  const status = document.getElementById('form-status');

  // Keep our own mutable list of files so we can remove items
  let selectedFiles = [];

  function renderPreview(){
    preview.innerHTML = '';
    selectedFiles.forEach((file, idx) =>{
      const url = URL.createObjectURL(file);
      const div = document.createElement('div');
      div.className = 'thumb';
      const img = document.createElement('img'); img.src = url; img.alt = file.name;
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'remove'; btn.textContent = '✕';
      btn.addEventListener('click', ()=>{
        selectedFiles.splice(idx,1);
        updateInputFiles();
        renderPreview();
      });
      div.appendChild(img); div.appendChild(btn); preview.appendChild(div);
    });
  }

  function updateInputFiles(){
    // Build a new FileList using DataTransfer
    const dt = new DataTransfer();
    selectedFiles.forEach(f => dt.items.add(f));
    photosInput.files = dt.files;
  }

  photosInput.addEventListener('change', (e)=>{
    const files = Array.from(e.target.files || []);
    // Accept only image files and limit size to 5MB per file
    const valid = files.filter(f => f.type.startsWith('image/') && f.size <= 5 * 1024 * 1024);
    // append valid files
    selectedFiles = selectedFiles.concat(valid);
    updateInputFiles();
    renderPreview();
    if(files.length !== valid.length){
      status.textContent = 'Some files were ignored (non-image or too large >5MB)';
    } else {
      status.textContent = '';
    }
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    formData.set('photos', photosInput.files);
    // demo submit: show a success message and reset
    status.textContent = 'Sending...';
    setTimeout(()=>{
      status.textContent = 'Message sent (demo). ' + (selectedFiles.length ? `${selectedFiles.length} image(s) attached.` : 'No images attached.');
      form.reset();
      selectedFiles = [];
      renderPreview();
      updateInputFiles();
    }, 700);
  });

  // ------- Smooth scroll for nav links and reveal-on-scroll animations -------
  // smooth scroll fallback for browsers without CSS support (also prevents default jump)
  document.querySelectorAll('.nav a[href^="#"]').forEach(a =>{
    a.addEventListener('click', (ev)=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        ev.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Reveal-on-scroll with IntersectionObserver and stagger
  const revealTargets = [];
  document.querySelectorAll('.hero-inner, .section, .card, .rec-card, .plan-card, .footer').forEach((el,i)=>{
    el.classList.add('reveal','staggered');
    el.style.setProperty('--reveal-delay', `${i * 70}ms`);
    revealTargets.push(el);
  });

  const ro = new IntersectionObserver((entries, obs) =>{
    entries.forEach(entry =>{
      if(entry.isIntersecting){
        const el = entry.target;
        // small randomization to make appearance natural
        const delay = parseInt(getComputedStyle(el).getPropertyValue('--reveal-delay')) || 0;
        setTimeout(()=> el.classList.add('visible'), delay);
        obs.unobserve(el);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});

  revealTargets.forEach(t => ro.observe(t));
});
