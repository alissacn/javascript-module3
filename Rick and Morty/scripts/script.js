//query all the episodes

async function fetchCharacters(characterURLs) {
    const charactersFetchPrimoses = characterURLs.map(characterURL => fetch(characterURL));
    const resolvedFetchResponses = resolvedFetchResponses.map(resolvedFetchResponses => resolvedFetchResponses.json())
}

function updateMainArea(name, date, episodeCode, characters) {
    mainAreaElement.innerHtml = "";

    const title= document.createElement("h2");
    titleElement.innerText = name;
    const dateAndCodeElement = document.createElement("h3");
    dateAndCodeElement.innerText = `${date} - ${episodeCode}`

    mainAreaElement.appendChild(titleElement)
    mainArea.appendChild(dateAndCodeElement)

    fetchCharacters(characterURLs);



}




function sidebar() {
    fetch("https://rickandmortyapi.com/api/episode")
     .then(result => {
        return result.json()
     .then(json => {
        const sideBarElement = document.createElement("div");
        sideBarElement.id = "sidebar";
        document.querySelector("#root").appendChild(sideBarElement);
        console.log(json.results);
        json.results.forEach(episode => {
            console.log(`Episode ${episode.id}`)
            const titleElement = document.createElement("p");
            titleElement.innerText = `Episode ${titleElement}`;
            sideBarElement.appendChild(titleElement);
            titleElement.addEventListener("click", event => {
                console.log(episode.name);
            })
         
        });
        const firstEpisode = json.results[0];
        updateMainArea(episode.name, episode.airDate, episode.episode, episode.characters);
    });
    });

function mainArea() {
    const mainAreaElement = document.createElement("div");
    document.querySelector("#root").appendChild(mainAreaElement);
    mainArea.innerText = "This is my main area"
};


sidebar();
mainArea();

