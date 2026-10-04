const STORAGE_KEY = 'mothership.profile.v1';
const ALL_CATEGORIES = ['make', 'reset', 'move', 'listen', 'wander', 'pause'];
const VALID_CATEGORIES = new Set(ALL_CATEGORIES);
function defaults() {
    return {
        version: 1,
        setupComplete: false,
        enabledCategories: [...ALL_CATEGORIES],
        recentMissionIds: [],
    };
}
function getStorage() {
    try {
        return typeof localStorage === 'undefined' ? null : localStorage;
    }
    catch {
        return null;
    }
}
function normalize(value) {
    if (!value || typeof value !== 'object')
        return null;
    const candidate = value;
    if (candidate.version !== 1 || typeof candidate.setupComplete !== 'boolean')
        return null;
    if (!Array.isArray(candidate.enabledCategories) || !Array.isArray(candidate.recentMissionIds))
        return null;
    const enabledCategories = candidate.enabledCategories.filter((category) => typeof category === 'string' && VALID_CATEGORIES.has(category));
    if (enabledCategories.length === 0)
        return null;
    const recentMissionIds = candidate.recentMissionIds
        .filter((id) => typeof id === 'string' && id.length > 0)
        .slice(0, 5);
    return {
        version: 1,
        setupComplete: candidate.setupComplete,
        enabledCategories: [...new Set(enabledCategories)],
        recentMissionIds,
    };
}
function loadProfile() {
    const storage = getStorage();
    if (!storage)
        return defaults();
    try {
        const raw = storage.getItem(STORAGE_KEY);
        if (!raw)
            return defaults();
        return normalize(JSON.parse(raw)) ?? defaults();
    }
    catch {
        return defaults();
    }
}
function saveProfile(profile) {
    const storage = getStorage();
    if (!storage)
        return;
    const safe = normalize({ ...profile, recentMissionIds: profile.recentMissionIds.slice(0, 5) }) ?? defaults();
    try {
        storage.setItem(STORAGE_KEY, JSON.stringify(safe));
    }
    catch {
        // Local persistence is a convenience; storage failures must not block the app.
    }
}
function resetProfile() {
    const storage = getStorage();
    if (!storage)
        return;
    try {
        storage.removeItem(STORAGE_KEY);
    }
    catch {
        // Reset remains best-effort if browser storage is unavailable.
    }
}

export { loadProfile, saveProfile, resetProfile };
