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

const nextGuideMap = {
  "/endacopia-all-endings/": [
    { href: "/endacopia-ending-c-complete-route/", label: "Ending C / Stay route", reason: "Three-secret route checklist" },
    { href: "/endacopia-saw-box-code/", label: "Saw Box 471 guide", reason: "Choose Ending A or B" },
    { href: "/endacopia-ending-c-not-triggering/", label: "Ending C troubleshooting", reason: "Audit a missing trigger" }
  ],
  "/endacopia-timesville-fishing-guide/": [
    { href: "/endacopia-all-fish-guide/", label: "All fish guide", reason: "Track the full 18-fish route" },
    { href: "/endacopia-secret-ending/", label: "Secret ending guide", reason: "Continue the Stay route" },
    { href: "/endacopia-ending-c-not-triggering/", label: "Ending C troubleshooting", reason: "Fix a missing flag" }
  ],
  "/endacopia-scribbly/": [
    { href: "/endacopia-map/", label: "Endacopia map guide", reason: "Use the reward map correctly" },
    { href: "/endacopia-puzzle-solutions/", label: "Puzzle solutions", reason: "Move past the next blocker" },
    { href: "/endacopia-walkthrough/", label: "Full walkthrough", reason: "Return to the main route" }
  ],
  "/endacopia-clown-theater-puzzle/": [
    { href: "/endacopia-puzzle-solutions/", label: "Puzzle solutions", reason: "Find the next exact answer" },
    { href: "/endacopia-walkthrough/", label: "Full walkthrough", reason: "Continue the story route" },
    { href: "/endacopia-beginner-guide/", label: "Beginner guide", reason: "Review the early-game setup" }
  ],
  "/endacopia-achievements-guide/": [
    { href: "/endacopia-100-percent-achievement-checklist/", label: "100% checklist", reason: "Track every unlock" },
    { href: "/endacopia-stay-achievement/", label: "Stay achievement", reason: "Target the secret ending" },
    { href: "/endacopia-the-yeti-ending/", label: "The Yeti route", reason: "Clean up the hidden achievement" }
  ],
  "/endacopia-save-file-location/": [
    { href: "/endacopia-walkthrough/", label: "Full walkthrough", reason: "Return to the route" },
    { href: "/endacopia-all-endings/", label: "All endings guide", reason: "Plan a safe replay" },
    { href: "/endacopia-download/", label: "Download and backup notes", reason: "Keep a recoverable copy" }
  ],
  "/endacopia-water-break-achievement/": [
    { href: "/endacopia-timesville-fishing-guide/", label: "Timesville fishing guide", reason: "Continue the area route" },
    { href: "/endacopia-office-secret/", label: "Office secret guide", reason: "Check the stable Office interaction" },
    { href: "/endacopia-ending-c-not-triggering/", label: "Ending C troubleshooting", reason: "Audit a missing flag" }
  ],
  "/endacopia-let-me-go-let-me-talk/": [
    { href: "/endacopia-office-secret/", label: "Office secret guide", reason: "Continue the corporate route" },
    { href: "/endacopia-phone-puzzle-answers/", label: "Phone puzzle answers", reason: "Solve the next Office blocker" },
    { href: "/endacopia-walkthrough/", label: "Full walkthrough", reason: "Return to the main route" }
  ],
  "/endacopia-red-ball-guide/": [
    { href: "/endacopia-clown-theater-puzzle/", label: "Clown theater puzzle", reason: "Check the color setup" },
    { href: "/endacopia-trapezist/", label: "Trapezist route", reason: "Continue the Misery Town branch" },
    { href: "/endacopia-puzzle-solutions/", label: "Puzzle solutions", reason: "Find the next exact answer" }
  ],
  "/endacopia-soccer-ball/": [
    { href: "/endacopia-100-percent-achievement-checklist/", label: "100% achievement checklist", reason: "Track the remaining unlocks" },
    { href: "/endacopia-prologue-walkthrough/", label: "Prologue walkthrough", reason: "Review the first-room route" },
    { href: "/endacopia-screenshot-checklist/", label: "Screenshot checklist", reason: "Capture proof for a route" }
  ]
};

const fallbackNextGuides = [
  { href: "/endacopia-guides/", label: "Guide index", reason: "Choose a focused answer" },
  { href: "/endacopia-walkthrough/", label: "Full walkthrough", reason: "Continue the main route" },
  { href: "/endacopia-all-endings/", label: "All endings guide", reason: "Plan the final branches" }
];

