import React, { Component } from "react";

class SearchQuery extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      articles: [],
      keys: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(event) {
    event.preventDefault();
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
  }

  handleSearch(event) {
    event.preventDefault();
    fetch(
      "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" +
        this.state.query +
        "&origin=*&indexpageids&format=json"
    )
      .then(response => response.json())
      .then(response => {
        const { pages } = response.query;
        const { pageids } = response.query;
        this.setState({ articles: pages });
        this.setState({ keys: pageids });
      });
    console.log("after");
  }

  render() {
    const displayArticles = this.state.keys.map(item => (
      <div className="results">
        <a
          key={item}
          target="_blank"
          href={"https://en.wikipedia.org/?curid=" + item}
        >
          <h3>{this.state.articles[item].title}</h3>
          <p>{this.state.articles[item].extract}</p>
        </a>
      </div>
    ));

    return (
      <div className="main">
        <form>
          <input
            className="searchBox"
            type="text"
            name="query"
            placeholder="Search Wikipedia"
            value={this.state.query}
            onChange={this.handleSubmit}
          />
          <div className="buttonBox">
            <button onClick={this.handleSearch}>Search</button>
            <button onClick={this.handleClick}>Random Article</button>
          </div>
        </form>
        {displayArticles}
      </div>
    );
  }
}

export default SearchQuery;
