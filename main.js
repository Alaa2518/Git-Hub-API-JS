let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function (){
    getRepos();
}
function getRepos (){
    if (theInput === "") {
        reposData.innerHTML = "<span>Please write Github Username </span>";
    } else {
        fetch(`http://api.github.com/users/${theInput.value}/repos`)
        .then((reponse)=>{
            return reponse.json();
        })
        .then((data)=> {
            reposData.innerHTML = '';

            data.forEach(repo => {
                
                let mainDiv = document.createElement("div");

                let repoName = document.createTextNode(repo.name);

                mainDiv.appendChild(repoName);

                let theUrl = document.createElement('a');

                let theUrlText = document.createTextNode("visit");

                theUrl.appendChild(theUrlText);

                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

                mainDiv.appendChild(theUrl);


                let starsSpan = document.createElement('span');

                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);


                starsSpan.appendChild(starsText);

                mainDiv.appendChild(starsSpan);


                reposData.appendChild(mainDiv);


            });
        });
    }
}