// Susejing Themes v1.0.0
// Presentacion y activacion de appThemes (apiVersion 18)

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
    blurbEs: "Cian neon tipo interfaz sci-fi.",
    blurbEn: "Neon cyan, sci-fi interface vibe.",
    accent: "#00E5FF",
  },
  {
    id: "susejing-ember",
    nameEs: "Susejing Ascua",
    nameEn: "Susejing Ember",
    blurbEs: "Naranja calido, atardecer digital.",
    blurbEn: "Warm orange, digital sunset.",
    accent: "#FF6B35",
  },
];

export async function screen({ activeTheme, lang }) {
  var isEs = lang !== "en";
  var cards = THEMES.map(function (t) {
    var on = activeTheme === t.id;
    return {
      type: "Card",
      key: "theme_" + t.id,
      children children: [
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

  return {
    type: "Scaffold",
    appBar: {
      type: "AppBar",
      mergeWithKinoBar: true,
      dense: true,
      title: "Susejing Themes",
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
          children: [
            {
              type: "Text",
              text: isEs
                ? "Temas de marca para toda la app. Tambien en Ajustes ▸ Apariencia."
                : "Brand themes for the whole app. Also in Settings ▸ Appearance.",
              style: "caption",
              color: "muted",
            },
            {
              type: "Text",
              text: isEs
                ? "Nota: Kino no permite aplicar una imagen cualquiera de internet como tema. Estos temas usan colores y degradados del manifiesto."
                : "Note: Kino cannot apply an arbitrary online image as a theme. These themes use colors and gradients from the manifest.",
              style: "caption",
              color: "muted",
            },
          ].concat(cards),
        },
      ],
    },
  };
}

export async function screenEvent() {
  return null;
}
