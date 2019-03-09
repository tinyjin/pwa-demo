import '../reset.css';
import './style.css';

const endPoint = 'https://api-apeast.graphcms.com/v1/cjt0us8481eaa01943b9a2nb4/master';

const pictureElement = document.querySelector('.picture');
const nameElement = document.querySelector('.name');
const introduceElement = document.querySelector('.introduce');

const urlParams = new URLSearchParams(location.search);
const profileId = urlParams.get('id');

window.onload = () => {
  const query = `
    {
      profile(where: { id : "${profileId}" }) {
        id
        name
        picture {url}
        introduce
      }
    }
  `;

  fetch(endPoint,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
    .then(res => res.json())
    .then((json) => {
      console.log(json.data.profile);
      loadProfile(json.data.profile);
    });
};

const loadProfile = (profile) => {
  const { introduce, name, picture } = profile;
  const { url } = picture;

  nameElement.textContent = name;
  introduceElement.textContent = introduce;
  pictureElement.src = url;
};