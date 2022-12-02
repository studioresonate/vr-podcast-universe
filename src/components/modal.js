AFRAME.registerComponent("closemodal", {
  init: function () {
    this.el.addEventListener("click", () => {
      const videoEl = document.querySelector('.vidEl')
      const podcastmodal = document.querySelector('.podcastModal');
      const modalvideo = document.querySelector('.modalvideo')
      if (videoEl) {
        videoEl.pause()
        videoEl.setAttribute('src', ' ')
        videoEl.remove()
      }
      modalvideo.setAttribute('src', '')
      modalvideo.setAttribute('visible', false)
      // podcastmodal.remove()
      podcastmodal.setAttribute('animation', 'property: scale; from: 1 1 1; to: 1 0 1; loop: false; easing:easeOutCubic; dur: 90')
      setTimeout(() => {
        podcastmodal.setAttribute('position', '0 300 -3')
      }, 200);
    })
  },
  remove() {
    // once i'm removed, the video is going down too
    // document.querySelector('.modalvideo').setAttribute('src', ' ')
  }
})