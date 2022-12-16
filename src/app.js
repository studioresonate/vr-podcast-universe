import "./style.css";
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer/dist/rich-text-plain-text-renderer.es5.js';

const endpoint = "https://graphql.contentful.com/content/v1/spaces/" + process.env.SPACE_ID;

const query = `{
  podcastCollection {
    items {
      slug
      sys {
        id
        publishedAt
        environmentId
      }
      description {
        json
      }
      hostNames
      podcastTitle
      coverArt {
        fileName
        url
        width
        height
      }
      videoPreview {
        title
        fileName
        url
      }
      listenUrl
      category
    }
  }
}`;

const fetchOptions = {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.CONTENT_DELIVERY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query }),
};

// attribute helper
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// generate random position with offset for the sun
function generateRandomOffset(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return (num >= -4 && num <= 4) ? generateRandomOffset(min, max) : num;
}

// generate random position with no offset
function generateRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const renderItems = (podcasts) => {
  const modaltitle = document.querySelector('.modaltitle');
  const modalhosts = document.querySelector('.modalhosts');
  const modalart = document.querySelector('.modalart');
  const modaldesc = document.querySelector('.modaldesc');
  const modalvideo = document.querySelector('.modalvideo');
  const modallisten = document.querySelector('.listen')
  const podcastmodal = document.querySelector('.podcastModal');

  const podcastHolder = document.querySelector("[data-items]");
  const podcastAssetHolder = document.querySelector("[data-assets]");
  const modalContainer = document.querySelector('#modalContainer').object3D

  const camera = document.querySelector('[camera]').object3D

  const headset = AFRAME.utils.device.checkHeadsetConnected()
  const mobile = AFRAME.utils.device.isMobile()

  // const modal = document.querySelector("[data-modal]");
  let count = 0
  let id;

  const asteroidInterval = () => {
    // assign setInterval's result
    id = setInterval(function () {
      asteroid()
    }, 20000)
  }

  const asteroid = () => {
    const random = (min, max) => Math.random() * (max - min) + min;
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

  asteroidInterval()

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // console.log('Hidden');
      clearInterval(id)
    } else {
      // console.log('Visible');
      asteroidInterval()
    }
  });

  // pick a random rotation duration
  const podcastRotation = [6000, 9000, 10000, 20000]


  podcasts.forEach((podcast) => {
    // console.log(podcast.listenUrl);
    const newItemEl = document.createElement('a-entity');

    let cleanCats = `${podcast.category}`
    cleanCats = cleanCats.replace(/\s+/g, '-').toLowerCase().replaceAll(',', ' ');

    newItemEl.setAttribute("position", {
      x: generateRandomOffset(-50, 50),
      y: generateRandom(-10, 10),
      z: generateRandomOffset(-50, 50)
    });
    // document.querySelector('a-assets').addEventListener('loaded', function () {
    //   console.log("OK LOADED");
    // });
    const podcastRandom = Math.floor(Math.random() * podcastRotation.length);
    // console.log(podcastRotation[podcastRandom]);

    newItemEl.innerHTML = `
      <a-entity class="podcastEl ${cleanCats}">
        <a-box
          podcasthover
          width="1"
          height="1"
          depth="1"
          rotation="0 0 0"
          class="clickable ${podcast.slug}"
          id="#${podcast.sys.id}"
          src="#${podcast.sys.id}"
          sound="src: #click2; on: click; positional: false; volume: 0.1;"
          animation="property: rotation; to: 0 360 0; loop: true; easing:linear; dur: ${podcastRotation[podcastRandom]}"
          >
        </a-box>
        <a-text
          look-at="[camera]"
          position="0 -0.8 0"
          scale="2 2"
          align="center"
          width="2"
          value="${podcast.podcastTitle}"
          line-height="60"
          color="white"
          baseline="top"
        >
        </a-text>
      </a-entity>
    `


    newItemEl.addEventListener('mouseup', () => {
      // count used to subvert inadvertant caching of video
      count++
      const closemodal = document.querySelector('.closemodal');
      const videoEl = document.querySelector('.vidEl')
      const modalBg = document.querySelector('#bgModal')

      podcastmodal.setAttribute('animation', 'property: scale; from: 0.9 0.9 0.9; to: 1 1 1; loop: false; easing:easeOutCubic; dur: 100')

      setAttributes(modalBg, {
        'animation': 'property: scale; from: 0 0 0; to: 1 1 1; loop: false; easing:easeOutCubic; dur: 200',
        'animation__1': 'property: opacity; from: 0; to: 0.4; loop: false; easing:easeOutExpo; dur: 200',
        'animation__2': 'property: rotation; from: 0 90 0; to: 0 0 0; loop: false; easing:easeOutExpo; dur: 300'
      })

      // set modal to face camera direction
      modalContainer.el.object3D.rotation.y = JSON.stringify(camera.rotation.y)
      // console.log(modalContainer.el.object3D.rotation.y);



      if (headset === true && mobile === false) {
        // headset
        podcastmodal.setAttribute('position', '0 0 -10.5')
        // modalBg.setAttribute('position', '0 1 -11')
      } else if (headset === false && mobile === true) {
        // mobile
        podcastmodal.setAttribute('position', '0 0 -10.5')
        // modalBg.setAttribute('position', '0 1 -11')
      } else {
        // desktop
        podcastmodal.setAttribute('position', '0 0 -7.5')
      }


      const truncateString = (str, max = 50) => {
        const array = str.trim().split(' ');
        const ellipsis = array.length > max ? '...' : '';
        return array.slice(0, max).join(' ') + ellipsis;
      };

      // values
      modalart.setAttribute('src', `#${podcast.sys.id}`)
      modaltitle.setAttribute('value', podcast.podcastTitle)
      const podDesc = documentToPlainTextString(podcast.description?.json)
      podcast.description ? modaldesc.setAttribute('value', truncateString(podDesc)) : modaldesc.setAttribute('value', 'Description coming soon!')
      // podcast.hostNames ? modalhosts.setAttribute('value', `HOSTS:\n${podcast.hostNames.join("\n")}`) :
      //   modalhosts.setAttribute('value', "")
      // podcast.listenUrl ? modallisten.setAttribute('data-link', `url: ${podcast.listenUrl}`) : modallisten.setAttribute('data-link', "")

      // podcast.listenUrl ? setAttributes(modallisten, { 'data-link': `url: ${podcast.listenUrl}`, 'visible': true }) :
      //   setAttributes(modallisten, { 'data-link': ` `, 'visible': false })

      if (podcast.listenUrl && headset === true && mobile === false) {
        setAttributes(modallisten, { 'data-link': ` `, 'visible': false })
      } else {
        setAttributes(modallisten, { 'data-link': `url: ${podcast.listenUrl}`, 'visible': true })
      }

      // positioning

      // NO VIDEO
      //if listen with hosts
      //if no listen with hosts
      //if no listen with no hosts
      //if listen with no hosts

      // WITH VIDEO
      //if listen with hosts
      //if no listen with hosts
      //if no listen with no hosts
      //if listen with no hosts

      // podcast.listenUrl ? modallisten.setAttribute('visible', true) : modallisten.setAttribute('visible', false)

      if (podcast.videoPreview) {
        modalvideo.setAttribute('visible', true)
        podcastAssetHolder.insertAdjacentHTML("beforeend", `
          <video
            id="vid-${podcast.sys.id}-${count}"
            class="vidEl"
            src=${podcast.videoPreview.url}
            crossOrigin="anonymous"
            autoplay
            >
          </video>
        `)
        setTimeout(() => {
          document.querySelector(`#vid-${podcast.sys.id}-${count}`).play()
        }, 200);

        setAttributes(modalart, { 'position': '-2.7 -3.2 0', 'height': '1.6', 'width': '1.6' })
        setAttributes(modaltitle, { 'position': '-1.6 -2.8 0', 'width': '5', 'wrap-pixels': '400' })
        setAttributes(modaldesc, { 'position': '3.93 1.18 0', 'rotation': '0 -16 0', 'width': '4' })
        setAttributes(modalhosts, { 'position': '3.9 1.67 0', 'rotation': '0 -16 0', 'width': '5' })
        setAttributes(closemodal, { 'position': '-3.6 2 0.05' })
        if (headset === true && mobile === false) {
          setAttributes(modalBg, { 'position': '2.06 -0.9 -11.8', 'height': '8', 'width': '10' })
        } else {
          setAttributes(modalBg, { 'position': '3 -0.5 -11.8', 'height': '8', 'width': '15' })
        }

        // if there's a listen button with a video, do this
        podcast.listenUrl ? setAttributes(modallisten, { 'position': '2.4 1.72 0.01', 'scale': '0.75 0.75 0.75' }) :
          setAttributes(modallisten, { 'scale': '0 0 0' })

        podcast.hostNames ? modalhosts.setAttribute('value', `HOSTS: ${podcast.hostNames.join(", ")}`) :
          modalhosts.setAttribute('value', "")

      } else {
        modalvideo.setAttribute('visible', false)
        setAttributes(modalart, { 'position': '-4 1 0', 'height': '3', 'width': '3' })
        setAttributes(modaltitle, { 'position': '-2 2.5 0', 'width': '8', 'wrap-pixels': '800' })
        setAttributes(modaldesc, { 'position': '-2 1.42 0', 'width': '6.5', 'rotation': '0 0 0' })
        setAttributes(closemodal, { 'position': '-5.6 2.56 0.05' })

        if (headset === true && mobile === false) {
          setAttributes(modalBg, { 'position': '-0.250 0.6 -11.8', 'height': '6', 'width': '10' })
        } else {
          setAttributes(modalBg, { 'position': '-0.250 1.4 -11.8', 'height': '7', 'width': '11' })
        }

        // if no video with no listen button and hosts OR headset, do this
        if (!podcast.listenUrl && podcast.hostNames) {
          setAttributes(modalhosts, { 'position': '-5.5 -0.8 0', 'width': '5', 'lineHeight': '50', 'wrapCount': '9', 'rotation': '0 0 0', 'baseline': 'top' })
        }

        podcast.hostNames ? modalhosts.setAttribute('value', `HOSTS:\n${podcast.hostNames.join("\n")}`) :
          modalhosts.setAttribute('value', "")

        podcast.listenUrl ? setAttributes(modallisten, { 'position': '-4 -0.93 0.01', 'scale': '1.16 1.16 1.16' }) :
          setAttributes(modallisten, { 'scale': '0 0 0' })

        if (podcast.listenUrl && podcast.hostNames) {
          setAttributes(modallisten, { 'position': '-4 -0.93 0.01', 'scale': '1.16 1.16 1.16' })

          if (headset === true && mobile === false) {
            // modalhosts.setAttribute('position', '-5.5 -0.8 0')
            setAttributes(modalhosts, { 'position': '-5.5 -0.8 0', 'scale': '1 1 1', 'width': '5', 'lineHeight': '50', 'wrapCount': '9', 'baseline': 'top', 'rotation': '0 0 0' })
          } else {
            setAttributes(modalhosts, { 'position': '-5.5 -1.6 0', 'scale': '1 1 1', 'width': '5', 'lineHeight': '50', 'wrapCount': '9', 'baseline': 'top', 'rotation': '0 0 0' })
          }
        }
      }







      // modaldesc.setAttribute('value', podcast.description.json)
      // (videoEl != null) ? videoEl.pause() : ' ';
      // pause if there's a video
      if (videoEl != null) {
        videoEl.pause()
      }
      // load video in asset management before applying to plane.. should probably fix this
      setTimeout(() => {
        if (podcast.videoPreview) {
          setAttributes(modalvideo, { 'src': `#vid-${podcast.sys.id}-${count}`, 'visible': true })
        }
      }, 600);

      dataLayer.push({ 'event': 'click_podcast', 'podcastTitle': podcast.podcastTitle })

    })

    podcastHolder.appendChild(newItemEl);

  });


  // Desktop Filter
  const all = document.querySelectorAll('.podcastEl');

  const society = document.querySelectorAll('.society-and-culture');
  const comedy = document.querySelectorAll('.comedy');
  const truecrime = document.querySelectorAll('.true-crime');
  const news = document.querySelectorAll('.news');
  const business = document.querySelectorAll('.business');
  const sports = document.querySelectorAll('.sports');
  const tvfilm = document.querySelectorAll('.tv-and-film');
  const other = document.querySelectorAll('.other');

  const allBtn = document.querySelector('.all-filter');
  const btn = document.querySelectorAll('.filter-btn');
  const societyBtn = document.querySelector('.society-filter');
  const comedyBtn = document.querySelector('.comedy-filter');
  const truecrimeBtn = document.querySelector('.truecrime-filter');
  const newsBtn = document.querySelector('.news-filter');
  const businessBtn = document.querySelector('.business-filter');
  const sportsBtn = document.querySelector('.sports-filter');
  const tvfilmBtn = document.querySelector('.tvfilm-filter');
  const otherBtn = document.querySelector('.other-filter');

  const vrAllBtn = document.querySelector('.vr-all-filter');
  const vrBtn = document.querySelectorAll('.vr-btn-filter');
  const vrSocietyBtn = document.querySelector('.vr-society-filter');
  const vrComedyBtn = document.querySelector('.vr-comedy-filter');
  const vrTrueCrimeBtn = document.querySelector('.vr-true-crime-filter');
  const vrNewsBtn = document.querySelector('.vr-news-filter');
  const vrBusinessBtn = document.querySelector('.vr-business-filter');
  const vrSportsBtn = document.querySelector('.vr-sports-filter');
  const vrTvfilmBtn = document.querySelector('.vr-tv-film-filter');
  const vrOtherBtn = document.querySelector('.vr-other-filter');

  allBtn.insertAdjacentHTML('beforeend', `<span>${all.length}</span>`)
  societyBtn.insertAdjacentHTML('beforeend', `<span>${society.length}</span>`)
  comedyBtn.insertAdjacentHTML('beforeend', `<span>${comedy.length}</span>`)
  truecrimeBtn.insertAdjacentHTML('beforeend', `<span>${truecrime.length}</span>`)
  newsBtn.insertAdjacentHTML('beforeend', `<span>${news.length}</span>`)
  businessBtn.insertAdjacentHTML('beforeend', `<span>${business.length}</span>`)
  sportsBtn.insertAdjacentHTML('beforeend', `<span>${sports.length}</span>`)
  tvfilmBtn.insertAdjacentHTML('beforeend', `<span>${tvfilm.length}</span>`)
  otherBtn.insertAdjacentHTML('beforeend', `<span>${other.length}</span>`)



  const scaleOut = `property: scale; to: 0 0 0; dur: 400; easing: easeInBack;`
  const scaleIn = `property: scale; to: 1 1 1; dur: 200; easing: easeInBack;`

  const filterAll = () => {
    all.forEach(function (e) {
      e.setAttribute('animation', scaleIn)
    });
    btn.forEach(function (e) {
      e.classList.remove('active')
    });
    allBtn.classList.add('active')

    vrBtn.forEach(function (e) {
      setAttributes(e, { 'color': 'white', 'material': 'opacity: 0.3; transparent: true' })
    });
    setAttributes(vrAllBtn, { 'color': '#0051e6', 'material': 'opacity: 1; transparent: false' })
  }

  const removeAll = () => {
    all.forEach(function (e) {
      e.setAttribute('animation', scaleOut)
    });
    btn.forEach(function (e) {
      e.classList.remove('active')
    });
    vrBtn.forEach(function (e) {
      setAttributes(e, { 'color': 'white', 'material': 'opacity: 0.3; transparent: true' })
    });
  }

  const handleBtnEvent = (cat, btn, vrBtn) => {
    removeAll()
    cat.forEach(function (e) {
      e.setAttribute('animation', scaleIn)
    });
    btn.classList.add('active')
    setAttributes(vrBtn, { 'color': '#0051e6', 'material': 'opacity: 1; transparent: false' })
  }

  allBtn.addEventListener('click', filterAll)
  societyBtn.addEventListener('click', () => {
    handleBtnEvent(society, societyBtn, vrSocietyBtn)
  })
  comedyBtn.addEventListener('click', () => {
    handleBtnEvent(comedy, comedyBtn, vrComedyBtn)
  })
  truecrimeBtn.addEventListener('click', () => {
    handleBtnEvent(truecrime, truecrimeBtn, vrTrueCrimeBtn)
  })
  newsBtn.addEventListener('click', () => {
    handleBtnEvent(news, newsBtn, vrNewsBtn)
  })
  businessBtn.addEventListener('click', () => {
    handleBtnEvent(business, businessBtn, vrBusinessBtn)
  })
  sportsBtn.addEventListener('click', () => {
    handleBtnEvent(sports, sportsBtn, vrSportsBtn)
  })
  tvfilmBtn.addEventListener('click', () => {
    handleBtnEvent(tvfilm, tvfilmBtn, vrTvfilmBtn)
  })
  otherBtn.addEventListener('click', () => {
    handleBtnEvent(other, otherBtn, vrOtherBtn)
  })


  // VR Filters

  vrAllBtn.addEventListener('click', filterAll)
  vrSocietyBtn.addEventListener('click', () => {
    handleBtnEvent(society, societyBtn, vrSocietyBtn)
  })
  vrComedyBtn.addEventListener('click', () => {
    handleBtnEvent(comedy, comedyBtn, vrComedyBtn)
  })
  vrTrueCrimeBtn.addEventListener('click', () => {
    handleBtnEvent(truecrime, truecrimeBtn, vrTrueCrimeBtn)
  })
  vrNewsBtn.addEventListener('click', () => {
    handleBtnEvent(news, newsBtn, vrNewsBtn)
  })
  vrBusinessBtn.addEventListener('click', () => {
    handleBtnEvent(business, businessBtn, vrBusinessBtn)
  })
  vrSportsBtn.addEventListener('click', () => {
    handleBtnEvent(sports, sportsBtn, vrSportsBtn)
  })
  vrTvfilmBtn.addEventListener('click', () => {
    handleBtnEvent(tvfilm, tvfilmBtn, vrTvfilmBtn)
  })
  vrOtherBtn.addEventListener('click', () => {
    handleBtnEvent(other, otherBtn, vrOtherBtn)
  })


  // Asset management
  podcasts.forEach((podcast) => {
    podcastAssetHolder.insertAdjacentHTML("beforeend", `
      <img crossorigin="anonymous" id=${podcast.sys.id} src=${podcast.coverArt.url}?fit=scale&amp;w=250&amp;h=250&amp;q=75 />
    `)
  });


};

