import { Context } from "@deepseek-ai/cordis";
//#region src/appearance-settings.d.ts
/** Appearance customization settings persisted in localStorage. */
/** Settings namespace owned by the appearance plugin (kept for the record). */
declare const APPEARANCE_SETTINGS_NAMESPACE = "ui-appearance";
/**
 * The color roles the customizer exposes. Each role maps to one or more
 * `--dsw-alias-*` tokens; an empty string means "keep the stock token".
 * Bubble roles were removed: the harness renders its only bubble background
 * on user messages (assistant turns have none), so bubbles now follow the
 * accent color instead of owning separate settings.
 */
declare const APPEARANCE_ROLES: readonly ["accent", "background", "panel", "input", "text", "border"];
/** One customizable color role id. */
type AppearanceRole = typeof APPEARANCE_ROLES[number];
/** Hex color fields, keyed by role. */
type AppearanceColors = Record<AppearanceRole, string>;
/**
 * Durable appearance section. Color fields hold `#rrggbb` or `''` (stock);
 * the image field holds an IndexedDB record key (legacy records: an inline
 * data URL); the numeric fields are plain percentages/px values with their
 * stock value as the default.
 */
interface AppearanceSettings extends AppearanceColors {
  /** IndexedDB key of the background image (legacy: inline data URL); '' clears it. */
  backgroundImage: string;
  /** IndexedDB key of the background video; '' clears the video. */
  backgroundVideo: string;
  /** True when the compressed image sampled as dark (< 35% average brightness). */
  imageDark: boolean;
  /** Background image layer opacity, 0..1. */
  backgroundOpacity: number;
  /** Background image blur in px, 0..30. */
  backgroundBlur: number;
  /** Readability scrim over the background image, 0..1 (0 = no veil). */
  scrim: number;
  /** UI surface opacity, 0..1 (1 = fully opaque surfaces). */
  surfaceAlpha: number;
  /** Composer input opacity, 0..1; 1 = follow surfaceAlpha. */
  inputAlpha: number;
  /** Code block / inline code opacity, 0..1; 1 = follow surfaceAlpha. */
  codeAlpha: number;
  /** Keep the sidebar fill opaque even when surfaceAlpha is below 1. */
  sidebarOpaque: boolean;
  /** Make the conversation area (message list + composer column) translucent
   * so the wallpaper shows through it. Independent of surfaceAlpha: the panel
   * slider also fades every panel, this only fades the chat surface. */
  conversationGlass: boolean;
  /** Conversation-area glass blur in px, 0..20 (0 = no extra blur). */
  conversationGlassBlur: number;
  /** Glass blur in px added to the wallpaper blur, 0..20 (0 = no extra blur). */
  glassBlur: number;
  /** Composer effects (migrated from dsh-glass-composer): aurora gradient
   * border on the new-session hero composer. */
  aistudioComposer: boolean;
  /** Liquid Glass hero composer (frosted card). */
  glassComposer: boolean;
  /** Spinning gradient ring on the in-conversation composer while running. */
  glowComposer: boolean;
  /** Tint alpha of emphasized text chips (inline code), 0..0.45. */
  emphasisAlpha: number;
  /** Last applied preset id, or 'custom' after manual edits. */
  preset: string;
}
/** The section with every color role left stock and every effect off.
 * The accent defaults to the harness brand blue so a fresh install reads
 * as the stock theme — buttons, links and chips all ride that blue. */
declare const DEFAULT_SETTINGS: AppearanceSettings;
//#endregion
//#region src/index.d.ts
/** localStorage keys (kept from dsh-glass-composer so existing preferences survive). */
declare const COMPOSER_KEYS: {
  readonly aistudio: "dsh.aistudioComposer";
  readonly glass: "dsh.glassComposer";
  readonly glow: "dsh.glowComposer";
};
/** Body attributes the client half gates its composer-effect CSS on. */
declare const COMPOSER_ATTRS: {
  readonly aistudio: "data-dsh-aistudio-composer";
  readonly glass: "data-dsh-glass-composer";
  readonly glow: "data-dsh-glow-composer";
};
/** Defaults mirroring the client settings (aistudio ON, glass OFF, glow ON). */
declare const COMPOSER_DEFAULTS: {
  readonly aistudio: "1";
  readonly glass: "0";
  readonly glow: "1";
};
/**
 * Host-side work: compose the composer-effect bootstrap into the served index.
 * Everything else runs in the browser half.
 * @param ctx - Host context; may acquire the webServer service.
 */
declare function apply(ctx: Context): void;
//#endregion
export { APPEARANCE_ROLES, APPEARANCE_SETTINGS_NAMESPACE, type AppearanceRole, type AppearanceSettings, COMPOSER_ATTRS, COMPOSER_DEFAULTS, COMPOSER_KEYS, DEFAULT_SETTINGS, apply };