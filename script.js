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
  displayEpisodesWithSearchBox(allEpisodes);
}
// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }
window.onload = setup;

// initial variable (global scope)

let list = document.createElement("ul");
let count = 0;

const select = document.createElement("select");
const allOption = document.createElement("option");
document.body.appendChild(select);

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "search";
document.body.appendChild(searchInput);

const countSpan = document.createElement("span");
document.body.appendChild(countSpan);

function displayEpisodesWithSearchBox(episodes) {
  displayDropBox(episodes);
  displayEpisodes(episodes);

  countSpan.innerHTML = `Displaying ${count}/${episodes.length} episodes`;

  searchInput.addEventListener("input", () => {
    const inputValue = searchInput.value.toLowerCase();
    list.innerHTML = "";
    count = 0;

    episodes.forEach((episode) => {
      if (
        episode.name.toLowerCase().includes(inputValue) ||
        episode.summary.toLowerCase().includes(inputValue)
      ) {
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
        count++;
      }
    });
    countSpan.innerHTML = `Displaying ${count}/${episodes.length} episodes`;
  });
}

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
    count++;
  });
}

//DropBox search bar
function displayDropBox(episodes) {
  allOption.value = "All";
  allOption.innerHTML = "All episodes";
  select.appendChild(allOption);
  episodes.forEach((episode) => {
    let episodeCode = `S${("0" + episode.season).slice(-2)}E${(
      "0" + episode.number
    ).slice(-2)}`;
    const eachOption = document.createElement("option");
    eachOption.value = episode.id;
    eachOption.innerHTML = `${episodeCode} - ${episode.name}`;
    select.appendChild(eachOption);
  });
    select.addEventListener("change", () => {
      let newArr = [];
      if (select.value === "All") {
        newArr = episodes;
      } else {
        newArr = episodes.filter(episode => select.value.includes(episode.id))
      }
      count = 0;
      list.innerHTML = "";
      displayEpisodes(newArr);
      countSpan.innerHTML = `Displaying ${count}/${episodes.length} episode(s)`
    })
  
}
