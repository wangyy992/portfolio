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
  if (!links.length || !('IntersectionObserver' in window)) return;

  var map = {};
  var seen = [];
  links.forEach(function (a) {
    var el = document.querySelector(a.getAttribute('href'));
    if (el) { map[el.id] = a; seen.push(el); }
  });

  var visible = {};
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
    var current = null;
    for (var i = 0; i < seen.length; i++) {
      if (visible[seen[i].id]) { current = seen[i].id; break; }
    }
    // 全部划出视口时（长小节内部），退回到最后一个已越过顶部的小节
    if (!current) {
      for (var j = 0; j < seen.length; j++) {
        if (seen[j].getBoundingClientRect().top <= 80) current = seen[j].id;
      }
    }
    links.forEach(function (a) { a.classList.remove('active'); });
    if (current && map[current]) map[current].classList.add('active');
  }, { rootMargin: '-72px 0px -55% 0px', threshold: 0 });

  seen.forEach(function (el) { io.observe(el); });
})();
