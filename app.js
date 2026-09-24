(() => {
  const projects = window.MISLINKS_PROJECTS || [];
  const projectsGrid = document.getElementById("projectsGrid");
  const favoritesGrid = document.getElementById("favoritesGrid");
  const searchInput = document.getElementById("searchInput");
  const filters = document.getElementById("filters");
  const resultsCount = document.getElementById("resultsCount");
  const emptyState = document.getElementById("emptyState");
  const modal = document.getElementById("accessModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalTag = document.getElementById("modalTag");
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
  let activeFilter = "all";
  let query = "";
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
    if (activeFilter !== "all" && project.category !== activeFilter) return false;
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

  function renderStats() {
    document.getElementById("projectCount").textContent = projects.length;
    document.getElementById("linkCount").textContent = allLinks.length;
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
    const primary = links.find(link => link.primary) || links[0];

    let quickLinks;
    if (project.id === "cv") {
      quickLinks = [
        primary,
        links.find(link => link.id === "cv-admin")
      ].filter(Boolean);
    } else if (project.id === "docentes") {
      quickLinks = [
        links.find(link => link.id === "doc-general"),
        links.find(link => link.id === "doc-admin")
      ].filter(Boolean);
    } else {
      quickLinks = [
        links.find(link => link.id === "tit-estudiantes"),
        links.find(link => link.id === "tit-admin")
      ].filter(Boolean);
    }

    return `
      <article class="project-card" data-project-id="${escapeHtml(project.id)}">
        <div class="project-top">
          <div class="project-identity">
            <div class="project-icon">${escapeHtml(project.short)}</div>
            <div>
              <span class="project-tag">${escapeHtml(project.categoryLabel)}</span>
              <h2 class="project-title">${escapeHtml(project.name)}</h2>
            </div>
          </div>
        </div>

        <p class="project-description">${escapeHtml(project.description)}</p>

        <div class="project-summary">
          <span><strong>${links.length}</strong> accesos</span>
          <span>${escapeHtml(project.categoryLabel)}</span>
        </div>

        <div class="quick-links">
          ${quickLinks.map((link, index) => `
            <a class="quick-link ${index === 0 ? "primary" : ""}" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(link.label)} ↗
            </a>
          `).join("")}
        </div>

        <div class="project-actions">
          <button class="more-button" type="button" data-open-project="${escapeHtml(project.id)}">Ver accesos</button>
          ${project.repository ? `<a class="repo-button" href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>` : ""}
        </div>
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
      favoritesGrid.innerHTML = '<span class="favorites-empty">Marca accesos con ★ para agregarlos aquí.</span>';
      return;
    }

    favoritesGrid.innerHTML = items.map(link => `
      <div class="favorite-card">
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
      const project = projects.find(item => item.id === projectId);
      if (project) fillModal(project);
    }
  }

  function fillModal(project) {
    modal.dataset.projectId = project.id;
    modalTitle.textContent = project.name;
    modalTag.textContent = project.categoryLabel;

    modalContent.innerHTML = project.groups.map(group => `
      <div class="access-group">
        <h3>${escapeHtml(group.name)}</h3>
        <div class="access-list">
          ${group.links.map(accessItem).join("")}
        </div>
      </div>
    `).join("");
  }

  function openModal(projectId) {
    const project = projects.find(item => item.id === projectId);
    if (!project) return;
    fillModal(project);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.hidden = true;
    modal.dataset.projectId = "";
    document.body.style.overflow = "";
  }

  projectsGrid.addEventListener("click", event => {
    const openButton = event.target.closest("[data-open-project]");
    if (openButton) {
      openModal(openButton.dataset.openProject);
      return;
    }

    const favoriteButton = event.target.closest("[data-favorite]");
    if (favoriteButton) {
      toggleFavorite(favoriteButton.dataset.favorite);
    }
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
