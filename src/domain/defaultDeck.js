const CATEGORY_LABELS = {
    make: 'Make',
    reset: 'Reset',
    move: 'Move',
    listen: 'Listen',
    wander: 'Wander',
    pause: 'Pause',
};
const DEFAULT_DECK = [
    { id: 'make-line', category: 'make', title: 'Write one line', detail: 'Capture one thought, sketch one shape, or make one mark. Then stop.', minEnergy: 1, maxEnergy: 5, maxMinutes: 5 },
    { id: 'make-tiny', category: 'make', title: 'Make one tiny thing', detail: 'Give yourself 15 minutes to make something small enough to finish.', minEnergy: 2, maxEnergy: 5, maxMinutes: 15 },
    { id: 'make-rough', category: 'make', title: 'Ship the rough version', detail: 'Pick one unfinished idea and make the smallest version that counts.', minEnergy: 4, maxEnergy: 5, maxMinutes: 30 },
    { id: 'make-sketch', category: 'make', title: 'Sketch the next thing', detail: 'Use one page, note, or canvas to rough out an idea without polishing it.', minEnergy: 1, maxEnergy: 3, maxMinutes: 15 },
    { id: 'reset-surface', category: 'reset', title: 'Clear one surface', detail: 'Choose one visible surface and reset only that. Stop when it is clear.', minEnergy: 1, maxEnergy: 5, maxMinutes: 5 },
    { id: 'reset-tabs', category: 'reset', title: 'Close the tabs', detail: 'Keep what matters, close the rest, and leave one clean starting point.', minEnergy: 2, maxEnergy: 5, maxMinutes: 15 },
    { id: 'reset-launchpad', category: 'reset', title: 'Set up the next launch', detail: 'Put the one thing you want next within easy reach, then walk away.', minEnergy: 2, maxEnergy: 4, maxMinutes: 30 },
    { id: 'move-song', category: 'move', title: 'Take a one-song lap', detail: 'Put on one track and keep moving until it ends. No distance target.', minEnergy: 1, maxEnergy: 5, maxMinutes: 5 },
    { id: 'move-block', category: 'move', title: 'Walk one block farther', detail: 'Head outside and take one extra block before turning back.', minEnergy: 2, maxEnergy: 5, maxMinutes: 15 },
    { id: 'move-loop', category: 'move', title: 'Find a longer loop', detail: 'Pick a familiar route, add one detour, and let the route be the point.', minEnergy: 3, maxEnergy: 5, maxMinutes: 30 },
    { id: 'listen-track', category: 'listen', title: 'Play one track properly', detail: 'One song, start to finish, with nothing else competing for attention.', minEnergy: 1, maxEnergy: 5, maxMinutes: 5 },
    { id: 'listen-three', category: 'listen', title: 'Take a three-song drift', detail: 'Queue three songs that fit the moment and do nothing else until they finish.', minEnergy: 1, maxEnergy: 4, maxMinutes: 15 },
    { id: 'listen-album', category: 'listen', title: 'Give an album some room', detail: 'Pick a record you already like and stay with it for half an hour.', minEnergy: 1, maxEnergy: 3, maxMinutes: 30 },
    { id: 'wander-turn', category: 'wander', title: 'Take the unnecessary turn', detail: 'Go somewhere nearby and choose one route you normally skip.', minEnergy: 2, maxEnergy: 5, maxMinutes: 15 },
    { id: 'wander-notice', category: 'wander', title: 'Notice one small thing', detail: 'Step outside or look out a window. Find one detail you had missed.', minEnergy: 1, maxEnergy: 5, maxMinutes: 5 },
    { id: 'wander-photo', category: 'wander', title: 'Collect five weird details', detail: 'Walk until you notice five things worth photographing or remembering.', minEnergy: 2, maxEnergy: 5, maxMinutes: 30 },
    { id: 'wander-hour', category: 'wander', title: 'Let an hour be unplanned', detail: 'Pick a direction, keep the phone useful but quiet, and see where you end up.', minEnergy: 3, maxEnergy: 5, maxMinutes: 60 },
    { id: 'pause-window', category: 'pause', title: 'Window mode', detail: 'Sit somewhere with a view and do absolutely nothing for five minutes.', minEnergy: 1, maxEnergy: 5, maxMinutes: 5 },
    { id: 'pause-drink', category: 'pause', title: 'Make a drink. Sit down.', detail: 'Prepare something you like, then actually stop while you have it.', minEnergy: 1, maxEnergy: 4, maxMinutes: 15 },
    { id: 'pause-offline', category: 'pause', title: 'Go deliberately offline', detail: 'Put the screen down for half an hour and let the gap stay empty.', minEnergy: 1, maxEnergy: 3, maxMinutes: 30 },
];

export { CATEGORY_LABELS, DEFAULT_DECK };