const renderNextGuidePanel = () => {
  const feedbackPanel = document.querySelector("[data-helpful]");
  if (!feedbackPanel || document.querySelector("[data-next-guide]")) return;

  const currentPath = window.location.pathname;
  const recommendations = (nextGuideMap[currentPath] || fallbackNextGuides).filter((guide) => guide.href !== currentPath);
  if (recommendations.length === 0) return;
  const answerBox = document.querySelector(".answer-box");
  const topIntentPaths = new Set([
    "/endacopia-water-break-achievement/",
    "/endacopia-save-file-location/",
    "/endacopia-let-me-go-let-me-talk/",
    "/endacopia-clown-theater-puzzle/",
    "/endacopia-red-ball-guide/",
    "/endacopia-soccer-ball/"
  ]);

  const panel = document.createElement("section");
  panel.className = "next-guide-panel";
  panel.dataset.nextGuide = "true";
  panel.setAttribute("aria-labelledby", "next-guide-title");

  const copy = document.createElement("div");
  copy.className = "next-guide-copy";
  copy.innerHTML = '<span class="eyebrow">Next step</span><h2 id="next-guide-title">Continue this route</h2><p>Use the next focused guide instead of restarting the search from the homepage.</p>';

  const links = document.createElement("div");
  links.className = "next-guide-links";
  recommendations.forEach((guide) => {
    const link = document.createElement("a");
    link.className = "next-guide-link";
    link.dataset.nextGuideLink = "true";
    link.href = guide.href;

    const label = document.createElement("strong");
    label.textContent = guide.label;
    const reason = document.createElement("span");
    reason.textContent = guide.reason;
    link.append(label, reason);
    links.append(link);
  });

  panel.append(copy, links);
  const insertionPoint = topIntentPaths.has(currentPath) && answerBox ? answerBox : feedbackPanel;
  insertionPoint.parentNode.insertBefore(panel, insertionPoint === answerBox ? answerBox.nextSibling : feedbackPanel);
};

renderNextGuidePanel();

const sponsorAdConfig = {
  link: "https://www.effectivecpmnetwork.com/z2pkz9ua?key=3a78117943f8cc61a51702eb6455e146",
  scripts: [
    "https://pl30797998.effectivecpmnetwork.com/fb/09/6c/fb096cbb21a286b14a1ae4f4e3160a6c.js",
    "https://pl30797999.effectivecpmnetwork.com/cf/84/f5/cf84f5c009449802cb80b647390c0588.js"
  ]
};

const sponsorExcludedPaths = new Set(["/about/", "/contact/", "/editorial-policy/", "/privacy/", "/changelog/"]);

const renderSponsorSlot = () => {
  if (!document.querySelector(".article") || sponsorExcludedPaths.has(window.location.pathname)) return;

  const anchor = document.querySelector("[data-helpful]") || document.querySelector(".site-footer");
  if (!anchor?.parentNode) return;

  const slot = document.createElement("section");
  slot.className = "sponsor-slot";
  slot.dataset.sponsorSlot = "true";
  slot.setAttribute("aria-labelledby", "sponsor-slot-title");
  slot.innerHTML = `
    <div class="sponsor-slot-copy">
      <span class="eyebrow">Sponsored</span>
      <h2 id="sponsor-slot-title">Support this guide</h2>
      <p>This optional sponsor placement helps keep the guide available. The guide content remains free and independent.</p>
      <a class="sponsor-slot-link" data-sponsored-link href="${sponsorAdConfig.link}" target="_blank" rel="sponsored nofollow noopener noreferrer">View sponsor offer</a>
    </div>
    <div class="sponsor-network-slot" data-sponsor-network aria-label="Sponsored placement"></div>
  `;

  anchor.parentNode.insertBefore(slot, anchor);

  const loadScripts = () => {
    const networkSlot = slot.querySelector("[data-sponsor-network]");
    if (!networkSlot || networkSlot.dataset.loaded === "true") return;

    networkSlot.dataset.loaded = "true";
    sponsorAdConfig.scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.dataset.sponsorScript = "true";
      networkSlot.appendChild(script);
    });

    track("sponsor_ads_loaded", {
      page_path: window.location.pathname,
      provider: "effectivecpmnetwork"
    });
  };

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries, instance) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadScripts();
          instance.disconnect();
        }
      }, { rootMargin: "300px" })
    : null;

  if (observer) observer.observe(slot);
  window.setTimeout(loadScripts, 7000);

  slot.querySelector("[data-sponsored-link]")?.addEventListener("click", () => {
    track("sponsor_link_click", {
      page_path: window.location.pathname,
      provider: "effectivecpmnetwork"
    });
  });
};

renderSponsorSlot();

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

document.querySelectorAll("[data-next-guide-link]").forEach((link) => {
  link.addEventListener("click", () => {
    track("next_guide_click", {
      target_path: link.getAttribute("href"),
      link_text: link.textContent.trim().slice(0, 100),
      page_path: window.location.pathname
    });
  });
});

document.querySelectorAll(".article a[href^='/'], .sidebar a[href^='/']").forEach((link) => {
  if (link.matches("[data-next-guide-link], [data-search-intent], .guide-card")) return;
  if (link.closest(".guide-subnav, .breadcrumb")) return;

  link.addEventListener("click", () => {
    track("related_guide_click", {
      target_path: link.getAttribute("href"),
      link_text: link.textContent.trim().slice(0, 100),
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
let scrolledNinety = false;
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return;

  const progress = window.scrollY / scrollable;
  if (!scrolledHalf && progress >= 0.5) {
    scrolledHalf = true;
    track("guide_scroll_50", {
      page_path: window.location.pathname
    });
  }

  if (!scrolledNinety && progress >= 0.9) {
    scrolledNinety = true;
    track("guide_scroll_90", {
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
