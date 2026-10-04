import { CATEGORY_LABELS } from "../domain/defaultDeck.js";
function missionCardHtml(mission) {
    return `
    <article class="mission-card" aria-live="polite" data-mission-id="${mission.id}">
      <div class="mission-card__topline">
        <span class="mission-category">${CATEGORY_LABELS[mission.category]}</span>
        <span class="mission-time">≤ ${mission.maxMinutes} min</span>
      </div>
      <h2>${mission.title}</h2>
      <p>${mission.detail}</p>
      <button class="button button--quiet reroute-button" type="button" data-reroute>Reroute</button>
    </article>
  `;
}
function MissionCard({ mission, onReroute }) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = missionCardHtml(mission);
    const card = wrapper.firstElementChild;
    card.querySelector('[data-reroute]').addEventListener('click', onReroute);
    return card;
}

export { missionCardHtml, MissionCard };
