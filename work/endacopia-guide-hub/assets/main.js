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

const normalizePath = (value) => {
  const path = value || "/";
  return path.length > 1 ? path.replace(/\/+$/, "") + "/" : "/";
};

const markCurrentNavigation = () => {
  const currentPath = normalizePath(window.location.pathname);
  document.querySelectorAll(".nav a[href], .guide-subnav a[href]").forEach((link) => {
    const linkPath = normalizePath(new URL(link.href, window.location.href).pathname);
    if (linkPath === currentPath) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
};

markCurrentNavigation();

const contentBannerConfig = {
  key: "027ceae82d4b46f6acf3541e08932f70",
  format: "iframe",
  height: 90,
  width: 728,
  params: {}
};

const contentBannerExcludedPaths = new Set(["/about/", "/contact/", "/editorial-policy/", "/privacy/", "/changelog/"]);

const renderContentBanner = () => {
  const article = document.querySelector("article.article");
  const main = document.querySelector("main.main");
  const target = article || main;
  if (!target || document.querySelector("[data-content-banner]") || contentBannerExcludedPaths.has(normalizePath(window.location.pathname))) return;

  const slot = document.createElement("section");
  slot.className = "content-banner-slot";
  slot.dataset.contentBanner = "true";
  slot.setAttribute("aria-label", "Advertisement");
  slot.innerHTML = `
    <span class="content-banner-label">Advertisement</span>
    <div class="content-banner-network" data-content-banner-network></div>
  `;

  const network = slot.querySelector("[data-content-banner-network]");
  window.atOptions = contentBannerConfig;

  const adScript = document.createElement("script");
  adScript.src = "https://www.highrevenueformat.com/027ceae82d4b46f6acf3541e08932f70/invoke.js";
  adScript.addEventListener("load", () => {
    track("banner_ad_loaded", {
      page_path: window.location.pathname,
      provider: "highrevenueformat",
      format: "iframe",
      placement: "article_end"
    });
  });
  adScript.addEventListener("error", () => {
    track("banner_ad_error", {
      page_path: window.location.pathname,
      provider: "highrevenueformat",
      format: "iframe",
      placement: "article_end"
    });
  });

  target.append(slot);
  network.append(adScript);
};

renderContentBanner();

// Next-guide panels are in static HTML to avoid late layout shifts.

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

  const anchor = document.querySelector("[data-helpful]:not(.feedback-button)") || document.querySelector(".feedback-panel") || document.querySelector(".site-footer");
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
  window.setTimeout(() => {
    if (document.visibilityState === "visible") loadScripts();
  }, 12000);

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
  let searchFrame = 0;
  // Read text once; rapid inputs share one DOM update per animation frame.
  const searchableCards = cards.map((card) => ({ card, text: card.textContent.toLowerCase() }));
  searchInput.addEventListener("input", () => {
    if (searchFrame) return;
    searchFrame = window.requestAnimationFrame(() => {
      searchFrame = 0;
      const query = searchInput.value.trim().toLowerCase();
      let visibleCards = 0;
      searchableCards.forEach(({ card, text }) => {
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
  });
}

const homeTabs = Array.from(document.querySelectorAll("[data-home-tab]"));
const homePanels = Array.from(document.querySelectorAll("[data-home-panel]"));

const activateHomeTab = (tab, shouldTrack = true) => {
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

    homeTabs.forEach((item) => { item.tabIndex = item === tab ? 0 : -1; });
    if (shouldTrack) {
      track("guide_intent_tab", {
        intent,
        page_path: window.location.pathname
      });
    }
};

homeTabs.forEach((tab, index) => {
  tab.tabIndex = tab.classList.contains("is-active") ? 0 : -1;
  tab.addEventListener("click", () => activateHomeTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key) || homeTabs.length === 0) return;
    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? homeTabs.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + homeTabs.length) % homeTabs.length;
    const nextTab = homeTabs[nextIndex];
    activateHomeTab(nextTab, false);
    nextTab.focus();
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
let scrollFrame = 0;
const checkScrollDepth = () => {
  scrollFrame = 0;
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
    window.removeEventListener("scroll", scheduleScrollDepth);
  }
};
const scheduleScrollDepth = () => {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(checkScrollDepth);
};
window.addEventListener("scroll", scheduleScrollDepth, { passive: true });

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
