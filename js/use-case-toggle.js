// Tech with Soph: expand/collapse for the Use cases prompt blocks.
// Keeps the tag, heading and description always visible so people can
// scan and judge relevance, and hides the actual prompt(s) behind a
// click so the page doesn't turn into one long scroll.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.usecase-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var body = document.getElementById(btn.getAttribute('aria-controls'));
      if (!body) return;
      var nowExpanded = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(nowExpanded));
      body.hidden = !nowExpanded;
    });
  });
});
