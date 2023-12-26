"use strict";

var theInput = document.querySelector(".get-repos input");
var getButton = document.querySelector(".get-button");
var reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

function getRepos() {
  if (theInput === "") {
    reposData.innerHTML = "<span>Please write Github Username </span>";
  } else {
    fetch("http://api.github.com/users/".concat(theInput.value, "/repos")).then(function (reponse) {
      return reponse.json();
    }).then(function (data) {
      reposData.innerHTML = '';
      data.forEach(function (repo) {
        var mainDiv = document.createElement("div");
        var repoName = document.createTextNode(repo.name);
        mainDiv.appendChild(repoName);
        var theUrl = document.createElement('a');
        var theUrlText = document.createTextNode("visit");
        theUrl.appendChild(theUrlText);
        theUrl.href = "https://github.com/".concat(theInput.value, "/").concat(repo.name);
        mainDiv.appendChild(theUrl);
        var starsSpan = document.createElement('span');
        var starsText = document.createTextNode("Stars ".concat(repo.stargazers_count));
        starsSpan.appendChild(starsText);
        mainDiv.appendChild(starsSpan);
        reposData.appendChild(mainDiv);
      });
    });
  }
}