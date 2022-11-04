AFRAME.registerComponent('introcontrol', {
  init() {
    this.el.object3D.position.set(0, 1.6, 480);
    const intro = document.querySelector('#intro');
    const sun = document.querySelector('#sun');
    const filter = document.querySelector('.filter');
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
      // console.log("You're on a headset " + headset);
      // console.log("You're on mobile " + mobile);
    } else {
      intro.setAttribute('src', '#txtintro-desktop')
      // console.log("Desktop");
      // console.log("You're on a headset " + headset);
      // console.log("You're on mobile " + mobile);
    }

    intro.addEventListener('click', () => {
      this.el.setAttribute('animation', 'property: position; to: 0 0 20; dur: 6000; easing: easeInOutCubic;')

      intro.setAttribute('animation', 'property: position; to: 0 0 20; easing:easeInOutCubic; dur: 2000')

      rocketone.setAttribute('animation', 'property: rotation; from: 0 360 0; to: 40 0 0; loop: true; easing:linear; dur: 4200')
      rocketone.setAttribute('sound', 'src: #rocket2; loop: true; volume: 10; autoplay: true; refDistance: 0.05; rolloffFactor: 0.5')

      rockettwo.setAttribute('animation', 'property: rotation; from: 180 360 0; to: 0 0 0; loop: true; easing:linear; dur: 6500')
      rockettwo.setAttribute('sound', 'src: #rocket2; loop: true; volume: 10; autoplay: true; refDistance: 0.05; rolloffFactor: 0.5')

      sun.setAttribute('sound', 'src: #bgaudio; loop: true; positional: false; volume: 1; autoplay: true; ')
      setTimeout(() => {
        filter.classList.add('fadeIn')
        rocketone.setAttribute('sound', 'src: #rocket2; loop: false; volume: 0;')
        rockettwo.setAttribute('sound', 'src: #rocket2; loop: false; volume: 0;')
      }, 5000);
    })
  },
});