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
function generateRandom(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return (num >= -4 && num <= 4) ? generateRandom(min, max) : num;
}

const renderItems = (podcasts) => {
  const modaltitle = document.querySelector('.modaltitle');
  const modalhosts = document.querySelector('.modalhosts');
  const modalart = document.querySelector('.modalart');
  const modaldesc = document.querySelector('.modaldesc');
  const modalvideo = document.querySelector('.modalvideo');
  const podcastmodal = document.querySelector('.podcastModal');

  const podcastHolder = document.querySelector("[data-items]");
  const podcastAssetHolder = document.querySelector("[data-assets]");

  // const modal = document.querySelector("[data-modal]");

  podcasts.forEach((podcast) => {

    const newItemEl = document.createElement('a-entity');

    let cleanCats = `${podcast.category}`
    cleanCats = cleanCats.replace(/\s+/g, '-').toLowerCase().replaceAll(',', ' ');

    newItemEl.setAttribute("position", {
      x: generateRandom(-40, 40),
      y: generateRandom(-10, 5),
      z: generateRandom(-10, 10)
    });
    // document.querySelector('a-assets').addEventListener('loaded', function () {
    //   console.log("OK LOADED");
    // });

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
          animation="property: rotation; to: 0 360 0; loop: true; easing:linear; dur: 10000"
          material="shader:phong; reflectivity: 0.9; shininess: 30;"
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

    podcastmodal.setAttribute('position', '0 300 -3')


    newItemEl.addEventListener('mouseup', () => {
      const closemodal = document.querySelector('.closemodal');
      const videoEl = document.querySelector('.vidEl')
      podcastmodal.setAttribute('position', '0 2 -5.5')

      if (podcast.videoPreview) {
        podcastAssetHolder.insertAdjacentHTML("beforeend", `
          <video
            id="vid-${podcast.sys.id}"
            class="vidEl"
            src=${podcast.videoPreview.url}
            crossOrigin="anonymous"
            autoplay
            >
          </video>
        `)
        document.querySelector(`#vid-${podcast.sys.id}`).play()
      }

      const podDesc = documentToPlainTextString(podcast.description.json)

      const truncateString = (str, max = 50) => {
        const array = str.trim().split(' ');
        const ellipsis = array.length > max ? '...' : '';

        return array.slice(0, max).join(' ') + ellipsis;
      };



      // Hide video plane if no video available
      podcast.videoPreview ? modalvideo.setAttribute('visible', true) : modalvideo.setAttribute('visible', false)
      // Modal podcast artwork positioning and size for when there is a video, or no video
      podcast.videoPreview ? setAttributes(modalart, { 'src': `#${podcast.sys.id}`, 'position': '-2.7 -3.2 0', 'height': '1.6', 'width': '1.6' })
        : setAttributes(modalart, { 'src': `#${podcast.sys.id}`, 'position': '-4 1 0', 'height': '3', 'width': '3' })
      // Modal podcast title positioning and size for when there is a video, or no video
      podcast.videoPreview ? setAttributes(modaltitle, { 'value': podcast.podcastTitle, 'position': '-1.6 -2.8 0', 'width': '5', 'wrap-pixels': '400' })
        : setAttributes(modaltitle, { 'value': podcast.podcastTitle, 'position': '-2 2.5 0', 'width': '8', 'wrap-pixels': '800' })
      // Modal podcast description positioning and size for when there is a video, or no video
      podcast.videoPreview ? setAttributes(modaldesc, { 'value': truncateString(podDesc), 'position': '3.93 1.18 0', 'rotation': '0 -16 0', 'width': '4' })
        : setAttributes(modaldesc, { 'value': truncateString(podDesc), 'position': '-2 1.42 0', 'width': '6.5', 'rotation': '0 0 0' })
      // Modal podcast hosts positioning and size for when there is a video, or no video
      podcast.videoPreview ? setAttributes(modalhosts, { 'value': `${podcast.hostNames ? `HOSTS: ${podcast.hostNames}` : ""}`, 'position': '3.9 1.67 0', 'rotation': '0 -16 0', 'width': '5' })
        : setAttributes(modalhosts, { 'value': `${podcast.hostNames ? `HOSTS: ${podcast.hostNames}` : ""}`, 'position': '-5.5 -0.68 0', 'width': '2.8', 'rotation': '0 0 0' })
      // Modal podcast close button positioning for when there is a video, or no video
      podcast.videoPreview ? setAttributes(closemodal, { 'position': '-3.6 2 0.05' })
        : setAttributes(closemodal, { 'position': '-5.6 2.56 0.05' })

      // modaldesc.setAttribute('value', podcast.description.json)
      // (videoEl != null) ? videoEl.pause() : ' ';
      // pause if there's a video
      if (videoEl != null) {
        videoEl.pause()
      }
      // load video in asset management before applying to plane.. should probably fix this
      setTimeout(() => {
        if (podcast.videoPreview) {
          modalvideo.setAttribute('src', `#vid-${podcast.sys.id}`)
        }
      }, 600);

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

  // TODO: optimize these

  const filterAll = () => {
    all.forEach(function (e) {
      e.setAttribute('animation', scaleIn)
    });
    btn.forEach(function (e) {
      e.classList.remove('active')
    });
    allBtn.classList.add('active')

    vrBtn.forEach(function (e) {
      e.setAttribute('color', 'white')
      e.setAttribute('material', 'opacity: 0.3; transparent: true')
    });
    vrAllBtn.setAttribute('color', '#0051e6')
    vrAllBtn.setAttribute('material', 'opacity: 1; transparent: false')
  }

  const removeAll = () => {
    all.forEach(function (e) {
      e.setAttribute('animation', scaleOut)
    });
    btn.forEach(function (e) {
      e.classList.remove('active')
    });
    vrBtn.forEach(function (e) {
      e.setAttribute('color', 'white')
      e.setAttribute('material', 'opacity: 0.3; transparent: true')
    });
  }

  const filterSociety = () => {
    removeAll()
    society.forEach(function (e) {
      e.setAttribute('animation', scaleIn)
    });
    societyBtn.classList.add('active')
    vrSocietyBtn.setAttribute('color', '#0051e6')
    vrSocietyBtn.setAttribute('material', 'opacity: 1; transparent: false')
  }

  const filterComedy = () => {
    removeAll()
    comedy.forEach(function (e) {
      e.setAttribute('animation', scaleIn)
    });
    comedyBtn.classList.add('active')
    vrComedyBtn.setAttribute('color', '#0051e6')
    vrComedyBtn.setAttribute('material', 'opacity: 1; transparent: false')
  }

  const filterTrueCrime = () => {
    removeAll()
    truecrime.forEach(function (e) {
      e.setAttribute('animation', scaleIn)
    });
    truecrimeBtn.classList.add('active')
    vrTrueCrimeBtn.setAttribute('color', '#0051e6')
    vrTrueCrimeBtn.setAttribute('material', 'opacity: 1; transparent: false')
  }

  const filterNews = () => {
    removeAll()
    news.forEach(function (e) {
      e.setAttribute('animation', scaleIn)
    });
    newsBtn.classList.add('active')
    vrNewsBtn.setAttribute('color', '#0051e6')
    vrNewsBtn.setAttribute('material', 'opacity: 1; transparent: false')
  }

  const filterBusiness = () => {
    removeAll()
    business.forEach(function (e) {
      e.setAttribute('animation', scaleIn)
    });
    businessBtn.classList.add('active')
    vrBusinessBtn.setAttribute('color', '#0051e6')
    vrBusinessBtn.setAttribute('material', 'opacity: 1; transparent: false')
  }

  const filterSports = () => {
    removeAll()
    sports.forEach(function (e) {
      e.setAttribute('animation', scaleIn)
    });
    sportsBtn.classList.add('active')
    vrSportsBtn.setAttribute('color', '#0051e6')
    vrSportsBtn.setAttribute('material', 'opacity: 1; transparent: false')
  }

  const filterTvFilm = () => {
    removeAll()
    tvfilm.forEach(function (e) {
      e.setAttribute('animation', scaleIn)
    });
    tvfilmBtn.classList.add('active')
    vrTvfilmBtn.setAttribute('color', '#0051e6')
    vrTvfilmBtn.setAttribute('material', 'opacity: 1; transparent: false')
  }

  const filterOther = () => {
    removeAll()
    other.forEach(function (e) {
      e.setAttribute('animation', scaleIn)
    });
    otherBtn.classList.add('active')
    vrOtherBtn.setAttribute('color', '#0051e6')
    vrOtherBtn.setAttribute('material', 'opacity: 1; transparent: false')
  }

  allBtn.addEventListener('click', filterAll)
  societyBtn.addEventListener('click', filterSociety)
  comedyBtn.addEventListener('click', filterComedy)
  truecrimeBtn.addEventListener('click', filterTrueCrime)
  newsBtn.addEventListener('click', filterNews)
  businessBtn.addEventListener('click', filterBusiness)
  sportsBtn.addEventListener('click', filterSports)
  tvfilmBtn.addEventListener('click', filterTvFilm)
  otherBtn.addEventListener('click', filterOther)


  // VR Filters

  vrAllBtn.addEventListener('click', filterAll)
  vrSocietyBtn.addEventListener('click', filterSociety)
  vrComedyBtn.addEventListener('click', filterComedy)
  vrTrueCrimeBtn.addEventListener('click', filterTrueCrime)
  vrNewsBtn.addEventListener('click', filterNews)
  vrBusinessBtn.addEventListener('click', filterBusiness)
  vrSportsBtn.addEventListener('click', filterSports)
  vrTvfilmBtn.addEventListener('click', filterTvFilm)
  vrOtherBtn.addEventListener('click', filterOther)

  // vrBtn.addEventListener('mouseenter', () => {

  // })

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
const children = document.querySelectorAll('.filter-btn')
const menuico = document.querySelector('.menu-ico')

function delayClass(className, index) {
  if (typeof index === 'undefined') {
    index = 0
  }

  if (children.length > index) {
    children[index].classList.toggle(className)
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

function musicToggle() {
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