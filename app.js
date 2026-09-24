(() => {
  const projects = window.MISLINKS_PROJECTS || [];
  const projectsGrid = document.getElementById("projectsGrid");
  const favoritesGrid = document.getElementById("favoritesGrid");
  const searchInput = document.getElementById("searchInput");
  const resultsCount = document.getElementById("resultsCount");
  const emptyState = document.getElementById("emptyState");
  const modal = document.getElementById("accessModal");
  const modalPanel = document.getElementById("modalPanel");
  const modalTitle = document.getElementById("modalTitle");
  const modalProject = document.getElementById("modalProject");
  const modalContent = document.getElementById("modalContent");

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
  let query = "";
  let favorites = loadFavorites();

  function themeClass(projectId) {
    if (projectId === "cv") return "theme-cv";
    if (projectId === "docentes") return "theme-docentes";
    return "theme-titulacion";
  }

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
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalized(value = "") {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function projectMatches(project) {
    if (!query) return true;

    const haystack = [
      project.name,
      project.categoryLabel,
      ...project.groups.flatMap(group => [
        group.name,
        ...group.links.map(link => link.label)
      ])
    ].join(" ");

    return normalized(haystack).includes(normalized(query));
  }

  function renderStats() {
    document.getElementById("projectCount").textContent = projects.length;
    document.getElementById("linkCount").textContent = allLinks.length;
  }

  function starButton(link) {
    const active = favorites.includes(link.id);
    return `<button class="star-button ${active ? "is-favorite" : ""}" type="button" data-favorite="${escapeHtml(link.id)}" aria-label="${active ? "Quitar de favoritos" : "Agregar a favoritos"}" title="${active ? "Quitar de favoritos" : "Agregar a favoritos"}">★</button>`;
  }

  function directItem(link) {
    return `
      <div class="direct-item">
        <a class="direct-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">
          <span class="direct-dot"></span>
          <span>${escapeHtml(link.label)}</span>
        </a>
        ${starButton(link)}
      </div>
    `;
  }

  function accessItem(link) {
    return `
      <div class="access-item">
        <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)} ↗</a>
        ${starButton(link)}
      </div>
    `;
  }

  function projectHeader(project, linkCount) {
    return `
      <header class="project-header">
        <div class="project-title-wrap">
          <span class="project-icon">${escapeHtml(project.short)}</span>
          <div>
            <h2 class="project-name">${escapeHtml(project.name)}</h2>
            <span class="project-meta">${linkCount} accesos</span>
          </div>
        </div>
        ${project.repository ? `<a class="repo-mini" href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>` : ""}
      </header>
    `;
  }

  function cvCard(project) {
    const adminGroup = project.groups[0];
    const cvGroups = project.groups.slice(1);
    const linkCount = project.groups.flatMap(group => group.links).length;

    return `
      <article class="project-panel theme-cv" data-project-id="${escapeHtml(project.id)}">
        ${projectHeader(project, linkCount)}
        <div class="project-body">
          <section class="inner-block">
            <div class="block-title-row">
              <h3 class="block-title">Administración</h3>
            </div>
            <div class="direct-grid">
              ${adminGroup.links.map(directItem).join("")}
            </div>
          </section>

          <section class="inner-block">
            <div class="block-title-row">
              <h3 class="block-title">Tipos de CV</h3>
              <span class="block-count">${cvGroups.reduce((total, group) => total + group.links.length, 0)} perfiles</span>
            </div>
            <div class="group-grid">
              ${cvGroups.map((group, index) => `
                <button class="group-button" type="button" data-open-group="cv:${index + 1}">
                  <strong>${escapeHtml(group.name)}</strong>
                  <small>${group.links.length} perfiles</small>
                  <span class="group-arrow">›</span>
                </button>
              `).join("")}
            </div>
          </section>
        </div>
      </article>
    `;
  }

  function standardCard(project) {
    const links = project.groups.flatMap(group => group.links);
    return `
      <article class="project-panel ${themeClass(project.id)}" data-project-id="${escapeHtml(project.id)}">
        ${projectHeader(project, links.length)}
        <div class="project-body">
          <section class="inner-block">
            <div class="block-title-row">
              <h3 class="block-title">Accesos</h3>
            </div>
            <div class="direct-grid">
              ${links.map(directItem).join("")}
            </div>
            <div class="full-access">
              <button type="button" data-open-project="${escapeHtml(project.id)}">Ver todos</button>
            </div>
          </section>
        </div>
      </article>
    `;
  }

  function card(project) {
    return project.id === "cv" ? cvCard(project) : standardCard(project);
  }

  function renderProjects() {
    const visible = projects.filter(projectMatches);
    projectsGrid.innerHTML = visible.map(card).join("");
    emptyState.hidden = visible.length > 0;
    resultsCount.textContent = query ? `${visible.length} coincidencias` : `${projects.length} proyectos`;
  }

  function renderFavorites() {
    const items = favorites.map(id => linkMap.get(id)).filter(Boolean);

    if (!items.length) {
      favoritesGrid.innerHTML = '<span class="favorites-empty">Marca accesos con ★ para tenerlos aquí.</span>';
      return;
    }

    favoritesGrid.innerHTML = items.map(link => `
      <div class="favorite-card ${themeClass(link.projectId)}">
        <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">
          <span class="favorite-icon">${escapeHtml(link.projectShort)}</span>
          <span class="favorite-copy">
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

    if (!modal.hidden) {
      const projectId = modal.dataset.projectId;
      const groupIndex = modal.dataset.groupIndex;
      if (projectId && groupIndex !== "") openGroup(projectId, Number(groupIndex), false);
      else if (projectId) openProject(projectId, false);
    }
  }

  function setModalTheme(project) {
    modalPanel.className = `modal-panel ${themeClass(project.id)}`;
    modalProject.textContent = project.name;
  }

  function openGroup(projectId, groupIndex, show = true) {
    const project = projects.find(item => item.id === projectId);
    const group = project?.groups?.[groupIndex];
    if (!project || !group) return;

    setModalTheme(project);
    modal.dataset.projectId = project.id;
    modal.dataset.groupIndex = String(groupIndex);
    modalTitle.textContent = group.name;
    modalContent.innerHTML = `
      <div class="access-group">
        <h3>${group.links.length} perfiles</h3>
        <div class="access-list">
          ${group.links.map(accessItem).join("")}
        </div>
      </div>
    `;

    if (show) {
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    }
  }

  function openProject(projectId, show = true) {
    const project = projects.find(item => item.id === projectId);
    if (!project) return;

    setModalTheme(project);
    modal.dataset.projectId = project.id;
    modal.dataset.groupIndex = "";
    modalTitle.textContent = "Todos los accesos";
    modalContent.innerHTML = project.groups.map(group => `
      <div class="access-group">
        <h3>${escapeHtml(group.name)}</h3>
        <div class="access-list">
          ${group.links.map(accessItem).join("")}
        </div>
      </div>
    `).join("");

    if (show) {
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    modal.hidden = true;
    modal.dataset.projectId = "";
    modal.dataset.groupIndex = "";
    document.body.style.overflow = "";
  }

  projectsGrid.addEventListener("click", event => {
    const groupButton = event.target.closest("[data-open-group]");
    if (groupButton) {
      const [projectId, groupIndex] = groupButton.dataset.openGroup.split(":");
      openGroup(projectId, Number(groupIndex));
      return;
    }

    const projectButton = event.target.closest("[data-open-project]");
    if (projectButton) {
      openProject(projectButton.dataset.openProject);
      return;
    }

    const favoriteButton = event.target.closest("[data-favorite]");
    if (favoriteButton) toggleFavorite(favoriteButton.dataset.favorite);
  });

  favoritesGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-favorite]");
    if (button) toggleFavorite(button.dataset.favorite);
  });

  modal.addEventListener("click", event => {
    const favoriteButton = event.target.closest("[data-favorite]");
    if (favoriteButton) {
      toggleFavorite(favoriteButton.dataset.favorite);
      return;
    }

    if (event.target.closest("[data-close-modal]")) closeModal();
  });

  searchInput.addEventListener("input", () => {
    query = searchInput.value.trim();
    renderProjects();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "/" && document.activeElement !== searchInput) {
      event.preventDefault();
      searchInput.focus();
      return;
    }

    if (event.key === "Escape") {
      if (!modal.hidden) {
        closeModal();
        return;
      }

      if (document.activeElement === searchInput) {
        searchInput.value = "";
        query = "";
        searchInput.blur();
        renderProjects();
      }
    }
  });

  renderStats();
  renderFavorites();
  renderProjects();
})();
