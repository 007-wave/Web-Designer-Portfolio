// Intersection Observer for reveal animations
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Animate counters
function animateCounter(el){
  const span = el.querySelector('span');
  const target = Number(el.dataset.target || 0);
  const dur = 1200;
  const start = performance.now();
  function tick(now){
    const p = Math.min(1,(now-start)/dur);
    const val = Math.floor(target * (0.2 + 0.8 * p*p));
    span.textContent = val.toLocaleString('en-ZA');
    if(p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll('.counter').forEach(animateCounter);

// Skill bars
function fillBars(scope=document){
  scope.querySelectorAll('.bar').forEach(bar=>{
    const pct = Number(bar.dataset.level || 0);
    // delay slightly for nicer cascade
    setTimeout(()=>bar.style.setProperty('--pct', pct), 100);
  });
}
fillBars();

// Timeline
const timeline = document.querySelector('.timeline');
if(timeline){
  const days = Number(timeline.dataset.days || 14);
  for(let i=0;i<days;i++){
    const seg = document.createElement('div');
    if(i<days) seg.classList.add('active');
    timeline.appendChild(seg);
  }
}

// Demo countdown (14 days -> hh:mm:ss)
const cd = document.querySelector('.countdown');
if(cd){
  let remaining = Number(cd.dataset.seconds || 1209600);
  const dEl = cd.querySelector('.d');
  const hEl = cd.querySelector('.h');
  const mEl = cd.querySelector('.m');
  const sEl = cd.querySelector('.s');

  function render(){
    let sec = Math.max(0, remaining);
    const days = Math.floor(sec/86400); sec-= days*86400;
    const hrs  = Math.floor(sec/3600);  sec-= hrs*3600;
    const mins = Math.floor(sec/60);    sec-= mins*60;
    const secs = sec;

    dEl.textContent = days;
    hEl.textContent = String(hrs).padStart(2,'0');
    mEl.textContent = String(mins).padStart(2,'0');
    sEl.textContent = String(secs).padStart(2,'0');
  }
  render();
  setInterval(()=>{ remaining--; render(); }, 1000);
}

// Scroll-triggered reveal
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.3 } // Trigger when 30% of element is visible
);

revealElements.forEach(el => observer.observe(el));

// Optional: Animated number / counter demo for stats
// (If you want to dynamically count up numbers)
const stats = document.querySelectorAll('.stat-item');

stats.forEach(stat => {
  stat.addEventListener('mouseenter', () => {
    // Example: simple “pop” animation
    stat.style.transform = 'scale(1.05)';
    setTimeout(() => { stat.style.transform = 'scale(1)'; }, 200);
  });
});

