// Tech with Soph: scroll reveal for numbered step sequences.
// Progressive enhancement only. If JS or IntersectionObserver isn't
// available, or the visitor has reduced motion turned on, every step
// just stays visible, nothing here is required to read the content.

document.addEventListener('DOMContentLoaded', function () {
  if (!('IntersectionObserver' in window)) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var groups = document.querySelectorAll('.steps');
  if (!groups.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('step-hidden');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

  groups.forEach(function (group) {
    var steps = group.querySelectorAll('.step');
    steps.forEach(function (step, i) {
      step.classList.add('step-hidden');
      step.style.transitionDelay = (i * 90) + 'ms';
      observer.observe(step);
    });
  });
});
