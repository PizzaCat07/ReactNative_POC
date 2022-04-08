import axios from 'axios';

import Article from '../../models/article';

export const SET_NEWS = 'SET_NEWS';

const url =
  'https://newsapi.org//v2/top-headlines?country=ca&apiKey=f48f7a5665ab4ed484c1090882ecb228';

export const fetchNews = () => {
  try {
    return async dispatch => {
      const res = await axios.get(url);

      if (res.data) {
        const resData = res.data;
        const loadedArticles = [];
        const totalResults = resData.totalResults;
        const articleData = resData.articles;

        for (let x in articleData) {
          if (!articleData[x].description) {
            const noDescription = '';
            loadedArticles.push(
              new Article(
                x,
                articleData[x].source.name,
                articleData[x].title,
                noDescription,
                articleData[x].publishedAt,
                articleData[x].content,
              ),
            );
          } else {
            loadedArticles.push(
              new Article(
                x,
                articleData[x].source.name,
                articleData[x].title,
                articleData[x].description,
                articleData[x].publishedAt,
                articleData[x].content,
              ),
            );
          }
        }

        dispatch({
          type: SET_NEWS,
          payload: res.data,
          totalResults: totalResults,
          loadedArticles: loadedArticles,
        });
      } else {
        console.log('unable to fetch');
      }
    };
  } catch (error) {}
};
