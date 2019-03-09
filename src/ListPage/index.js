import '../reset.css';
import './style.css';

const endPoint = 'https://api-apeast.graphcms.com/v1/cjt0us8481eaa01943b9a2nb4/master';
const listView = document.querySelector('.list');

window.onload = () => {
  const query = `
    {
      profiles {
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
      console.log(json.data.profiles);
      loadList(json.data.profiles);
    });
};

const loadList = (profiles) => {
  let listHTML = '';

  for (const profile of profiles) {
    const { name, picture, introduce } = profile;
    const { url } = picture;

    listHTML += `
    <li class="profile">
      <img alt="프로필 사진" class="picture" src="${url}">
      <div class="profile-wrapper">
        <strong class="name">${name}</strong>
        <span class="introduce">${introduce}</span>
      </div>
    </li>
    `;
  }

  listView.innerHTML = listHTML;

  const profileElements = document.querySelectorAll('.profile');
  for (let i = 0, len = profiles.length; i < len; i += 1) {
    const element = profileElements[i];
    const { id } = profiles[i];

    element.onclick = () => {
      location.href = `/detail?id=${id}`;
    }
  }
};
