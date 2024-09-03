import { Workbox } from 'workbox-window';
import { deleteDb } from "./database.js";
import Editor from './editor';
import './database.js';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

const setupDeleteButton = (editor) => {
  const butDelete = document.getElementById("buttonDelete");

  // Click event handler on the `butDelete` element
  butDelete.addEventListener("click", async () => {
    console.log("delete button clicked!");
    localStorage.removeItem("content");
    await deleteDb();
    editor.setValue(`
Your notes have been deleted, Soldier!
     `);
  });
};