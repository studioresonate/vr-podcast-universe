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

    const asteroid = () => {
      const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
      sun.insertAdjacentHTML('beforeend', `
      <a-circle
        radius="0.2"
        color="white"
        position="${random(-250, 250)} 180 ${random(0, 100)}"
        class="asteroids"
        animation="property: position; to: ${random(-50, 50)} -100 ${random(-250, -50)}; dur: 15000; easing: linear; loop: false"
        trail="color:white; length:300;width:0.3"
        trail__1="color:white; length:240;width:0.3"
        trail__2="color:#39d1ff; length:80;width:0.3"
        trail__3="color:#39d1ff; length:80;width:0.3">
      </a-circle>
      `)
    }


    intro.addEventListener('click', () => {
      this.el.setAttribute('animation', 'property: position; to: 0 0 35; dur: 8500; easing: easeInOutCubic;')

      intro.setAttribute('animation', 'property: position; to: 0 0 35; easing:easeInOutCubic; dur: 2000')

      rocketone.setAttribute('animation', 'property: rotation; from: 10 190 90; to: 60 0 0; loop: true; easing:linear; dur: 4200')
      rocketone.setAttribute('sound', 'src: #rocket; loop: true; volume: 13; autoplay: true; refDistance: 0.05; rolloffFactor: 0.5')

      rockettwo.setAttribute('animation__1', 'property: rotation; from: 25 -10 0; to: 25 30 80; loop: true; easing:linear; dur: 8500')
      // rockettwo.setAttribute('animation', 'property: position; from: 1 1 130; to: 4 2 80; loop: false; easing:linear; dur: 10000')
      rockettwo.setAttribute('sound', 'src: #rocket; loop: true; volume: 13; autoplay: true; refDistance: 0.05; rolloffFactor: 0.5')

      rocket1Container.setAttribute('animation', 'property: rotation; from: 0 -360 0; to: 0 0 0; loop: true; easing: linear; dur: 250000')
      rocket2Container.setAttribute('animation', 'property: rotation; from: 0 360 0; to: 0 0 0; loop: true; easing: linear; dur: 250000')

      sun.setAttribute('mixin', 'bgmusic-on')

      // random asteroids


      asteroid()


      setTimeout(() => {
        menu.classList.add('fadeIn')
        vrmenu.setAttribute('position', '0.03 0.15 -0.02')
        rocketone.setAttribute('sound', 'src: #rocket; loop: false; volume: 0;')
        rockettwo.setAttribute('sound', 'src: #rocket; loop: false; volume: 0;')
        rocketone.setAttribute('animation', 'property: rotation; from: 360 -360 0; to: 0 0 0; loop: true; easing:linear; dur: 30000')
        rockettwo.setAttribute('animation__1', 'property: rotation; from: 0 -360 0; to: 0 0 360; loop: true; easing:linear; dur: 20000')
        rockettwo.setAttribute('animation', 'property: position; from: 1 1 330; to: 4 2 330; loop: false; easing:linear; dur: 10000')
        rocket1Container.setAttribute('animation', 'property: rotation; from: 20 -360 0; to: 0 0 0; loop: true; easing: linear; dur: 250000')
        rocket2Container.setAttribute('animation', 'property: rotation; from: -10 360 0; to: 0 0 0; loop: true; easing: linear; dur: 250000')
      }, 8500);
    })
  },
});