window.__ModuleLoader__.load({
	id: "@kiligzzz/dsh-ui-appearance",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		//#region ../../../../dsh-ui-appearance/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
		function r(e) {
			var t, f, n = "";
			if ("string" == typeof e || "number" == typeof e) n += e;
			else if ("object" == typeof e) if (Array.isArray(e)) {
				var o = e.length;
				for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
			} else for (f in e) e[f] && (n && (n += " "), n += f);
			return n;
		}
		function clsx() {
			for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
			return n;
		}
		/** Max emphasized-text tint alpha (schema bound for the inline-code chips). */
		const EMPHASIS_ALPHA_MAX = .45;
		/**
		* The color roles the customizer exposes. Each role maps to one or more
		* `--dsw-alias-*` tokens; an empty string means "keep the stock token".
		* Bubble roles were removed: the harness renders its only bubble background
		* on user messages (assistant turns have none), so bubbles now follow the
		* accent color instead of owning separate settings.
		*/
		const APPEARANCE_ROLES = [
			"accent",
			"background",
			"panel",
			"input",
			"text",
			"border"
		];
		/** The section with every color role left stock and every effect off.
		* The accent defaults to the harness brand blue so a fresh install reads
		* as the stock theme — buttons, links and chips all ride that blue. */
		const DEFAULT_SETTINGS = {
			accent: "#4176e6",
			background: "",
			panel: "",
			input: "",
			text: "",
			border: "",
			backgroundImage: "",
			backgroundVideo: "",
			imageDark: false,
			backgroundOpacity: 1,
			backgroundBlur: 0,
			scrim: 0,
			surfaceAlpha: 1,
			inputAlpha: 1,
			codeAlpha: 1,
			sidebarOpaque: false,
			conversationGlass: false,
			conversationGlassBlur: 8,
			glassBlur: 0,
			aistudioComposer: true,
			glassComposer: false,
			glowComposer: true,
			emphasisAlpha: .22,
			preset: ""
		};
		/** Number fields and their schema bounds, used to sanitize persisted input. */
		const NUMERIC_BOUNDS = {
			backgroundOpacity: {
				min: 0,
				max: 1
			},
			backgroundBlur: {
				min: 0,
				max: 30
			},
			scrim: {
				min: 0,
				max: 1
			},
			surfaceAlpha: {
				min: 0,
				max: 1
			},
			inputAlpha: {
				min: 0,
				max: 1
			},
			codeAlpha: {
				min: 0,
				max: 1
			},
			conversationGlassBlur: {
				min: 0,
				max: 20
			},
			glassBlur: {
				min: 0,
				max: 20
			},
			emphasisAlpha: {
				min: 0,
				max: EMPHASIS_ALPHA_MAX
			}
		};
		/** Boolean fields, used to sanitize persisted input. */
		const BOOLEAN_FIELDS = [
			"imageDark",
			"sidebarOpaque",
			"conversationGlass",
			"aistudioComposer",
			"glassComposer",
			"glowComposer"
		];
		/** Canonicalize a hex color: lowercase, 3-digit expanded to 6-digit. */
		function normalizeHex(value) {
			if (value.length === 4) {
				const [, r, g, b] = value;
				return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
			}
			return value.toLowerCase();
		}
		/**
		* Validate and coerce one parsed settings document against the schema, so
		* hand-edited or stale localStorage can never produce invalid CSS (e.g. a
		* string blur feeding `${value}px` or an alpha outside 0..1). Unknown fields
		* are dropped; every field that fails its check falls back to the default.
		* Legacy persisted `1`/`0` booleans (older checkbox writes) are coerced to
		* real booleans so existing users keep their settings.
		* @param raw - the parsed localStorage section, or any foreign value.
		* @returns a complete, schema-valid settings section.
		*/
		function sanitizeSettings(raw) {
			if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return { ...DEFAULT_SETTINGS };
			const source = raw;
			const result = { ...DEFAULT_SETTINGS };
			for (const role of APPEARANCE_ROLES) {
				const value = source[role];
				if (typeof value === "string" && (value === "" || /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(value))) result[role] = value === "" ? "" : normalizeHex(value);
			}
			const strings = [
				"backgroundImage",
				"backgroundVideo",
				"preset"
			];
			const index = result;
			for (const field of strings) {
				const value = source[field];
				if (typeof value === "string") index[field] = value;
			}
			for (const [field, { min, max }] of Object.entries(NUMERIC_BOUNDS)) {
				const value = source[field];
				if (typeof value === "number" && Number.isFinite(value)) index[field] = Math.min(max, Math.max(min, value));
			}
			for (const field of BOOLEAN_FIELDS) {
				const value = source[field];
				if (typeof value === "boolean") result[field] = value;
				else if (value === 0) result[field] = false;
				else if (value === 1) result[field] = true;
			}
			return result;
		}
		//#endregion
		//#region src/client/color.ts
		const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
		/**
		* Validate a user-typed hex color.
		* @param value - candidate `#rgb` or `#rrggbb` string.
		* @returns whether the value is a valid hex color.
		*/
		function isHexColor(value) {
			return HEX_RE.test(value);
		}
		/**
		* Parse a hex color to rgb channels.
		* @param value - `#rgb` or `#rrggbb` string.
		* @returns the parsed channels.
		*/
		function parseHex(value) {
			const hex = value.slice(1);
			if (hex.length === 3) {
				const first = hex.slice(0, 1);
				return {
					r: parseInt(first + first, 16),
					g: parseInt(hex.slice(1, 2) + hex.slice(1, 2), 16),
					b: parseInt(hex.slice(2, 3) + hex.slice(2, 3), 16)
				};
			}
			return {
				r: parseInt(hex.slice(0, 2), 16),
				g: parseInt(hex.slice(2, 4), 16),
				b: parseInt(hex.slice(4, 6), 16)
			};
		}
		/**
		* Format rgb channels back to a canonical lowercase `#rrggbb` string.
		* @param channels - the rgb channels to format.
		* @returns the hex color string.
		*/
		function formatHex(channels) {
			const to = (channel) => channel.toString(16).padStart(2, "0");
			return `#${to(channels.r)}${to(channels.g)}${to(channels.b)}`;
		}
		/**
		* Mix a color toward a base by weight: `weight = 0` returns the color,
		* `weight = 1` returns the base.
		* @param value - source hex color.
		* @param base - target hex color.
		* @param weight - 0..1 fraction of the base in the result.
		* @returns the mixed hex color.
		*/
		function mixHex(value, base, weight) {
			const from = parseHex(value);
			const to = parseHex(base);
			const channel = (a, b) => Math.round(a + (b - a) * weight);
			return formatHex({
				r: channel(from.r, to.r),
				g: channel(from.g, to.g),
				b: channel(from.b, to.b)
			});
		}
		/**
		* Render a hex color with an alpha channel as an rgba() string.
		* @param value - `#rgb` or `#rrggbb` string.
		* @param alpha - 0..1 opacity.
		* @returns the rgba() CSS color.
		*/
		function withAlpha(value, alpha) {
			const { r, g, b } = parseHex(value);
			return `rgba(${r}, ${g}, ${b}, ${alpha})`;
		}
		const HEX6_RE = /^#[0-9a-fA-F]{6}$/;
		/**
		* Relative luminance of a 6-digit hex color, 0 (black) .. 1 (white), using
		* sRGB weights. Used to keep foreground text readable over user-picked
		* backgrounds.
		* @param value - `#rrggbb` string.
		* @returns the luminance, or 0 for malformed input.
		*/
		function relativeLuminance(value) {
			const hex = /^#[0-9a-fA-F]{3}$/.test(value) ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}` : value;
			if (!HEX6_RE.test(hex)) return 0;
			const r = parseInt(hex.slice(1, 3), 16) / 255;
			const g = parseInt(hex.slice(3, 5), 16) / 255;
			const b = parseInt(hex.slice(5, 7), 16) / 255;
			const linear = (c) => c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
			return .2126 * linear(r) + .7152 * linear(g) + .0722 * linear(b);
		}
		/**
		* Whether a hex color counts as "dark" for the surface-family flip (relative
		* luminance below 0.18).
		* @param value - `#rrggbb` string.
		* @returns whether the color is dark.
		*/
		function isDarkColor(value) {
			return relativeLuminance(value) < .18;
		}
		//#endregion
		//#region src/client/image.ts
		/**
		* Browser-side image preparation for the background upload: samples the
		* source brightness and accent color, and resamples only when the longest
		* edge exceeds the decode-safe bound (quality-first WebP). The payload is
		* otherwise stored as the original bytes — no recompression, no quality loss.
		*/
		/** Input file size cap (bytes). Deliberately generous: images persist in
		* IndexedDB, not localStorage, so this is a sanity guard against absurd
		* files (multi-hundred-MB scans), not a real constraint. */
		const MAX_INPUT_BYTES = 209715200;
		/** Longest-edge bound above which an image is resampled. Beyond this, decode
		* and GPU texture costs get pathological; a quality-0.95 WebP keeps it
		* visually indistinguishable. */
		const RESAMPLE_EDGE = 4096;
		/** Quality used when resampling oversized images. */
		const RESAMPLE_QUALITY = .95;
		/** Average-brightness threshold below which an image counts as dark. */
		const IMAGE_DARK_THRESHOLD = .35;
		/** Hue buckets for the accent sampler (12 bins of 30°). */
		const ACCENT_HUE_BUCKETS = 12;
		/** Saturation floor for a pixel to count toward the accent (ignores grays). */
		const ACCENT_MIN_SATURATION = .18;
		/** Target lightness the sampled accent is normalized to. */
		const ACCENT_TARGET_LIGHTNESS = .46;
		/** Target saturation the sampled accent is normalized to. */
		const ACCENT_TARGET_SATURATION = .5;
		/** MIME types accepted by the upload controls. */
		const ACCEPTED_IMAGE_TYPES = [
			"image/jpeg",
			"image/png",
			"image/webp",
			"image/gif",
			"image/avif"
		];
		/**
		* Fit a bitmap so its longest edge is at most `maxEdge`, preserving aspect.
		* @param width - source width.
		* @param height - source height.
		* @param maxEdge - longest-edge bound in px.
		* @returns the fitted size.
		*/
		function fitWithin(width, height, maxEdge) {
			const safe = (v) => Number.isFinite(v) && v > 0 ? Math.round(v) : 1;
			if (!Number.isFinite(width) || !Number.isFinite(height) || !Number.isFinite(maxEdge) || maxEdge <= 0) return {
				width: safe(width),
				height: safe(height)
			};
			if (width <= 0 || height <= 0) return {
				width: safe(width),
				height: safe(height)
			};
			const scale = Math.min(1, maxEdge / Math.max(width, height));
			return {
				width: Math.round(width * scale),
				height: Math.round(height * scale)
			};
		}
		/**
		* Sample the average brightness of a bitmap on a fixed small grid, so the
		* cost stays constant regardless of file size.
		* @param bmp - the decoded source bitmap.
		* @returns true when the average perceived luminance is below the dark threshold.
		*/
		function sampleImageDarkness(bmp) {
			const grid = 24;
			const canvas = document.createElement("canvas");
			canvas.width = grid;
			canvas.height = grid;
			const context = canvas.getContext("2d");
			if (context === null) return false;
			context.drawImage(bmp, 0, 0, grid, grid);
			let data;
			try {
				data = context.getImageData(0, 0, grid, grid).data;
			} catch (_readbackUnavailable) {
				return false;
			}
			let sum = 0;
			for (let i = 0; i < data.length; i += 4) {
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				sum += (.299 * r + .587 * g + .114 * b) / 255;
			}
			return sum / 576 < IMAGE_DARK_THRESHOLD;
		}
		/**
		* Sample a dominant, readable accent color from a bitmap: bucket pixels by
		* hue (ignoring near-gray and near-black/white), weight each bucket by its
		* saturation, take the strongest bucket's average RGB, then normalize the
		* hue-preserving lightness/saturation so the result works as an accent on
		* light surfaces (dark enough for white text). Pure utility — no DOM.
		* @param bmp - the decoded source bitmap.
		* @returns a `#rrggbb` hex, or null when the image has no usable hue.
		*/
		function sampleAccentColor(bmp) {
			const grid = 32;
			const canvas = document.createElement("canvas");
			canvas.width = grid;
			canvas.height = grid;
			const context = canvas.getContext("2d");
			if (context === null) return null;
			context.drawImage(bmp, 0, 0, grid, grid);
			let data;
			try {
				data = context.getImageData(0, 0, grid, grid).data;
			} catch (_readbackUnavailable) {
				return null;
			}
			const buckets = new Array(ACCENT_HUE_BUCKETS);
			for (let i = 0; i < ACCENT_HUE_BUCKETS; i += 1) buckets[i] = [
				0,
				0,
				0,
				0,
				0
			];
			for (let i = 0; i < data.length; i += 4) {
				const r = data[i] / 255;
				const g = data[i + 1] / 255;
				const b = data[i + 2] / 255;
				const max = Math.max(r, g, b);
				const min = Math.min(r, g, b);
				const l = (max + min) / 2;
				if (l < .08 || l > .92 || max - min < ACCENT_MIN_SATURATION) continue;
				let hue = 0;
				if (max === min) continue;
				const delta = max - min;
				if (max === r) hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
				else if (max === g) hue = ((b - r) / delta + 2) / 6;
				else hue = ((r - g) / delta + 4) / 6;
				const acc = buckets[Math.min(11, Math.floor(hue * ACCENT_HUE_BUCKETS))];
				acc[0] += r;
				acc[1] += g;
				acc[2] += b;
				acc[3] += 1;
				acc[4] += delta;
			}
			let best;
			let bestScore = -1;
			for (const acc of buckets) {
				if (acc[3] === 0) continue;
				const score = acc[3] * (acc[4] / acc[3]);
				if (score > bestScore) {
					bestScore = score;
					best = acc;
				}
			}
			if (best === void 0) return null;
			const [rSum, gSum, bSum, count] = best;
			return hslToHex(rgbToHsl(rSum / count, gSum / count, bSum / count, ACCENT_TARGET_SATURATION, ACCENT_TARGET_LIGHTNESS));
		}
		/** RGB (0..1) → HSL, optionally re-clamped to the given saturation/lightness. */
		function rgbToHsl(r, g, b, sat, light) {
			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			const l = (max + min) / 2;
			let h = 0;
			let s = 0;
			if (max !== min) {
				const delta = max - min;
				s = l > .5 ? delta / (2 - max - min) : delta / (max + min);
				if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
				else if (max === g) h = ((b - r) / delta + 2) / 6;
				else h = ((r - g) / delta + 4) / 6;
			}
			return [
				h,
				sat ?? s,
				light ?? l
			];
		}
		/** HSL (h: 0..1, s/l: 0..1) → `#rrggbb`. */
		function hslToHex([h, s, l]) {
			const hue = (h - Math.floor(h)) * 6;
			const c = (1 - Math.abs(2 * l - 1)) * s;
			const x = c * (1 - Math.abs(hue % 2 - 1));
			const m = l - c / 2;
			let rgb;
			if (hue < 1) rgb = [
				c,
				x,
				0
			];
			else if (hue < 2) rgb = [
				x,
				c,
				0
			];
			else if (hue < 3) rgb = [
				0,
				c,
				x
			];
			else if (hue < 4) rgb = [
				0,
				x,
				c
			];
			else if (hue < 5) rgb = [
				x,
				0,
				c
			];
			else rgb = [
				c,
				0,
				x
			];
			const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
			return `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`;
		}
		/**
		* Derive a coordinated dark palette from one accent color: the background
		* family steps through lightness (background → panel → input), so the
		* surfaces share the wallpaper hue without all being the same color. The
		* text role is deliberately left alone — the user's text color stays in
		* control.
		* @param accentHex - the sampled accent (`#rrggbb`).
		* @returns the derived role colors.
		*/
		function derivePalette(accentHex) {
			const [h, s] = rgbToHsl(...hexToRgb(accentHex));
			const hex = (sat, light) => hslToHex([
				h,
				sat,
				light
			]);
			return {
				background: hex(s * .35, .1),
				panel: hex(s * .35, .16),
				input: hex(s * .35, .21),
				border: hex(s * .25, .34)
			};
		}
		/** `#rrggbb` → RGB (0..1). */
		function hexToRgb(hex) {
			return [
				Number.parseInt(hex.slice(1, 3), 16) / 255,
				Number.parseInt(hex.slice(3, 5), 16) / 255,
				Number.parseInt(hex.slice(5, 7), 16) / 255
			];
		}
		/**
		* Prepare an image blob for the background: enforce the sanity size cap,
		* sample darkness/accent, and resample only when the longest edge exceeds
		* `RESAMPLE_EDGE` (quality-first encode, alpha preserved for PNG). Undecodable
		* formats (and animated GIFs within the edge bound) pass through as-is.
		* @param source - the image payload to prepare.
		* @returns the prepared payload with its sampled metadata.
		*/
		async function prepareImage(source) {
			if (!source.type.startsWith("image/")) throw new Error(`unsupported file type "${source.type}"`);
			if (source.size > 209715200) throw new Error(`image exceeds the ${MAX_INPUT_BYTES / 1024 / 1024}MB input limit`);
			const bitmap = await tryDecode(source);
			if (bitmap === void 0) return {
				blob: source,
				imageDark: false,
				accent: null
			};
			try {
				const imageDark = sampleImageDarkness(bitmap);
				const accent = sampleAccentColor(bitmap);
				if (Math.max(bitmap.width, bitmap.height) <= 4096) return {
					blob: source,
					imageDark,
					accent
				};
				return {
					blob: await resampleWithinEdge(bitmap, source.type === "image/png"),
					imageDark,
					accent
				};
			} finally {
				bitmap.close();
			}
		}
		/** Decode the blob to a bitmap, or undefined when the format is unsupported. */
		async function tryDecode(source) {
			try {
				return await createImageBitmap(source);
			} catch (_unsupportedImageFormat) {
				return;
			}
		}
		/**
		* Resample an oversized bitmap down to the `RESAMPLE_EDGE` bound. Encodes
		* WebP at near-lossless quality; browsers without WebP encoding fall back to
		* PNG (lossless, larger). Animated sources lose animation here — accepted,
		* since only >4096px files take this path.
		* @param bitmap - decoded oversized source.
		* @param keepAlpha - whether to preserve a transparent channel (PNG).
		* @returns the resampled blob.
		*/
		async function resampleWithinEdge(bitmap, keepAlpha) {
			const size = fitWithin(bitmap.width, bitmap.height, RESAMPLE_EDGE);
			const canvas = document.createElement("canvas");
			canvas.width = size.width;
			canvas.height = size.height;
			const ctx = canvas.getContext("2d");
			if (ctx === null) throw new Error("canvas unavailable for resampling");
			ctx.drawImage(bitmap, 0, 0, size.width, size.height);
			return canvasToBlob(canvas, keepAlpha, RESAMPLE_QUALITY);
		}
		/**
		* Encode a canvas to a blob: PNG keeps alpha; everything else prefers WebP
		* at the given quality and falls back through PNG when WebP is unsupported.
		* @param canvas - the drawn canvas.
		* @param keepAlpha - whether transparency must survive.
		* @param quality - encoder quality for lossy formats.
		* @returns the encoded blob, rejecting when encoding fails entirely.
		*/
		function canvasToBlob(canvas, keepAlpha, quality) {
			const type = keepAlpha ? "image/png" : "image/webp";
			return new Promise((resolve, reject) => {
				canvas.toBlob((blob) => {
					if (blob !== null && blob.type === type) {
						resolve(blob);
						return;
					}
					canvas.toBlob((fallback) => {
						if (fallback === null) reject(/* @__PURE__ */ new Error("image encoding failed"));
						else resolve(fallback);
					}, "image/png");
				}, type, quality);
			});
		}
		//#endregion
		//#region src/client/blob-db.ts
		/**
		* Shared IndexedDB database for the plugin's background blobs (videos and
		* images). One database, one version, one upgrade path: both object stores
		* are created idempotently so either store file can open the database first.
		*/
		/** Database identity. */
		const DB_NAME = "dsh-ui-appearance";
		/** Object store holding background video blobs keyed by record id. */
		const VIDEO_STORE = "videos";
		/** Object store holding background image blobs keyed by record id. */
		const IMAGE_STORE = "images";
		/**
		* Open (and create/upgrade) the blob database, resolving once it is ready.
		* @returns the opened database connection.
		*/
		function openBlobDb() {
			return new Promise((resolve, reject) => {
				const request = indexedDB.open(DB_NAME, 2);
				request.onupgradeneeded = () => {
					const db = request.result;
					if (!db.objectStoreNames.contains("videos")) db.createObjectStore(VIDEO_STORE);
					if (!db.objectStoreNames.contains("images")) db.createObjectStore(IMAGE_STORE);
				};
				request.onsuccess = () => {
					resolve(request.result);
				};
				request.onerror = () => {
					reject(request.error ?? /* @__PURE__ */ new Error("indexeddb open failed"));
				};
			});
		}
		/**
		* Wrap one IDB transaction in a promise, resolving after the transaction commits.
		* @param storeName - object store the transaction touches.
		* @param mode - transaction mode.
		* @param action - the request to run against the store.
		* @returns the request's result, resolved only after commit.
		*/
		function runBlobTx(storeName, mode, action) {
			return new Promise((resolve, reject) => {
				openBlobDb().then((db) => {
					const transaction = db.transaction(storeName, mode);
					const request = action(transaction.objectStore(storeName));
					let result;
					request.onsuccess = () => {
						result = request.result;
					};
					request.onerror = () => {
						reject(request.error ?? /* @__PURE__ */ new Error("indexeddb request failed"));
					};
					transaction.oncomplete = () => {
						db.close();
						resolve(result);
					};
					transaction.onerror = () => {
						reject(transaction.error ?? /* @__PURE__ */ new Error("indexeddb transaction failed"));
					};
				}, reject);
			});
		}
		/** Generate one record key (time-ordered prefix + random suffix). */
		function newBlobKey() {
			return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
		}
		//#endregion
		//#region src/client/image-store.ts
		/**
		* IndexedDB-backed storage for background images. Images ride the same
		* database as videos (blob-db.ts) so the settings section only carries a
		* short record key instead of a multi-megabyte data URL — the localStorage
		* quota never sees the payload.
		*/
		/**
		* Store an image blob and return its record key.
		* @param blob - the image payload (original bytes, or resampled oversized ones).
		* @param name - original file name.
		* @returns the record key to persist in the settings section.
		*/
		async function saveImage(blob, name) {
			const record = {
				data: blob,
				name
			};
			const key = newBlobKey();
			await runBlobTx(IMAGE_STORE, "readwrite", (store) => store.put(record, key));
			return key;
		}
		/**
		* Load a stored image by key.
		* @param key - record key from the settings section.
		* @returns the image blob, or undefined when absent.
		*/
		async function getImage(key) {
			const record = await runBlobTx(IMAGE_STORE, "readonly", (store) => store.get(key));
			if (record === void 0) return void 0;
			return record.data;
		}
		/**
		* Delete a stored image by key.
		* @param key - record key to remove.
		* @returns settlement of the delete transaction.
		*/
		function deleteImage(key) {
			return runBlobTx(IMAGE_STORE, "readwrite", (store) => store.delete(key));
		}
		//#endregion
		//#region src/client/video-store.ts
		/**
		* IndexedDB-backed storage for background videos. Videos are too large for
		* localStorage, so the settings section only carries the record key; the
		* blob lives here and is streamed into the background layer on demand.
		* Database open/upgrade lives in blob-db.ts (shared with image-store).
		*/
		/** Video upload cap (bytes); larger files are refused up front. */
		const MAX_VIDEO_BYTES = 52428800;
		/** MIME types accepted by the video upload control. */
		const ACCEPTED_VIDEO_TYPES = [
			"video/mp4",
			"video/webm",
			"video/ogg"
		];
		/**
		* Store a video blob and return its record key.
		* @param blob - the video payload.
		* @param name - original file name.
		* @returns the record key to persist in the settings section.
		*/
		async function saveVideo(blob, name) {
			if (blob.size > 52428800) throw new Error(`video exceeds the ${MAX_VIDEO_BYTES / 1024 / 1024}MB limit`);
			const record = {
				data: blob,
				name
			};
			const key = newBlobKey();
			await runBlobTx(VIDEO_STORE, "readwrite", (store) => store.put(record, key));
			return key;
		}
		/**
		* Load a stored video by key, materialized back into a Blob.
		* @param key - record key from the settings section.
		* @returns the video blob, or undefined when absent.
		*/
		async function getVideo(key) {
			const record = await runBlobTx(VIDEO_STORE, "readonly", (store) => store.get(key));
			if (record === void 0) return void 0;
			if (record.data instanceof Blob) return record.data;
			return new Blob([record.data], { type: record.type ?? "" });
		}
		/**
		* Delete a stored video by key.
		* @param key - record key to remove.
		* @returns settlement of the delete transaction.
		*/
		function deleteVideo(key) {
			return runBlobTx(VIDEO_STORE, "readwrite", (store) => store.delete(key));
		}
		//#endregion
		//#region src/client/url-load.ts
		/**
		* Loading background media from a remote URL: fetch the resource, then feed
		* it through the same image/video pipelines as local uploads (preparation,
		* darkness sampling, IndexedDB storage). CORS-unfriendly hosts are reported
		* as a distinct user-facing error instead of a silent failure.
		*/
		/** Video extensions the URL classifier recognizes. */
		const VIDEO_EXT = /\.(mp4|webm|ogg|mov|m4v)([?#]|$)/i;
		/** A remote-load failure carrying a user-facing code. */
		var UrlLoadFailure = class extends Error {
			/** The user-facing failure code. */
			code;
			constructor(code) {
				super(code);
				this.code = code;
			}
		};
		/**
		* Guess the media kind from the URL. Extension-based; unknown extensions
		* default to image (a wrong guess surfaces as a type error after fetch).
		* @param url - the remote URL.
		* @returns the guessed kind.
		*/
		function classifyUrl(url) {
			return VIDEO_EXT.test(url) ? "video" : "image";
		}
		/**
		* Fetch a remote resource as a blob, mapping failures to user-facing codes.
		* @param url - the remote URL.
		* @returns the fetched blob.
		* @throws UrlLoadFailure with a 'cors', 'http' or 'network' code.
		*/
		async function fetchBlob(url) {
			let response;
			try {
				response = await fetch(url, { mode: "cors" });
			} catch {
				throw new UrlLoadFailure("cors");
			}
			if (!response.ok) throw new UrlLoadFailure("http");
			let blob;
			try {
				blob = await response.blob();
			} catch {
				throw new UrlLoadFailure("network");
			}
			if (blob.size === 0) throw new UrlLoadFailure("network");
			return blob;
		}
		/**
		* Derive a display name from the URL path (the stored record's name).
		* @param url - the remote URL.
		* @returns the file-name part of the path, or 'background'.
		*/
		function urlToName(url) {
			try {
				const name = new URL(url).pathname.split("/").pop();
				return name !== void 0 && name !== "" ? name : "background";
			} catch {
				return "background";
			}
		}
		/** Fallback MIME per guessed kind when the server omits Content-Type. */
		function mimeFor(kind) {
			return kind === "video" ? "video/mp4" : "image/jpeg";
		}
		/**
		* Load an image from a URL through the preparation pipeline.
		* @param url - the remote image URL.
		* @returns the prepared result (blob + darkness flag).
		* @throws UrlLoadFailure with a 'type' or 'size' code past the fetch stage.
		*/
		async function loadImageFromUrl(url) {
			const kind = classifyUrl(url);
			const blob = await fetchBlob(url);
			const type = blob.type === "" ? mimeFor(kind) : blob.type;
			if (!type.startsWith("image/")) throw new UrlLoadFailure("type");
			if (blob.size > 209715200) throw new UrlLoadFailure("size");
			return prepareImage(new File([blob], urlToName(url), { type }));
		}
		/**
		* Load a video from a URL into a File ready for the IndexedDB store.
		* @param url - the remote video URL.
		* @returns the video file.
		* @throws UrlLoadFailure with a 'type' or 'size' code past the fetch stage.
		*/
		async function loadVideoFromUrl(url) {
			const kind = classifyUrl(url);
			const blob = await fetchBlob(url);
			const type = blob.type === "" ? mimeFor(kind) : blob.type;
			if (!type.startsWith("video/")) throw new UrlLoadFailure("type");
			if (blob.size > 52428800) throw new UrlLoadFailure("size");
			return new File([blob], urlToName(url), { type });
		}
		//#endregion
		//#region src/client/color-scheme.ts
		/**
		* Color scheme export/import: a portable JSON carrier for the eight color
		* roles. Pure functions — no DOM, no storage — so the format is unit-testable
		* and shared by the settings row.
		*/
		/** Current scheme format version. */
		const SCHEME_VERSION = 1;
		/**
		* Serialize the current color roles into the portable scheme JSON.
		* @param settings - current appearance settings.
		* @returns the scheme JSON string.
		*/
		function exportColorScheme(settings) {
			const colors = {};
			for (const role of APPEARANCE_ROLES) colors[role] = settings[role];
			return JSON.stringify({
				version: SCHEME_VERSION,
				colors
			}, null, 2);
		}
		/**
		* Parse and validate an imported scheme JSON.
		* @param json - the pasted scheme text.
		* @returns the validated role colors, or throws with a descriptive message.
		*/
		function parseColorScheme(json) {
			let raw;
			try {
				raw = JSON.parse(json);
			} catch {
				throw new Error("not valid JSON");
			}
			if (typeof raw !== "object" || raw === null || Array.isArray(raw)) throw new Error("scheme root must be an object");
			const colors = raw.colors;
			if (typeof colors !== "object" || colors === null || Array.isArray(colors)) throw new Error("scheme.colors must be an object");
			const result = {};
			for (const [role, value] of Object.entries(colors)) {
				if (!APPEARANCE_ROLES.includes(role)) continue;
				if (value !== "" && !(typeof value === "string" && isHexColor(value))) throw new Error(`role "${role}" has an invalid color: ${JSON.stringify(value)}`);
				result[role] = value;
			}
			return result;
		}
		//#endregion
		//#region src/client/tokens.ts
		/** Override-layer source name pinned to this package (also names inspection). */
		const OVERRIDE_SOURCE = "@deepseek-ai/dsh-client-ui-appearance";
		/** Mode base a derived step mixes toward: light mixes toward white. */
		const LIGHT_BASE = "#ffffff";
		/** Mode base a derived step mixes toward: dark mixes toward near-black. */
		const DARK_BASE = "#151517";
		/** Ink painted ON a light label fill (badge letters, selection text). */
		const LIGHT_INK = "#fafaf9";
		/** Ink painted ON a dark label fill (host stock light-mode label). */
		const DARK_INK = "#0f1115";
		/**
		* The on-ink counterpart of a label color. The sidebar wordmark's "harness"
		* badge paints its chip with `currentColor` (the label color) and its letters
		* with `--dsw-alias-label-primary-inverted`; `::selection` pairs its
		* background with `-foreground` the same way. Overriding the label color
		* without re-deriving these two breaks both pairings — a white chip keeps
		* the stock light-mode white letters and the badge disappears.
		*/
		const onInk = (label) => {
			const contrast = (ink) => {
				const a = relativeLuminance(label);
				const b = relativeLuminance(ink);
				return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
			};
			return contrast(LIGHT_INK) >= contrast(DARK_INK) ? LIGHT_INK : DARK_INK;
		};
		/**
		* Stock surface colors per mode (design-platform.css alias tokens, resolved
		* to their static steps). The translucent pass bakes these into rgba() when
		* no role color or dark-flip value applies; keep in sync with the theme
		* package's design-platform.css.
		*/
		const DEFAULT_SURFACE_COLORS = {
			"--dsw-alias-bg-base": {
				light: "#ffffff",
				dark: "#151517"
			},
			"--dsw-alias-bg-layer-1": {
				light: "#ffffff",
				dark: "#232324"
			},
			"--dsw-alias-bg-layer-2": {
				light: "#ffffff",
				dark: "#2c2c2e"
			},
			"--dsw-alias-bg-layer-3": {
				light: "#ffffff",
				dark: "#353638"
			},
			"--dsw-alias-bg-overlay": {
				light: "#e9ecf2",
				dark: "#61666b"
			},
			"--dsw-alias-bg-module-platform": {
				light: "#f5f6f7",
				dark: "#353638"
			},
			"--dsw-alias-bg-multi-select": {
				light: "#f5f6f7",
				dark: "#2c2c2e"
			},
			"--dsw-specific-sidebar-fill": {
				light: "#f9fafb",
				dark: "#1b1b1c"
			},
			"--dsw-specific-input-major": {
				light: "#ffffff",
				dark: "#2c2c2e"
			},
			"--dsw-specific-bubble-highlight": {
				light: "#d3e2ff",
				dark: "#43454a"
			},
			"--dsw-specific-bubble": {
				light: "#edf3fe",
				dark: "#2c2c2e"
			},
			"--dsw-specific-sidebar-nav-item-active": {
				light: "#ebeef2",
				dark: "#43454a"
			},
			"--dsw-specific-sidebar-nav-item-hover": {
				light: "#f1f3f5",
				dark: "#2c2c2e"
			},
			"--dsw-specific-menu": {
				light: "#ffffff",
				dark: "#353638"
			},
			"--dsw-specific-selector": {
				light: "#f5f6f7",
				dark: "#353638"
			},
			"--dsw-alias-fill-l2": {
				light: "#f5f6f7",
				dark: "#353638"
			},
			"--dsw-alias-interactive-bg-hover-solid": {
				light: "#f1f3f5",
				dark: "#353638"
			},
			"--dsw-specific-tip": {
				light: "#f5f6f7",
				dark: "#353638"
			},
			"--dsw-alias-markdown-inline-code": {
				light: "#ebeef2",
				dark: "#2c2c2e"
			},
			"--dsw-alias-markdown-code-block": {
				light: "#f9fafb",
				dark: "#1b1b1c"
			},
			"--dsw-alias-markdown-code-block-banner": {
				light: "#f9fafb",
				dark: "#2c2c2e"
			},
			"--dsw-alias-button-elevated-fill": {
				light: "#ffffff",
				dark: "#43454a"
			},
			"--dsw-alias-button-floating-fill": {
				light: "#ffffff",
				dark: "#2c2c2e"
			},
			"--dsw-alias-button-floating-hover": {
				light: "#f1f3f5",
				dark: "#353638"
			},
			"--dsw-alias-button-primary-fill": {
				light: "#4176e6",
				dark: "#679efe"
			},
			"--dsw-alias-button-info-fill": {
				light: "#4176e6",
				dark: "#679efe"
			},
			"--dsw-alias-button-info-hover": {
				light: "#679efe",
				dark: "#4176e6"
			},
			"--dsw-alias-button-primary-hover": {
				light: "#43454a",
				dark: "#ebeef2"
			}
		};
		/**
		* Compute the full override layer for one settings snapshot. Every role with
		* a non-empty color contributes its token group; a surfaceAlpha below 1 turns
		* the major surface tokens translucent. Returns an empty object when nothing
		* is customized, which removes the override layer entirely.
		* @param settings - current appearance settings.
		* @returns token-name → per-mode value pairs.
		*/
		function buildTokenOverrides(settings) {
			const tokens = {};
			const emit = (name, light, dark) => {
				tokens[name] = {
					light,
					dark
				};
			};
			const modePair = (value) => [value, value];
			const step = (value, weight) => [mixHex(value, LIGHT_BASE, weight), mixHex(value, DARK_BASE, weight)];
			const { accent, background, panel, input, text, border, backgroundImage, imageDark, surfaceAlpha, inputAlpha, codeAlpha, sidebarOpaque, emphasisAlpha } = settings;
			let infoHover;
			let primaryHover;
			if (accent !== "") {
				const [light, dark] = modePair(accent);
				emit("--dsw-alias-brand-primary", light, dark);
				emit("--dsw-alias-state-business-primary", light, dark);
				emit("--dsw-alias-button-info-fill", light, dark);
				infoHover = step(accent, .15);
				emit("--dsw-alias-button-info-hover", infoHover[0], infoHover[1]);
				primaryHover = step(accent, .22);
				emit("--dsw-alias-button-primary-hover", primaryHover[0], primaryHover[1]);
				emit("--dsw-specific-bubble", light, dark);
				emit("--dsw-specific-bubble-highlight", light, dark);
			}
			if (background !== "") {
				const [light, dark] = modePair(background);
				emit("--dsw-alias-bg-base", light, dark);
				const [l1l, l1d] = step(background, .04);
				emit("--dsw-alias-bg-layer-1", l1l, l1d);
				const [l2l, l2d] = step(background, .08);
				emit("--dsw-alias-bg-layer-2", l2l, l2d);
				const [l3l, l3d] = step(background, .14);
				emit("--dsw-alias-bg-layer-3", l3l, l3d);
				const [modl, modd] = step(background, .06);
				emit("--dsw-alias-bg-module-platform", modl, modd);
				const [ovl, ovd] = step(background, .18);
				emit("--dsw-alias-bg-overlay", ovl, ovd);
				if (panel === "") {
					const [sideL, sideD] = step(background, .05);
					emit("--dsw-specific-sidebar-fill", sideL, sideD);
				}
			}
			if (panel !== "") {
				const [light, dark] = modePair(panel);
				emit("--dsw-alias-bg-layer-1", light, dark);
				const [l2l, l2d] = step(panel, .08);
				emit("--dsw-alias-bg-layer-2", l2l, l2d);
				const [l3l, l3d] = step(panel, .14);
				emit("--dsw-alias-bg-layer-3", l3l, l3d);
				const [ovl, ovd] = step(panel, .1);
				emit("--dsw-alias-bg-overlay", ovl, ovd);
				const [modl, modd] = step(panel, .06);
				emit("--dsw-alias-bg-module-platform", modl, modd);
				const [sideL, sideD] = step(panel, .04);
				emit("--dsw-specific-sidebar-fill", sideL, sideD);
			}
			if (input !== "") {
				const [light, dark] = modePair(input);
				emit("--dsw-specific-input-major", light, dark);
				const [loginL, loginD] = step(input, .06);
				emit("--dsw-specific-login-input", loginL, loginD);
			}
			if (text !== "") {
				const [light, dark] = modePair(text);
				emit("--dsw-alias-label-primary", light, dark);
				const [secL, secD] = step(text, .38);
				emit("--dsw-alias-label-secondary", secL, secD);
				const [terL, terD] = step(text, .58);
				emit("--dsw-alias-label-tertiary", terL, terD);
				const ink = onInk(light);
				emit("--dsw-alias-label-primary-inverted", ink, ink);
				emit("--dsw-alias-label-primary-foreground", ink, ink);
			}
			if (border !== "") {
				const [light, dark] = modePair(border);
				emit("--dsw-alias-border-l1", light, dark);
				emit("--dsw-alias-border-l2", light, dark);
				const [l3l, l3d] = step(border, .3);
				emit("--dsw-alias-border-l3", l3l, l3d);
			}
			const controlBase = panel !== "" ? panel : background;
			let controlButtonFill;
			let controlButtonHover;
			let controlNavActive;
			let controlNavHover;
			if (controlBase !== "") {
				const lift = (weight) => {
					const mixed = mixHex(controlBase, LIGHT_BASE, weight);
					return [mixed, mixed];
				};
				const emphasize = (weight) => [mixHex(controlBase, DARK_BASE, weight), mixHex(controlBase, LIGHT_BASE, weight)];
				controlButtonFill = lift(.06);
				controlButtonHover = lift(.12);
				controlNavActive = emphasize(.1);
				controlNavHover = emphasize(.05);
				emit("--dsw-alias-button-elevated-fill", controlButtonFill[0], controlButtonFill[1]);
				emit("--dsw-alias-button-floating-fill", controlButtonFill[0], controlButtonFill[1]);
				emit("--dsw-alias-button-floating-hover", controlButtonHover[0], controlButtonHover[1]);
				emit("--dsw-specific-sidebar-nav-item-active", controlNavActive[0], controlNavActive[1]);
				emit("--dsw-specific-sidebar-nav-item-hover", controlNavHover[0], controlNavHover[1]);
				emit("--dsw-specific-selector", controlButtonFill[0], controlButtonFill[1]);
				emit("--dsw-alias-interactive-bg-hover-solid", controlButtonHover[0], controlButtonHover[1]);
			}
			if (backgroundImage !== "") emit("--dsw-alias-bg-base", "transparent", "transparent");
			const flipBase = backgroundImage !== "" ? imageDark ? "#151517" : void 0 : background !== "" && isDarkColor(background) ? background : void 0;
			let flipLayer1;
			let flipLayer2;
			let flipSidebar;
			let flipButtonElevated;
			let flipButtonFloating;
			let flipButtonFloatingHover;
			if (flipBase !== void 0) {
				flipLayer1 = mixHex(flipBase, LIGHT_BASE, .06);
				flipLayer2 = mixHex(flipBase, LIGHT_BASE, .12);
				flipSidebar = mixHex(flipBase, LIGHT_BASE, .03);
				flipButtonElevated = "rgb(67, 69, 74)";
				flipButtonFloating = "rgb(44, 44, 46)";
				flipButtonFloatingHover = "rgb(53, 54, 56)";
				emit("--dsw-alias-bg-layer-1", flipLayer1, flipLayer1);
				emit("--dsw-alias-bg-layer-2", flipLayer2, flipLayer2);
				emit("--dsw-specific-sidebar-fill", flipSidebar, flipSidebar);
				if (text === "") {
					emit("--dsw-alias-label-primary", "#fafaf9", "#fafaf9");
					emit("--dsw-alias-label-secondary", "#d6d3d1", "#d6d3d1");
					emit("--dsw-alias-label-primary-inverted", DARK_INK, DARK_INK);
					emit("--dsw-alias-label-primary-foreground", DARK_INK, DARK_INK);
				}
				emit("--dsw-alias-button-elevated-fill", flipButtonElevated, flipButtonElevated);
				emit("--dsw-alias-button-floating-fill", flipButtonFloating, flipButtonFloating);
				emit("--dsw-alias-button-floating-hover", flipButtonFloatingHover, flipButtonFloatingHover);
				emit("--dsw-specific-sidebar-nav-item-active", flipButtonElevated, flipButtonElevated);
				emit("--dsw-specific-sidebar-nav-item-hover", flipButtonFloating, flipButtonFloating);
				emit("--dsw-specific-selector", flipButtonFloating, flipButtonFloating);
				emit("--dsw-alias-interactive-bg-hover-solid", flipButtonFloatingHover, flipButtonFloatingHover);
			}
			const bakeAlpha = (token, explicit, flip, a) => {
				if (explicit === "transparent") {
					emit(token, "transparent", "transparent");
					return;
				}
				const base = explicit !== void 0 && explicit !== "" ? {
					light: explicit,
					dark: explicit
				} : flip !== void 0 ? {
					light: flip,
					dark: flip
				} : DEFAULT_SURFACE_COLORS[token] ?? {
					light: LIGHT_BASE,
					dark: DARK_BASE
				};
				emit(token, withAlpha(base.light, a), withAlpha(base.dark, a));
			};
			const bakeAccent = (token, a) => {
				if (accent === "") {
					bakeAlpha(token, void 0, void 0, a);
					return;
				}
				const [light, dark] = modePair(accent);
				emit(token, withAlpha(light, a), withAlpha(dark, a));
			};
			bakeAlpha("--dsw-specific-input-major", input, void 0, inputAlpha);
			bakeAlpha("--dsw-alias-markdown-code-block", void 0, void 0, codeAlpha);
			bakeAlpha("--dsw-alias-markdown-code-block-banner", void 0, void 0, codeAlpha);
			if (surfaceAlpha < 1) {
				const alpha = surfaceAlpha;
				const translucent = (token, explicit, flip) => {
					bakeAlpha(token, explicit, flip, alpha);
				};
				translucent("--dsw-alias-bg-base", backgroundImage !== "" ? "transparent" : background, void 0);
				translucent("--dsw-alias-bg-layer-1", panel, flipLayer1);
				translucent("--dsw-alias-bg-layer-2", panel !== "" ? mixHex(panel, LIGHT_BASE, .08) : void 0, flipLayer2);
				translucent("--dsw-alias-bg-layer-3", void 0, void 0);
				translucent("--dsw-alias-bg-overlay", void 0, void 0);
				translucent("--dsw-alias-bg-module-platform", void 0, void 0);
				translucent("--dsw-alias-bg-multi-select", void 0, void 0);
				if (!sidebarOpaque) translucent("--dsw-specific-sidebar-fill", panel ?? background, flipSidebar);
				translucent("--dsw-specific-bubble", accent, void 0);
				translucent("--dsw-specific-bubble-highlight", accent, void 0);
				const bakeControl = (token, derived, flip) => {
					if (flip !== void 0) {
						emit(token, withAlpha(flip, alpha), withAlpha(flip, alpha));
						return;
					}
					if (derived !== void 0) {
						emit(token, withAlpha(derived[0], alpha), withAlpha(derived[1], alpha));
						return;
					}
					bakeAlpha(token, void 0, void 0, alpha);
				};
				bakeControl("--dsw-alias-button-elevated-fill", controlButtonFill, flipButtonElevated);
				bakeControl("--dsw-alias-button-floating-fill", controlButtonFill, flipButtonFloating);
				bakeControl("--dsw-alias-button-floating-hover", controlButtonHover, flipButtonFloatingHover);
				bakeControl("--dsw-specific-sidebar-nav-item-active", controlNavActive, flipButtonElevated);
				bakeControl("--dsw-specific-sidebar-nav-item-hover", controlNavHover, flipButtonFloating);
				translucent("--dsw-specific-menu", void 0, void 0);
				translucent("--dsw-alias-fill-l2", void 0, void 0);
				bakeControl("--dsw-alias-interactive-bg-hover-solid", controlButtonHover, flipButtonFloatingHover);
				translucent("--dsw-specific-tip", void 0, void 0);
				const inlineCodeBase = accent !== "" && accent !== void 0 ? accent : "#4176e6";
				const inlineCodeBaseDark = accent !== "" && accent !== void 0 ? accent : "#679efe";
				emit("--dsw-alias-markdown-inline-code", withAlpha(inlineCodeBase, emphasisAlpha), withAlpha(inlineCodeBaseDark, emphasisAlpha));
			}
			if (surfaceAlpha < 1 || inputAlpha < 1) {
				bakeAccent("--dsw-alias-button-primary-fill", inputAlpha);
				bakeAccent("--dsw-alias-button-info-fill", inputAlpha);
				const bakeInputHover = (token, derived) => {
					if (derived !== void 0) {
						emit(token, withAlpha(derived[0], inputAlpha), withAlpha(derived[1], inputAlpha));
						return;
					}
					bakeAlpha(token, void 0, void 0, inputAlpha);
				};
				bakeInputHover("--dsw-alias-button-info-hover", infoHover);
				bakeInputHover("--dsw-alias-button-primary-hover", primaryHover);
				const plusBase = flipButtonFloating ?? controlButtonFill?.[0];
				if (plusBase !== void 0) emit("--dsw-specific-selector", withAlpha(plusBase, inputAlpha), withAlpha(plusBase, inputAlpha));
				else bakeAlpha("--dsw-specific-selector", void 0, void 0, inputAlpha);
			}
			return tokens;
		}
		/** The shipped presets; `default` clears every role color. */
		const APPEARANCE_PRESETS = [
			{
				id: "default",
				colors: {}
			},
			{
				id: "midnight",
				colors: {
					accent: "#7c9cff",
					background: "#1b1e2c",
					panel: "#232737",
					input: "#202435",
					text: "#e6e9f4",
					border: "#343a52"
				}
			},
			{
				id: "ocean",
				colors: {
					accent: "#4fc3f7",
					background: "#0c2231",
					panel: "#12303f",
					input: "#0f2a38",
					text: "#e1f1fa",
					border: "#1e455c"
				}
			},
			{
				id: "forest",
				colors: {
					accent: "#81c784",
					background: "#12241b",
					panel: "#183026",
					input: "#152b21",
					text: "#e7f0ea",
					border: "#2b4637"
				}
			},
			{
				id: "rose",
				colors: {
					accent: "#f48fb1",
					background: "#291a21",
					panel: "#36232d",
					input: "#2e1f27",
					text: "#f7e9ee",
					border: "#4a3340"
				}
			},
			{
				id: "monochrome",
				colors: {
					accent: "#b4b4b9",
					background: "#17171a",
					panel: "#202025",
					input: "#1c1c20",
					text: "#eeeef0",
					border: "#333338"
				}
			}
		];
		//#endregion
		//#region \0dsh-css:/Users/ivan/dsh/plugins/dsh-kiligz-base/vendor/features/ui-appearance/src/client/AppearanceCustomizerRow.module.css.mjs
		const css = ".zA5oWG_group{border-bottom:1px solid var(--dsw-alias-border-l2);padding:16px 0}.zA5oWG_body{flex-direction:column;gap:18px;padding:14px 0 4px;display:flex}.zA5oWG_section{flex-direction:column;gap:10px;display:flex}.zA5oWG_sectionTitle{color:var(--dsw-alias-label-secondary);font-size:13px;font-weight:500;line-height:20px}.zA5oWG_chipRow{flex-wrap:wrap;gap:8px;display:flex}.zA5oWG_chip{border:1px solid var(--dsw-alias-border-l2);font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:999px;padding:5px 12px;font-size:13px;line-height:20px}.zA5oWG_chip:hover:not(.zA5oWG_chipSelected){background:var(--dsw-alias-interactive-bg-hover)}.zA5oWG_chipSelected{background:var(--dsw-alias-bg-module-platform);border-color:var(--dsw-static-neutral-bluish-400)}.zA5oWG_colorGrid{grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px 16px;display:grid}.zA5oWG_colorField{align-items:center;gap:8px;min-width:0;display:flex}.zA5oWG_colorLabel{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:13px;line-height:20px;overflow:hidden}.zA5oWG_colorSwatch{border:1px solid var(--dsw-alias-border-l2);cursor:pointer;border-radius:6px;flex:none;width:26px;height:26px;position:relative;overflow:hidden}.zA5oWG_colorSwatchInput{opacity:0;cursor:pointer;border:none;width:100%;height:100%;padding:0;position:absolute;inset:0}.zA5oWG_colorHex{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-specific-input-major);width:66px;color:var(--dsw-alias-label-primary);font:inherit;text-transform:lowercase;border-radius:6px;flex:none;padding:4px 8px;font-size:12px;line-height:18px}.zA5oWG_uploadRow{flex-wrap:wrap;align-items:center;gap:10px;display:flex}.zA5oWG_fileInput{display:none}.zA5oWG_urlRow{align-items:center;gap:10px;margin-top:10px;display:flex}.zA5oWG_urlInput{border:1px solid var(--dsw-alias-border-l2);min-width:0;font:inherit;color:var(--dsw-alias-label-primary);background:0 0;border-radius:8px;flex:1;padding:5px 10px;font-size:13px;line-height:20px}.zA5oWG_urlInput::placeholder{color:var(--dsw-alias-label-tertiary)}.zA5oWG_urlInput:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-1px}.zA5oWG_thumb{border:1px solid var(--dsw-alias-border-l2);object-fit:cover;border-radius:6px;flex:none;width:52px;height:32px}.zA5oWG_ghostButton{border:1px solid var(--dsw-alias-border-l2);font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:8px;padding:5px 12px;font-size:13px;line-height:20px}.zA5oWG_ghostButton:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.zA5oWG_ghostButton:disabled{cursor:default;opacity:.55}.zA5oWG_sliderRow{align-items:center;gap:10px;display:flex}.zA5oWG_sliderLabel{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;line-height:20px}.zA5oWG_slider{appearance:none;background:var(--dsw-static-neutral-bluish-600);border-radius:999px;flex:auto;min-width:96px;height:16px}.zA5oWG_slider::-webkit-slider-thumb{appearance:none;background:var(--dsw-static-neutral-bluish-00);border:0;border-radius:50%;width:14px;height:14px}.zA5oWG_slider::-moz-range-thumb{background:var(--dsw-static-neutral-bluish-00);border:0;border-radius:50%;width:14px;height:14px}.zA5oWG_sliderValue{width:44px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;text-align:right;flex:none;font-size:12px;line-height:18px}.zA5oWG_checkRow{cursor:pointer;align-items:center;gap:8px;display:flex}.zA5oWG_checkbox{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);border-radius:3px;place-items:center;width:16px;height:16px;margin:0;display:inline-grid}.zA5oWG_checkbox:checked{background:var(--dsw-static-neutral-bluish-600)}.zA5oWG_checkbox:checked:after{content:\"\";background:var(--dsw-static-neutral-bluish-00);border-radius:50%;width:6px;height:6px}.zA5oWG_hint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.zA5oWG_footer{justify-content:flex-start;display:flex}.zA5oWG_dragging{outline:1px dashed var(--dsw-alias-border-l3);outline-offset:6px;border-radius:8px}.zA5oWG_schemePanel{flex-direction:column;gap:8px;display:flex}.zA5oWG_schemeInput{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-specific-input-major);width:100%;color:var(--dsw-alias-label-primary);font:inherit;resize:vertical;border-radius:6px;padding:8px 10px;font-size:12px;line-height:18px}";
		const tagId = "@kiligzzz/dsh-ui-appearance/AppearanceCustomizerRow.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@kiligzzz/dsh-ui-appearance";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var AppearanceCustomizerRow_module_css_default = {
			"chip": "zA5oWG_chip",
			"schemeInput": "zA5oWG_schemeInput",
			"sectionTitle": "zA5oWG_sectionTitle",
			"footer": "zA5oWG_footer",
			"checkbox": "zA5oWG_checkbox",
			"group": "zA5oWG_group",
			"colorGrid": "zA5oWG_colorGrid",
			"colorSwatch": "zA5oWG_colorSwatch",
			"checkRow": "zA5oWG_checkRow",
			"hint": "zA5oWG_hint",
			"colorField": "zA5oWG_colorField",
			"colorLabel": "zA5oWG_colorLabel",
			"dragging": "zA5oWG_dragging",
			"chipSelected": "zA5oWG_chipSelected",
			"body": "zA5oWG_body",
			"slider": "zA5oWG_slider",
			"sliderRow": "zA5oWG_sliderRow",
			"ghostButton": "zA5oWG_ghostButton",
			"colorSwatchInput": "zA5oWG_colorSwatchInput",
			"thumb": "zA5oWG_thumb",
			"colorHex": "zA5oWG_colorHex",
			"uploadRow": "zA5oWG_uploadRow",
			"sliderValue": "zA5oWG_sliderValue",
			"fileInput": "zA5oWG_fileInput",
			"urlRow": "zA5oWG_urlRow",
			"section": "zA5oWG_section",
			"urlInput": "zA5oWG_urlInput",
			"sliderLabel": "zA5oWG_sliderLabel",
			"schemePanel": "zA5oWG_schemePanel",
			"chipRow": "zA5oWG_chipRow"
		};
		//#endregion
		//#region src/client/AppearanceCustomizerRow.tsx
		/**
		* The Appearance customizer row registered into the General section item slot
		* (below ui-theme's Appearance preference row): preset chips, eight color
		* pickers, the background upload/drop zone with opacity and blur sliders, and
		* the interface transparency / glass sliders. All writes go through the
		* injected face; the scope round-trip reconciles.
		*/
		/** Stock (light-mode) display color per role, shown when the role is unset
		* so the swatch always mirrors what the theme actually uses. */
		const STOCK_ROLE_COLORS = {
			accent: "#4176e6",
			background: "#ffffff",
			panel: "#ffffff",
			input: "#ffffff",
			text: "#0f1115",
			border: "#d9dde3"
		};
		/** One color field row: native swatch + hex text input. */
		function ColorField(props) {
			const { label, value, stock, onChange } = props;
			const [draft, setDraft] = (0, react.useState)(value);
			(0, react.useEffect)(() => {
				setDraft(value);
			}, [value]);
			const commit = () => {
				const hex = draft.trim();
				if (hex === value) return;
				if (isHexColor(hex)) onChange(hex);
				else setDraft(value);
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
				className: AppearanceCustomizerRow_module_css_default.colorField,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceCustomizerRow_module_css_default.colorLabel,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceCustomizerRow_module_css_default.colorSwatch,
						style: { backgroundColor: value === "" ? stock : value },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							type: "color",
							className: AppearanceCustomizerRow_module_css_default.colorSwatchInput,
							"aria-label": `${label} (color picker)`,
							value: value === "" ? stock : value,
							onChange: (event) => {
								onChange(event.target.value);
							}
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "text",
						className: AppearanceCustomizerRow_module_css_default.colorHex,
						"aria-label": `${label} (hex)`,
						value: draft,
						spellCheck: false,
						onChange: (event) => {
							setDraft(event.target.value);
						},
						onBlur: commit,
						onKeyDown: (event) => {
							if (event.key === "Enter") commit();
						}
					})
				]
			});
		}
		/** One labeled slider with a formatted value readout. */
		function Slider(props) {
			const { label, value, min, max, step, format, onChange } = props;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: AppearanceCustomizerRow_module_css_default.sliderRow,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceCustomizerRow_module_css_default.sliderLabel,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "range",
						className: AppearanceCustomizerRow_module_css_default.slider,
						"aria-label": label,
						min,
						max,
						step,
						value,
						onChange: (event) => {
							onChange(Number(event.target.value));
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceCustomizerRow_module_css_default.sliderValue,
						children: format(value)
					})
				]
			});
		}
		/** Map a remote-load failure code to the localized message key. */
		function urlErrorText(code, t) {
			return t(`background.urlError.${code}`);
		}
		/** Map a local-read failure code to the localized message key ('read' keeps
		* the base key as the catch-all). */
		function localErrorText(prefix, code, t) {
			return t(code === "read" ? prefix : `${prefix}.${code}`);
		}
		/** Thumbnail for the stored wallpaper. Legacy tokens are inline data URLs
		* (rendered directly); current tokens are IndexedDB keys resolved to object
		* URLs, revoked when the token changes or the row unmounts. */
		function BackgroundThumb(props) {
			const { token } = props;
			const [src, setSrc] = (0, react.useState)("");
			(0, react.useEffect)(() => {
				if (token === "") {
					setSrc("");
					return;
				}
				if (token.startsWith("data:")) {
					setSrc(token);
					return;
				}
				let stale = false;
				let objectUrl;
				getImage(token).then((blob) => {
					if (blob === void 0 || stale) return;
					objectUrl = URL.createObjectURL(blob);
					setSrc(objectUrl);
				});
				return () => {
					stale = true;
					if (objectUrl !== void 0) URL.revokeObjectURL(objectUrl);
				};
			}, [token]);
			if (src === "") return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
				className: AppearanceCustomizerRow_module_css_default.thumb,
				src,
				alt: ""
			});
		}
		/**
		* Render the appearance customizer row.
		* @param props - composed slot props.
		* @returns the row element tree.
		*/
		function AppearanceCustomizerRow({ t, useStore, set, setImage, setVideo, applyPreset, applyColors, resetAll }) {
			const settings = useStore((s) => s.settings);
			const [open, setOpen] = (0, react.useState)(false);
			const [reading, setReading] = (0, react.useState)(false);
			const [readError, setReadError] = (0, react.useState)(null);
			const [videoReading, setVideoReading] = (0, react.useState)(false);
			const [videoError, setVideoError] = (0, react.useState)(null);
			const [dragging, setDragging] = (0, react.useState)(false);
			const [urlDraft, setUrlDraft] = (0, react.useState)("");
			const [urlReading, setUrlReading] = (0, react.useState)(false);
			const [urlError, setUrlError] = (0, react.useState)(null);
			const [schemeOpen, setSchemeOpen] = (0, react.useState)(false);
			const [schemeDraft, setSchemeDraft] = (0, react.useState)("");
			const [schemeError, setSchemeError] = (0, react.useState)(false);
			const [exported, setExported] = (0, react.useState)(false);
			const fileRef = (0, react.useRef)(null);
			const videoRef = (0, react.useRef)(null);
			const applyWallpaperPalette = (accentHex) => {
				set("accent", accentHex);
				const palette = derivePalette(accentHex);
				for (const [role, hex] of Object.entries(palette)) if (settings[role] === "") set(role, hex);
				set("preset", "custom");
			};
			const readFile = async (file) => {
				if (file === void 0) return;
				if (!file.type.startsWith("image/")) {
					setReadError("type");
					return;
				}
				if (file.size > 209715200) {
					setReadError("size");
					return;
				}
				setReading(true);
				setReadError(null);
				try {
					const payload = await prepareImage(file);
					setImage({
						url: await saveImage(payload.blob, file.name),
						imageDark: payload.imageDark
					});
					if (payload.accent !== null) applyWallpaperPalette(payload.accent);
				} catch {
					setReadError("read");
				} finally {
					setReading(false);
				}
			};
			const readVideo = async (file) => {
				if (file === void 0) return;
				if (!file.type.startsWith("video/")) {
					setVideoError("type");
					return;
				}
				if (file.size > 52428800) {
					setVideoError("size");
					return;
				}
				setVideoReading(true);
				setVideoError(null);
				try {
					const oldKey = settings.backgroundVideo;
					if (oldKey !== "") deleteVideo(oldKey);
					setVideo(await saveVideo(file, file.name));
				} catch {
					setVideoError("read");
				} finally {
					setVideoReading(false);
				}
			};
			const removeVideo = () => {
				if (settings.backgroundVideo !== "") deleteVideo(settings.backgroundVideo);
				setVideo(null);
			};
			const loadFromUrl = async () => {
				const url = urlDraft.trim();
				if (url === "") return;
				setUrlReading(true);
				setUrlError(null);
				try {
					if (classifyUrl(url) === "video") {
						const file = await loadVideoFromUrl(url);
						const oldKey = settings.backgroundVideo;
						if (oldKey !== "") deleteVideo(oldKey);
						setVideo(await saveVideo(file, file.name));
					} else {
						const payload = await loadImageFromUrl(url);
						setImage({
							url: await saveImage(payload.blob, urlToName(url)),
							imageDark: payload.imageDark
						});
						if (payload.accent !== null) applyWallpaperPalette(payload.accent);
					}
					setUrlDraft("");
				} catch (error) {
					setUrlError(error instanceof UrlLoadFailure ? error.code : "network");
				} finally {
					setUrlReading(false);
				}
			};
			const onPick = (event) => {
				const file = event.target.files?.[0];
				event.target.value = "";
				readFile(file);
			};
			const onPickVideo = (event) => {
				const file = event.target.files?.[0];
				event.target.value = "";
				readVideo(file);
			};
			const onDrop = (event) => {
				event.preventDefault();
				setDragging(false);
				const file = event.dataTransfer.files?.[0];
				if (file?.type.startsWith("video/")) readVideo(file);
				else readFile(file);
			};
			const changeRole = (role, hex) => {
				set(role, hex.length === 4 ? formatHex(parseHex(hex)) : hex.toLowerCase());
				set("preset", "custom");
			};
			const doExport = async () => {
				setExported(false);
				try {
					await navigator.clipboard.writeText(exportColorScheme(settings));
					setExported(true);
				} catch {
					setSchemeError(true);
				}
			};
			const doImport = () => {
				setSchemeError(false);
				try {
					applyColors(parseColorScheme(schemeDraft));
					setSchemeOpen(false);
					setSchemeDraft("");
				} catch {
					setSchemeError(true);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: AppearanceCustomizerRow_module_css_default.group,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.DisclosureRow, {
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPersonalizationOutline16, {}),
					title: t("row.title"),
					open,
					expandable: true,
					expandOnRowClick: true,
					onToggle: () => {
						setOpen((value) => !value);
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceCustomizerRow_module_css_default.body,
						onClick: (event) => {
							event.stopPropagation();
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: AppearanceCustomizerRow_module_css_default.section,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: AppearanceCustomizerRow_module_css_default.sectionTitle,
									children: t("presets.title")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: AppearanceCustomizerRow_module_css_default.chipRow,
									role: "group",
									children: APPEARANCE_PRESETS.map((preset) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: clsx(AppearanceCustomizerRow_module_css_default.chip, settings.preset === preset.id && AppearanceCustomizerRow_module_css_default.chipSelected),
										"aria-pressed": settings.preset === preset.id,
										onClick: () => {
											applyPreset(preset.id);
										},
										children: t(`preset.${preset.id}`)
									}, preset.id))
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: AppearanceCustomizerRow_module_css_default.section,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: AppearanceCustomizerRow_module_css_default.sectionTitle,
									children: t("colors.title")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: AppearanceCustomizerRow_module_css_default.colorGrid,
									children: APPEARANCE_ROLES.map((role) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorField, {
										label: t(`color.${role}`),
										value: settings[role],
										stock: STOCK_ROLE_COLORS[role],
										onChange: (hex) => {
											changeRole(role, hex);
										},
										t
									}, role))
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: clsx(AppearanceCustomizerRow_module_css_default.section, dragging && AppearanceCustomizerRow_module_css_default.dragging),
								onDragOver: (event) => {
									event.preventDefault();
									setDragging(true);
								},
								onDragLeave: () => {
									setDragging(false);
								},
								onDrop,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.sectionTitle,
										children: t("background.title")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.uploadRow,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												ref: fileRef,
												className: AppearanceCustomizerRow_module_css_default.fileInput,
												type: "file",
												accept: ACCEPTED_IMAGE_TYPES.join(","),
												onChange: onPick
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												disabled: reading,
												onClick: () => {
													fileRef.current?.click();
												},
												children: reading ? t("background.reading") : settings.backgroundImage === "" ? t("background.upload") : t("background.replace")
											}),
											settings.backgroundImage !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BackgroundThumb, { token: settings.backgroundImage }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												onClick: () => {
													setImage(null);
												},
												children: t("background.remove")
											})] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												ref: videoRef,
												className: AppearanceCustomizerRow_module_css_default.fileInput,
												type: "file",
												accept: ACCEPTED_VIDEO_TYPES.join(","),
												onChange: onPickVideo
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												disabled: videoReading,
												onClick: () => {
													videoRef.current?.click();
												},
												children: videoReading ? t("background.reading") : settings.backgroundVideo !== "" ? t("background.replace") : t("background.videoUpload")
											}),
											settings.backgroundVideo !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												onClick: removeVideo,
												children: t("background.videoRemove")
											})
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.urlRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "url",
											className: AppearanceCustomizerRow_module_css_default.urlInput,
											"aria-label": t("background.url"),
											placeholder: t("background.urlPlaceholder"),
											value: urlDraft,
											spellCheck: false,
											onChange: (event) => {
												setUrlDraft(event.target.value);
												setUrlError(null);
											},
											onKeyDown: (event) => {
												if (event.key === "Enter") loadFromUrl();
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: AppearanceCustomizerRow_module_css_default.ghostButton,
											disabled: urlReading || urlDraft.trim() === "",
											onClick: () => {
												loadFromUrl();
											},
											children: urlReading ? t("background.urlLoading") : t("background.urlLoad")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.hint,
										children: urlError !== null ? urlErrorText(urlError, t) : videoError !== null ? localErrorText("background.videoError", videoError, t) : settings.backgroundVideo !== "" ? t("background.videoHint") : readError !== null ? localErrorText("background.readError", readError, t) : t("background.dropHint")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("background.opacity"),
										value: settings.backgroundOpacity,
										min: 0,
										max: 1,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("backgroundOpacity", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("background.blur"),
										value: settings.backgroundBlur,
										min: 0,
										max: 30,
										step: 1,
										format: (value) => `${value}px`,
										onChange: (value) => {
											set("backgroundBlur", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("background.scrim"),
										value: settings.scrim,
										min: 0,
										max: 1,
										step: .05,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("scrim", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.hint,
										children: t("background.scrimHint")
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: AppearanceCustomizerRow_module_css_default.section,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.sectionTitle,
										children: t("surface.title")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.opacity"),
										value: settings.surfaceAlpha,
										min: 0,
										max: 1,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("surfaceAlpha", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.inputOpacity"),
										value: settings.inputAlpha,
										min: 0,
										max: 1,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("inputAlpha", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.codeOpacity"),
										value: settings.codeAlpha,
										min: 0,
										max: 1,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("codeAlpha", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.emphasis"),
										value: settings.emphasisAlpha,
										min: 0,
										max: EMPHASIS_ALPHA_MAX,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("emphasisAlpha", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: AppearanceCustomizerRow_module_css_default.checkRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: AppearanceCustomizerRow_module_css_default.checkbox,
											checked: settings.sidebarOpaque,
											onChange: (event) => {
												set("sidebarOpaque", event.target.checked);
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: AppearanceCustomizerRow_module_css_default.sliderLabel,
											children: t("surface.sidebar")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.glass"),
										value: settings.glassBlur,
										min: 0,
										max: 20,
										step: 1,
										format: (value) => `${value}px`,
										onChange: (value) => {
											set("glassBlur", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: AppearanceCustomizerRow_module_css_default.checkRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: AppearanceCustomizerRow_module_css_default.checkbox,
											checked: settings.conversationGlass,
											onChange: (event) => {
												set("conversationGlass", event.target.checked);
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: AppearanceCustomizerRow_module_css_default.sliderLabel,
											children: t("surface.conversationGlass")
										})]
									}),
									settings.conversationGlass && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.conversationGlassBlur"),
										value: settings.conversationGlassBlur,
										min: 0,
										max: 20,
										step: 1,
										format: (value) => `${value}px`,
										onChange: (value) => {
											set("conversationGlassBlur", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.sectionTitle,
										children: t("composer.title")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: AppearanceCustomizerRow_module_css_default.checkRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: AppearanceCustomizerRow_module_css_default.checkbox,
											checked: settings.aistudioComposer,
											onChange: (event) => {
												set("aistudioComposer", event.target.checked);
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: AppearanceCustomizerRow_module_css_default.sliderLabel,
											children: t("composer.aistudio")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: AppearanceCustomizerRow_module_css_default.checkRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: AppearanceCustomizerRow_module_css_default.checkbox,
											checked: settings.glassComposer,
											onChange: (event) => {
												set("glassComposer", event.target.checked);
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: AppearanceCustomizerRow_module_css_default.sliderLabel,
											children: t("composer.glass")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: AppearanceCustomizerRow_module_css_default.checkRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: AppearanceCustomizerRow_module_css_default.checkbox,
											checked: settings.glowComposer,
											onChange: (event) => {
												set("glowComposer", event.target.checked);
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: AppearanceCustomizerRow_module_css_default.sliderLabel,
											children: t("composer.glow")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.hint,
										children: t("surface.hint")
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: AppearanceCustomizerRow_module_css_default.section,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.sectionTitle,
										children: t("scheme.title")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.uploadRow,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												onClick: () => {
													doExport();
												},
												children: t("scheme.export")
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												onClick: () => {
													setSchemeOpen((value) => !value);
												},
												children: t("scheme.import")
											}),
											exported && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: AppearanceCustomizerRow_module_css_default.hint,
												children: t("scheme.exported")
											})
										]
									}),
									schemeOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.schemePanel,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
												className: AppearanceCustomizerRow_module_css_default.schemeInput,
												"aria-label": t("scheme.import"),
												rows: 4,
												placeholder: t("scheme.importPlaceholder"),
												value: schemeDraft,
												onChange: (event) => {
													setSchemeDraft(event.target.value);
													setSchemeError(false);
												}
											}),
											schemeError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: AppearanceCustomizerRow_module_css_default.hint,
												children: t("scheme.invalid")
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: AppearanceCustomizerRow_module_css_default.uploadRow,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: AppearanceCustomizerRow_module_css_default.ghostButton,
													onClick: doImport,
													children: t("scheme.apply")
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: AppearanceCustomizerRow_module_css_default.ghostButton,
													onClick: () => {
														setSchemeOpen(false);
														setSchemeDraft("");
														setSchemeError(false);
													},
													children: t("scheme.cancel")
												})]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: AppearanceCustomizerRow_module_css_default.footer,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: AppearanceCustomizerRow_module_css_default.ghostButton,
									onClick: resetAll,
									children: t("actions.reset")
								})
							})
						]
					})
				})
			});
		}
		//#endregion
		//#region src/client/settings-store.ts
		/**
		* Appearance row slot store: a mirror of the settings scope section plus
		* optimistic patches from the row's own write path. The apply-world change
		* listener is the authoritative writer; the injected `set` patches first so
		* sliders and pickers feel instant, then the scope round-trip reconciles.
		*/
		/**
		* Declares the Appearance customizer row state and write surface.
		* @returns the store handle.
		*/
		function createAppearanceRowStore() {
			return (0, _deepseek_ai_dsh_client_store.defineStore)({
				init: () => ({
					settings: { ...DEFAULT_SETTINGS },
					revision: -1
				}),
				actions: {
					sync: (d, settings, revision) => {
						if (revision <= d.revision) return;
						d.settings = { ...settings };
						d.revision = revision;
					},
					patch: (d, partial) => {
						d.settings = {
							...d.settings,
							...partial
						};
					}
				}
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `settings.appearance` namespace dictionaries (the customizer row's copy). */
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"row.title": "个性化外观",
			"presets.title": "预设主题",
			"preset.default": "默认",
			"preset.midnight": "午夜",
			"preset.ocean": "海洋",
			"preset.forest": "森林",
			"preset.rose": "玫瑰",
			"preset.monochrome": "单色",
			"colors.title": "主题颜色",
			"color.accent": "主色",
			"color.background": "背景色",
			"color.panel": "面板色",
			"color.input": "输入框色",
			"color.text": "文字色",
			"color.border": "边框色",
			"background.title": "背景",
			"background.upload": "上传图片",
			"background.replace": "更换图片",
			"background.remove": "删除图片",
			"background.reading": "读取中…",
			"background.dropHint": "支持 JPG / PNG / WebP / GIF,不限大小;超过 4096px 会等比缩边",
			"background.readError": "无法读取该图片,请换一张试试",
			"background.readError.type": "这不是图片文件(JPG / PNG / WebP),无法作为背景",
			"background.readError.size": "图片超过大小上限(200MB),请换一张试试",
			"background.video": "视频背景",
			"background.videoUpload": "上传视频",
			"background.videoRemove": "删除视频",
			"background.videoError": "无法读取该视频,请换一个试试",
			"background.videoError.size": "视频超过大小上限(50MB),请压缩或裁剪后再试",
			"background.videoHint": "视频自动静音循环播放;与背景图片互斥",
			"background.url": "从 URL 加载背景",
			"background.urlPlaceholder": "粘贴图片或视频 URL",
			"background.urlLoad": "加载",
			"background.urlLoading": "加载中…",
			"background.urlError.network": "无法加载该地址,请检查网络或地址是否正确",
			"background.urlError.cors": "该地址不允许跨域读取(CORS),无法作为背景使用",
			"background.urlError.http": "服务器返回错误状态,无法加载",
			"background.urlError.type": "该地址的内容不是图片或视频",
			"background.urlError.size": "文件超过大小限制(图片 25MB / 视频 50MB)",
			"background.opacity": "背景图片不透明度",
			"background.blur": "背景模糊",
			"background.scrim": "背景遮罩",
			"background.scrimHint": "调高遮罩,背景图片上的文字更易读",
			"surface.title": "界面",
			"surface.opacity": "面板不透明度",
			"surface.inputOpacity": "输入框不透明度",
			"surface.codeOpacity": "代码块不透明度",
			"surface.emphasis": "强调字浓度",
			"surface.sidebar": "侧边栏保持不透明",
			"surface.glass": "毛玻璃强度",
			"surface.conversationGlass": "会话区毛玻璃",
			"surface.conversationGlassBlur": "会话区模糊",
			"surface.hint": "背景图会显示在主区域;调低面板不透明度可让卡片、侧边栏也透出;输入框/代码块不透明度独立于面板(100% = 不透明);开启会话区毛玻璃后,对话区与详情区透出壁纸",
			"composer.title": "输入框特效",
			"composer.aistudio": "新会话流光",
			"composer.glass": "玻璃输入框",
			"composer.glow": "运行流光",
			"composer.hint": "新会话流光给新会话输入框加渐变光晕边框;玻璃输入框给新会话输入框 Liquid Glass 半透明质感;运行流光在 agent 工作时给输入框边缘加流动彩色光影",
			"surface.preview": "效果预览:代码块背景与强调字(随上方滑块实时变化)",
			"scheme.title": "配色方案",
			"scheme.export": "导出配色",
			"scheme.import": "导入配色",
			"scheme.importPlaceholder": "粘贴导出的配色 JSON…",
			"scheme.apply": "应用",
			"scheme.cancel": "取消",
			"scheme.invalid": "配色 JSON 无效,请检查后重试",
			"scheme.exported": "配色已复制到剪贴板",
			"actions.reset": "恢复默认"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"row.title": "Appearance",
			"presets.title": "Presets",
			"preset.default": "Default",
			"preset.midnight": "Midnight",
			"preset.ocean": "Ocean",
			"preset.forest": "Forest",
			"preset.rose": "Rose",
			"preset.monochrome": "Monochrome",
			"colors.title": "Theme colors",
			"color.accent": "Accent",
			"color.background": "Background",
			"color.panel": "Panels",
			"color.input": "Input",
			"color.text": "Text",
			"color.border": "Border",
			"background.title": "Background",
			"background.upload": "Upload image",
			"background.replace": "Replace image",
			"background.remove": "Remove image",
			"background.reading": "Reading…",
			"background.dropHint": "JPG / PNG / WebP / GIF — no size limit; images over 4096px are scaled down",
			"background.readError": "Could not read this image, try another one",
			"background.readError.type": "That is not an image file (JPG / PNG / WebP)",
			"background.readError.size": "Image exceeds the size limit (200MB) — try a smaller one",
			"background.video": "Video background",
			"background.videoUpload": "Upload video",
			"background.videoRemove": "Remove video",
			"background.videoError": "Could not read that video, try another one",
			"background.videoError.size": "Video exceeds the size limit (50MB) — trim or compress it first",
			"background.videoHint": "Video plays muted in a loop; exclusive with the image background",
			"background.url": "Load background from URL",
			"background.urlPlaceholder": "Paste an image or video URL",
			"background.urlLoad": "Load",
			"background.urlLoading": "Loading…",
			"background.urlError.network": "Could not load that URL — check the network or the address",
			"background.urlError.cors": "That address does not allow cross-origin reads (CORS)",
			"background.urlError.http": "The server returned an error status",
			"background.urlError.type": "That address is not an image or a video",
			"background.urlError.size": "File exceeds the size limit (images 25MB / videos 50MB)",
			"background.opacity": "Image opacity",
			"background.blur": "Background blur",
			"background.scrim": "Background scrim",
			"background.scrimHint": "Raise the scrim to keep text readable over the image",
			"surface.title": "Interface",
			"surface.opacity": "Panel opacity",
			"surface.inputOpacity": "Input opacity",
			"surface.codeOpacity": "Code block opacity",
			"surface.emphasis": "Emphasis tint",
			"surface.sidebar": "Keep the sidebar opaque",
			"surface.glass": "Glass blur",
			"surface.conversationGlass": "Conversation glass",
			"surface.conversationGlassBlur": "Conversation blur",
			"surface.hint": "The wallpaper shows in the main area; lower panel opacity to reveal cards and the sidebar. Input/code-block opacity is independent of the panel (100% = opaque). Enabling conversation glass makes the chat and details columns translucent",
			"composer.title": "Composer effects",
			"composer.aistudio": "New session glow",
			"composer.glass": "Glass composer",
			"composer.glow": "Running glow",
			"composer.hint": "New session glow adds a gradient aura border to the new-session composer; Glass composer gives it a Liquid Glass look; Running glow lights a flowing gradient ring around the composer while the agent works",
			"surface.preview": "Preview: code-block background and emphasized text (updates live with the sliders above)",
			"scheme.title": "Color scheme",
			"scheme.export": "Export colors",
			"scheme.import": "Import colors",
			"scheme.importPlaceholder": "Paste an exported color scheme JSON…",
			"scheme.apply": "Apply",
			"scheme.cancel": "Cancel",
			"scheme.invalid": "Invalid color scheme JSON, check and retry",
			"scheme.exported": "Color scheme copied to clipboard",
			"actions.reset": "Reset to default"
		};
		//#endregion
		//#region src/client/applier.ts
		/** Background layer element id (the stylesheet targets it). */
		const BG_LAYER_ID = "dsw-appearance-bg";
		/** Stylesheet element id owned by this plugin. */
		const STYLE_ID = "dsw-appearance-styles";
		/** Composer-effect body attributes (mirrors the host half's constants). */
		const COMPOSER_ATTRS = {
			aistudio: "data-dsh-aistudio-composer",
			glass: "data-dsh-glass-composer",
			glow: "data-dsh-glow-composer"
		};
		/** CSS variables the applier writes on body, consumed by the stylesheet. */
		const BODY_VARIABLES = [
			"--dsw-appearance-bg-image",
			"--dsw-appearance-bg-opacity",
			"--dsw-appearance-blur",
			"--dsw-appearance-scrim"
		];
		/**
		* Static sheet: the background layer is pushed to `z-index: -1` so it paints
		* below all content but above the body background — surfaces painted with
		* translucent tokens still show the image through, and no stacking context is
		* created on #root. `inset: -48px` gives the blur filter room so edges never
		* show transparent bleed.
		*
		* #root is deliberately left untouched: no `position`/`z-index`, no
		* `backdrop-filter`. A non-none backdrop-filter turns #root into the
		* containing block of every fixed-position descendant (menus, tooltips,
		* toasts), and any `z-index` traps those descendants in a stacking context
		* scoped to #root — whose own effective z then sits at the page level. Either
		* would let top-level third-party panels (e.g. dsh-better-sidebar's
		* `position: fixed; z-index: 40` panel) paint over the DSH settings dialog
		* (`position: fixed; z-index: 1000`, a descendant of #root). Pushing the
		* wallpaper layer to -1 instead of lifting #root keeps fixed overlays at the
		* top level, so the dialog always wins. Blurring the wallpaper directly is
		* visually equivalent here — the only thing behind #root is this layer — and
		* leaves fixed positioning alone.
		*
		* The readability scrim rides inside the layer's own background-image stack:
		* a uniform veil whose alpha is `var(--dsw-appearance-scrim)` — the browser
		* re-rasterizes the layer live as the slider moves, no JS wiring needed.
		* The veil hue follows the base theme (white-ish in light mode, near-black in
		* dark mode). Selection and focus rings follow the user's accent through the
		* overridden brand tokens.
		*/
		const SHEET = `
#${BG_LAYER_ID} {
  position: fixed;
  inset: -48px;
  z-index: -1;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image:
    linear-gradient(rgba(255, 255, 255, var(--dsw-appearance-scrim, 0)) 0%, rgba(255, 255, 255, var(--dsw-appearance-scrim, 0)) 100%),
    var(--dsw-appearance-bg-image, none);
  opacity: var(--dsw-appearance-bg-opacity, 1);
  filter: blur(var(--dsw-appearance-blur, 0px));
}
#${BG_LAYER_ID} video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: none;
}
#${BG_LAYER_ID}[data-video] video {
  display: block;
}
#${BG_LAYER_ID}[data-video] {
  background-image: none;
}
body[data-ds-dark-theme] #${BG_LAYER_ID} {
  background-image:
    linear-gradient(rgba(8, 10, 18, var(--dsw-appearance-scrim, 0)) 0%, rgba(8, 10, 18, var(--dsw-appearance-scrim, 0)) 100%),
    var(--dsw-appearance-bg-image, none);
}
#root ::selection {
  background: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-label-primary-foreground);
}
#root :focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary);
  outline-offset: 2px;
}
/* Conversation-area glass: when the dedicated toggle is on, the Desktop shell
   columns (advanced/extended mode) drop their opaque fill so the wallpaper
   layer behind them shows through the chat. The readability veil stays in
   the wallpaper layer itself (--dsw-appearance-scrim); surfaces painted with
   translucent tokens (bubbles, composer, code) keep their own alpha from the
   surface/input/code sliders, so text stays readable while the area frosted. */
body[data-dsw-conversation-glass] .dshDesktopConversationSurface,
body[data-dsw-conversation-glass] .dshDesktopDetailsSurface {
  background: transparent !important;
}
body[data-dsw-conversation-glass] .dshDesktopFrame {
  background: transparent !important;
}
/* Frosted-glass overlays: translucent popovers (model picker menu, better-sidebar
   panel) and the composer input card let the wallpaper through but blur whatever
   sits underneath (chat text), so overlays stay see-through without text showing
   through confusingly. */
[role="menu"],
[role="listbox"] {
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
}
[data-dsh-panel-host] [class*="_panel"] {
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
}
[data-composer-card] {
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
}
/* Nested backdrop-filter limit: the model menu renders INSIDE the composer
   card, and browsers discard a child's backdrop-filter when an ancestor
   already has one. Instead of toggling the card blur (visible flash), give
   the menu a half-solid base built from its own theme token (relative color
   keeps the hue, raises alpha): it rides on the card's already-blurred
   backdrop, so the menu stays readable while the card never loses its
   frosted look. Where the menu is NOT nested, its own blur still applies. */
[role="menu"],
[role="listbox"] {
  background: rgb(from var(--dsw-specific-menu) r g b / 0.5) !important;
}
/* Composer effects (migrated from dsh-glass-composer). Each effect gates on a
   body attribute the host half pre-applies before mount and the applier keeps
   in sync with the settings section. */
[data-phase="hero"] [data-composer-card]{transition:background .3s ease,border-color .3s ease,box-shadow .3s ease}
body[data-dsh-glass-composer] [data-phase="hero"] [data-composer-card]{background:rgba(255,255,255,.45);-webkit-backdrop-filter:blur(28px) saturate(1.8);backdrop-filter:blur(28px) saturate(1.8);border:1px solid rgba(255,255,255,.65);box-shadow:0 12px 40px rgba(70,90,180,.14),inset 0 1px 0 rgba(255,255,255,.85),inset 0 -1px 0 rgba(255,255,255,.28)}
body[data-ds-dark-theme][data-dsh-glass-composer] [data-phase="hero"] [data-composer-card]{background:rgba(26,28,36,.42);border:1px solid rgba(255,255,255,.16);box-shadow:0 14px 48px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.15),inset 0 -1px 0 rgba(255,255,255,.05)}
@property --dshGlowAngle{syntax:"<angle>";initial-value:0deg;inherits:false}
[data-composer-card]{transition:border-color .25s ease}
body[data-dsh-glow-composer] [data-composer-card][data-composer-running]{border-color:transparent}
body[data-dsh-glow-composer] [data-composer-card][data-composer-running]:before,
body[data-dsh-glow-composer] [data-composer-card][data-composer-running]:after{content:"";position:absolute;pointer-events:none;border-radius:24px;background:conic-gradient(from var(--dshGlowAngle),transparent 0deg 240deg,#4D6BFE 275deg,#9E4DFF 310deg,#00C2D8 335deg,#FF5CA8 350deg,transparent 360deg);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude}
body[data-dsh-glow-composer] [data-composer-card][data-composer-running]:before{inset:-1.5px;padding:1.5px}
body[data-dsh-glow-composer] [data-composer-card][data-composer-running]:after{inset:-4px;padding:4px;filter:blur(4px);opacity:.4}
@media (prefers-reduced-motion:no-preference){body[data-dsh-glow-composer] [data-composer-card][data-composer-running]:before,body[data-dsh-glow-composer] [data-composer-card][data-composer-running]:after{animation:dshGlowSpin 3.2s linear infinite}}
@keyframes dshGlowSpin{to{--dshGlowAngle:360deg}}
@property --dshAuroraAngle{syntax:"<angle>";initial-value:0deg;inherits:false}
body[data-dsh-aistudio-composer] [data-phase="hero"] [data-composer-card]{border-color:transparent}
body[data-dsh-aistudio-composer] [data-phase="hero"] [data-composer-card]:before{content:"";position:absolute;pointer-events:none;inset:-2px;padding:2px;border-radius:24px;opacity:.9;background:conic-gradient(from var(--dshAuroraAngle),#4285F4 0deg,#A142F4 90deg,#FF5CA8 160deg,#F9AB00 235deg,#00C2D8 300deg,#4285F4 360deg);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude}
body[data-dsh-aistudio-composer] [data-phase="hero"] [data-composer-card]:after{content:"";position:absolute;pointer-events:none;inset:-70px;border-radius:92px;background:conic-gradient(from var(--dshAuroraAngle),#4285F4 0deg,#A142F4 90deg,#FF5CA8 160deg,#F9AB00 235deg,#00C2D8 300deg,#4285F4 360deg);filter:blur(40px) saturate(1.2);opacity:.2;z-index:-1}
body[data-dsh-aistudio-composer] [data-phase="hero"] [data-composer-card]:hover:before{opacity:1;filter:saturate(1.2) brightness(1.08)}
@media (prefers-reduced-motion:no-preference){body[data-dsh-aistudio-composer] [data-phase="hero"] [data-composer-card]:before{animation:dshAuroraSpin 4s linear infinite}body[data-dsh-aistudio-composer] [data-phase="hero"] [data-composer-card]:after{animation:dshAuroraSpin 10s linear infinite}}
@keyframes dshAuroraSpin{to{--dshAuroraAngle:360deg}}
`;
		/**
		* Projects one appearance settings snapshot onto the document. Replaces the
		* token override layer on every apply; retracts everything in dispose.
		*/
		var AppearanceApplier = class {
			ctx;
			style;
			layer;
			videoEl;
			videoUrl;
			videoKey = "";
			imageToken = "";
			imageUrl;
			removeOverrides;
			runningObserver;
			/**
			* @param ctx - client context providing the theme service.
			*/
			constructor(ctx) {
				this.ctx = ctx;
				this.style = document.createElement("style");
				this.style.id = STYLE_ID;
				this.style.textContent = SHEET;
				document.head.append(this.style);
				this.layer = document.createElement("div");
				this.layer.id = BG_LAYER_ID;
				document.body.prepend(this.layer);
				this.observeRunning();
			}
			/**
			* Apply a settings snapshot: rebuild the theme override layer and refresh
			* the body CSS variables. Undefined values (settings not yet loaded) apply
			* the stock defaults, which removes the override layer.
			* @param settings - current appearance settings or undefined while loading.
			*/
			apply(settings) {
				const value = settings ?? DEFAULT_SETTINGS;
				this.removeOverrides?.();
				this.removeOverrides = void 0;
				const tokens = buildTokenOverrides(value);
				if (Object.keys(tokens).length > 0) this.removeOverrides = this.ctx.theme.overrideTokens(OVERRIDE_SOURCE, tokens);
				const body = document.body;
				this.syncImage(value.backgroundImage);
				body.style.setProperty("--dsw-appearance-bg-opacity", String(value.backgroundOpacity));
				body.style.setProperty("--dsw-appearance-blur", `${value.backgroundBlur + value.glassBlur}px`);
				body.style.setProperty("--dsw-mask-blur", `blur(${value.glassBlur}px)`);
				body.style.setProperty("--dsw-appearance-scrim", String(value.scrim));
				if (value.conversationGlass) {
					body.dataset.dswConversationGlass = "";
					body.style.setProperty("--dsw-appearance-blur", `${value.backgroundBlur + value.glassBlur + value.conversationGlassBlur}px`);
				} else {
					delete body.dataset.dswConversationGlass;
					body.style.setProperty("--dsw-appearance-blur", `${value.backgroundBlur + value.glassBlur}px`);
				}
				this.syncVideo(value.backgroundVideo);
				body.toggleAttribute(COMPOSER_ATTRS.aistudio, value.aistudioComposer);
				body.toggleAttribute(COMPOSER_ATTRS.glass, value.glassComposer);
				body.toggleAttribute(COMPOSER_ATTRS.glow, value.glowComposer);
			}
			/**
			* Load or clear the wallpaper for a background token. Legacy records still
			* carry an inline data URL (applied directly); current records hold an
			* IndexedDB key resolved through an object URL. Reuses the object URL when
			* the token is unchanged, so repeated applies never re-read IndexedDB.
			* @param token - record key, legacy data URL, or '' to clear.
			*/
			async syncImage(token) {
				if (token === this.imageToken) return;
				this.imageToken = token;
				this.teardownImage();
				const body = document.body;
				if (token === "") {
					body.style.setProperty("--dsw-appearance-bg-image", "none");
					return;
				}
				if (token.startsWith("data:")) {
					body.style.setProperty("--dsw-appearance-bg-image", `url("${token}")`);
					return;
				}
				const blob = await getImage(token);
				if (this.imageToken !== token) return;
				if (blob === void 0) {
					this.imageToken = "";
					body.style.setProperty("--dsw-appearance-bg-image", "none");
					return;
				}
				this.imageUrl = URL.createObjectURL(blob);
				body.style.setProperty("--dsw-appearance-bg-image", `url("${this.imageUrl}")`);
			}
			/** Revoke the wallpaper object URL, if any. */
			teardownImage() {
				if (this.imageUrl !== void 0) {
					URL.revokeObjectURL(this.imageUrl);
					this.imageUrl = void 0;
				}
			}
			/**
			* Load or clear the background video for a record key. Reuses the element
			* and object URL when the key is unchanged, so repeated applies never
			* re-read IndexedDB.
			* @param key - video record key, or '' to clear.
			*/
			async syncVideo(key) {
				if (key === this.videoKey) return;
				this.videoKey = key;
				this.teardownVideo();
				if (key === "") {
					this.layer.removeAttribute("data-video");
					return;
				}
				const record = await getVideo(key);
				if (record === void 0 || this.videoKey !== key) {
					this.videoKey = "";
					this.layer.removeAttribute("data-video");
					return;
				}
				const video = this.ensureVideo();
				this.videoUrl = URL.createObjectURL(record);
				video.src = this.videoUrl;
				video.play().catch(() => {});
				video.onerror = () => {
					this.videoKey = "";
					this.layer.removeAttribute("data-video");
					this.teardownVideo();
				};
				this.layer.setAttribute("data-video", "");
			}
			/** Create the background video element once. */
			ensureVideo() {
				if (this.videoEl === void 0) {
					const video = document.createElement("video");
					video.muted = true;
					video.loop = true;
					video.playsInline = true;
					video.autoplay = true;
					this.layer.append(video);
					this.videoEl = video;
				}
				return this.videoEl;
			}
			/** Remove the video element and revoke its object URL. */
			teardownVideo() {
				this.videoEl?.remove();
				this.videoEl = void 0;
				if (this.videoUrl !== void 0) {
					URL.revokeObjectURL(this.videoUrl);
					this.videoUrl = void 0;
				}
			}
			/**
			* Composer running-state mirror (migrated from dsh-glass-composer): the
			* glow ring needs to know when the agent is running. The harness exposes no
			* DOM signal on the composer card, so the running state is inferred from
			* the primary button's stop-vs-send icon shape (svg > rect 10x10 = stop)
			* and mirrored onto [data-composer-card] as data-composer-running. A
			* MutationObserver reschedules a throttled scan on any DOM change; the CSS
			* gates the ring on body[data-dsh-glow-composer] so the observer runs even
			* when the effect is off (cheap, keeps the signal fresh for instant toggle).
			*/
			observeRunning() {
				const root = document.documentElement ?? document.body;
				if (!root || typeof MutationObserver === "undefined") return;
				const schedule = () => {
					if (typeof requestAnimationFrame === "function") requestAnimationFrame(() => this.scanRunning());
					else setTimeout(() => this.scanRunning(), 120);
				};
				this.runningObserver = new MutationObserver(schedule);
				this.runningObserver.observe(root, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: ["aria-label", "data-composer-running"]
				});
				schedule();
			}
			scanRunning() {
				const cards = document.querySelectorAll("[data-composer-card]");
				for (let i = 0; i < cards.length; i++) this.syncRunning(cards[i]);
			}
			syncRunning(card) {
				let running = false;
				const buttons = card.querySelectorAll("button[type=\"button\"]");
				for (let i = 0; i < buttons.length; i++) {
					const svg = buttons[i].querySelector("svg");
					if (svg !== null && svg.querySelector("rect[width=\"10\"][height=\"10\"]") !== null) {
						running = true;
						break;
					}
				}
				if (running) card.setAttribute("data-composer-running", "");
				else card.removeAttribute("data-composer-running");
			}
			/** Retract the override layer, the stylesheet, the layer element, and body variables. */
			dispose() {
				this.removeOverrides?.();
				this.removeOverrides = void 0;
				this.runningObserver?.disconnect();
				this.runningObserver = void 0;
				this.videoKey = "";
				this.teardownVideo();
				this.imageToken = "";
				this.teardownImage();
				this.style.remove();
				this.layer.remove();
				const body = document.body;
				for (const name of BODY_VARIABLES) body.style.removeProperty(name);
				body.style.removeProperty("--dsw-mask-blur");
				delete body.dataset.dswConversationGlass;
				for (const attr of Object.values(COMPOSER_ATTRS)) body.removeAttribute(attr);
			}
		};
		//#endregion
		//#region src/client/index.ts
		/** Namespace owning this feature's settings-row copy. */
		const SETTINGS_NS = "settings.appearance";
		/** Required services: slots/locale for the row, theme for token overrides. */
		const inject = [
			"slots",
			"locale",
			"theme"
		];
		/** localStorage key holding the whole settings section. */
		const STORAGE_KEY = "dsh-ui-appearance.settings";
		/**
		* Read the persisted section, tolerating a missing, corrupt, or out-of-schema
		* entry: parse failures fall back to the stock defaults, and every parsed
		* field is validated against the schema bounds before it reaches the UI.
		* One-shot migration: composer-effect preferences previously lived in their
		* own localStorage keys (dsh-glass-composer); when a stored section predates
		* the merge, seed the composer fields from those keys so existing users keep
		* their toggle choices. Returns the default section when nothing is stored.
		* @returns the stored settings, or the stock defaults.
		*/
		function readStoredSettings() {
			try {
				const raw = localStorage.getItem(STORAGE_KEY);
				if (raw === null) return { ...DEFAULT_SETTINGS };
				const migrated = { ...sanitizeSettings(JSON.parse(raw)) };
				const stored = JSON.parse(raw);
				if (typeof stored.aistudioComposer !== "boolean" && typeof stored.glassComposer !== "boolean" && typeof stored.glowComposer !== "boolean") {
					migrated.aistudioComposer = readLegacyToggle("dsh.aistudioComposer", DEFAULT_SETTINGS.aistudioComposer);
					migrated.glassComposer = readLegacyToggle("dsh.glassComposer", DEFAULT_SETTINGS.glassComposer);
					migrated.glowComposer = readLegacyToggle("dsh.glowComposer", DEFAULT_SETTINGS.glowComposer);
				}
				return migrated;
			} catch (_unreadableStorage) {
				return { ...DEFAULT_SETTINGS };
			}
		}
		/** Read a legacy composer-toggle localStorage key ('1'/'0' or absent). */
		function readLegacyToggle(key, fallback) {
			try {
				const value = localStorage.getItem(key);
				if (value === null) return fallback;
				return value === "1";
			} catch (_storageUnreadable) {
				return fallback;
			}
		}
		/**
		* One-shot migration: move a legacy inline data-URL wallpaper into the
		* IndexedDB image store and swap the settings field to its record key.
		* Failures keep the legacy value — the applier passes inline data URLs
		* through untouched, so nothing breaks either way.
		* @param read - read the live backgroundImage token (detects races).
		* @param commitSwap - persist the swapped-in record key.
		*/
		function migrateLegacyImage(read, commitSwap) {
			const legacy = read();
			if (!legacy.startsWith("data:")) return;
			(async () => {
				try {
					const key = await saveImage(await (await fetch(legacy)).blob(), "background");
					if (read() !== legacy) {
						deleteImage(key);
						return;
					}
					commitSwap(key);
				} catch (_migrationFailed) {}
			})();
		}
		/**
		* Client plugin body: load the persisted section, mount the DOM applier, and
		* register the customizer row into the General section.
		* @param ctx - client cordis context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "ui-appearance: settings row dictionaries");
			const store = createAppearanceRowStore();
			let bound;
			let current = readStoredSettings();
			let revision = 0;
			let applier;
			const publish = () => {
				revision += 1;
				bound?.sync(current, revision);
				applier?.apply(current);
			};
			ctx.effect(() => {
				try {
					navigator.storage?.persist?.().catch(() => {});
				} catch (_storageUnsupported) {}
				applier = new AppearanceApplier(ctx);
				applier.apply(current);
				migrateLegacyImage(() => current.backgroundImage, (key) => {
					current = {
						...current,
						backgroundImage: key
					};
					commit();
				});
				return () => {
					applier?.dispose();
					applier = void 0;
				};
			}, "ui-appearance: DOM applier");
			ctx.effect(() => {
				const onStorage = (event) => {
					if (event.key !== null && event.key !== "dsh-ui-appearance.settings") return;
					current = readStoredSettings();
					publish();
				};
				window.addEventListener("storage", onStorage);
				return () => {
					window.removeEventListener("storage", onStorage);
				};
			}, "ui-appearance: storage sync");
			const commit = () => {
				try {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
				} catch (_storageQuota) {}
				publish();
			};
			const set = (field, value) => {
				const patch = { ...current };
				patch[field] = value;
				current = patch;
				commit();
			};
			const setImage = (image) => {
				const patch = { ...current };
				const old = patch.backgroundImage;
				if (old !== "" && !old.startsWith("data:") && old !== (image?.url ?? "")) deleteImage(old);
				patch.backgroundImage = image?.url ?? "";
				patch.imageDark = image?.imageDark ?? false;
				if (image !== null) patch.backgroundVideo = "";
				current = patch;
				commit();
			};
			const setVideo = (key) => {
				if (key !== null && key !== current.backgroundVideo && current.backgroundVideo !== "") deleteVideo(current.backgroundVideo);
				const patch = { ...current };
				patch.backgroundVideo = key ?? "";
				if (key !== null) {
					const oldImage = patch.backgroundImage;
					if (oldImage !== "" && !oldImage.startsWith("data:")) deleteImage(oldImage);
					patch.backgroundImage = "";
					patch.imageDark = false;
				}
				current = patch;
				commit();
			};
			const applyPreset = (id) => {
				const preset = APPEARANCE_PRESETS.find((candidate) => candidate.id === id);
				if (preset === void 0) return;
				const partial = { preset: id };
				if (id === "default") for (const role of APPEARANCE_ROLES) partial[role] = "";
				else for (const [role, hex] of Object.entries(preset.colors)) {
					if (hex === void 0) continue;
					partial[role] = hex;
				}
				current = {
					...current,
					...partial
				};
				commit();
			};
			const applyColors = (colors) => {
				const entries = Object.entries(colors).filter((entry) => APPEARANCE_ROLES.includes(entry[0]) && entry[1] !== void 0 && entry[1] !== "");
				if (entries.length === 0) return;
				const partial = { preset: "custom" };
				for (const [role, hex] of entries) partial[role] = hex;
				current = {
					...current,
					...partial
				};
				commit();
			};
			const resetAll = () => {
				current = {
					...DEFAULT_SETTINGS,
					preset: "default"
				};
				commit();
			};
			const injected = (actions) => {
				bound = actions;
				publish();
				return {
					set,
					setImage,
					setVideo,
					applyPreset,
					applyColors,
					resetAll
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "appearance-custom",
				order: 20,
				store,
				locale: SETTINGS_NS,
				inject: injected
			}, AppearanceCustomizerRow));
		}
		//#endregion
		exports.SETTINGS_NS = SETTINGS_NS;
		exports.STORAGE_KEY = STORAGE_KEY;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map