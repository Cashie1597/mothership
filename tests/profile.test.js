import test from 'node:test';
import assert from 'node:assert/strict';
import { loadProfile, resetProfile, saveProfile } from '../src/persistence/profile.js';

function withStorage(run) {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  try { run(values); } finally { delete globalThis.localStorage; }
}

test('profile saves, loads, and resets only its own key', () => withStorage((values) => {
  values.set('unrelated', 'keep');
  const profile = loadProfile();
  assert.equal(profile.setupComplete, false);
  saveProfile({ ...profile, setupComplete: true, enabledCategories: ['reset'] });
  assert.equal(loadProfile().setupComplete, true);
  assert.deepEqual(loadProfile().enabledCategories, ['reset']);
  resetProfile();
  assert.equal(loadProfile().setupComplete, false);
  assert.equal(values.get('unrelated'), 'keep');
}));

test('invalid stored profile falls back to defaults', () => withStorage((values) => {
  values.set('mothership.profile.v1', '{broken');
  assert.equal(loadProfile().setupComplete, false);
  values.set('mothership.profile.v1', JSON.stringify({ version: 1, setupComplete: true, enabledCategories: [], recentMissionIds: [] }));
  assert.equal(loadProfile().setupComplete, false);
}));
