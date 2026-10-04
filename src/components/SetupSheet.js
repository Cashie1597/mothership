import { CATEGORY_LABELS } from "../domain/defaultDeck.js";
const ALL_CATEGORIES = ['make', 'reset', 'move', 'listen', 'wander', 'pause'];
function setupSheetHtml(initialCategories) {
    const selected = new Set(initialCategories);
    const toggles = ALL_CATEGORIES.map((category) => `
    <label class="category-toggle">
      <input type="checkbox" name="category" value="${category}" ${selected.has(category) ? 'checked' : ''} />
      <span>${CATEGORY_LABELS[category]}</span>
    </label>
  `).join('');
    return `
    <div class="setup-sheet">
      <p class="console-kicker">Tune the signal</p>
      <h1>What kinds of detours are allowed?</h1>
      <p class="setup-copy">Choose what you want in the mix. This stays in this browser.</p>
      <form class="setup-form">
        <fieldset>
          <legend class="sr-only">Allowed mission categories</legend>
          <div class="category-grid">${toggles}</div>
        </fieldset>
        <div class="setup-actions">
          <button class="button button--primary" type="submit">Launch</button>
          <button class="button button--quiet" type="button" data-use-all>Use all</button>
        </div>
        <p class="setup-error" data-setup-error aria-live="polite"></p>
      </form>
    </div>
  `;
}
function SetupSheet({ initialCategories, onComplete, }) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = setupSheetHtml(initialCategories);
    const sheet = wrapper.firstElementChild;
    const form = sheet.querySelector('form');
    const error = sheet.querySelector('[data-setup-error]');
    const selected = () => [...form.querySelectorAll('input[name="category"]:checked')]
        .map((input) => input.value);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const categories = selected();
        if (categories.length === 0) {
            error.textContent = 'Keep at least one route open.';
            return;
        }
        onComplete(categories);
    });
    sheet.querySelector('[data-use-all]').addEventListener('click', () => {
        form.querySelectorAll('input[name="category"]').forEach((input) => { input.checked = true; });
        error.textContent = '';
    });
    form.addEventListener('change', () => {
        if (selected().length > 0)
            error.textContent = '';
    });
    return sheet;
}

export { setupSheetHtml, SetupSheet };
