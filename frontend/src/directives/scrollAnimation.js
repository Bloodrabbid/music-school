export const scrollAnimation = {
  mounted(el, binding) {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, binding.value?.delay || 0);

          observer.unobserve(el);
        }
      });
    }, options);

    observer.observe(el);
  }
};

export default scrollAnimation;