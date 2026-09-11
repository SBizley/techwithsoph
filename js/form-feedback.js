// Tech with Soph: inline success/error feedback for the "learn-request"
// forms, so submitting doesn't just silently reload the page.

document.addEventListener('DOMContentLoaded', function () {
  var forms = document.querySelectorAll('form[data-ajax-form]');

  forms.forEach(function (form) {
    var status = form.parentElement.querySelector('.form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      var body = new URLSearchParams(new FormData(form)).toString();

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Bad response');
          form.hidden = true;
          if (status) {
            status.hidden = false;
            status.className = 'form-status success';
            status.textContent = "Got it, thank you. I read every one of these myself. Left an email? I'll get back to you. Didn't? Keep an eye on the site, this is exactly the kind of thing that turns into a new page.";
          }
        })
        .catch(function () {
          if (submitBtn) submitBtn.disabled = false;
          if (status) {
            status.hidden = false;
            status.className = 'form-status error';
            status.textContent = "That didn't send. Might just be your connection, worth trying again in a minute.";
          }
        });
    });
  });
});
