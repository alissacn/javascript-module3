//Funcao que rendeiza todos os episodios

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
            imageElement.src = result.image;
            characterElement.appendChild(imageElement);
            mainAreaElement.appendChild(characterElement);
            const createPname = document.createElement("p");
            createPname.innerText = `${result.name}`;
            characterElement.appendChild(createPname);
            const createPdescription = document.createElement("p");
            createPdescription.innerText = `${result.species} | ${result.status}`;
            characterElement.appendChild(createPdescription);

         })

   })
};




function mainArea() {
    const mainElement = document.createElement('div');
    mainElement.className = 'main-area';
    mainElement.id = "main-area"
    document.querySelector("#root").appendChild(mainElement);
    mainElement.innerHTML = 'main area'
}

function createTitle() {
    const titleElement = document.createElement("div");
    titleElement.className = "title"
    document.querySelector("#root").appendChild(titleElement);
    titleElement.innerHTML = "<strong>Rick y Morty API</strong>"
}



function sideBar() {
    fetch("https://rickandmortyapi.com/api/episode")
        .then(result => {
            return result.json()
        })
        .then(json => {
            const sideBarElement = document.createElement("div");
            sideBarElement.id = "sidebar";
            document.querySelector("#root").appendChild(sideBarElement);
            console.log(json.results);
            const linkList = document.createElement("ul");
            sideBarElement.appendChild(linkList);

            json.results.forEach(episode => {
                console.log(`Episode ${episode.id}`)

                const titleElement = document.createElement("a");
                const linkText = document.createTextNode(`Episode ${episode.id}`);
                titleElement.appendChild(linkText);
                titleElement.href = '#';
                

                const LinkLi = document.createElement("li");
                linkList.appendChild(LinkLi);

                LinkLi.appendChild(titleElement);
                
                titleElement.addEventListener("click", event => {
                    updateMainArea(episode);
                    console.log(episode.name);
                    event.preventDefault();
                });
            });
        });
}


createTitle();
sideBar();
mainArea();

