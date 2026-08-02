const searchInput = document.querySelector("[data-guide-search]");
const cards = Array.from(document.querySelectorAll("[data-guide-card]"));

const track = (eventName, params = {}) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      site_area: "endacopia_guide",
      ...params
    });
  }
};

if (searchInput && cards.length > 0) {
  let searchTracked = false;
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.classList.toggle("hidden", query.length > 0 && !text.includes(query));
    });

    if (!searchTracked && query.length >= 2) {
      searchTracked = true;
      track("guide_search_used", {
        search_term: query.slice(0, 80)
      });
    }
  });
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    track("guide_card_click", {
      link_url: card.href,
      link_text: card.querySelector("strong")?.textContent?.trim() || card.textContent.trim().slice(0, 80)
    });
  });
});

document.querySelectorAll("code").forEach((code) => {
  const value = code.textContent.trim();
  if (!value || value.length > 120) return;

  code.dataset.copyable = "true";
  code.title = "Click to copy";
  code.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(value);
      track("guide_code_copy", {
        code_value: value
      });
    } catch {
      track("guide_code_click", {
        code_value: value
      });
    }
  });
});

let scrolledHalf = false;
window.addEventListener("scroll", () => {
  if (scrolledHalf) return;

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return;

  const progress = window.scrollY / scrollable;
  if (progress >= 0.5) {
    scrolledHalf = true;
    track("guide_scroll_50", {
      page_path: window.location.pathname
    });
  }
}, { passive: true });

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
      track("achievement_check_toggle", {
        achievement_id: input.dataset.achievementId,
        checked: input.checked
      });
    });
  });

  if (reset) {
    reset.addEventListener("click", () => {
      inputs.forEach((input) => {
        input.checked = false;
      });
      writeSaved({});
      updateProgress();
      track("achievement_checklist_reset");
    });
  }

  updateProgress();
}
