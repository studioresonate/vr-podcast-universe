AFRAME.registerComponent('vrmenufilter', {

  init: function () {
    const el = this.el;

    function menuToggle() {
      let a = document.getElementById('vr-menu');
      if (a.hasAttribute('menu')) {
        a.setAttribute('animation', 'property: scale; to: 0 0 0; dur: 200; easing: easeInBack;');
        a.removeAttribute('menu');
      } else {
        a.setAttribute('animation', 'property: scale; to: 1 1 1; dur: 200; easing: easeOutQuart;');
        a.setAttribute('menu', '1');
      }
    };

    el.addEventListener('click', menuToggle);
  }
});