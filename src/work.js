import './main.js';

const portfolio = document.querySelector('.work-index');
const search = portfolio.querySelector('#project-search');
const filters = [...portfolio.querySelectorAll('[data-filter]')];
const cards = [...portfolio.querySelectorAll('.project')];
const count = portfolio.querySelector('.results-count');
const empty = portfolio.querySelector('.empty-state');
let category = 'all';

const update = () => {
  const query = search.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const matchesCategory = category === 'all' || card.dataset.category === category;
    const searchable = `${card.dataset.search} ${card.dataset.category}`.toLowerCase();
    card.hidden = !(matchesCategory && searchable.includes(query));
    if (!card.hidden) visible += 1;
  });

  filters.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filter === category));
  });
  count.textContent = `${visible} of ${cards.length} ${visible === 1 ? 'project' : 'projects'}`;
  empty.hidden = visible !== 0;
};

filters.forEach((button) => {
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    update();
  });
});
search.addEventListener('input', update);
portfolio.querySelector('#reset-search').addEventListener('click', () => {
  category = 'all';
  search.value = '';
  update();
  search.focus();
});

update();
portfolio.querySelector('.portfolio-tools').hidden = false;
