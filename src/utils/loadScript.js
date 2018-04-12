const loadScript = src => {
  const tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  document.getElementsByTagName('body').appendChild(tag);
};
