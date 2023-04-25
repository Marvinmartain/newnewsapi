import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NewsItem } from '.';

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('football');

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=f5d44014fa3d4d1786244e80ac21cc48`);
      setArticles(response.data.articles);
      console.log(response);
    };
    getArticles();
  }, [searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    getArticles();
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Search for news:</label>
        <input id="search" type="text" value={searchQuery} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      {articles.map((article) => {
        return (
          <NewsItem
            key={article.url}
            title={article.title}
            description={article.description}
            url={article.url}
            urlToImage={article.urlToImage}
          />
        );
      })}
    </div>
  );
};

export default NewsList;

