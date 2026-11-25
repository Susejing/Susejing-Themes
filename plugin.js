// Susejing Themes v1.2.2
// Temas de marca + puente Gallery + instrucciones + sección «Haz tu tema»
// 1.2.1: mensaje claro si el protocolo no encuentra Gallery (repo / versión)

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
                type: "Row",
                wrap: true,
                gap: 8,
                children: [
                  {
                    type: "Button",
                    variant: "primary",
                    icon: "open_in_new",
                    labelText: isEs ? "Abrir y guardar" : "Open and save",
                    labelTextEn: "Open and save",
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
                text: isEs
                  ? "Paleta de marca (colores fijos, un toque):"
                  : "Brand palette (fixed colors, one tap):",
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
                    labelText: isEs
                      ? t.nameEs.replace("Susejing ", "")
                      : t.nameEn.replace("Susejing ", ""),
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

function howToCard(isEs) {
  return {
    type: "Card",
    children: [
      {
        type: "Column",
        padding: 16,
        gap: 8,
        children: [
          {
            type: "Text",
            text: isEs ? "Cómo aplicar un tema (paso a paso)" : "How to apply a theme (step by step)",
            style: "subtitle",
          },
          {
            type: "Text",
            text: isEs
              ? "Opción A — Colores desde tu imagen (Kino 0.9.93)\n1. En Susejing Gallery abre una imagen.\n2. Toca «Listo para tema» (se guarda aquí).\n3. Toca «Enviar a Themes» o abre este plugin.\n4. En la candidata toca «Abrir y guardar» y guarda la foto en el teléfono.\n5. Ve a Ajustes ▸ Apariencia ▸ Tu tema y elige esa foto.\n6. Kino arma los colores de toda la app con ella."
              : "Option A — Colors from your image (Kino 0.9.93)\n1. In Susejing Gallery open an image.\n2. Tap «Theme ready» (it is saved here).\n3. Tap «Send to Themes» or open this plugin.\n4. On the candidate tap «Open and save» and save the photo on the phone.\n5. Go to Settings ▸ Appearance ▸ Your theme and pick that photo.\n6. Kino builds the whole app colors from it.",
            style: "caption",
            color: "muted",
          },
          {
            type: "Text",
            text: isEs
              ? "Opción B — Paleta de marca (un toque)\n1. Marca la imagen en la galería con «Listo para tema».\n2. Abre Susejing Themes.\n3. En la candidata o en «Paletas de marca» toca Noche, Sakura, Cian o Ascua.\n4. El tema se aplica al instante en toda la app."
              : "Option B — Brand palette (one tap)\n1. Mark the image in the gallery with «Theme ready».\n2. Open Susejing Themes.\n3. On the candidate or under «Brand palettes» tap Night, Sakura, Cyan or Ember.\n4. The theme applies instantly to the whole app.",
            style: "caption",
            color: "muted",
          },
        ],
      },
    ],
  };
}

function makeYourThemeCard(isEs) {
  return {
    type: "Card",
    children: [
      {
        type: "Column",
        padding: 16,
        gap: 10,
        children: [
          {
            type: "Text",
            text: isEs ? "Haz tu tema" : "Make your theme",
            style: "subtitle",
          },
          {
            type: "Text",
            text: isEs
              ? "Puedes crear el look de tu Kino con una imagen tuya o de la galería. Kino genera los colores; este plugin guarda las candidatas y ofrece paletas listas."
              : "You can create your Kino look with your own image or one from the gallery. Kino builds the colors; this plugin stores candidates and offers ready palettes.",
            style: "caption",
            color: "muted",
          },
          {
            type: "Text",
            text: isEs
              ? "• Desde la galería: elige arte que te guste → Listo para tema → Enviar a Themes → Abrir y guardar → Apariencia ▸ Tu tema.\n• Desde tu teléfono: Ajustes ▸ Apariencia ▸ Tu tema → elige cualquier foto de la galería del sistema.\n• Solo colores listos: usa una paleta de marca abajo (no usa la imagen, solo la paleta Susejing)."
              : "• From the gallery: pick art you like → Theme ready → Send to Themes → Open and save → Appearance ▸ Your theme.\n• From your phone: Settings ▸ Appearance ▸ Your theme → pick any photo from the system gallery.\n• Ready colors only: use a brand palette below (does not use the image, only the Susejing palette).",
            style: "caption",
            color: "muted",
          },
          {
            type: "Text",
            text: isEs
              ? "Nota: un plugin no puede inventar un tema nuevo con los colores exactos de una URL de internet. Por eso el flujo usa «Tu tema» de Kino o las paletas empaquetadas aquí."
              : "Note: a plugin cannot invent a new theme with the exact colors of an internet URL. That is why the flow uses Kino’s «Your theme» or the palettes packed here.",
            style: "caption",
            color: "muted",
          },
          {
            type: "ElevatedButton",
            icon: "image",
            labelText: isEs ? "Abrir Susejing Gallery" : "Open Susejing Gallery",
            labelTextEn: "Open Susejing Gallery",
            onPressed: {
              go: { plugin: { repo: GALLERY_REPO } },
            },
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
        ? "Temas de marca + puente con Susejing Gallery. Guía completa más abajo."
        : "Brand themes + bridge to Susejing Gallery. Full guide below.",
      style: "caption",
      color: "muted",
    },
    howToCard(isEs),
    {
      type: "Text",
      text: isEs ? "Haz tu tema" : "Make your theme",
      style: "title",
    },
    makeYourThemeCard(isEs),
    {
      type: "Text",
      text: isEs ? "Desde Susejing Gallery" : "From Susejing Gallery",
      style: "title",
    },
  ];

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
          ? "Aún no hay candidatas. En la galería abre una imagen → «Listo para tema» → «Enviar a Themes»."
          : "No candidates yet. In the gallery open an image → «Theme ready» → «Send to Themes».",
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
        text: (isEs ? "Candidatas: " : "Candidates: ") + items.length,
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
  bodyChildren.push({
    type: "Text",
    text: isEs
      ? "Un toque aplica el tema a toda la app. También puedes activarlos en Ajustes ▸ Apariencia."
      : "One tap applies the theme to the whole app. You can also turn them on in Settings ▸ Appearance.",
    style: "caption",
    color: "muted",
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
    if (typeof kino.plugins !== "object") {
      return {
        state: Object.assign({}, state || {}, {
          candidates: [],
          candidatesLoading: false,
          candidatesError: isEs
            ? "Este Kino no soporta el puente entre plugins (necesita 0.9.81+)."
            : "This Kino does not support the plugin bridge (needs 0.9.81+).",
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
          galleryLinked: true,
        }),
      };
    } catch (e) {
      var code = e && e.code ? String(e.code) : "";
      var msg = isEs
        ? "No se pudieron leer las candidatas"
        : "Could not read candidates";
      if (code === "provider_missing") {
        msg = isEs
          ? "Kino no encuentra el proveedor. Gallery debe estar instalada desde el repo GitHub «Susejing/Susejing-Gallery» (no solo archivos sueltos), activa, y en 0.6.8+ con la puerta candidates. Tras actualizar: apaga y enciende Gallery."
          : "Kino cannot find the provider. Gallery must be installed from GitHub «Susejing/Susejing-Gallery» (not only loose files), on, and 0.6.8+ with themeCandidates. After update: toggle Gallery off/on.";
      } else if (code === "not_declared") {
        msg = isEs
          ? "Actualiza Susejing Gallery a 0.6.8+ (falta la puerta candidates)."
          : "Update Susejing Gallery to 0.6.8+ (missing candidates door).";
      } else if (code === "timeout" || code === "rate_limited") {
        msg = isEs ? "Tiempo agotado. Reintenta." : "Timed out. Retry.";
      } else if (code === "bad_output" || code === "provider_failed") {
        msg = isEs
          ? "Gallery respondió mal (" + code + "). Actualiza Gallery a 0.6.6+."
          : "Gallery returned a bad answer (" + code + "). Update Gallery to 0.6.6+.";
      } else if (e && e.message) {
        msg = String(e.message).slice(0, 160);
      }
      if (!galleryOn && code === "provider_missing") {
        msg = isEs
          ? "Susejing Gallery no figura como instalada desde «Susejing/Susejing-Gallery». Si la instalaste por archivo, el puente no puede enlazarla: instálala desde ese repo de GitHub."
          : "Susejing Gallery is not listed as installed from «Susejing/Susejing-Gallery». If you installed from files only, the bridge cannot link it: install from that GitHub repo.";
      }
      return {
        state: Object.assign({}, state || {}, {
          candidates: [],
          candidatesLoading: false,
          candidatesError: msg,
          galleryLinked: false,
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
        ? "Abriendo imagen. Guárdala → Ajustes ▸ Apariencia ▸ Tu tema (Kino 0.9.93)."
        : "Opening image. Save it → Settings ▸ Appearance ▸ Your theme (Kino 0.9.93).",
      go: {
        url: {
          href: u,
          title: isEs ? "Candidata a tema" : "Theme candidate",
        },
      },
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
