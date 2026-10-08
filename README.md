# Embedded Engineering Lab

An interactive engineering platform for electronics, embedded systems and IoT, featuring circuit simulations, engineering calculators, ESP32/Arduino projects, sensor dashboards, data visualization, and smart solar energy monitoring. The portfolio experience is available in **English and Arabic**, with a persistent language switch and an RTL layout for Arabic.

> **Prototype boundary:** sensor and pump readings are generated locally in the browser. This repository does not connect to real hardware, a broker, external API or database.

## Features

- Eight browser-side engineering tools: Ohm’s law, resistor color code, SMD resistor decoder, voltage divider, LED resistor selection, power/energy, battery runtime and unit conversion.
- Interactive circuit models for Ohm’s law, a voltage divider, RC charge/discharge, LED current limiting and Kirchhoff’s current law.
- Embedded reference content for Arduino, ESP32 and STM32, with illustrative snippets and hardware safety notes.
- Communication reference for UART, I²C, SPI, RS-232, RS-485, CAN, Modbus, MQTT and HTTP.
- Simulated IoT telemetry dashboard and solar water-pump project view with threshold-based demo alerts.
- English/Arabic language toggle, stored language preference, Arabic typography and RTL layout; dark/light themes, responsive navigation, keyboard-accessible controls and reduced-motion support.
- Author links to the public LinkedIn, GitHub and personal website profiles.

## Technology

**Implemented in this prototype:** HTML5, CSS, JavaScript ES modules, Vite and Chart.js.

**Documented as future extensions, not implemented services:** Node.js / Express REST API, PostgreSQL, authentication, ESP32 transport, Wi-Fi, MQTT broker and durable sensor storage.

## Run locally

Requirements: Node.js 22+ and pnpm 11.25.0.

```bash
pnpm install
pnpm dev
```

Vite serves the app on `http://localhost:3000`. Create a production bundle with:

```bash
pnpm build
pnpm preview
pnpm build:pages
```

`pnpm build` writes the regular production bundle to `dist/`. `pnpm build:pages` creates a GitHub Pages-ready bundle with relative asset paths, publishes the built `index.html` and `page-assets/` into the repository root, and mirrors the same bundle to `docs/`.

## GitHub Pages

This repository's existing Pages setting publishes branch `main` from its root (`/`). The source template is `src/index.html`; run `pnpm build:pages` to generate the compiled root page and assets. The build also keeps a current mirror in `docs/`, but changing the Pages setting is not required.

> **Public repository and site:** `salah-eddine-program/Embedded-Engineering-Lab` is already public. Source code and information committed here are visible to everyone. Do not commit secrets, credentials or private data.

The requested project-site URL is [https://salah-eddine-program.github.io/Embedded-Engineering-Lab/](https://salah-eddine-program.github.io/Embedded-Engineering-Lab/).

## Data and calculation notes

The demo telemetry is produced by `src/data/telemetry.js`; it is not a live ESP32 stream. The solar-pump scenarios exist only to demonstrate the UI’s alert logic:

- `LOW WATER LEVEL` when water level is at or below 5%.
- `HIGH TEMPERATURE` when temperature is above the displayed 42°C threshold.
- `POSSIBLE PUMP FAILURE` when the pump is ON and measured current is zero.

Circuit calculators use idealized electrical relationships. Battery runtime is an ideal Ah/current estimate and does not include all losses, discharge limits, temperature or ageing. The power panel treats the displayed VA value as equal to W for a DC estimate; it does not model AC power factor. Select suitably rated components and verify real-world designs against datasheets and safety requirements.

## Suggested future architecture

```text
Sensors → ESP32 → Wi-Fi → MQTT or HTTPS → Node.js / Express REST API
        → PostgreSQL history → Dashboard + alert service
```

Potential API resources include `/api/sensors`, `/api/pump`, `/api/projects`, `/api/energy` and `/api/alerts`. They are documentation only in this version. A production extension should add authenticated device identity, validated timestamped measurements, credential management, durable storage, calibrated thresholds and hardware safety interlocks before connecting a real pump.

## Project structure

```text
src/index.html  Vite source entry; root index.html is the built Pages entry
src/core/       Calculation, formatting, chart and icon helpers
src/data/       Embedded/protocol reference content, translations and simulated telemetry
src/views/      Overview, tools, circuit lab, embedded, communications, dashboard,
                solar pump, projects and documentation
src/styles/     Design tokens, layout, components and RTL presentation rules
public/         Route manifest, favicon and static assets
scripts/        Build-output publishing helper for the current Pages root source
```

## Author

**Salah Eddine Ben Touati** — Embedded Systems Engineer

- LinkedIn: [salah-eddin-benettouati](https://www.linkedin.com/in/salah-eddin-benettouati-98a101310/)
- GitHub: [salah-eddine-program](https://github.com/salah-eddine-program)
- Personal website: [salah-eddine-program.github.io/bt-salahdine.com](https://salah-eddine-program.github.io/bt-salahdine.com/)

The LinkedIn and GitHub profiles were checked against public profile information; the personal website URL was supplied by the owner.

## License

MIT. See [LICENSE](./LICENSE).