fetch(endpoint, fetchOptions)
  .then((response) => response.json())
  .then((data) => renderItems(data.data.podcastCollection.items));


const sun = document.querySelector('#sun');
// desktop and mobile filter
const filterBtn = document.querySelectorAll('.filter-btn')
const menuico = document.querySelector('.menu-ico')

function delayClass(className, index) {
  if (typeof index === 'undefined') {
    index = 0
  }

  if (filterBtn.length > index) {
    filterBtn[index].classList.toggle(className)
    setTimeout(() => {
      delayClass(className, index + 1)
    }, 50);
  }
};




menuico.addEventListener('click', () => {
  delayClass('show')
});

// mute music desktop
let m = document.querySelector('.music');
m.insertAdjacentHTML("beforeend", `<img class='icomusic' src='../assets/ico-music-on.svg' alt='Music on' />`)

const musicToggle = () => {
  if (sun.hasAttribute('music')) {
    sun.setAttribute('mixin', 'bgmusic-on');
    sun.removeAttribute('music');
    m.innerText = "Music on"
    m.insertAdjacentHTML("beforeend", `<img class='icomusic' src='../assets/ico-music-on.svg' alt='Music on' />`)
  } else {
    sun.setAttribute('mixin', 'bgmusic-off');
    sun.setAttribute('music', '1');
    m.innerText = "Music off"
    m.insertAdjacentHTML("beforeend", `<img class='icomusic' src='../assets/ico-music-off.svg' alt='Music off' />`)
  }
};

m.addEventListener('click', musicToggle);