const menuButtonSelector = ".btn-toggle-menu";
const menuPanelSelector = ".nav-items-list";
const classToToggle = "nav-items-list-hidden";

const toggleHandler = () => {
  document.querySelector(menuPanelSelector).classList.toggle(classToToggle);
};
document
  .querySelector(menuButtonSelector)
  .addEventListener("click", toggleHandler);
const hideMenu = () => {
  document.querySelector(menuPanelSelector).classList.add(classToToggle);
};
