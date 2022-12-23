AFRAME.registerComponent('musictoggle', {

  init: function () {
    const el = this.el;
    const toggle = document.querySelector('.toggle')

    function vrMusicToggle() {
      let sun = document.querySelector('#sun')
      if (sun.hasAttribute('music')) {
        sun.setAttribute('mixin', 'bgmusic-on');
        sun.removeAttribute('music');
        el.setAttribute('value', "MUSIC ON")
        toggle.setAttribute('animation', 'property: position; to: 0.085 0 0; dur: 200; easing: linear; loop: false')
        toggle.setAttribute('animation__1', 'property: components.material.material.color; type: color; to: #0051e6; dur: 200')
      } else {
        sun.setAttribute('mixin', 'bgmusic-off');
        sun.setAttribute('music', '1');
        el.setAttribute('value', "MUSIC OFF")
        toggle.setAttribute('animation', 'property: position; to: -0.018 0 0; dur: 200; easing: linear; loop: false')
        toggle.setAttribute('animation__1', 'property: components.material.material.color; type: color; to: #383838; dur: 200')
      }
    };

    el.addEventListener('click', vrMusicToggle);
  }
});