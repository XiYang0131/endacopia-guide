const searchInput = document.querySelector("[data-guide-search]");
const cards = Array.from(document.querySelectorAll("[data-guide-card]"));
const searchEmpty = document.querySelector("[data-search-empty]");

const track = (eventName, params = {}) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      site_area: "endacopia_guide",
      ...params
    });
  }
};

const aiReferrerDomains = new Map([
  ["chatgpt.com", "chatgpt"],
  ["openai.com", "chatgpt"],
  ["perplexity.ai", "perplexity"],
  ["claude.ai", "claude"],
  ["copilot.microsoft.com", "copilot"],
  ["gemini.google.com", "gemini"],
  ["you.com", "you"],
  ["phind.com", "phind"]
]);

const getAiReferrer = () => {
  if (!document.referrer) return null;

  try {
    const hostname = new URL(document.referrer).hostname.toLowerCase().replace(/^www\./, "");
    for (const [domain, source] of aiReferrerDomains) {
      if (hostname === domain || hostname.endsWith(`.${domain}`)) return source;
    }
  } catch {
    return null;
  }

  return null;
};

const aiSource = getAiReferrer();
if (aiSource) {
  track("ai_referral_visit", {
    ai_source: aiSource,
    page_path: window.location.pathname
  });
}

if (searchInput && cards.length > 0) {
  let searchTracked = false;
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCards = 0;
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const matches = query.length === 0 || text.includes(query);
      card.classList.toggle("hidden", !matches);
      if (matches) visibleCards += 1;
    });

    if (searchEmpty) {
      searchEmpty.hidden = query.length === 0 || visibleCards > 0;
    }

    if (!searchTracked && query.length >= 2) {
      searchTracked = true;
      track("guide_search_used", {
        search_term: query.slice(0, 80)
      });
    }
  });
}

const homeTabs = Array.from(document.querySelectorAll("[data-home-tab]"));
const homePanels = Array.from(document.querySelectorAll("[data-home-panel]"));

homeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const intent = tab.dataset.homeTab;

    homeTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    homePanels.forEach((panel) => {
      const isActive = panel.dataset.homePanel === intent;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });

    track("guide_intent_tab", {
      intent,
      page_path: window.location.pathname
    });
  });
});

document.querySelectorAll("[data-helpful]").forEach((panel) => {
  const buttons = Array.from(panel.querySelectorAll("[data-helpful-choice]"));
  const note = panel.querySelector("[data-feedback-note]");
  if (buttons.length === 0) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.helpfulChoice;
      buttons.forEach((item) => {
        item.disabled = true;
        item.setAttribute("aria-pressed", String(item === button));
      });

      if (note) note.hidden = false;
      track("guide_helpful_feedback", {
        answer: choice,
        page_path: window.location.pathname
      });
    });
  });
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    track("guide_card_click", {
      link_url: card.href,
      link_text: card.querySelector("strong")?.textContent?.trim() || card.textContent.trim().slice(0, 80)
    });
  });
});

document.querySelectorAll("[data-search-intent]").forEach((card) => {
  card.addEventListener("click", () => {
    track("search_intent_click", {
      intent: card.dataset.searchIntent,
      link_url: card.href,
      page_path: window.location.pathname
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
      code.classList.add("copied");
      window.setTimeout(() => code.classList.remove("copied"), 1400);
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
