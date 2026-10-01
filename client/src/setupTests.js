// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
// CRA's Jest resolver predates package export maps; use the installed CJS entry.
jest.mock('react-router/dom', () => jest.requireActual('react-router/dist/development/dom-export.js'), { virtual: true });
