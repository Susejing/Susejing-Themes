// Susejing Themes v1.1.0
// Temas de marca (appThemes) + puente con Susejing Gallery (protocolo)
// Flujo Kino 0.9.93: candidatas de la galería → guardar imagen → Apariencia ▸ Tu tema
// o aplicar una paleta de marca con go.useTheme

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

function candidateCard(item, index, isEs) {
  var url = item && item.url ? String(item.url) : "";
  if (!url) return null;
  return {
    type: "Card",
    key: "cand_" + index,
    children: [
      {
        type: "Column",
        gap: 8,
        children: [
          {
            type: "Image",
            src: url,
            fit: "cover",
            height: 160,
          },
          {
            type: "Column",
            padding: 12,
            gap: 8,
            children: [
              {
                type: "Text",
                text: isEs
                  ? "Candidata desde Susejing Gallery"
                  : "Candidate from Susejing Gallery",
                style: "caption",
                color: "muted",
              },
              {
                type: "Text",
                text: isEs
                  ? "1) Abre la imagen y guárdala. 2) Ajustes ▸ Apariencia ▸ Tu tema y elige esa foto (Kino 0.9.93). O aplica una paleta de marca abajo."
                  : "1) Open the image and save it. 2) Settings ▸ Appearance ▸ Your theme and pick that photo (Kino 0.9.93). Or apply a brand palette below.",
                style: "caption",
                color: "muted",
              },
              {
                type: "Row",
                wrap: true,
                gap: 8,
                children: [
                  {
                    type: "Button",
                    variant: "primary",
                    icon: "open_in_new",
                    labelText: isEs ? "Abrir imagen" : "Open image",
                    labelTextEn: "Open image",
                    onPressed: "openCandidate",
                    arg: url,
                  },
                  {
                    type: "Button",
                    variant: "secondary",
                    icon: "content_copy",
                    labelText: isEs ? "Copiar URL" : "Copy URL",
                    labelTextEn: "Copy URL",
                    onPressed: "copyCandidate",
                    arg: url,
                  },
                ],
              },
              {
                type: "Text",
                text: isEs ? "Aplicar paleta de marca:" : "Apply brand palette:",
                style: "caption",
              },
              {
                type: "Row",
                wrap: true,
                gap: 6,
                children: THEMES.map(function (t) {
                  return {
                    type: "Button",
                    variant: "text",
                    labelText: isEs ? t.nameEs.replace("Susejing ", "") : t.nameEn.replace("Susejing ", ""),
                    onPressed: {
                      go: { useTheme: { theme: t.id } },
                    },
                  };
                }),
              },
            ],
          },
        ],
      },
    ],
  };
}

