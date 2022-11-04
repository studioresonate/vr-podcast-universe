AFRAME.registerComponent("closemodal", {
  init: function () {
    this.el.addEventListener("click", () => {
      const videoEl = document.querySelector('.vidEl')
      const podcastmodal = document.querySelector('.podcastModal');
      if (videoEl) {
        videoEl.pause()
        videoEl.setAttribute('src', ' ')
        videoEl.remove()
      }
      // podcastmodal.remove()
      podcastmodal.setAttribute('position', '0 300 -3')
    })
  },
  remove() {
    // once i'm removed, the video is going down too
    // document.querySelector('.modalvideo').setAttribute('src', ' ')
  }
})