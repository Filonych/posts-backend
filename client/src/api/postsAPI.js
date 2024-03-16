export const postsAPI = {
  async fetchPosts(searchValue, currentPage, sort, order, perPage = 10) {
    try {
      const response = await fetch(
        `http://localhost:3003/api/posts/list/?_page=${currentPage}&_perPage=${perPage}&_searchValue=${searchValue}&_sort=${sort}&_order=${order}`
      );

      if (!response.ok) {
        throw new Error("Ошибка при получении данных");
      }

      const responseData = await response.json();
      const posts = responseData.posts.data;
      const totalCount = responseData.posts.metadata.totalCount;

      return { posts, totalCount };
    } catch (ex) {
      console.log(ex);
    }
  },

  fetchFreshPosts(limit = 3) {
    try {
      return fetch(
        `http://localhost:3003/api/posts/list/?_perPage=${limit}&_sort=id&_order=desc`
      )
        .then((response) => response.json())
        .then((posts) => posts.posts.data);
    } catch (ex) {
      console.log(ex);
    }
  },

  fetchbyId(id) {
    try {
      if (!id) {
        throw new Error("ID is broken");
      }
      return fetch(`http://localhost:3003/api/posts/list/${id}`)
        .then((response) => response.json())
        .then((post) => post);
    } catch (ex) {
      console.log(ex);
    }
  },

  fetchNewPost(title, body, id) {
    try {
      return fetch("http://localhost:3003/api/posts/add", {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })        
    } catch (ex) {
      console.log(ex);
    }
  },

  fetchDeletePost(id) {
    try {
      if (!id) {
        throw new Error("ID is broken");
      }
      return fetch(`http://localhost:3003/api/posts/delete`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      })
    } catch (ex) {
      console.log(ex);
    }
  },

  fetchEditPost(title, body, id) {
    try {
      return fetch("http://localhost:3003/api/posts/edit", {
        method: "PUT",
        body: JSON.stringify({
          title,
          body,
          id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })        
    } catch (ex) {
      console.log(ex);
    }
  },
};

// fetchPosts(searchValue, currentPage, sort) {
//   try {
//     return fetch(
//       `https://jsonplaceholder.typicode.com/posts/?_sort=${sort}&title_like=${searchValue}&_page=${currentPage}`
//     ).then((response) => {
//       const totalCount = response.headers.get("X-Total-Count");
//       return response.json().then((posts) => ({ posts, totalCount }));
//     });
//   } catch (ex) {
//     console.log(ex);
//   }
// },

// _sort=${sort}&title_like=${searchValue}&


// &_sort=id&_order=desc
