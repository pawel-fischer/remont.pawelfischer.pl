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