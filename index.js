const form = document.getElementById("contact-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData(form);

  fetch('sendMail.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    console.log('response', response);
    
    if (response.ok) {
      return response.text();
    } else {
      throw new Error('Wystąpił błąd');
    }
  })
  .then(data => {
    form.reset();
    showToast('Wiadomość wysłana!', 'success');
  })
  .catch(error => {
    showToast('Coś poszło nie tak. Spróbuj ponownie.', 'error');
  });
});


function showToast(message, type) {
  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  toast.textContent = message;
  
  document.getElementById('toast-container').appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 3000);
}

const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');

  menuToggle.addEventListener('click', () => {
    nav.classList.add('active');
    menuToggle.classList.add('hidden');
  });

  menuClose.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.classList.remove('hidden');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuToggle.classList.remove('hidden');
    });
  });

  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;
  let ticking = false;
  let scrollListenerAdded = false;
  const alwaysShowThreshold = 100;
  
  function updateHeaderVisibility() {
    const currentScrollY = window.scrollY;
    console.log(currentScrollY);
  
    if (currentScrollY < alwaysShowThreshold) {
      header.style.transform = 'translateY(0)';
    } else if (currentScrollY < lastScrollY) {
      header.style.transform = 'translateY(0)';
    } else {
      header.style.transform = 'translateY(-100%)';
    }
  
    lastScrollY = currentScrollY;
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateHeaderVisibility);
      ticking = true;
    }
  }
  
  function enableMobileHeaderBehavior() {
    if (!scrollListenerAdded) {
      window.addEventListener('scroll', onScroll);
      scrollListenerAdded = true;
    }
  }
  
  function disableMobileHeaderBehavior() {
    if (scrollListenerAdded) {
      window.removeEventListener('scroll', onScroll);
      header.style.transform = 'translateY(0)';
      scrollListenerAdded = false;
      ticking = false;
    }
  }
  
  function checkViewportWidth() {
    if (window.innerWidth < 768) {
      enableMobileHeaderBehavior();
    } else {
      disableMobileHeaderBehavior();
    }
  }
  
  window.addEventListener('load', checkViewportWidth);
  window.addEventListener('resize', checkViewportWidth);  
