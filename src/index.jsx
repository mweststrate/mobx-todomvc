import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { render } from 'react-dom'
import AppState from './stores/appstate'
import 'todomvc-app-css/index.css'
import App from './components/App';

import * as Perf from 'react-addons-perf';

// MWE: Generate todos for benchmarking
const STORE_SIZE = 10000;

const initialState = []

for (var i = 0; i < STORE_SIZE; i++) {
  initialState.push({
    text: 'Item' + i,
    completed: false,
    id: i,
    // reference to some other todo item, to similate
    // having references to other objects in the state
    other: i > 0
      ? initialState[i - 1] 
      : null
  });
}

const store = new AppState(initialState);

render(
  <App store={store}/>,
  document.getElementById('root')
)

// MWE: will only work on non prod builds
window.perfStart = function() {
  Perf.start();
}

window.perfStop = function() {
  Perf.stop();
  Perf.printInclusive();
  Perf.printWasted();
}
