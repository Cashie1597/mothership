function telemetryControlsHtml(energy, minutes) {
    const energyButtons = [1, 2, 3, 4, 5].map((value) => `
    <button type="button" class="choice-button" data-energy="${value}" aria-pressed="${value === energy}">${value}</button>
  `).join('');
    const timeButtons = [5, 15, 30, 60].map((value) => `
    <button type="button" class="choice-button" data-minutes="${value}" aria-pressed="${value === minutes}">${value === 60 ? '60+' : value}</button>
  `).join('');
    return `
    <div class="telemetry" data-telemetry>
      <div class="telemetry-group">
        <div class="telemetry-label">
          <span>Energy</span>
          <span class="telemetry-hint">1 low · 5 charged</span>
        </div>
        <div class="choice-row" role="group" aria-label="Energy">${energyButtons}</div>
      </div>
      <div class="telemetry-group">
        <div class="telemetry-label">
          <span>Time available</span>
          <span class="telemetry-hint">minutes</span>
        </div>
        <div class="choice-row choice-row--time" role="group" aria-label="Time available">${timeButtons}</div>
      </div>
      <button class="button button--primary launch-button" type="button" data-launch>Launch</button>
    </div>
  `;
}
function TelemetryControls({ energy, minutes, onEnergyChange, onMinutesChange, onLaunch, }) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = telemetryControlsHtml(energy, minutes);
    const element = wrapper.firstElementChild;
    element.querySelectorAll('[data-energy]').forEach((button) => {
        button.addEventListener('click', () => {
            element.querySelectorAll('[data-energy]').forEach((item) => item.setAttribute('aria-pressed', 'false'));
            button.setAttribute('aria-pressed', 'true');
            onEnergyChange(Number(button.dataset.energy));
        });
    });
    element.querySelectorAll('[data-minutes]').forEach((button) => {
        button.addEventListener('click', () => {
            element.querySelectorAll('[data-minutes]').forEach((item) => item.setAttribute('aria-pressed', 'false'));
            button.setAttribute('aria-pressed', 'true');
            onMinutesChange(Number(button.dataset.minutes));
        });
    });
    element.querySelector('[data-launch]').addEventListener('click', () => onLaunch?.());
    return element;
}

export { telemetryControlsHtml, TelemetryControls };
