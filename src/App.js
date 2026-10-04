import { MissionCard } from "./components/MissionCard.js";
import { Reveal } from "./components/Reveal.js";
import { SetupSheet } from "./components/SetupSheet.js";
import { TelemetryControls } from "./components/TelemetryControls.js";
import { selectMission } from "./domain/recommend.js";
import { loadProfile, resetProfile, saveProfile } from "./persistence/profile.js";
const APP_NAME = 'MOTHERSHIP';
function appShellHtml(content = `
  <p class="console-kicker">Flight console</p>
  <h1>Pick the conditions.<br><span>We'll pick the next move.</span></h1>
  <div class="placeholder-controls" aria-hidden="true"><div></div><div></div></div>
`) {
    return `
    <main class="shell">
      <header class="masthead">
        <div class="brand-lockup">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-name">${APP_NAME}</span>
        </div>
        <span class="status-copy">LOCAL / READY</span>
      </header>
      <section class="console" aria-label="Mission controls">${content}</section>
    </main>
  `;
}
function addResetControl(console, onReset) {
    const footer = document.createElement('div');
    footer.className = 'local-footer';
    footer.innerHTML = `<span>Profile stays on this device.</span><button type="button" class="text-button" data-reset>Reset local setup</button>`;
    footer.querySelector('[data-reset]').addEventListener('click', onReset);
    console.append(footer);
}
function App() {
    const host = document.createElement('div');
    host.className = 'app';
    let energy = 3;
    let minutes = 15;
    let profile = loadProfile();
    const renderShell = () => {
        host.innerHTML = appShellHtml('');
        host.classList.add('app--ready');
        return host.querySelector('.console');
    };
    const renderSetup = () => {
        const console = renderShell();
        console.replaceChildren(SetupSheet({
            initialCategories: profile.enabledCategories,
            onComplete: (categories) => {
                profile = { ...profile, setupComplete: true, enabledCategories: categories };
                saveProfile(profile);
                renderFlightConsole();
            },
        }));
    };
    const chooseMission = (slot) => {
        const mission = selectMission({
            energy,
            minutes,
            enabledCategories: profile.enabledCategories,
            recentIds: profile.recentMissionIds,
        });
        profile = {
            ...profile,
            recentMissionIds: [mission.id, ...profile.recentMissionIds.filter((id) => id !== mission.id)].slice(0, 5),
        };
        saveProfile(profile);
        slot.replaceChildren(MissionCard({ mission, onReroute: () => chooseMission(slot) }));
    };
    const renderFlightConsole = () => {
        const console = renderShell();
        const heading = document.createElement('div');
        heading.className = 'console-heading';
        heading.innerHTML = `
      <p class="console-kicker">Flight console</p>
      <h1>What have you got<br><span>in the tank?</span></h1>
      <p class="console-copy">Two readings. One next move. No list to manage.</p>
    `;
        console.append(heading);
        const missionSlot = document.createElement('div');
        missionSlot.className = 'mission-slot';
        missionSlot.setAttribute('aria-label', 'Current mission');
        console.append(TelemetryControls({
            energy,
            minutes,
            onEnergyChange: (value) => { energy = value; },
            onMinutesChange: (value) => { minutes = value; },
            onLaunch: () => chooseMission(missionSlot),
        }));
        console.append(missionSlot);
        addResetControl(console, () => {
            resetProfile();
            profile = loadProfile();
            renderSetup();
        });
    };
    const showReadyState = () => {
        profile = loadProfile();
        if (profile.setupComplete)
            renderFlightConsole();
        else
            renderSetup();
    };
    host.append(Reveal({ onDone: showReadyState }));
    return host;
}

export { APP_NAME, appShellHtml, App };
