//funcao para criar container e colocar sidebar e images.
function createContainer(){
    let createDiv = document.createElement("div");
    createDiv.className = "container";
    document.querySelector("#root").appendChild(createDiv);
};


//Carrega mais episodes ao apertar o botao.
let sidebarElement = null;
let page = 1;
let firstEpisode = null;

function loadEpisodePage() {
    fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
        .then(result => {
            return result.json()
        })
        .then(json => {
            console.log(json.results);
            const linkList = document.createElement("ul");
            sidebarElement.appendChild(linkList);

            if (firstEpisode === null) {
                firstEpisode = json.results[0];
                updateMainArea(firstEpisode);
            };

            json.results.forEach(episode => {
                console.log(`Episode ${episode.id}`)

                const titleElement = document.createElement("a");
                const linkText = document.createTextNode(`Episode ${episode.id}`);
                titleElement.appendChild(linkText);
                titleElement.href = '#';


                const linkLi = document.createElement("li");
                linkList.appendChild(linkLi);
                linkLi.appendChild(titleElement);

                titleElement.addEventListener("click", event => {
                    updateMainArea(episode);
                    console.log(episode.name);
                    event.preventDefault();
                });
            });
            page = page + 1;
        });

}



//Cria o botao dentro do sideBar.
function createLoadMoreButton() {
    const divButton = document.createElement('div');
    const loadButton = document.createElement('button');
    divButton.className = 'button'
    loadButton.innerHTML = "Load episodes";

    let sideArea = document.querySelector("#sidebar");
    divButton.appendChild(loadButton);
    sideArea.appendChild(loadButton);

    loadButton.addEventListener("click", event => {
        loadEpisodePage();

    })
};


//insere a imagens e elementos na area principal.
function updateMainArea(episode) {
    const titleElement = document.createElement("h2");
    titleElement.innerText = `${episode.name}`;
    const dateAndCodeElement = document.createElement("h3");
    dateAndCodeElement.innerText = `${episode.air_date} | ${episode.episode}`

    let mainAreaElement = document.querySelector("#main-area");
    mainAreaElement.innerHTML = "";
    mainAreaElement.appendChild(titleElement);
    mainAreaElement.appendChild(dateAndCodeElement);
    console.log(episode)

    episode.characters.forEach(character => {

        fetch(character)
            .then(result => {
                return result.json()
            })
            .then(result => {
                let characterElement = document.createElement("div");
                let imageElement = document.createElement("img");
                imageElement.className = "divImg";
                imageElement.src = result.image;
                characterElement.appendChild(imageElement);
                mainAreaElement.appendChild(characterElement);
                const createPname = document.createElement("p");
                createPname.innerHTML = `<strong>${result.name}<strong>`;
                characterElement.appendChild(createPname);
                const createPdescription = document.createElement("p");
                createPdescription.innerText = `${result.species} | ${result.status}`;
                characterElement.appendChild(createPdescription);

            })

    })
};



//Cria a div da area principal.
function mainArea() {
    const mainElement = document.createElement('div');
    mainElement.className = 'main-area';
    mainElement.id = "main-area"
    document.querySelector(".container").appendChild(mainElement);
    mainElement.innerHTML = 'main area'
}


//Cria o title.
function createTitle() {
    const titleElement = document.createElement("div");
    titleElement.className = "title"
    titleElement.innerHTML = "<strong>Rick y Morty API</strong>"
    document.querySelector("#root").appendChild(titleElement);
};


//renderiza os episodios em link.
function sideBar() {
    sidebarElement = document.createElement("div");
    sidebarElement.id = "sidebar";
    document.querySelector(".container").appendChild(sidebarElement);
    loadEpisodePage()

};


createContainer()
createTitle();
sideBar();
mainArea();
createLoadMoreButton();


