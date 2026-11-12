/* Portal ITSQMET: catálogo único, tarjetas y búsqueda global. */
const areas = [
  {
    "id": "titulos",
    "name": "Títulos",
    "description": "Propuestas, revisión y aprobación",
    "icon": "graduation",
    "apps": [
      {
        "id": "titulo-articulo",
        "name": "Artículo académico",
        "description": "Registrar y consultar propuestas.",
        "icon": "article",
        "url": "https://jeffer91.github.io/titulos/estudiantes/estudiante.html",
        "aliases": [
          "titulo",
          "propuesta",
          "investigacion"
        ]
      },
      {
        "id": "titulo-trabajo",
        "name": "Trabajo de titulación",
        "description": "Registrar propuestas de titulación.",
        "icon": "document",
        "url": "https://titulos.pages.dev/trabajo-titulacion/",
        "aliases": [
          "tesis",
          "proyecto"
        ]
      },
      {
        "id": "revision-coordinadores",
        "name": "Coordinadores",
        "description": "Validar propuestas recibidas.",
        "icon": "users",
        "url": "https://jeffer91.github.io/titulos/coordinadores/coordinador.html",
        "aliases": [
          "revision",
          "aprobacion"
        ]
      },
      {
        "id": "revision-investigacion",
        "name": "Investigación",
        "description": "Revisar y aprobar propuestas.",
        "icon": "research",
        "url": "https://jeffer91.github.io/titulos/investigadores/investigador.html",
        "aliases": [
          "revision",
          "investigadores"
        ]
      },
      {
        "id": "admin-titulos",
        "name": "Administrar títulos",
        "description": "Gestionar propuestas e historial.",
        "icon": "shield",
        "url": "https://jeffer91.github.io/titulos/administradores/administrador.html",
        "aliases": [
          "administracion",
          "seguimiento"
        ]
      }
    ]
  },
  {
    "id": "complexivo",
    "name": "Complexivo",
    "description": "Selección y gestión de sedes",
    "icon": "calendar",
    "apps": [
      {
        "id": "sede-estudiantes",
        "name": "Elegir sede",
        "description": "Seleccionar la sede de examen.",
        "icon": "location",
        "url": "https://jeffer91.github.io/sedes/estudiante/",
        "aliases": [
          "estudiantes",
          "examen",
          "campus"
        ]
      },
      {
        "id": "sede-admin",
        "name": "Administrar sedes",
        "description": "Gestionar sedes seleccionadas.",
        "icon": "shield",
        "url": "https://jeffer91.github.io/sedes/administrador/",
        "aliases": [
          "examen",
          "administrador"
        ]
      }
    ]
  },
  {
    "id": "titulacion",
    "name": "Titulación",
    "description": "Cronogramas, requisitos e informes",
    "icon": "checklist",
    "apps": [
      {
        "id": "planificacion",
        "name": "Cronogramas",
        "description": "Planificar los procesos de titulación.",
        "icon": "calendar",
        "url": "https://jeffer91.github.io/doc-tit/",
        "aliases": [
          "planificacion",
          "fechas",
          "complexivo"
        ]
      },
      {
        "id": "requisitos",
        "name": "Requisitos",
        "description": "Revisar requisitos académicos.",
        "icon": "checklist",
        "url": "https://jeffer91.github.io/requisitos/Maqueta/maq-index.html",
        "aliases": [
          "habilitados",
          "documentacion"
        ]
      },
      {
        "id": "informes-titulacion",
        "name": "Informes",
        "description": "Generar informes de titulación.",
        "icon": "report",
        "url": "https://jeffer91.github.io/Informtit/",
        "aliases": [
          "documentos",
          "reportes"
        ]
      }
    ]
  },
  {
    "id": "portadas",
    "name": "Portadas",
    "description": "Preparación de documentos para firma",
    "icon": "document",
    "apps": [
      {
        "id": "ajustar-portadas",
        "name": "Preparar portadas PDF",
        "description": "Ajustar el cuadro de firmas antes de la firma electrónica.",
        "icon": "document",
        "url": "https://jeffer91.github.io/Ubicarportads/",
        "aliases": [
          "portada",
          "firmas",
          "elaborado",
          "revisado",
          "aprobado",
          "pdf"
        ]
      }
    ]
  },
  {
    "id": "curriculo",
    "name": "Currículo",
    "description": "Organización académica",
    "icon": "academic",
    "apps": [
      {
        "id": "curriculo",
        "name": "Gestión curricular",
        "description": "Consultar mallas, materias y fichas.",
        "icon": "academic",
        "url": "https://jeffer91.github.io/curriculo/",
        "aliases": [
          "mallas",
          "carreras"
        ]
      }
    ]
  },
  {
    "id": "docentes",
    "name": "Docentes",
    "description": "Formación, capacitación y seguimiento",
    "icon": "training",
    "apps": [
      {
        "id": "encuesta-formacion",
        "name": "Encuesta docente",
        "description": "Registrar necesidades de capacitación.",
        "icon": "survey",
        "url": "https://jeffer91.github.io/Encuesta-Form-Cap/",
        "aliases": [
          "formacion",
          "necesidades",
          "formulario"
        ]
      },
      {
        "id": "encuesta-formacion-admin",
        "name": "Resultados",
        "description": "Consultar las respuestas de la encuesta.",
        "icon": "report",
        "url": "https://jeffer91.github.io/Encuesta-Form-Cap/admin.html",
        "aliases": [
          "encuesta",
          "estadisticas",
          "administracion"
        ]
      },
      {
        "id": "capacitacion",
        "name": "Capacitación global",
        "description": "Abrir el sistema general de capacitación.",
        "icon": "training",
        "url": "https://capacitacindocenteitsqmet.netlify.app/index.html",
        "aliases": [
          "docentes",
          "formacion",
          "principal"
        ]
      },
      {
        "id": "seguimiento-docente",
        "name": "Seguimiento",
        "description": "Elaborar documentos de seguimiento.",
        "icon": "document",
        "url": "https://capacitacindocenteitsqmet.netlify.app/pages/seguimientod/seguimiento",
        "aliases": [
          "documentos",
          "capacitacion",
          "docente"
        ]
      },
      {
        "id": "documentos-formacion",
        "name": "Plan de formación",
        "description": "Crear diagnósticos, planes e informes.",
        "icon": "report",
        "url": "https://jeffer91.github.io/docformacion/",
        "aliases": [
          "necesidades",
          "capacitacion",
          "documentos"
        ]
      }
    ]
  },
  {
    "id": "finanzas",
    "name": "Finanzas",
    "description": "Registro y revisión de clases",
    "icon": "document",
    "apps": [
      {
        "id": "hoja-financiera-docente",
        "name": "Elaborar hojas financieras",
        "description": "Crear y descargar hojas financieras docentes.",
        "icon": "document",
        "url": "https://jeffer91.github.io/Hoja-Financiera/",
        "aliases": [
          "hoja financiera",
          "hojas financieras",
          "registrar clases",
          "pdf"
        ]
      },
      {
        "id": "hoja-financiera-admin",
        "name": "Revisar hojas",
        "description": "Revisar o aprobar documentos.",
        "icon": "shield",
        "url": "https://jeffer91.github.io/Hoja-Financiera/administrador/",
        "aliases": [
          "hoja financiera",
          "administrador"
        ]
      }
    ]
  },
  {
    "id": "bases-datos",
    "name": "Bases de datos",
    "description": "Consulta y respaldo de bases de datos",
    "icon": "document",
    "apps": [
      {
        "id": "base-scan",
        "name": "Base Scan",
        "description": "Consultar y respaldar bases de datos de Firebase, Supabase y Neon.",
        "icon": "scan",
        "url": "https://jeffer91.github.io/base-scan/",
        "aliases": ["bases de datos", "respaldos", "firebase", "supabase", "neon", "excel", "exportar"]
      }
    ]
  },
  {
    "id": "antiplagio",
    "name": "Antiplagio",
    "description": "Revisión académica",
    "icon": "scan",
    "apps": [
      {
        "id": "antiplagio",
        "name": "Revisar similitud",
        "description": "Abrir el sistema antiplagio.",
        "icon": "scan",
        "url": "https://jeffer91.github.io/Antiplagio-ITSQMET/",
        "aliases": [
          "plagio",
          "originalidad"
        ]
      },
      {
        "id": "antiplagio-repo",
        "name": "Código fuente",
        "description": "Consultar el repositorio en GitHub.",
        "icon": "code",
        "url": "https://github.com/jeffer91/Antiplagio-ITSQMET",
        "aliases": [
          "github",
          "mantenimiento"
        ]
      }
    ]
  },
  {
    "id": "deportes",
    "name": "Deportes",
    "description": "Club de fútbol institucional",
    "icon": "football",
    "apps": [
      {
        "id": "club",
        "name": "Club de fútbol",
        "description": "Abrir el portal del campeonato.",
        "icon": "football",
        "url": "https://jeffer91.github.io/Club-futbol-ITSQMET-/",
        "aliases": [
          "torneo",
          "campeonato"
        ]
      },
      {
        "id": "club-inscripcion",
        "name": "Inscripciones",
        "description": "Registrar equipos y participantes.",
        "icon": "checklist",
        "url": "https://jeffer91.github.io/Club-futbol-ITSQMET-/inscripcion/",
        "aliases": [
          "registro",
          "futbol"
        ]
      },
      {
        "id": "club-estudiantes",
        "name": "Participantes",
        "description": "Consultar información de estudiantes.",
        "icon": "student",
        "url": "https://jeffer91.github.io/Club-futbol-ITSQMET-/estudiantes/",
        "aliases": [
          "club",
          "estudiantes"
        ]
      },
      {
        "id": "club-arbitro",
        "name": "Árbitros",
        "description": "Gestionar partidos y resultados.",
        "icon": "whistle",
        "url": "https://jeffer91.github.io/Club-futbol-ITSQMET-/arbitro/",
        "aliases": [
          "arbitraje",
          "partidos"
        ]
      },
      {
        "id": "club-admin",
        "name": "Administración",
        "description": "Gestionar el campeonato.",
        "icon": "shield",
        "url": "https://jeffer91.github.io/Club-futbol-ITSQMET-/administrador/",
        "aliases": [
          "torneo",
          "administrar"
        ]
      }
    ]
  },
  {
    "id": "mensajes",
    "name": "Mensajes",
    "description": "Comunicación institucional",
    "icon": "message",
    "apps": [
      {
        "id": "enviar-mensajes",
        "name": "Enviar mensajes",
        "description": "Crear y enviar anuncios institucionales.",
        "icon": "message",
        "url": "https://tangerine-strudel-35d0e7.netlify.app/anuncios/anuncio.html",
        "aliases": [
          "anuncios",
          "comunicacion",
          "avisos"
        ]
      }
    ]
  },
  {
    "id": "inducciones",
    "name": "Inducciones",
    "description": "Registro de inducciones académicas",
    "icon": "induction",
    "apps": [
      {
        "id": "registro-inducciones",
        "name": "Registrar inducción",
        "description": "Acceder al registro de inducciones.",
        "icon": "induction",
        "url": "https://registroinduccionesitsqmet.netlify.app/cronogramas/vista/cedula-solicitud.html",
        "aliases": [
          "cedula",
          "solicitud",
          "cronogramas"
        ]
      }
    ]
  }
];

