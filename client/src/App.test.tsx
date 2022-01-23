import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';

let container: HTMLDivElement | null = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (!container) {
    return;
  }

  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders App', async () => {
  if (!container) {
    return;
  }

  // Use the asynchronous version of act to apply resolved promises
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<App />, container);
  });

  expect(container.querySelector("div[automation-name='thoughtList']")).toBeInTheDocument();
});
