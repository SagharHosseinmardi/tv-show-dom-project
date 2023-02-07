// You can edit ALL of the code here
// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

// window.onload = setup;

// ------------------------------------------------------------------

//You can edit ALL of the code here

async function fetchAllShows() {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/82/episodes`);
   
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

async function setup() {
  const allEpisodes = await fetchAllShows();
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
  //call back functions
  displayDropBox(episodes);
  displayEpisodes(episodes, episodes.length);

  searchInput.addEventListener("input", () => {
    const inputValue = searchInput.value.toLowerCase();
    list.innerHTML = "";

    let filterEpisodes = episodes.filter((episode) => {
      const episodeDidMatch =
        episode.name.toLowerCase().includes(inputValue) ||
        episode.summary.toLowerCase().includes(inputValue);

      return episodeDidMatch;
    });

    displayEpisodes(filterEpisodes, episodes.length);
  });
}

// initial display episodes (first function)
function displayEpisodes(episodesToDisplay, totalNumberOfEpisodes) {
  episodesToDisplay.forEach((episode) => {
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
  countSpan.innerHTML = `Displaying ${episodesToDisplay.length}/${totalNumberOfEpisodes} episode(s)`;
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
      newArr = episodes.filter((episode) => select.value.includes(episode.id));
    }

    list.innerHTML = "";
    displayEpisodes(newArr, episodes.length);
  });
}
