// fetch data functionality

const fetchData = () => {
    const URL = "https://openapi.programming-hero.com/api/ai/tools";
    try {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => displayDataFunc(data.data.tools));
    } catch (err) {
        console.log(err);
    }
};

// function determines how the data will be displayed on the display.

const displayDataFunc = (allToolsData) => {
    const mainContainer = document.getElementById("main-container");
    const showAllBtn = document.getElementById("showAll-btn");
    const sortByDateBtn = document.getElementById("sortByDateBtn");

    // The following function works on how the data will be shown on the display in an ascending manner through the date.

    sortByDateBtn.addEventListener("click", () => {
        sortByDateBtn.style.cursor = "not-allowed";
        const compareDates = (dateOne, dateTwo) => {
            const firstDate = new Date(
                dateOne.published_in.split("/").reverse().join("-")
            );
            const secondDate = new Date(
                dateTwo.published_in.split("/").reverse().join("-")
            );

            return firstDate - secondDate;
        };
        allToolsData.sort(compareDates);
        displayDataFunc(allToolsData);
    });

    // How to show 6 data first and then how to show all the data by making the button visible through the condition.

    const firstSixItems = allToolsData.slice(0, 6);
    if (allToolsData.length > firstSixItems.length) {
        showAllBtn.style.display = "block";
        showAllBtn.addEventListener("click", () => {
            mainContainer.innerHTML = "";
            displayShowData(allToolsData);

            showAllBtn.style.display = "none";
        });
    } else {
        showAllBtn.style.display = "none";
    }

    displayShowData(firstSixItems);
};

// The work of the following function is only to display the data.

const displayShowData = (allTools) => {
    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";
    allTools.forEach((singleTool) => {
        const { image, name, features, published_in, id } = singleTool;

        mainContainer.innerHTML += `
          
          <div class="card glass p-4 mx-8">
          <figure>
            <img src=${image} alt="car!" />
          </figure>
          <div>
            <h2 class="mt-2 text-xl font-semibold">Features:</h2>
            <ul class="list-decimal">
             ${features
                .map((feature) => `<li class="ml-4">${feature}</li>`)
                .join("")}
            </ul>
      
          </div>
          <hr class="my-2" />
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium">${name} </h3>
              <i class="fa-solid fa-calendar-days"></i>
              <span class="ml-1 font-medium">${published_in} </span>
            </div>
            <label onClick="toolInfo('${id}')" for="my-modal-3" class="fa-solid fa-arrow-right mr-2 bg-red-400 p-2 rounded-full text-white cursor-pointer"></label>
          </div>
        </div>
       
          
          `;
    });
};

