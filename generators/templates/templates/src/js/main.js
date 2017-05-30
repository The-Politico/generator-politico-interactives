window.$('.icon-facebook').click((e) => {
  e.preventDefault();
  const uri = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${uri}`);
});


window.$('.icon-twitter').click((e) => {
  e.preventDefault();
  const uri = window.location.href;
  const tweet = 'The latest news from POLITICO';
  const status = encodeURIComponent(`${tweet} ${uri}`);
  window.open(`https://twitter.com/home?status=${status}`);
});
