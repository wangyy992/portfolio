// 阅读进度条 + 目录高亮，两者都在缺少对应元素时安全退出
(function () {
  var bar = document.querySelector('.progress i');
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();
  }

  var links = [].slice.call(document.querySelectorAll('.toc a'));
  if (!links.length) return;

  var pairs = [];
  links.forEach(function (a) {
    var el = document.querySelector(a.getAttribute('href'));
    if (el) pairs.push({ link: a, el: el });
  });
  if (!pairs.length) return;

  // 取最后一个顶部已越过阈值的小节；比「文档顺序里第一个可见」更符合阅读位置
  var ticking = false;
  function update() {
    ticking = false;
    var current = pairs[0];
    for (var i = 0; i < pairs.length; i++) {
      if (pairs[i].el.getBoundingClientRect().top <= 120) current = pairs[i];
    }
    pairs.forEach(function (p) { p.link.classList.remove('active'); });
    current.link.classList.add('active');
  }
  function onTocScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }
  addEventListener('scroll', onTocScroll, { passive: true });
  addEventListener('resize', onTocScroll);
  update();
})();