const projects = window.MISLINKS_PROJECTS || [];
for (const p of projects) areas.push({id:"ml-"+p.id,name:p.name,description:p.description,icon:"document",apps:p.groups.flatMap(g=>g.links.map(l=>({id:l.id,name:l.label,description:g.name,icon:"document",url:l.url,aliases:[p.name,g.name,l.label]})))});
const icons = {
  student: '<svg viewBox="0 0 24 24"><path d="m3 10 9-5 9 5-9 5-9-5Z"/><path d="M7 12v5c3 2 7 2 10 0v-5M21 10v6"/></svg>',
  graduation: '<svg viewBox="0 0 24 24"><path d="m2.5 9.5 9.5-5 9.5 5-9.5 5-9.5-5ZM6.5 12v5c3 2.5 8 2.5 11 0v-5"/></svg>',
  location: '<svg viewBox="0 0 24 24"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  article: '<svg viewBox="0 0 24 24"><path d="M6 3.5h12v17H6zM9 8h6M9 11h6M9 14h4M9 17h5"/></svg>',
  document: '<svg viewBox="0 0 24 24"><path d="M6.5 3.5h7l4 4v13h-11v-17ZM13.5 3.5v4h4M9 12h6M9 15h6"/></svg>',
  report: '<svg viewBox="0 0 24 24"><path d="M6 3.5h9l3 3v14H6v-17ZM15 3.5v3h3M9 11h6M9 14h6M9 17h4"/></svg>',
  academic: '<svg viewBox="0 0 24 24"><path d="M4 5h6a3 3 0 0 1 3 3v11a3 3 0 0 0-3-3H4V5ZM20 5h-6a3 3 0 0 0-3 3v11a3 3 0 0 1 3-3h6V5Z"/></svg>',
  users: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-4 2-6 6-6s6 2 6 6M17 5a3 3 0 0 1 0 6M17 14c3 0 5 2 5 6"/></svg>',
  research: '<svg viewBox="0 0 24 24"><path d="M9 3h6M10 3v5l-5 9a2.7 2.7 0 0 0 2.4 4h9.2a2.7 2.7 0 0 0 2.4-4l-5-9V3M8 14h8"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="m12 3 7 3v5.5c0 4.6-2.7 7.6-7 9.5-4.3-1.9-7-4.9-7-9.5V6l7-3Zm-3 9 2 2 4-4"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16M8 14h3M14 14h3M8 18h3"/></svg>',
  training: '<svg viewBox="0 0 24 24"><path d="M4 4h16v13H4zM9 21h6M12 17v4M8 9h8M8 12h5"/></svg>',
  survey: '<svg viewBox="0 0 24 24"><path d="M8 4h8l1 2h3v15H4V6h3l1-2Z"/><path d="M8 11h3M8 15h3M14 11h3M14 15h3"/></svg>',
  checklist: '<svg viewBox="0 0 24 24"><path d="M6 4h12v16H6zM9 9l1.5 1.5L13 8M14.5 9H16M9 15h7"/></svg>',
  scan: '<svg viewBox="0 0 24 24"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M8 12h8M10 9h4M10 15h4"/></svg>',
  code: '<svg viewBox="0 0 24 24"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></svg>',
  football: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m9 9 3-2 3 2-1 4h-4L9 9ZM10 13l-3 3M14 13l3 3M9 9 6-4M15 9l3 1"/></svg>',
  whistle: '<svg viewBox="0 0 24 24"><path d="M4 14h7a5 5 0 1 0 0-10H7v4h4a1 1 0 1 1 0 2H4v4ZM4 10v4M18 7h3"/></svg>',
  tools: '<svg viewBox="0 0 24 24"><path d="M14 6a4 4 0 0 0 4.8 4.8l-8.7 8.7a2 2 0 0 1-2.8-2.8L16 8a4 4 0 0 0 4.8-4.8L18 6l-2-2 2.8-2.8A4 4 0 0 0 14 6Z"/></svg>'
};

