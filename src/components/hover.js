AFRAME.registerComponent('podcasthover', {
  schema: {
    width: { type: 'number', default: 1 },
    height: { type: 'number', default: 1 },
    depth: { type: 'number', default: 1 },
  },

  init: function () {
    // const data = this.data;
    const el = this.el;  // <a-box>
    const cursor = document.querySelector('.cursor');

    el.addEventListener('mouseenter', function () {
      el.setAttribute('width', 1.2);
      el.setAttribute('height', 1.2);
      el.setAttribute('depth', 1.2);
      cursor.classList.add('hover');
    });

    el.addEventListener('mouseleave', function () {
      el.setAttribute('width', 1);
      el.setAttribute('height', 1);
      el.setAttribute('depth', 1);
      cursor.classList.remove('hover');
    });
  }
});