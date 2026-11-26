// Susejing Themes v1.3.0
// Paletas de marca + guía «Haz tu tema» (sin puente de protocolo)
// Las candidatas viven en Gallery → pestaña «Para temas»

const THEMES = [
  {
    id: "susejing-night",
    nameEs: "Susejing Noche",
    nameEn: "Susejing Night",
    blurbEs: "Violeta sobre negro profundo. Ideal para ver de noche.",
    blurbEn: "Violet on deep black. Great for night viewing.",
    accent: "#7C5CFF",
  },
  {
    id: "susejing-sakura",
    nameEs: "Susejing Sakura",
    nameEn: "Susejing Sakura",
    blurbEs: "Rosa anime suave sobre fondo oscuro.",
    blurbEn: "Soft anime pink on a dark base.",
    accent: "#FF6B9D",
  },
  {
    id: "susejing-cyan",
    nameEs: "Susejing Cian",
    nameEn: "Susejing Cyan",
    blurbEs: "Cian neón tipo interfaz sci-fi.",
    blurbEn: "Neon cyan, sci-fi interface vibe.",
    accent: "#00E5FF",
  },
  {
    id: "susejing-ember",
    nameEs: "Susejing Ascua",
    nameEn: "Susejing Ember",
    blurbEs: "Naranja cálido, atardecer digital.",
    blurbEn: "Warm orange, digital sunset.",
    accent: "#FF6B35",
  },
];

const GALLERY_REPO = "Susejing/Susejing-Gallery";

function themeCards(activeTheme, isEs) {
  return THEMES.map(function (t) {
    var on = activeTheme === t.id;
    return {
      type: "Card",
      key: "theme_" + t.id,
      children: [
        {
          type: "Column",
          padding: 16,
          gap: 10,
          children: [
            {
              type: "Row",
              mainAxisAlignment: "spaceBetween",
              crossAxisAlignment: "center",
              children: [
                {
                  type: "Text",
                  text: isEs ? t.nameEs : t.nameEn,
                  style: "h3",
                },
                {
                  type: "Text",
                  text: on ? (isEs ? "Activo" : "Active") : "",
                  style: "caption",
                  color: "primary",
                },
              ],
            },
            {
              type: "Text",
              text: isEs ? t.blurbEs : t.blurbEn,
              style: "body",
              color: "muted",
            },
            {
              type: "ElevatedButton",
              labelText: on
                ? isEs
                  ? "Volver al tema de Kino"
                  : "Back to Kino theme"
                : isEs
                  ? "Usar este tema"
                  : "Use this theme",
              labelTextEn: on ? "Back to Kino theme" : "Use this theme",
              onPressed: {
                go: {
                  useTheme: { theme: on ? null : t.id },
                },
              },
            },
          ],
        },
      ],
    };
  });
}

export async function screen({ activeTheme, lang, installed }) {
  var isEs = lang !== "en";
  var galleryOn =
    installed &&
    (installed[GALLERY_REPO] === true ||
      installed["Susejing/Susejing-Gallery"] === true);

  var bodyChildren = [
    {
      type: "Text",
      text: isEs
        ? "Paletas de marca Susejing y guía para armar tu look con una imagen."
        : "Susejing brand palettes and a guide to build your look from an image.",
      style: "caption",
      color: "muted",
    },
    {
      type: "Text",
      text: isEs ? "Haz tu tema (paso a paso)" : "Make your theme (step by step)",
      style: "title",
    },
    {
      type: "Card",
      children: [
        {
          type: "Column",
          padding: 16,
          gap: 10,
          children: [
            {
              type: "Text",
              text: isEs
                ? "Kino puede generar colores desde una foto tuya (Apariencia ▸ Tu tema). Este plugin no puede «leer» sola la galería de otro plugin, así que el flujo es manual y fiable:"
                : "Kino can build colors from your photo (Appearance ▸ Your theme). This plugin cannot read another plugin’s gallery by itself, so the flow is manual and reliable:",
              style: "caption",
              color: "muted",
            },
            {
              type: "Text",
              text: isEs
                ? "1. Abre Susejing Gallery y elige una imagen.\n2. Toca «Listo para tema» (queda en la pestaña Para temas).\n3. Abre la imagen a tamaño completo y guárdala o compártela al teléfono.\n4. Ve a Ajustes ▸ Apariencia ▸ Tu tema y elige esa foto.\n5. O, si solo quieres colores listos, usa una paleta de marca abajo (no usa la imagen)."
                : "1. Open Susejing Gallery and pick an image.\n2. Tap «Theme ready» (it stays in the Theme-ready tab).\n3. Open the full image and save or share it to your phone.\n4. Go to Settings ▸ Appearance ▸ Your theme and pick that photo.\n5. Or, for ready-made colors only, use a brand palette below (no image needed).",
              style: "body",
            },
            {
              type: "Text",
              text: isEs
                ? "Nota: un plugin no puede inventar un tema nuevo con los colores exactos de una URL de internet. Por eso se usa «Tu tema» de Kino o las paletas empaquetadas aquí."
                : "Note: a plugin cannot invent a new theme from an internet URL’s exact colors. That is why we use Kino’s «Your theme» or the palettes packed here.",
              style: "caption",
              color: "muted",
            },
            galleryOn
              ? {
                  type: "ElevatedButton",
                  icon: "image",
                  labelText: isEs ? "Abrir Susejing Gallery" : "Open Susejing Gallery",
                  labelTextEn: "Open Susejing Gallery",
                  onPressed: {
                    go: { plugin: { repo: GALLERY_REPO } },
                  },
                }
              : {
                  type: "ElevatedButton",
                  icon: "download",
                  labelText: isEs ? "Instalar Susejing Gallery" : "Install Susejing Gallery",
                  labelTextEn: "Install Susejing Gallery",
                  onPressed: {
                    go: { installPlugin: { repo: GALLERY_REPO } },
                  },
                },
          ],
        },
      ],
    },
    {
      type: "Text",
      text: isEs ? "Paletas de marca" : "Brand palettes",
      style: "title",
    },
    {
      type: "Text",
      text: isEs
        ? "Un toque aplica el tema a toda la app. También puedes activarlos en Ajustes ▸ Apariencia."
        : "One tap applies the theme to the whole app. You can also turn them on in Settings ▸ Appearance.",
      style: "caption",
      color: "muted",
    },
  ].concat(themeCards(activeTheme, isEs));

  return {
    type: "Scaffold",
    appBar: {
      type: "AppBar",
      mergeWithKinoBar: true,
      dense: true,
      title: isEs ? "Susejing Themes" : "Susejing Themes",
      leading: {
        type: "IconButton",
        icon: "close",
        labelText: isEs ? "Cerrar" : "Close",
        onPressed: { close: true },
      },
    },
    body: {
      type: "SingleChildScrollView",
      children: [
        {
          type: "Column",
          padding: 16,
          gap: 12,
          children: bodyChildren,
        },
      ],
    },
  };
}

export async function screenEvent({ name }) {
  if (name === "open") {
    return { state: {} };
  }
  return null;
}
