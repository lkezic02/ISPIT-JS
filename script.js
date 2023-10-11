var button = document.getElementById("search-button");
var input = document.getElementById("search-input");
var tbody = document.querySelector(".rezultati tbody");
var spinner = document.querySelector(".spinner");
var poruka = document.getElementById("poruka");
var timeoutID;

input.addEventListener("keyup", rezultat);

button.addEventListener("click", rezultat);

function rezultat() {
    var unos = input.value;
    clearTimeout(timeoutID);
    const urlAPI = "https://api.tvmaze.com/search/shows?q=" + unos;

    spinner.style.display = "block";
    poruka.style.display = "none";

    fetch(urlAPI)
        .then((response) => response.json())
        .then((data) => {
            setTimeout(() => {
                spinner.style.display = "none";
                tbody.innerHTML = "";

                if (data && data.length > 0) {
                    data.forEach((element) => {
                        const row = document.createElement("tr");

                        const imeSerije = document.createElement("td");
                        imeSerije.innerText = element.show.name;
                        row.appendChild(imeSerije);

                        const rating = document.createElement("td");
                        rating.innerText = element.show.rating.average || "Nema podataka";
                        if (element.show.rating.average === null) {
                            rating.classList.add("no-data");
                        }
                        row.appendChild(rating);

                        const genres = document.createElement("td");
                        genres.innerText = element.show.genres.join(", ") || "Nema podataka";
                        if (element.show.genres === null) {
                            genres.classList.add("no-data");
                        }
                        row.appendChild(genres);

                        const sazetak = document.createElement("td");
                        sazetak.innerText = element.show.summary || "Nema podataka";
                        if (element.show.summary === null) {
                            sazetak.classList.add("no-data");
                        }
                        row.appendChild(sazetak);

                        tbody.appendChild(row);
                    });
                } else {
                    poruka.style.display = "block";
                }
            }, 3000);
        })
        .catch((error) => {
            console.error(error);
        });
}
