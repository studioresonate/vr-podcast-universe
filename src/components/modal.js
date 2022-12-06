AFRAME.registerComponent("closemodal", {
  init: function () {
    this.el.addEventListener("click", () => {
      const videoEl = document.querySelector('.vidEl')
      const podcastmodal = document.querySelector('.podcastModal');
      const modalvideo = document.querySelector('.modalvideo')
      const modalBg = document.querySelector('#bgModal')

      if (videoEl) {
        videoEl.pause()
        videoEl.setAttribute('src', ' ')
        videoEl.remove()
      }
      modalvideo.setAttribute('src', '')
      modalvideo.setAttribute('visible', false)
      // podcastmodal.remove()
      podcastmodal.setAttribute('animation', 'property: scale; from: 1 1 1; to: 0.5 0 0.5; loop: false; easing:easeInCubic; dur: 200')
      setTimeout(() => {
        modalBg.setAttribute('animation', 'property: scale; from: 1 1 1; to: 0.6 0.6 0.6; loop: false; easing:easeOutExpo; dur: 300')
        modalBg.setAttribute('animation__1', 'property: opacity; from: 0.4; to: 0; loop: false; easing:easeOutExpo; dur: 300')
        modalBg.setAttribute('animation__2', 'property: rotation; from: 0 0 0; to: 0 -90 0; loop: false; easing:easeOutExpo; dur: 350')
        podcastmodal.setAttribute('position', '0 300 -3')
      }, 100);
    })
  },
  remove() {
    // once i'm removed, the video is going down too
    // document.querySelector('.modalvideo').setAttribute('src', ' ')
  }
})