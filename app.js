(() => {
  const projects = window.MISLINKS_PROJECTS || [];
  const projectsGrid = document.getElementById("projectsGrid");
  const favoritesGrid = document.getElementById("favoritesGrid");
  const favoritesSection = document.getElementById("favoritesSection");
  const searchInput = document.getElementById("searchInput");
  const filters = document.getElementById("filters");
  const resultsCount = document.getElementById("resultsCount");
  const emptyState = document.getElementById("emptyState");
  const themeToggle = document.getElementById("themeToggle");

  const allLinks = projects.flatMap(project =>
    project.groups.flatMap(group =>
      group.links.map(link => ({
        ...link,
        projectId: project.id,
        projectName: project.name,
        projectShort: project.short,
        groupName: group.name
      }))
    )
  );

  const linkMap = new Map(allLinks.map(link => [link.id, link]));
  const defaultFavorites = ["tit-admin", "doc-admin", "cv-principal"];
  let activeFilter = "all";
  let query = "";
  let openProjects = new Set();
  let favorites = loadFavorites();

  function loadFavorites() {
    try {
      const stored = JSON.parse(localStorage.getItem("mislinks:favorites"));
      return Array.isArray(stored) ? stored.filter(id => linkMap.has(id)) : defaultFavorites;
    } catch {
      return defaultFavorites;
    }
  }

  function saveFavorites() {
    localStorage.setItem("mislinks:favorites", JSON.stringify(favorites));
  }

  function escapeHtml(value = "") {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalized(value = "") {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function projectMatches(project) {
    const filterMatch = activeFilter === "all" || project.category === activeFilter;
    if (!filterMatch) return false;
    if (!query) return true;

    const haystack = [
      project.name,
      project.description,
      project.categoryLabel,
      ...project.groups.flatMap(group => [
        group.name,
        ...group.links.map(link => link.label)
      ])
    ].join(" ");

    return normalized(haystack).includes(normalized(query));
  }

  function totalLinks() {
    return allLinks.length;
  }

  function renderStats() {
    document.getElementById("projectCount").textContent = projects.length;
    document.getElementById("linkCount").textContent = totalLinks();
  }

  function starButton(link) {
    const active = favorites.includes(link.id);
    return `<button class="star-button ${active ? "is-favorite" : ""}" type="button" data-favorite="${escapeHtml(link.id)}" aria-label="${active ? "Quitar de favoritos" : "Agregar a favoritos"}" title="${active ? "Quitar de favoritos" : "Agregar a favoritos"}">★</button>`;
  }

  function accessItem(link) {
    return `
      <div class="access-item">
        <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)} ↗</a>
        ${starButton(link)}
      </div>
    `;
  }

  function card(project) {
    const links = project.groups.flatMap(group => group.links);
    const first = links.find(link => link.primary) || links[0];
    const isOpen = openProjects.has(project.id);
    const quickLinks = project.id === "cv" ? [first, links[1]].filter(Boolean) : links;

    return `
      <article class="project-card ${project.featured ? "is-wide" : ""}" data-project-id="${project.id}">
        <div class="project-top">
          <div class="project-identity">
            <div class="project-icon">${escapeHtml(project.short)}</div>
            <div>
              <span class="project-tag">${escapeHtml(project.categoryLabel)}</span>
              <h3 class="project-title">${escapeHtml(project.name)}</h3>
            </div>
          </div>
        </div>

        <p class="project-description">${escapeHtml(project.description)}</p>
        <div class="project-meta"><span>${links.length} accesos</span></div>

        <div class="project-links">
          ${quickLinks.map((link, index) => `
            <a class="link-button ${index === 0 ? "primary" : ""}" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(link.label)} ↗
            </a>
          `).join("")}

          ${project.id === "cv" ? `
            <button class="toggle-button" type="button" data-toggle-project="${project.id}" aria-expanded="${isOpen}">
              ${isOpen ? "Ocultar perfiles ↑" : "Ver todos los perfiles ↓"}
            </button>
          ` : ""}

          ${project.repository ? `
            <a class="repo-button" href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          ` : ""}
        </div>

        ${project.id === "cv" ? `
          <div class="expanded-links ${isOpen ? "is-open" : ""}">
            ${project.groups.map(group => `
              <div class="access-group">
                <h3>${escapeHtml(group.name)}</h3>
                <div class="access-list">
                  ${group.links.map(accessItem).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        ` : `
          <div class="expanded-links is-open">
            <div class="access-group">
              <h3>Todos los accesos</h3>
              <div class="access-list">
                ${links.map(accessItem).join("")}
              </div>
            </div>
          </div>
        `}
      </article>
    `;
  }

  function renderProjects() {
    const visible = projects.filter(projectMatches);
    projectsGrid.innerHTML = visible.map(card).join("");
    emptyState.hidden = visible.length > 0;
    resultsCount.textContent = `${visible.length} de ${projects.length} proyectos`;
  }

  function renderFavorites() {
    const items = favorites.map(id => linkMap.get(id)).filter(Boolean);

    if (!items.length) {
      favoritesGrid.innerHTML = '<div class="favorites-empty">Marca cualquier acceso con ★ para tenerlo aquí.</div>';
      return;
    }

    favoritesGrid.innerHTML = items.map(link => `
      <div class="favorite-card">
        <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:13px;min-width:0;flex:1;text-decoration:none">
          <span class="favorite-icon">${escapeHtml(link.projectShort)}</span>
          <span style="min-width:0">
            <strong>${escapeHtml(link.label)}</strong>
            <span>${escapeHtml(link.projectName)}</span>
          </span>
        </a>
        <button class="favorite-remove" type="button" data-favorite="${escapeHtml(link.id)}" aria-label="Quitar de favoritos" title="Quitar de favoritos">×</button>
      </div>
    `).join("");
  }

  function toggleFavorite(id) {
    favorites = favorites.includes(id)
      ? favorites.filter(item => item !== id)
      : [...favorites, id];

    saveFavorites();
    renderFavorites();
    renderProjects();
  }

  projectsGrid.addEventListener("click", event => {
    const favoriteButton = event.target.closest("[data-favorite]");
    if (favoriteButton) {
      toggleFavorite(favoriteButton.dataset.favorite);
      return;
    }

    const toggle = event.target.closest("[data-toggle-project]");
    if (toggle) {
      const id = toggle.dataset.toggleProject;
      if (openProjects.has(id)) openProjects.delete(id);
      else openProjects.add(id);
      renderProjects();
    }
  });

  favoritesGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-favorite]");
    if (button) toggleFavorite(button.dataset.favorite);
  });

  filters.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    activeFilter = button.dataset.filter;
    [...filters.querySelectorAll(".filter")].forEach(item =>
      item.classList.toggle("is-active", item === button)
    );
    renderProjects();
  });

  searchInput.addEventListener("input", () => {
    query = searchInput.value.trim();
    renderProjects();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "/" && document.activeElement !== searchInput) {
      event.preventDefault();
      searchInput.focus();
    }

    if (event.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      query = "";
      searchInput.blur();
      renderProjects();
    }
  });

  function applyTheme(theme) {
    if (theme === "dark") document.documentElement.dataset.theme = "dark";
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("mislinks:theme", theme);
  }

  const storedTheme = localStorage.getItem("mislinks:theme");
  const initialTheme = storedTheme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme === "dark";
    applyTheme(dark ? "light" : "dark");
  });

  renderStats();
  renderFavorites();
  renderProjects();
})();
