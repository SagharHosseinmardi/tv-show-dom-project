//You can edit ALL of the code here
// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.innerHTML = `${episodeList.name} S0${episodeList.season}E0${episodeList.number} <img src="${episodeList.image.medium}"> ${episodeList.summary}`;
// }

// const rootElem = document.getElementById("root");

// function makePageForEpisodes(episodeList) {
//   for (let i = 0; i < episodeList.length; i++) {
//     const episode = episodeList[i];

//     const divEl = `<div><h3>${episode.name}</h3></div>
//     <div>S0${episode.season}E0${episode.number}</div>
//     <div><img src="${episode.image.medium}"></div>
//     <div>${episode.summary}</div>`;
//     rootElem.innerHTML += divEl;
//   }
// }

// window.onload = setup;
//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  // makePageForEpisodes(allEpisodes);
  displayEpisodes(allEpisodes);
}
// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }
window.onload = setup;
let list = document.createElement("ul");

function displayEpisodes(episodes) {
  episodes.forEach((episode) => {
    let li = document.createElement("li");
    let title = document.createElement("h1");
    let images = document.createElement("img");
    let paragraph = document.createElement("p");
    let episodeCode = `S${("0" + episode.season).slice(-2)}E${(
      "0" + episode.number
    ).slice(-2)}`;

    title.innerHTML = `${episode.name} - ${episodeCode}`;
    images.src = episode.image.medium;
    paragraph.innerHTML = episode.summary;

    document.body.appendChild(list);
    list.appendChild(li);
    li.appendChild(title);
    li.appendChild(images);
    li.appendChild(paragraph);
  });
}
