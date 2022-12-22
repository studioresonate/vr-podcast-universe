AFRAME.registerComponent('vrtoggle', {

  init: function () {
    const el = this.el;
    const headset = AFRAME.utils.device.checkHeadsetConnected()
    const mobile = AFRAME.utils.device.isMobile()
    const vrbutton = document.querySelector('#EnterVRButton')

    if (headset === false && mobile === false) {
      // desktop
      el.setAttribute('vr-mode-ui', 'enabled: false')
    } else {
      // headset
      vrbutton.setAttribute('style', 'display:block')
    }
  }
});