import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postsAPI } from "../../api/postsAPI";

export const getPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ searchValue, currentPage, sort }) => {
    return await postsAPI.fetchPosts(searchValue, currentPage, sort);
  }
);

export const getFreshPosts = createAsyncThunk(
  "posts/fetchFreshPosts",
  async (limit) => {
    return await postsAPI.fetchFreshPosts(limit);
  }
);

export const getPostById = createAsyncThunk(
  "posts/fetchbyId",
  async (postId) => {
    return await postsAPI.fetchbyId(postId);
  }
);

export const addPost = createAsyncThunk(
  "posts/fetchNewPost",
  async ({ title, body }) => {
    return await postsAPI.fetchNewPost(title, body);
  }
);

const initialState = {
  posts: {
    list: null,
    loading: false,
  },
  postForView: {
    post: null,
    loading: false,
  },
  freshPosts: {
    freshPosts: null,
    loading: false,
  },
  totalCount: 0,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    editPost: (state, action) => {
      state.posts.list = state.posts.list.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
      state.freshPosts.freshPosts = state.posts.list.slice(0, 3);
    },
    // addPost: (state, action) => {
    //   const newPost = { ...action.payload };
    //   newPost.id = new Date().getTime();
    //   state.posts.list = state.posts.list
    //     ? [newPost, ...state.posts.list]
    //     : [newPost];
    //   state.freshPosts.freshPosts = state.posts.list.slice(0, 3);
    // },
    showPost: (state, action) => {
      state.postForView = {
        post: action.payload,
        loading: false,
      };
    },
    deletePost: (state, action) => {
      state.posts.list = state.posts.list.filter(
        (post) => post.id !== action.payload.id
      );
      state.postForView = {
        post: null,
        loading: false,
      };
      state.freshPosts.freshPosts = state.posts.list.slice(0, 3);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.posts = {
          list: null,
          loading: true,
        };
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = {
          list: action.payload.posts,
          loading: false,
        };
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getFreshPosts.pending, (state) => {
        state.freshPosts = {
          freshPosts: null,
          loading: true,
        };
      })
      .addCase(getFreshPosts.fulfilled, (state, action) => {
        state.freshPosts = {
          freshPosts: action.payload,
          loading: false,
        };
      })
      .addCase(getPostById.pending, (state) => {
        state.postForView = {
          post: null,
          loading: true,
        };
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.postForView = {
          post: action.payload,
          loading: false,
        };
      })
      .addCase(addPost.fulfilled, (state, action) => {
        const newPost = { ...action.payload };
        state.posts.list = [newPost, ...state.posts.list];
        state.freshPosts.freshPosts = state.posts.list.slice(0, 3);
      });
  },
});

export const { editPost, showPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
