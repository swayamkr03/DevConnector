import React from 'react';
const paths = {
  code: 'm8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 22',
  search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  menu: 'M4 6h16M4 12h16M4 18h16',
  sun: 'M12 3V1m0 22v-2M3 12H1m22 0h-2M5 5 3 3m18 18-2-2M5 19l-2 2M21 3l-2 2M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  moon: 'M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-4M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0m4-4a4 4 0 0 1 0 8',
  book: 'M4 3h15v18H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 14h15M6 7h9',
  comment: 'M21 11a9 9 0 0 1-9 9H3l2-4a9 9 0 1 1 16-5Z',
  heart: 'M20 4c-3-2-6 0-8 2-2-2-5-4-8-2-6 4 0 11 8 17 8-6 14-13 8-17Z',
  trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  pin: 'M19 9c0 6-7 12-7 12S5 15 5 9a7 7 0 1 1 14 0ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
  star: 'm12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z',
  branch: 'M6 6v12M18 6v3a5 5 0 0 1-5 5H6M8 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0m12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0M8 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
  link: 'm10 13 4-4m-5 7-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 0 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0',
  check: 'm5 12 4 4L19 6',
};
export default function Icon({ name = 'code', size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.code} /></svg>;
}
