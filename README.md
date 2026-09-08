# dsh-kiligz-base

`@kiligzzz/dsh-kiligz-base` is one DeepSeek Harness Profile bundle that composes seven established capabilities behind one install surface:

- scheduled automations
- UI appearance
- archived sessions
- Skill management
- MCP management
- auto continue
- Vision Router
- Better Sidebar

The package owns the shared client shell and UI normalization layer. Every capability remains a separate Cordis feature row in one group, preserving its native Host lifecycle, settings namespace, storage, tools, and routes.

## Install

```sh
dsh plugin --profile desktop add github:kiligzzz/dsh-kiligz-base
```

The bundle requires the dependency graph declared in `package.json`; it should replace the seven individual bundle entries rather than run beside them.

## UI

The sidebar footer order is:

```text
Scheduled tasks
SKILL management
MCP management
Archived sessions
Settings
```

The shared shell uses DSH semantic tokens and normalizes buttons, search inputs, lists, switches, and checkboxes across integrated feature surfaces.

## Model Experience

The bundle preserves the original tool names and prompt behavior of all included features. It neither adds model-visible prompts nor modifies existing tool schemas. Vision Router and Automation retain their existing model-visible capability and schedule behavior.

## Known Limitations and Deferred Work

The first release composes fixed upstream feature versions and applies a shared UI layer. Upstream feature upgrades remain deliberate, per-feature maintenance changes recorded in `vendor/manifest.json`.

## License and Notices

This package is MIT. Included feature dependencies retain their respective licenses; `NOTICE` and `vendor/manifest.json` record each source and version. `@michengai/dsh-automation` is Apache-2.0; the other integrated features are MIT.
