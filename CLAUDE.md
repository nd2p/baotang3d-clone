# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

"Bảo tàng Hồ Chí Minh — Hành trình lịch sử 3D": a walkable virtual museum built with plain Three.js. The player starts outside in the museum grounds, enters through the facade into a lobby, walks a central corridor, and visits six themed rooms (rooms 1–5: paintings + GLB artifacts; room 6: a screening room with an embedded YouTube documentary). All user-facing text and comments are in Vietnamese — keep new UI strings in Vietnamese.

The code was restored from the live deployment at https://hcm-58us.vercel.app/ (the original source was lost) and has since been modified (warm lighting, open room doorways, etc.), so it no longer matches the live site byte-for-byte.

## Running

No build step, package manager, tests or linter. Three.js r160 is loaded from unpkg via the `<script type="importmap">` in `index.html`. Serve over HTTP (ES modules, GLB and texture loading fail on `file://`):

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

Deployment: `.github/workflows/static.yml` publishes the whole repo to GitHub Pages on push to `main` (the reference site itself is on Vercel).

## Architecture

Three files: `index.html` (HUD, landing screen, modals, info panel), `styles.css`, and `script.js` (~3.9k lines, one top-level module executed top to bottom). Assets live in `images/` (`images/exhibits/`, `images/roomN/` for per-room photos and `.glb` models, plus `Firework.png`, flag textures, `bgm.mp3`). `images/painting-*.png` and `images/source.mp4` are leftovers from the original base and are not referenced.

Key cross-cutting pieces of `script.js`:

- **Data**: `artifactData` (id → year/title/desc) drives both placards and the info panel. `museumRooms` defines each room's id, number, name, side (−1 left / +1 right of corridor), center, size, accent color and the artifact ids it contains; `museumLayout` defines lobby/corridor/transition bounds. Room bounds from these are used for collision, and the "current area" label (`getCurrentAreaName`).
- **Placement**: paintings are placed with `placePaintingInRoom({ room, id, wall, offset, ... })`, which converts room-local coordinates (`getRoomPosition`) to world space and calls `createPainting`/`createPlacard`. Image paths per painting id are in the map near the `placePaintingInRoom` calls. Each room has its own GLB loader helper (`addRoom1GLBExhibit`, `loadRoom2Model` … `loadRoom5Artifact`) that scales models to `targetSize` along `fitAxis`, puts them on a pedestal, and registers them as clickable.
- **Interaction**: raycast from screen center against `artifactInteractables` and `videoInteractables`. Artifacts open `#info-panel` and update progress (`updateProgressUI`, victory popup when all are found). Room entrances are open door frames (no doors, no confirmation popup); `animate()` allows passage through each opening via the `inDoorway` check.
- **Warm atmosphere** (`// --- WARM INCANDESCENT ATMOSPHERE ---`): ceiling glow sprites (`addCeilingGlow`), visible spotlight can + beam + light pool (`addSpotlightEffect`, used by `createPainting` and `addExhibitSpotlight` in every GLB loader), and the `sparkles` points shader whose `time` uniform is advanced in `animate()`. These are additive meshes, not real lights, to stay within the WebGL light budget — prefer them over adding `SpotLight`/`PointLight`s.
- **Eye height** is `EYE_HEIGHT`; use it for any camera repositioning.
- **Volume**: the toolbar slider (`#bgm-slider`) is a master volume (`masterVolume`). `applyMasterVolume` sets BGM to `masterVolume * BGM_MIX` and the YouTube player to `masterVolume * 100`, and updates the SVG speaker icon (`#volume-icon[data-level]`). Never hard-code player/BGM volumes; use `getBgmVolume()` / `getVideoVolume()`.
- **Sky** (`// --- SKY ---`): `skyGroup` follows the camera each frame (`updateSky`) and holds a gradient dome plus day (`dayGroup`: sun, rays, clouds) and night (`nightSkyGroup`: moon, twinkling stars, shooting stars) layers; `updateSkyMode` is called from `applyLightingMode`. Sky materials use `fog: false`.
- **Main entrance**: two hinged leaves (`entranceDoors`) in a gilded frame that swing inward when the visitor is near (`updateEntranceDoors`); the doorway is not collidable.
- **Wall labels**: keep text planes clearly in front of wall faces and never overlapping each other on the same plane — coplanar/embedded planes z-fight and flicker. Partition faces are 0.09 from a room bound, feature-wall faces 0.14.
- **Day/night**: `toggleDayNight` / `applyLightingMode` (button or `N` key). Night mode enables night lighting and fireworks — both particle fireworks and sprite-sheet fireworks from `Firework.png` (expects a 256px frame grid).
- **Room 6 video**: YouTube iframe (`YOUTUBE_VIDEO_ID`, captions disabled via URL params + `disableYouTubeCaptions`) is a flat element in `videoLayer`, projected onto `screenMesh` every frame by `updateYouTubeScreenProjection` (4-corner homography `matrix3d`). Do not move it back into `CSS3DRenderer`: Chrome does not deliver mouse events to iframes inside a `preserve-3d` context. Clicking the screen calls `enableRoom6Css3dInteraction`, which unlocks the pointer (the `unlock` handler must keep `#blocker` hidden while `css3dInteractionEnabled`); `#room6-continue-btn` resumes touring. Entering/leaving room 6 (`updateRoom6VideoTransition`) starts/stops playback and swaps the BGM.
- **Controls**: desktop uses `PointerLockControls` + WASD; touch devices use the DOM joystick and `#touch-look-zone` (camera rotation order `YXZ`). `isTouchDevice` is re-evaluated on resize. Collision is hand-coded in `animate()` against room/partition bounds, not physics.
