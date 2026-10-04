import test from 'node:test';
import assert from 'node:assert/strict';
import { selectMission } from '../src/domain/recommend.js';
import { CATEGORY_LABELS } from '../src/domain/defaultDeck.js';

test('a matching mission stays inside the selected categories and time', () => {
  const mission = selectMission({
    energy: 1,
    minutes: 5,
    enabledCategories: ['reset', 'pause'],
    recentIds: [],
  });
  assert.ok(['reset', 'pause'].includes(mission.category));
  assert.ok(mission.maxMinutes <= 5);
  assert.ok(mission.minEnergy <= 1 && mission.maxEnergy >= 1);
});

test('reroute avoids repeating the most recent mission when another fits', () => {
  const input = { energy: 3, minutes: 15, enabledCategories: ['make'], recentIds: [] };
  const first = selectMission(input);
  const next = selectMission({ ...input, recentIds: [first.id] });
  assert.notEqual(next.id, first.id);
});

test('empty category selection is rejected', () => {
  assert.throws(() => selectMission({
    energy: 3,
    minutes: 15,
    enabledCategories: [],
    recentIds: [],
  }), /At least one mission category/);
});

test('every single-category setting has a mission within the chosen time and energy', () => {
  for (const category of Object.keys(CATEGORY_LABELS)) {
    for (const energy of [1, 2, 3, 4, 5]) {
      for (const minutes of [5, 15, 30, 60]) {
        const mission = selectMission({ energy, minutes, enabledCategories: [category], recentIds: [] });
        assert.equal(mission.category, category);
        assert.ok(mission.maxMinutes <= minutes, `${category} suggested ${mission.maxMinutes} minutes for ${minutes}`);
        assert.ok(mission.minEnergy <= energy && mission.maxEnergy >= energy);
      }
    }
  }
});
