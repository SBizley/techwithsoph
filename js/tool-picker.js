// Tech with Soph: "which tool for what" finder.
// A short two-question branch that lands on one recommended tool,
// modelled on how the good product-finder quizzes do it: a couple
// of plain questions, then one clear answer with a reason attached.

document.addEventListener('DOMContentLoaded', function () {
  var quiz = document.getElementById('tool-quiz');
  var body = document.getElementById('quiz-body');
  if (!quiz || !body) return;

  var dots = quiz.querySelectorAll('.quiz-dot');
  var cards = document.querySelectorAll('.card[id^="tool-"]');

  var toolNames = {
    chatgpt: 'ChatGPT',
    claude: 'Claude',
    gemini: 'Gemini',
    lovable: 'Lovable',
    notebooklm: 'NotebookLM',
    copilot: 'Copilot',
    perplexity: 'Perplexity'
  };

  var tree = {
    start: {
      question: 'What do you want AI to help with?',
      options: [
        {
          label: 'Everyday writing, quick questions, images',
          next: 'result',
          result: 'chatgpt',
          reason: "It's the strongest all-rounder for quick, one-off help, and it's also my go-to recommendation for image generation."
        },
        { label: 'An ongoing project', next: 'ongoing' },
        {
          label: 'Building something real, an app, website or tracker',
          next: 'result',
          result: 'lovable',
          reason: 'Describe what you want in plain English and it builds a working version, no coding needed from you.'
        },
        { label: 'Tools I already use every day', next: 'daily' }
      ]
    },
    ongoing: {
      question: 'Writing and thinking things through, digging through your own documents, or researching something on the web?',
      options: [
        {
          label: 'Writing and thinking things through',
          next: 'result',
          result: 'claude',
          reason: "Claude is built for exactly this, a project it remembers across sessions rather than a chat that starts cold every time."
        },
        {
          label: 'Digging through my own documents',
          next: 'result',
          result: 'notebooklm',
          reason: 'Upload your own files and it becomes an expert on exactly that content, with sources you can check.'
        },
        {
          label: 'Researching something on the web',
          next: 'result',
          result: 'perplexity',
          reason: 'It searches, reads the results and gives you an answer with sources you can click through, rather than a page of links to sift through yourself.'
        }
      ]
    },
    daily: {
      question: 'Which world do you live in day to day?',
      options: [
        {
          label: 'Google: Gmail, Calendar, Docs',
          next: 'result',
          result: 'gemini',
          reason: 'Gemini sits directly inside the Google apps you already have open.'
        },
        {
          label: 'Microsoft: Word, Excel, Outlook',
          next: 'result',
          result: 'copilot',
          reason: "Copilot lives right inside Word, Excel and Outlook, so there's nothing extra to open."
        }
      ]
    }
  };

  function setProgress(active) {
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i < active);
    });
  }

  function clearCardHighlight() {
    cards.forEach(function (c) { c.classList.remove('picked'); });
  }

  function renderQuestion(key, showBack) {
    setProgress(showBack ? 2 : 1);
    clearCardHighlight();
    var node = tree[key];

    var html = '';
    if (showBack) html += '<button type="button" class="quiz-back">&larr; Back</button>';
    html += '<p class="quiz-question">' + node.question + '</p><div class="quiz-options">';
    node.options.forEach(function (opt, i) {
      html += '<button type="button" class="quiz-option" data-index="' + i + '">' + opt.label + '</button>';
    });
    html += '</div>';
    body.innerHTML = html;

    var backBtn = body.querySelector('.quiz-back');
    if (backBtn) {
      backBtn.addEventListener('click', function () { renderQuestion('start', false); });
    }

    body.querySelectorAll('.quiz-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var opt = node.options[Number(btn.dataset.index)];
        if (opt.next === 'result') {
          renderResult(opt.result, opt.reason);
        } else {
          renderQuestion(opt.next, true);
        }
      });
    });
  }

  function renderResult(toolId, reason) {
    setProgress(2);
    var html = '<span class="quiz-result-label">Your pick</span>';
    html += '<h3>Use ' + toolNames[toolId] + '</h3>';
    html += '<p>' + reason + '</p>';
    html += '<div class="quiz-result-actions">';
    html += '<button type="button" class="btn btn-primary" id="quiz-see-card">See the full breakdown</button>';
    html += '<button type="button" class="quiz-restart">Start over</button>';
    html += '</div>';
    body.innerHTML = html;

    var targetCard = document.getElementById('tool-' + toolId);
    var seeBtn = document.getElementById('quiz-see-card');
    if (seeBtn) {
      seeBtn.addEventListener('click', function () {
        if (!targetCard) return;
        clearCardHighlight();
        targetCard.classList.add('picked');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    var restartBtn = body.querySelector('.quiz-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', function () { renderQuestion('start', false); });
    }
  }

  renderQuestion('start', false);
});
