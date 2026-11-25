import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';
import App from '../src/App.tsx';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://fiqah.rustinnovations.com/',
});

Object.defineProperties(globalThis, {
  window: { value: dom.window, configurable: true },
  document: { value: dom.window.document, configurable: true },
  navigator: { value: dom.window.navigator, configurable: true },
  HTMLElement: { value: dom.window.HTMLElement, configurable: true },
  Element: { value: dom.window.Element, configurable: true },
  MutationObserver: { value: dom.window.MutationObserver, configurable: true },
  ResizeObserver: {
    value: class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
    configurable: true,
  },
});
dom.window.matchMedia =
  dom.window.matchMedia ??
  (() => ({
    matches: false,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() { return false; },
  }));

const routes = [
  { file: 'dist/index.html', pathname: '/' },
  { file: 'dist/privacy/index.html', pathname: '/privacy/' },
  { file: 'dist/terms/index.html', pathname: '/terms/' },
  { file: 'dist/delete-account/index.html', pathname: '/delete-account/' },
];

for (const route of routes) {
  dom.window.history.replaceState({}, '', route.pathname);

  const indexPath = resolve(process.cwd(), route.file);
  const html = readFileSync(indexPath, 'utf8');
  const renderedApp = renderToStaticMarkup(<App />);
  const prerenderedHtml = html.replace(
    '<div id="root"></div>',
    `<div id="root">${renderedApp}</div>`
  );

  writeFileSync(indexPath, prerenderedHtml, 'utf8');
  console.log(`Prerendered ${route.file}`);
}