icons.message = '<svg viewBox="0 0 24 24"><path d="M5 5h14v11H9l-4 4V5Z"/><path d="M8 9h8M8 12h6"/></svg>';
icons.induction = '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16M9 15l2 2 4-4"/></svg>';

const allApps = areas.flatMap(area => area.apps.map(app => ({ ...app, areaId: area.id, areaName: area.name })));
const areaGrid = document.querySelector("#area-grid");
const appGrid = document.querySelector("#app-grid");
const searchResults = document.querySelector("#search-results");
const homeView = document.querySelector("#home-view");
const areaView = document.querySelector("#area-view");
const resultsView = document.querySelector("#results-view");
const searchInput = document.querySelector("#search-input");
const searchClear = document.querySelector("#search-clear");
const resultCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const areaHeading = document.querySelector("#area-heading");
const areaDescription = document.querySelector("#area-description");
const areaIcon = document.querySelector("#area-icon");
const areaCount = document.querySelector("#area-count");
const catalogMeta = document.querySelector("#catalog-meta");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[char]);
}
function normalize(value) {
  return String(value || "").toLocaleLowerCase("es").normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();
}
function iconFor(name) { return icons[name] || icons.document; }
function countText(n) { return n + (n === 1 ? " aplicación" : " aplicaciones"); }

