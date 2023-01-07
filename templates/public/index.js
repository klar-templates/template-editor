function createRipple(event) {
  const el = event.currentTarget;

  const circle = document.createElement('span');
  const diameter = Math.max(el.clientWidth, el.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  
  circle.style.left = `${((event.clientX - el.offsetLeft) + window.pageXOffset) - radius}px`;
  circle.style.top = `${((event.clientY - el.offsetTop) + window.pageYOffset) - radius}px`;
  circle.style.transform = 'scale(0)';
  circle.classList.add('ripple');

  const ripple = el.querySelector('.ripple');

  if (ripple) {
    ripple.remove();
  }

  el.appendChild(circle);
}

const elArr = document.querySelectorAll('.btn:not([data-ripple="false"])');
for (const el of elArr) {
  el.addEventListener('click', createRipple);
}

const navigate = KlarNavigate;
const links = document.querySelectorAll('[data-href^="/"]');
for (const link of links) {
  if (link.pathname.startsWith('/')) {
    function navigateTo(e) {
      e.preventDefault();
      const url = link.getAttribute('data-href');
      if (document.location.pathname !== url) {
        console.log(document.location.pathname)
        console.log(url)
        navigate(url);
      } else {
        console.log('nothing happens')
      }
    }
    link.addEventListener('click', navigateTo);
    function removeNavigateTo() {
      console.log('tog bort lyssnaren')
      link.removeEventListener('click', navigateTo);
    }
  }
}