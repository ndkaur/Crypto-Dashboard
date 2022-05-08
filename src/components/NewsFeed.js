import { useEffect, useState } from "react";
import axios from "axios";

function NewsFeed() {

  const [articles, setArticles] = useState(null)


  useEffect(() => {
    const options = {
      method: 'GET',
      // url: 'https://board-crypto.herokuapp.com/news',
      url: 'http://localhost:8000/news',
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setArticles(response.data)

    }).catch(function (error) {
      console.error(error);
    });

  },[])

  console.log(articles)
  // we only want first 7 articles to get displayed
  
  const first7Articles= articles?.slice(0,7)

    return (
      <div className="news-feed">
        <h2>News Feed</h2>
        {first7Articles?.map((article, _index) =>(
        <div key={_index}>
        <a href={article.url}><p>{article.title}</p></a>
        </div>))}
      </div>
    );
}

export default NewsFeed