export async function screen({ state, activeTheme, lang, installed }) {
  var isEs = lang !== "en";
  var galleryOn =
    installed &&
    (installed[GALLERY_REPO] === true ||
      installed["Susejing/Susejing-Gallery"] === true);

  var bodyChildren = [
    {
      type: "Text",
      text: isEs
        ? "Temas de marca para toda la app. También en Ajustes ▸ Apariencia."
        : "Brand themes for the whole app. Also in Settings ▸ Appearance.",
      style: "caption",
      color: "muted",
    },
    {
      type: "Text",
      text: isEs
        ? "Puente con Susejing Gallery: las imágenes marcadas «Listo para tema» aparecen aquí. Kino 0.9.93 arma los colores con «Tu tema» si guardas la foto en el teléfono."
        : "Bridge to Susejing Gallery: images marked «Theme ready» show here. Kino 0.9.93 builds colors with «Your theme» if you save the photo on the phone.",
      style: "caption",
      color: "muted",
    },
  ];

  // Sección candidatas desde Gallery
  bodyChildren.push({
    type: "Text",
    text: isEs ? "Desde Susejing Gallery" : "From Susejing Gallery",
    style: "title",
  });

  if (!galleryOn) {
    bodyChildren.push({
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
                ? "Instala Susejing Gallery para traer aquí las candidatas a tema."
                : "Install Susejing Gallery to bring theme candidates here.",
              style: "body",
            },
            {
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
    });
  } else if (state && state.candidatesError) {
    bodyChildren.push({
      type: "Text",
      text: String(state.candidatesError),
      color: "error",
      style: "caption",
    });
    bodyChildren.push({
      type: "Button",
      variant: "secondary",
      labelText: isEs ? "Reintentar" : "Retry",
      onPressed: "reloadCandidates",
    });
  } else if (state && state.candidatesLoading) {
    bodyChildren.push({ type: "Skeleton", height: 120 });
  } else {
    var items =
      state && Array.isArray(state.candidates) ? state.candidates : [];
    if (items.length === 0) {
      bodyChildren.push({
        type: "Text",
        text: isEs
          ? "Aún no hay candidatas. En la galería abre una imagen y toca «Listo para tema»."
          : "No candidates yet. In the gallery open an image and tap «Theme ready».",
        style: "caption",
        color: "muted",
      });
      bodyChildren.push({
        type: "Button",
        variant: "secondary",
        icon: "refresh",
        labelText: isEs ? "Actualizar lista" : "Refresh list",
        onPressed: "reloadCandidates",
      });
      bodyChildren.push({
        type: "Button",
        variant: "text",
        icon: "image",
        labelText: isEs ? "Abrir Susejing Gallery" : "Open Susejing Gallery",
        onPressed: {
          go: { plugin: { repo: GALLERY_REPO } },
        },
      });
    } else {
      bodyChildren.push({
        type: "Text",
        text:
          (isEs ? "Candidatas: " : "Candidates: ") + items.length,
        style: "caption",
        color: "muted",
      });
      bodyChildren.push({
        type: "Button",
        variant: "text",
        icon: "refresh",
        labelText: isEs ? "Actualizar" : "Refresh",
        onPressed: "reloadCandidates",
      });
      for (var i = 0; i < items.length; i++) {
        var card = candidateCard(items[i], i, isEs);
        if (card) bodyChildren.push(card);
      }
    }
  }

  bodyChildren.push({
    type: "Text",
    text: isEs ? "Paletas de marca" : "Brand palettes",
    style: "title",
  });

  bodyChildren = bodyChildren.concat(themeCards(activeTheme, isEs));

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

export async function screenEvent({ name, arg, state, lang, installed }) {
  var isEs = lang !== "en";
  var galleryOn =
    installed &&
    (installed[GALLERY_REPO] === true ||
      installed["Susejing/Susejing-Gallery"] === true);

  if (name === "open" || name === "reloadCandidates") {
    if (!galleryOn) {
      return {
        state: Object.assign({}, state || {}, {
          candidates: [],
          candidatesLoading: false,
          candidatesError: null,
        }),
      };
    }
    if (typeof kino.plugins !== "object") {
      return {
        state: Object.assign({}, state || {}, {
          candidates: [],
          candidatesLoading: false,
          candidatesError: isEs
            ? "Este Kino no soporta el puente entre plugins."
            : "This Kino does not support the plugin bridge.",
        }),
      };
    }
    try {
      var res = await kino.plugins.call("gallery", "list", {});
      var items =
        res && Array.isArray(res.items)
          ? res.items.filter(function (x) {
              return x && typeof x.url === "string";
            })
          : [];
      return {
        state: Object.assign({}, state || {}, {
          candidates: items,
          candidatesLoading: false,
          candidatesError: null,
        }),
      };
    } catch (e) {
      var code = e && e.code ? String(e.code) : "";
      var msg = isEs
        ? "No se pudieron leer las candidatas"
        : "Could not read candidates";
      if (code === "provider_missing") {
        msg = isEs
          ? "Susejing Gallery no está instalada o está apagada."
          : "Susejing Gallery is not installed or is off.";
      } else if (code === "not_declared") {
        msg = isEs
          ? "Actualiza Susejing Gallery (puerta themeCandidates)."
          : "Update Susejing Gallery (themeCandidates door).";
      } else if (code === "timeout" || code === "rate_limited") {
        msg = isEs ? "Tiempo agotado. Reintenta." : "Timed out. Retry.";
      } else if (e && e.message) {
        msg = String(e.message).slice(0, 120);
      }
      return {
        state: Object.assign({}, state || {}, {
          candidates: [],
          candidatesLoading: false,
          candidatesError: msg,
        }),
      };
    }
  }

  if (name === "openCandidate") {
    var u = String(arg || "");
    if (!u || u.indexOf("https://") !== 0) {
      return { toast: isEs ? "URL no válida" : "Invalid URL" };
    }
    return {
      toast: isEs
        ? "Abriendo imagen. Guárdala y usa Ajustes ▸ Apariencia ▸ Tu tema (Kino 0.9.93)."
        : "Opening image. Save it and use Settings ▸ Appearance ▸ Your theme (Kino 0.9.93).",
      go: { url: { href: u, title: isEs ? "Candidata a tema" : "Theme candidate" } },
    };
  }

  if (name === "copyCandidate") {
    var cu = String(arg || "");
    if (!cu || cu.indexOf("https://") !== 0) {
      return { toast: isEs ? "URL no válida" : "Invalid URL" };
    }
    return {
      go: {
        copy: {
          text: cu.slice(0, 500),
          label: isEs ? "URL candidata" : "Candidate URL",
        },
      },
      toast: isEs ? "URL copiada" : "URL copied",
    };
  }

  return null;
}
