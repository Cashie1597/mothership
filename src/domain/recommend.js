import { DEFAULT_DECK } from "../domain/defaultDeck.js";
function pick(candidates, recentIds) {
    if (candidates.length === 0)
        throw new Error('No missions available');
    const mostRecent = recentIds[0];
    return candidates.find((mission) => mission.id !== mostRecent) ?? candidates[0];
}
function byClosestFit(a, b, input) {
    const energyDistance = (mission) => {
        if (input.energy < mission.minEnergy)
            return mission.minEnergy - input.energy;
        if (input.energy > mission.maxEnergy)
            return input.energy - mission.maxEnergy;
        return 0;
    };
    const timeDistance = (mission) => Math.max(0, mission.maxMinutes - input.minutes);
    return (energyDistance(a) * 10 + timeDistance(a)) - (energyDistance(b) * 10 + timeDistance(b));
}
function selectMission(input, deck = DEFAULT_DECK) {
    const enabled = deck.filter((mission) => input.enabledCategories.includes(mission.category));
    if (enabled.length === 0)
        throw new Error('At least one mission category must be enabled');
    const exact = enabled.filter((mission) => mission.minEnergy <= input.energy &&
        mission.maxEnergy >= input.energy &&
        mission.maxMinutes <= input.minutes);
    if (exact.length > 0)
        return pick(exact, input.recentIds);
    const timeSafe = enabled.filter((mission) => mission.maxMinutes <= input.minutes);
    if (timeSafe.length > 0)
        return pick([...timeSafe].sort((a, b) => byClosestFit(a, b, input)), input.recentIds);
    const energyFit = enabled.filter((mission) => mission.minEnergy <= input.energy && mission.maxEnergy >= input.energy);
    if (energyFit.length > 0)
        return pick([...energyFit].sort((a, b) => byClosestFit(a, b, input)), input.recentIds);
    return pick([...enabled].sort((a, b) => byClosestFit(a, b, input)), input.recentIds);
}

export { selectMission };
