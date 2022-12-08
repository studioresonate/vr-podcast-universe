AFRAME.registerComponent('introcontrol', {
  init() {
    this.el.object3D.position.set(0, 1.6, 480);
    const intro = document.querySelector('#intro');
    const sun = document.querySelector('#sun');
    const menu = document.querySelector('.menu-ico');
    const mainmenu = document.querySelector('.mainmenu');
    const vrmenu = document.querySelector('#vr-ico-menu')
    // const camera = document.querySelector('#maincamera');
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
      this.el.setAttribute('animation', 'property: position; to: 0 0 35; dur: 6000; easing: easeInOutCubic;')

      intro.setAttribute('animation', 'property: position; to: 0 0 35; easing:easeInOutCubic; dur: 2000')

      rocketone.setAttribute('animation', 'property: rotation; from: 0 360 0; to: 40 0 0; loop: true; easing:linear; dur: 4200')
      rocketone.setAttribute('sound', 'src: #rocket2; loop: true; volume: 10; autoplay: true; refDistance: 0.05; rolloffFactor: 0.5')

      rockettwo.setAttribute('animation', 'property: rotation; from: 180 360 0; to: 0 0 0; loop: true; easing:linear; dur: 6500')
      rockettwo.setAttribute('sound', 'src: #rocket2; loop: true; volume: 10; autoplay: true; refDistance: 0.05; rolloffFactor: 0.5')

      sun.setAttribute('mixin', 'bgmusic-on')

      // random asteroids


      asteroid()


      setTimeout(() => {
        menu.classList.add('fadeIn')
        vrmenu.setAttribute('position', '0.03 0.15 -0.02')
        rocketone.setAttribute('sound', 'src: #rocket2; loop: false; volume: 0;')
        rockettwo.setAttribute('sound', 'src: #rocket2; loop: false; volume: 0;')
      }, 5000);
    })
  },
});