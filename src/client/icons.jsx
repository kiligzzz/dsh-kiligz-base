import React from 'react'

function iconProps(size) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.35,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: 'false',
  }
}

export function ScheduleIcon({ size = 16 }) {
  return React.createElement('svg', iconProps(size),
    React.createElement('circle', { cx: 8, cy: 8.25, r: 5.15 }),
    React.createElement('path', { d: 'M8 5.25v3.2l2.15 1.25M4.35 2.35 2.75 3.8M11.65 2.35l1.6 1.45' }),
  )
}

export function SkillIcon({ size = 16 }) {
  return React.createElement('svg', iconProps(size),
    React.createElement('path', { d: 'M3.25 2.25h6.2l2.3 2.3v4.1M3.25 2.25v11.5h5.4M9.45 2.25v2.3h2.3M5.35 6.4h3.45M5.35 8.8h2.2' }),
    React.createElement('path', { d: 'm11.55 9.45.38 1.05c.18.5.57.89 1.07 1.07l1.05.38-1.05.38c-.5.18-.89.57-1.07 1.07l-.38 1.05-.38-1.05a1.82 1.82 0 0 0-1.07-1.07l-1.05-.38 1.05-.38c.5-.18.89-.57 1.07-1.07l.38-1.05Z' }),
  )
}

/** Faithful thin-line redraw of the user-provided paperclip/connection mark. */
export function McpIcon({ size = 16 }) {
  return React.createElement('svg', iconProps(size),
    React.createElement('path', { d: 'm5.05 8.35 4.7-4.7a2.15 2.15 0 0 1 3.05 3.04l-5.9 5.9a3 3 0 0 1-4.25-4.24l5.4-5.4' }),
    React.createElement('path', { d: 'm5.25 9.75 5.45-5.45' }),
  )
}
