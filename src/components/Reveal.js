function Reveal({ onDone }) {
    const overlay = document.createElement('section');
    overlay.className = 'reveal';
    overlay.setAttribute('aria-label', 'Mothership arrival');
    overlay.innerHTML = `
    <div class="reveal__orbit reveal__orbit--one" aria-hidden="true"></div>
    <div class="reveal__orbit reveal__orbit--two" aria-hidden="true"></div>
    <div class="reveal__stars" aria-hidden="true"></div>
    <div class="reveal__content">
      <div class="reveal__signal" aria-hidden="true">●</div>
      <p class="reveal__name">MOTHERSHIP</p>
      <p class="reveal__subline">Signal acquired.</p>
    </div>
  `;
    let finished = false;
    let timer = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finish = () => {
        if (finished)
            return;
        finished = true;
        window.clearTimeout(timer);
        window.removeEventListener('keydown', finish);
        overlay.removeEventListener('pointerdown', finish);
        overlay.classList.add('reveal--departing');
        window.setTimeout(onDone, reduced ? 0 : 180);
    };
    timer = window.setTimeout(finish, reduced ? 0 : 850);
    window.addEventListener('keydown', finish);
    overlay.addEventListener('pointerdown', finish);
    overlay.tabIndex = 0;
    return overlay;
}

export { Reveal };
