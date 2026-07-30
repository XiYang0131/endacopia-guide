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
