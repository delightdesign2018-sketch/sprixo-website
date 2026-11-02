import './main.js';

const portfolio = document.querySelector('.work-index');
const search = portfolio.querySelector('#project-search');
const filters = [...portfolio.querySelectorAll('[data-filter]')];
const cards = [...portfolio.querySelectorAll('.project')];
const count = portfolio.querySelector('.results-count');
const empty = portfolio.querySelector('.empty-state');
const loadMore = portfolio.querySelector('#load-more');
const pageSize = 12;
let visibleLimit = pageSize;
let category = 'all';

const update = () => {
  const query = search.value.trim().toLowerCase();
  let matching = 0;

  cards.forEach((card) => {
    const matchesCategory = category === 'all' || card.dataset.category === category;
    const searchable = `${card.dataset.search} ${card.dataset.category}`.toLowerCase();
    const matches = matchesCategory && searchable.includes(query);
    if (matches) matching += 1;
    card.hidden = !matches || matching > visibleLimit;
  });

  filters.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filter === category));
  });
  count.textContent = `${matching} of ${cards.length} ${matching === 1 ? 'project' : 'projects'}`;
  empty.hidden = matching !== 0;
  loadMore.hidden = matching <= visibleLimit;
};

filters.forEach((button) => {
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    visibleLimit = pageSize;
    update();
  });
});
search.addEventListener('input', () => {
  visibleLimit = pageSize;
  update();
});
loadMore.addEventListener('click', () => {
  visibleLimit += pageSize;
  update();
});
portfolio.querySelector('#reset-search').addEventListener('click', () => {
  category = 'all';
  search.value = '';
  visibleLimit = pageSize;
  update();
  search.focus();
});

update();
portfolio.querySelector('.portfolio-tools').hidden = false;
