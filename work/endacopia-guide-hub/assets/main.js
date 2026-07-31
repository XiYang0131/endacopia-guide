const searchInput = document.querySelector("[data-guide-search]");
const cards = Array.from(document.querySelectorAll("[data-guide-card]"));

if (searchInput && cards.length > 0) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.classList.toggle("hidden", query.length > 0 && !text.includes(query));
    });
  });
}

const checklist = document.querySelector("[data-achievement-checklist]");

if (checklist) {
  const storageKey = checklist.dataset.storageKey || "endacopia-achievements";
  const inputs = Array.from(checklist.querySelectorAll("[data-achievement-id]"));
  const count = checklist.querySelector("[data-progress-count]");
  const percent = checklist.querySelector("[data-progress-percent]");
  const bar = checklist.querySelector("[data-progress-bar]");
  const reset = checklist.querySelector("[data-checklist-reset]");

  const readSaved = () => {
    try {
      return JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  };

  const writeSaved = (state) => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Private browsing can block localStorage; the checklist still works until reload.
    }
  };

  const updateProgress = () => {
    const completed = inputs.filter((input) => input.checked).length;
    const progressPercent = inputs.length === 0 ? 0 : Math.round((completed / inputs.length) * 100);

    if (count) count.textContent = String(completed);
    if (percent) percent.textContent = `${progressPercent}%`;
    if (bar) {
      bar.max = inputs.length;
      bar.value = completed;
    }
  };

  const saved = readSaved();
  inputs.forEach((input) => {
    input.checked = Boolean(saved[input.dataset.achievementId]);
    input.addEventListener("change", () => {
      const nextState = readSaved();
      nextState[input.dataset.achievementId] = input.checked;
      writeSaved(nextState);
      updateProgress();
    });
  });

  if (reset) {
    reset.addEventListener("click", () => {
      inputs.forEach((input) => {
        input.checked = false;
      });
      writeSaved({});
      updateProgress();
    });
  }

  updateProgress();
}
