export const postsAPI = {
  fetchPosts(searchValue, currentPage, sort) {
    try {
      return fetch(
        `https://jsonplaceholder.typicode.com/posts/?_sort=${sort}&title_like=${searchValue}&_page=${currentPage}`
      ).then((response) => {
        const totalCount = response.headers.get("X-Total-Count");
        return response.json().then((posts) => ({ posts, totalCount }));
      });
    } catch (ex) {
      console.log(ex);
    }
  },

  fetchFreshPosts(limit = 3) {
    try {
      return fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_sort=id&_order=desc`
      )
        .then((response) => response.json())
        .then((posts) => posts);
    } catch (ex) {
      console.log(ex);
    }
  },

  fetchbyId(id) {
    try {
      if (!id) {
        throw new Error("ID is broken");
      }
      return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((post) => post);
    } catch (ex) {
      console.log(ex);
    }
  },

  fetchNewPost(title, body) {
    try {
      return fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((newPost) => newPost);
    } catch (ex) {
      console.log(ex);
    }
  },
};
