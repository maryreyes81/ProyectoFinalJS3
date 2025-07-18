import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query";
  _message = "";

  _generateMarkup() {
    if (!Array.isArray(this._data)) {
      console.error("Expected an array in ResultsView, but got:", this._data);
      return "";
    }

    return this._data
      .map((result) => this._generateMarkupPreview(result))
      .join("");
  }

  _generateMarkupPreview(result) {
    return `
      <li class="preview">
          <a class="preview__link" href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
            </div>
          </a>
        </li>
`;
  }
}

export default new ResultsView();
