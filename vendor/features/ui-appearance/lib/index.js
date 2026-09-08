//#region src/appearance-settings.ts
/** Appearance customization settings persisted in localStorage. */
/** Settings namespace owned by the appearance plugin (kept for the record). */
const APPEARANCE_SETTINGS_NAMESPACE = "ui-appearance";
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
//#endregion
//#region src/index.ts
/** localStorage keys (kept from dsh-glass-composer so existing preferences survive). */
const COMPOSER_KEYS = {
	aistudio: "dsh.aistudioComposer",
	glass: "dsh.glassComposer",
	glow: "dsh.glowComposer"
};
/** Body attributes the client half gates its composer-effect CSS on. */
const COMPOSER_ATTRS = {
	aistudio: "data-dsh-aistudio-composer",
	glass: "data-dsh-glass-composer",
	glow: "data-dsh-glow-composer"
};
/** Defaults mirroring the client settings (aistudio ON, glass OFF, glow ON). */
const COMPOSER_DEFAULTS = {
	aistudio: "1",
	glass: "0",
	glow: "1"
};
/** localStorage key holding the whole appearance section (mirrors client). */
const STORAGE_KEY = "dsh-ui-appearance.settings";
/**
* Composer-effect bootstrap script. Reads the appearance section from
* localStorage (single source of truth after the dsh-glass-composer merge)
* and flips the three body attributes BEFORE the web shell mounts, so the
* effects never flash the wrong composer style on reload. Each field
* resolves: merged section boolean → legacy per-key ('1'/'0') → default.
*/
function bootstrapScript() {
	return `<script>${[
		"aistudio",
		"glass",
		"glow"
	].map((fx) => {
		const key = COMPOSER_KEYS[fx];
		const attr = COMPOSER_ATTRS[fx];
		const field = `${fx}Composer`;
		const fallback = COMPOSER_DEFAULTS[fx];
		const expr = `(()=>{try{const s=JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})||"null");if(s&&typeof s[${JSON.stringify(field)}]==="boolean")return s[${JSON.stringify(field)}]}catch(e){}const v=localStorage.getItem(${JSON.stringify(key)});return v===null?${fallback}:v==="1"})()`;
		return `document.body.toggleAttribute(${JSON.stringify(attr)},${expr})`;
	}).join(";")}<\/script>`;
}
function tapIndex(html) {
	const body = /<body(?:\s[^>]*)?>/i.exec(html);
	const script = bootstrapScript();
	if (body === null) return `${html}${script}`;
	const at = body.index + body[0].length;
	return `${html.slice(0, at)}${script}${html.slice(at)}`;
}
/**
* Host-side work: compose the composer-effect bootstrap into the served index.
* Everything else runs in the browser half.
* @param ctx - Host context; may acquire the webServer service.
*/
function apply(ctx) {
	ctx.inject(["webServer"], (httpCtx) => {
		httpCtx.effect(() => httpCtx.webServer.tapIndex(tapIndex), "ui-appearance: composer-fx bootstrap");
	});
}
//#endregion
export { APPEARANCE_ROLES, APPEARANCE_SETTINGS_NAMESPACE, COMPOSER_ATTRS, COMPOSER_DEFAULTS, COMPOSER_KEYS, DEFAULT_SETTINGS, apply };
