// Tech with Soph: "which tool for what" task picker.
// Click a task chip, jump to and highlight the matching tool card.
// Click the same chip again to clear the pick.

document.addEventListener('DOMContentLoaded', function () {
  var chips = document.querySelectorAll('.chip[data-target]');
  var cards = document.querySelectorAll('.card[id^="tool-"]');

  if (!chips.length || !cards.length) return;

  chips.forEach(function (chip) {
    chip.setAttribute('aria-pressed', 'false');

    chip.addEventListener('click', function () {
      var wasActive = chip.classList.contains('active');
      var targetCard = document.getElementById('tool-' + chip.dataset.target);

      chips.forEach(function (c) {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      cards.forEach(function (c) { c.classList.remove('picked'); });

      if (!wasActive && targetCard) {
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
        targetCard.classList.add('picked');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
});
