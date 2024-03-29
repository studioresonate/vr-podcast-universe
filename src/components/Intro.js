AFRAME.registerComponent('introcontrol', {
  init() {
    this.el.object3D.position.set(0, 1.6, 480);
    const intro = document.querySelector('#intro');
    const sun = document.querySelector('#sun');
    const menu = document.querySelector('.menu-ico');
    const mainmenu = document.querySelector('.mainmenu');
    const vrmenu = document.querySelector('#vr-ico-menu')
    const rocket1Container = document.querySelector('#rocket1Container')
    const rocket2Container = document.querySelector('#rocket2Container')
    const rocketone = document.querySelector('#rocketone');
    const rockettwo = document.querySelector('#rockettwo');
    const outerstars = document.querySelector('#stars2')

    const headset = AFRAME.utils.device.checkHeadsetConnected()
    const mobile = AFRAME.utils.device.isMobile()



    if (headset === true && mobile === false) {
      intro.setAttribute('src', '#txtintro-headset')
      // console.log("You're on a headset " + headset);
      // console.log("You're on mobile " + mobile);
    } else if (headset === false && mobile === true) {
      intro.setAttribute('src', '#txtintro-mobile')
      mainmenu.classList.add('mobile')
      // console.log("You're on a headset " + headset);
      // console.log("You're on mobile " + mobile);
    } else {
      intro.setAttribute('src', '#txtintro-desktop')
      // console.log("Desktop");
      // console.log("You're on a headset " + headset);
      // console.log("You're on mobile " + mobile);
    }


    intro.addEventListener('click', () => {
      this.el.setAttribute('animation', 'property: position; to: 0 0 35; dur: 8500; easing: easeInOutCubic;')

      intro.setAttribute('animation', 'property: position; to: 0 0 35; easing:easeInOutCubic; dur: 2000')

      rocketone.setAttribute('animation', 'property: rotation; from: 10 190 90; to: 60 0 0; loop: true; easing:linear; dur: 4200')
      rocketone.setAttribute('sound', 'src: #rocket; loop: true; volume: 13; autoplay: true; refDistance: 0.05; rolloffFactor: 0.5')

      rockettwo.setAttribute('sound', 'src: #rocket; loop: true; volume: 13; autoplay: true; refDistance: 0.05; rolloffFactor: 0.5')

      rocket1Container.setAttribute('animation', 'property: rotation; from: 0 -360 0; to: 0 0 0; loop: true; easing: linear; dur: 250000')
      rocket2Container.setAttribute('animation', 'property: rotation; from: 0 0 0; to: 0 -360 0; loop: true; easing: linear; dur: 23000')

      sun.setAttribute('mixin', 'bgmusic-on')

      dataLayer.push({ 'event': 'click_intro' })
      // random asteroids





      setTimeout(() => {
        menu.classList.add('fadeIn')
        vrmenu.setAttribute('position', '0.03 0.15 -0.02')
        rocketone.setAttribute('sound', 'src: #rocket; loop: false; volume: 0;')
        rockettwo.setAttribute('sound', 'src: #rocket; loop: false; volume: 0;')
        rocketone.setAttribute('animation', 'property: rotation; from: 360 -360 0; to: 0 0 0; loop: true; easing:linear; dur: 30000')
        rocket1Container.setAttribute('animation', 'property: rotation; from: 20 -360 0; to: 0 0 0; loop: true; easing: linear; dur: 250000')
        outerstars.setAttribute('visible', false)
        this.el.setAttribute('movement-controls', 'enabled: true')
      }, 8500);

      setTimeout(() => {
        rocket2Container.setAttribute('animation__1', 'property: position; from: 110 0 0; to: 0 0 0; loop: false; easing: easeInOutQuad; dur: 2000')
        rockettwo.setAttribute('animation__1', 'property: position; from: 100 0 120; to: 100 0 420; loop: false; easing: easeInOutQuad; dur: 4000')
      }, 7000);

      setTimeout(() => {
        rocket2Container.setAttribute('animation', 'property: rotation; from: 0 167 0; to: 0 -167 0; loop: true; easing: linear; dur: 250000')
      }, 12000);
    })
  },
});