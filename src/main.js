import { App } from "./App.js";
const root = document.querySelector('#root');
if (!root)
    throw new Error('Missing #root mount');
root.replaceChildren(App());
