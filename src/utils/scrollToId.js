export function scrollToId(id, behavior = 'smooth') {
  const element = document.getElementById(id);
  if (!element) return false;
  const headerH = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
  const top = element.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}
