// State lasts for this visit. Reloading starts a new garden.
const form = document.querySelector('#plant-form');
const input = document.querySelector('#intention');
const plantButton = document.querySelector('#plant-button');
const waterButton = document.querySelector('#water');
const resetButton = document.querySelector('#reset');
const scene = document.querySelector('#scene');
const reply = document.querySelector('#response');
const notes = document.querySelector('#notes');
let intention = '';
let waterCount = 0;
const stages = ['A SEED IS PLANTED', 'A FIRST LITTLE SPROUT', 'ROOM TO GROW', 'SOMETHING HAS BLOOMED'];
function remember(message) {
  const placeholder = notes.querySelector('.placeholder');
  if (placeholder) placeholder.remove();
  const item = document.createElement('li');
  item.textContent = message;
  notes.prepend(item);
}
function respond(message) { reply.textContent = message; }
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) {
    respond('Even the smallest intention needs a name. Try “patience” or “a new idea”.');
    input.setAttribute('aria-invalid', 'true');
    input.focus();
    return;
  }
  input.removeAttribute('aria-invalid');
  intention = value;
  waterCount = 0;
  scene.className = 'scene planted';
  input.disabled = true;
  plantButton.disabled = true;
  plantButton.textContent = 'Seed planted ✓';
  waterButton.disabled = false;
  resetButton.disabled = false;
  document.querySelector('#stage-label').textContent = '02 / ' + stages[0];
  document.querySelector('#scene-caption').textContent = 'A small beginning for “' + intention + '”.';
  document.querySelector('#care-hint').textContent = 'Three small acts of care. One at a time.';
  document.querySelector('#progress-text').textContent = '0 OF 3 WATERINGS';
  const familiar = /patience|calm|peace|rest/i.test(intention);
  respond(familiar ? '“' + intention + '” is planted. There’s no need to rush. Give it a little water.' : '“' + intention + '” has a place to begin. Give your seed its first drink.');
  remember('Planted “' + intention + '”.');
  waterButton.focus();
});
waterButton.addEventListener('click', function() {
  if (!intention || waterCount >= 3) return;
  waterCount++;
  scene.className = 'scene planted sprout' + (waterCount >= 2 ? ' growing' : '') + (waterCount === 3 ? ' blooming' : '');
  document.querySelector('#stage-label').textContent = String(waterCount + 2).padStart(2, '0') + ' / ' + stages[waterCount];
  const messages = [
    'A first sprout. “' + intention + '” is beginning to take shape.',
    'New leaves, a stronger stem. “' + intention + '” is growing with your attention.',
    'Look what you made room for. “' + intention + '” has bloomed. Sometimes enough is enough.'
  ];
  respond(messages[waterCount - 1]);
  document.querySelector('#scene-caption').textContent = ['Small things are happening beneath the surface.', 'A little care is becoming something you can see.', 'Some things grow because you keep showing up.'][waterCount - 1];
  document.querySelector('#progress-text').textContent = waterCount + ' OF 3 WATERINGS';
  document.querySelectorAll('.tracks i').forEach((track, index) => track.classList.toggle('active', index < waterCount));
  remember(['Watered once. The first sprout appeared.', 'Watered twice. New leaves unfolded.', 'Watered three times. “' + intention + '” bloomed.'][waterCount - 1]);
  if (waterCount === 3) {
    waterButton.disabled = true;
    waterButton.textContent = 'Fully grown ✓';
    document.querySelector('#care-hint').textContent = 'You gave it what it needed. Enjoy this moment.';
    resetButton.focus();
  } else waterButton.textContent = 'Water again ↘';
});
resetButton.addEventListener('click', function() {
  intention = '';
  waterCount = 0;
  form.reset();
  input.disabled = false;
  input.removeAttribute('aria-invalid');
  plantButton.disabled = false;
  plantButton.innerHTML = 'Plant a seed <span>↗</span>';
  waterButton.disabled = true;
  waterButton.innerHTML = 'Water your seed <span>↘</span>';
  resetButton.disabled = true;
  scene.className = 'scene';
  document.querySelector('#stage-label').textContent = '01 / A PLACE TO BEGIN';
  document.querySelector('#scene-caption').textContent = 'Every garden starts with a little possibility.';
  document.querySelector('#care-hint').textContent = 'Plant your intention to begin.';
  document.querySelector('#progress-text').textContent = 'NOT PLANTED YET';
  document.querySelectorAll('.tracks i').forEach(track => track.classList.remove('active'));
  notes.replaceChildren();
  remember('Made room for a fresh beginning.');
  respond('A fresh patch of possibility. What would you like to grow next?');
  input.focus();
});
