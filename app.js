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
  const modalBack = document.getElementById("modalBack");

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
  const defaultFavorites = ["tit-admin", "cv-principal"];
  let query = "";
  let favorites = loadFavorites();

  function themeClass(projectId) {
    if (projectId === "cv") return "theme-cv";
    if (projectId === "titulacion") return "theme-titulacion";
    if (projectId === "antiplagio") return "theme-antiplagio";
    if (projectId === "ugpa") return "theme-ugpa";
    return "theme-default";
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
    return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function projectLinks(project) {
    return project.groups.flatMap(group => group.links);
  }

  function projectMatches(project) {
    if (!query) return true;
    const haystack = [
      project.name,
      project.categoryLabel,
      ...project.groups.flatMap(group => [group.name, ...group.links.map(link => link.label)])
    ].join(" ");
    return normalized(haystack).includes(normalized(query));
  }

  function renderStats() {
    document.getElementById("projectCount").textContent = projects.length;
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

  function primaryLink(project) {
    const links = projectLinks(project);
    return links.find(link => link.primary) || links[0];
  }

  function primaryLabel(project) {
    if (project.id === "cv") return "Principal";
    if (project.id === "titulacion") return "Central";
    return "Abrir";
  }

  function secondaryLabel(project) {
    if (project.id === "cv") return "Ver CV";
    return "Ver accesos";
  }

  function projectCard(project) {
    const links = projectLinks(project);
    const primary = primaryLink(project);
    const hasDetails = links.length > 1 || project.id === "cv";

    return `
      <article class="project-card ${themeClass(project.id)}">
        <div class="card-accent"></div>

        <div class="project-card-head">
          <span class="project-icon">${escapeHtml(project.short)}</span>
          ${project.repository ? `<a class="repo-link" href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer" title="Abrir repositorio">GitHub ↗</a>` : ""}
        </div>

        <div class="project-card-main">
          <h2>${escapeHtml(project.name)}</h2>
          <span>${links.length} ${links.length === 1 ? "acceso" : "accesos"}</span>
        </div>

        <div class="project-card-actions ${hasDetails ? "" : "single"}">
          <a class="primary-action" href="${escapeHtml(primary.url)}" target="_blank" rel="noopener noreferrer">${primaryLabel(project)} ↗</a>
          ${hasDetails ? `<button class="secondary-action" type="button" data-open-project="${escapeHtml(project.id)}">${secondaryLabel(project)}</button>` : ""}
        </div>
      </article>
    `;
  }

  function renderProjects() {
    const visible = projects.filter(projectMatches);
    projectsGrid.innerHTML = visible.map(projectCard).join("");
    emptyState.hidden = visible.length > 0;
    resultsCount.textContent = query ? `${visible.length} coincidencias` : `${projects.length} proyectos`;
  }

  function renderFavorites() {
    const items = favorites.map(id => linkMap.get(id)).filter(Boolean);

    if (!items.length) {
      favoritesGrid.innerHTML = '<span class="favorites-empty">Marca accesos con ★ dentro de cada proyecto.</span>';
      return;
    }

    favoritesGrid.innerHTML = items.map(link => `
      <div class="favorite-chip ${themeClass(link.projectId)}">
        <span class="favorite-dot"></span>
        <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>
        <button type="button" data-favorite="${escapeHtml(link.id)}" aria-label="Quitar de favoritos">×</button>
      </div>
    `).join("");
  }

  function toggleFavorite(id) {
    favorites = favorites.includes(id)
      ? favorites.filter(item => item !== id)
      : [...favorites, id];

    saveFavorites();
    renderFavorites();

    if (!modal.hidden) {
      const projectId = modal.dataset.projectId;
      const groupIndex = modal.dataset.groupIndex;
      if (projectId && groupIndex !== "") renderCvGroup(projectId, Number(groupIndex), false);
      else if (projectId) renderProjectModal(projectId, false);
    }
  }

  function setModalTheme(project) {
    modalPanel.className = `modal-panel ${themeClass(project.id)}`;
    modalProject.textContent = project.name;
  }

  function cvOverview(project) {
    const adminGroup = project.groups[0];
    const cvGroups = project.groups.slice(1);

    return `
      <section class="modal-section">
        <div class="modal-section-title">Administración</div>
        <div class="access-list">
          ${adminGroup.links.map(accessItem).join("")}
        </div>
      </section>

      <section class="modal-section">
        <div class="modal-section-title">Tipos de CV</div>
        <div class="group-list">
          ${cvGroups.map((group, index) => `
            <button class="group-card" type="button" data-open-group="cv:${index + 1}">
              <span>
                <strong>${escapeHtml(group.name)}</strong>
                <small>${group.links.length} perfiles</small>
              </span>
              <b>›</b>
            </button>
          `).join("")}
        </div>
      </section>
    `;
  }

  function standardOverview(project) {
    return project.groups.map(group => `
      <section class="modal-section">
        <div class="modal-section-title">${escapeHtml(group.name)}</div>
        <div class="access-list">
          ${group.links.map(accessItem).join("")}
        </div>
      </section>
    `).join("");
  }

  function renderProjectModal(projectId, show = true) {
    const project = projects.find(item => item.id === projectId);
    if (!project) return;

    setModalTheme(project);
    modal.dataset.projectId = project.id;
    modal.dataset.groupIndex = "";
    modalBack.hidden = true;
    modalTitle.textContent = project.id === "cv" ? "CV y perfiles" : "Accesos";
    modalContent.innerHTML = project.id === "cv" ? cvOverview(project) : standardOverview(project);

    if (show) {
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    }
  }

  function renderCvGroup(projectId, groupIndex, show = true) {
    const project = projects.find(item => item.id === projectId);
    const group = project?.groups?.[groupIndex];
    if (!project || !group) return;

    setModalTheme(project);
    modal.dataset.projectId = project.id;
    modal.dataset.groupIndex = String(groupIndex);
    modalBack.hidden = false;
    modalTitle.textContent = group.name;
    modalContent.innerHTML = `
      <section class="modal-section">
        <div class="modal-section-title">${group.links.length} perfiles</div>
        <div class="access-list">
          ${group.links.map(accessItem).join("")}
        </div>
      </section>
    `;

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
    const projectButton = event.target.closest("[data-open-project]");
    if (projectButton) renderProjectModal(projectButton.dataset.openProject);
  });

  favoritesGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-favorite]");
    if (button) toggleFavorite(button.dataset.favorite);
  });

  modalContent.addEventListener("click", event => {
    const favoriteButton = event.target.closest("[data-favorite]");
    if (favoriteButton) {
      toggleFavorite(favoriteButton.dataset.favorite);
      return;
    }

    const groupButton = event.target.closest("[data-open-group]");
    if (groupButton) {
      const [projectId, groupIndex] = groupButton.dataset.openGroup.split(":");
      renderCvGroup(projectId, Number(groupIndex));
    }
  });

  modalBack.addEventListener("click", () => {
    const projectId = modal.dataset.projectId;
    if (projectId) renderProjectModal(projectId, false);
  });

  modal.addEventListener("click", event => {
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
