# Changelog

## 0.2.0

- Replace `dsh-vision-router` with `@goodandready/dsh-vision-bridge` (pinned GitHub commit) and drop the generated Vision Router client-boundary prelude.
- Drop the Bridge composer controls entirely: vision stays on the configured `hybrid` mode, so neither a mode toggle nor a PDF button is added next to the message input. The Bridge settings card and the PDF drop/paste path remain available.
- Unify the scheduled-task, SKILL-management, and MCP-management modal shell so the search row, actions, and body no longer leave blank space.
- Configure the Bridge settings namespace (`dsh-vision-bridge`) with `popmart/gpt-5.6-sol` in `hybrid` mode; the legacy `vision-router` block is retained so a rollback keeps working.

## 0.1.2

- Restore Vision Router's native composer-side Vision toggle for the aggregated client factory.
- Register scheduled tasks, SKILL management, and MCP management as independent sidebar footer entries and remove their duplicate Settings sections.
- Use a faithful thin-line SVG redraw of the supplied MCP reference icon.
- Standardize outline icons, modal focus containment, focus return, semantic switches, reduced motion, inputs, buttons, and list surfaces.

## 0.1.1

- Open scheduled tasks, SKILL management, and MCP management in independent, shared-format modals instead of Settings navigation.
- Match the three sidebar entries to the archived-session row geometry and interaction model.
- Replace text and emoji row actions with DSH native edit, refresh, and delete icons.
- Add an open-SKILL-directory action.
- Use a smooth neutral-to-green switch state with a white sliding thumb.

## 0.1.0

- Compose Automation, Appearance, Session Archive, Skill/MCP Manager, Auto Continue, Vision Router, and Better Sidebar through one Profile bundle.
- Add unified sidebar entries for scheduled tasks, SKILL management, MCP management, and archived sessions.
- Normalize common controls with DSH semantic theme tokens.