function areaCard(area) {
  const direct = area.apps.length === 1;
  const href = direct ? area.apps[0].url : "#area/" + area.id;
  const ext = direct ? ' target="_blank" rel="noopener noreferrer"' : "";
  return '<a class="area-card" href="' + escapeHtml(href) + '"' + ext + ' aria-label="' +
    escapeHtml(area.name + (direct ? ": abrir aplicación" : ": ver aplicaciones")) + '">' +
    '<span class="area-card__top"><span class="icon-tile" aria-hidden="true">' + iconFor(area.icon) +
    '</span><span class="card-arrow" aria-hidden="true">' + (direct ? "↗" : "→") + '</span></span>' +
    '<span class="area-card__body"><strong>' + escapeHtml(area.name) + '</strong><span>' +
    escapeHtml(area.description) + '</span></span><span class="area-card__foot">' +
    (direct ? "Acceso directo" : countText(area.apps.length)) + '</span></a>';
}
function appCard(app, showArea) {
  const group = showArea ? '<span class="app-card__area">' + escapeHtml(app.areaName) + '</span>' : "";
  return '<a class="app-card" href="' + escapeHtml(app.url) +
    '" target="_blank" rel="noopener noreferrer" aria-label="Abrir ' + escapeHtml(app.name) + ' en otra pestaña">' +
    '<span class="app-card__top"><span class="icon-tile icon-tile--light" aria-hidden="true">' + iconFor(app.icon) +
    '</span><span class="card-arrow" aria-hidden="true">↗</span></span>' +
    '<span class="app-card__body"><strong>' + escapeHtml(app.name) +
    '</strong><span>' + escapeHtml(app.description) + '</span></span>' + group + '</a>';
}
function currentArea() {
  const match = /^#area\/([a-z0-9-]+)$/.exec(window.location.hash);
  return match ? areas.find(area => area.id === match[1]) : null;
}
function matchesSearch(app, terms) {
  const keywords = normalize([app.name,app.description,app.areaName,...(app.aliases || [])].join(" "));
  const url = normalize(app.url);
  return terms.every(term => keywords.includes(term) || url.includes(term));
}
function render() {
  const query = normalize(searchInput.value);
  const searching = query.length > 0;
  const selected = currentArea();
  homeView.hidden = searching || !!selected;
  areaView.hidden = searching || !selected;
  resultsView.hidden = !searching;
  searchClear.hidden = !searchInput.value;
  document.title = searching ? "Buscar | ITSQMET" : selected ? selected.name + " | ITSQMET" : "ITSQMET | Portal de Aplicaciones";
  if (searching) {
    const matches = allApps.filter(app => matchesSearch(app, query.split(/\s+/).filter(Boolean)));
    searchResults.innerHTML = matches.map(app => appCard(app,true)).join("");
    resultCount.textContent = countText(matches.length);
    emptyState.hidden = matches.length !== 0;
  } else if (selected) {
    areaHeading.textContent = selected.name;
    areaDescription.textContent = selected.description;
    areaIcon.innerHTML = iconFor(selected.icon);
    areaCount.textContent = countText(selected.apps.length);
    appGrid.innerHTML = selected.apps.map(app => appCard(app,false)).join("");
  }
}
function resetSearch() { searchInput.value = ""; render(); }
searchInput.addEventListener("input",render);
searchClear.addEventListener("click",() => { resetSearch(); searchInput.focus(); });
searchInput.addEventListener("keydown",event => { if (event.key === "Escape" && searchInput.value) resetSearch(); });
window.addEventListener("hashchange",() => { render(); window.scrollTo(0,0); });
areaGrid.innerHTML = areas.map(areaCard).join("");
catalogMeta.textContent = areas.length + " áreas · " + countText(allApps.length);
render();
