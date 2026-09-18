// Tech with Soph: scroll reveal for repeated content, numbered step
// timelines, card grids, term/path lists. Progressive enhancement
// only. If JS or IntersectionObserver isn't available, or the
// visitor has reduced motion turned on, everything just stays
// visible, nothing here is required to read the content.

document.addEventListener('DOMContentLoaded', function () {
  if (!('IntersectionObserver' in window)) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('step-hidden', 'reveal-hidden');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  // Numbered step timelines (own connecting-line component).
  document.querySelectorAll('.steps').forEach(function (group) {
    var items = group.querySelectorAll('.step');
    items.forEach(function (step, i) {
      step.classList.add('step-hidden');
      step.style.transitionDelay = (i * 90) + 'ms';
      observer.observe(step);
    });
  });

  // Repeated cards, term rows and path rows: a lighter shared fade
  // and rise, staggered within whichever list or grid they sit in.
  var groups = document.querySelectorAll('.grid, .card-stack, .term-list, .path-list');
  groups.forEach(function (group) {
    var items = group.querySelectorAll('.card, .term-row, .path-row');
    items.forEach(function (item, i) {
      item.classList.add('reveal-hidden');
      item.style.transitionDelay = Math.min(i * 60, 360) + 'ms';
      observer.observe(item);
    });
  });
});
