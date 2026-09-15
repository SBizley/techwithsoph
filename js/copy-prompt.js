// Adds a "Copy" button to every .prompt-block on the page so people can
// grab a prompt without hand-selecting the text.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.prompt-block').forEach(function (block) {
    var text = block.textContent.trim();

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'prompt-copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy this prompt');

    btn.addEventListener('click', function () {
      var done = function () {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {
          fallbackCopy(text);
          done();
        });
      } else {
        fallbackCopy(text);
        done();
      }
    });

    block.appendChild(btn);
  });

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }
});
