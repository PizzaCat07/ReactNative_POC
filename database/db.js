import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('articles_2.db');

export const init_article = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS article (pk INTEGER PRIMARY KEY NOT NULL,id TEXT NOT NULL UNIQUE, source TEXT, title TEXT NOT NULL, description TEXT, date DATETIME, content TEXT) ',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const init_highlight = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS highlight (pk INTEGER PRIMARY KEY NOT NULL,id TEXT NOT NULL, text TEXT, start INTEGER, end INTEGER)',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const insertArticle = async (
  articleId,
  source,
  title,
  description,
  date,
  content,
) => {
  try {
    await db.transaction(async tx => {
      tx.executeSql(
        'INSERT INTO article(id,source,title,description,date,content)VALUES(?,?,?,?,?,?) ',
        [articleId, source, title, description, date, content],
      );
    });
  } catch (err) {
    console.log(err);
  }
};

export const insertHighlight = async (
  articleId,
  text,
  start,
  end,
  state_id,
) => {
  try {
    await db.transaction(async tx => {
      tx.executeSql(
        'INSERT INTO highlight(id,text,start,end,state_id)VALUES(?,?,?,?,?) ',
        [articleId, text, start, end, state_id],
      );
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllArticle = () => {
  db.transaction(tx => {
    tx.executeSql('SELECT * from article', [], (tx, results) => {
      const temp = [];
      for (let i = 0; i < results.rows.length; ++i)
        temp.push(results.rows.item(i));
      console.log(temp);
    });
  });
};

export const getAllHighlight = () => {
  db.transaction(tx => {
    tx.executeSql('SELECT * from highlight', [], (tx, results) => {
      const temp = [];
      for (let i = 0; i < results.rows.length; ++i)
        temp.push(results.rows.item(i));
      console.log(temp);
    });
  });
};

export const delArticle = async () => {
  try {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM article', [], (tx, results) => {});
    });
  } catch (err) {
    console.log(err);
  }
};

export const delHighlight = async () => {
  try {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM highlight', [], (tx, results) => {});
    });
  } catch (err) {
    console.log(err);
  }
};

export const getArticle = id => {
  db.transaction(tx => {
    tx.executeSql('SELECT * from article WHERE id = ?', [id], (tx, results) => {
      const article = [];
      article.push(results.row.item(0));
    });
  });
};

/* export function getArticle(id) {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM article WHERE id = ?', [id], (_, results) => {
      const article = [];
      article.push(results.rows.item(0));
    });
  });
} */
