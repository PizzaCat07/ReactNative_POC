import axios from 'axios';

import Article from '../../models/article';

export const SET_NEWS = 'SET_NEWS';
export const SET_NEWS_2 = 'SET_NEWS_2';
export const SET_NEWS_ALL = 'SET_NEWS_ALL';

const api1_url =
  'https://newsapi.org//v2/top-headlines?country=ca&apiKey=f48f7a5665ab4ed484c1090882ecb228';

const api2_options = {
  method: 'GET',
  url: 'https://free-news.p.rapidapi.com/v1/search',
  params: {q: 'Canada', lang: 'en'},
  headers: {
    'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
    'X-RapidAPI-Key': 'ea26f9eafbmsh116432203cf2f7ap100ba6jsn92d116678e77',
  },
};

export const fetchNews = searchPhrase => {
  try {
    return async dispatch => {
      const res = await axios.get(api1_url);

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
                'Api1',
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
                'Api1',
                articleData[x].title,
                articleData[x].description,
                articleData[x].publishedAt,
                articleData[x].content,
              ),
            );
          }
        }

        const filterItems = loadedArticles.filter(a =>
          a.title.toLowerCase().includes(searchPhrase.toLowerCase()),
        );

        /*         console.log(filterItems);
        console.log(loadedArticles);
 */
        dispatch({
          type: SET_NEWS,
          payload: res.data,
          totalResults: totalResults,
          loadedArticles: filterItems,
        });
      } else {
        console.log('unable to fetch');
      }
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {}
};

export const fetchNews2 = searchPhrase => {
  try {
    return async dispatch => {
      api2_options.params = {q: searchPhrase, lang: 'en'};
      const res = await axios.request(api2_options);

      if (res.data) {
        const resData = res.data;
        const loadedArticles = [];
        const totalResults = resData.totalResults;
        const articleData = resData.articles;

        for (let x in articleData) {
          const blank = '';

          loadedArticles.push(
            new Article(
              articleData[x]._id,
              'Api2',
              articleData[x].title,
              blank,
              articleData[x].published_date,
              articleData[x].summary,
            ),
          );
        }
        // console.log(loadedArticles);

        dispatch({
          type: SET_NEWS_2,
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

export const fetchNews_all = searchPhrase => {
  try {
    return async dispatch => {
      const api1 = await axios.get(api1_url);
      const blank = ' ';
      const loadedArticles = [];

      const api1_data = api1.data.articles;

      for (let x in api1_data) {
        loadedArticles.push(
          new Article(
            x,
            'api1',
            api1_data[x].title,
            blank,
            blank,
            api1_data[x].content,
          ),
        );
      }

      const filterItems = loadedArticles.filter(a =>
        a.title.toLowerCase().includes(searchPhrase.toLowerCase()),
      );

      api2_options.params = {q: searchPhrase, lang: 'en'};
      const api2 = await axios.request(api2_options);
      const api2_data = api2.data.articles;

      for (let x in api2_data) {
        filterItems.push(
          new Article(
            api2_data[x]._id,
            'api2',
            api2_data[x].title,
            blank,
            blank,
            api2_data[x].summary,
          ),
        );
      }

      dispatch({
        type: SET_NEWS_ALL,
        loadedArticles: filterItems,
      });
    };
  } catch {
    console.log(err);
  }
};
