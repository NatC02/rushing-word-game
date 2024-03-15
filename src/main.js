import './app.css';
import App from './App.svelte';
import '../node_modules/bootstrap/scss/bootstrap.scss';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
