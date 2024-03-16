import React, { useEffect } from "react";
import { Posts } from "../../components/Posts";
import { Container } from "../../components/ui/Container";
import { Typo } from "../../components/ui/Typo";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/slices/postsSlice";
import { Loader } from "../../components/ui/Loader";
import { Pagination } from "../../components/Pagination";
import { Search } from "../../components/Posts/components/Search";
import { Sorting } from "../../components/Posts/components/Sorting";
import * as SC from "./styles";

export const PostsPage = () => {
  const { list, loading } = useSelector((state) => state.posts.posts);
  const { searchValue, currentPage, sort, order } = useSelector(
    (state) => state.filter.filter
  );
  const dispatch = useDispatch();

  useEffect(() => {
    updatePosts(searchValue, currentPage, sort, order);
  }, []);

  const updatePosts = (searchValue, currentPage, sort, order) => {
    dispatch(getPosts({ searchValue, currentPage, sort, order }));
  };

  if (!list && loading) {
    return <Loader />;
  }

  if (!list) {
    return <Container>Error 404</Container>;
  }

  return (
    <>
      <Typo>Публикации</Typo>
      <Container>
        <SC.Wrap>
          <Search updatePosts={updatePosts} />
          <Sorting updatePosts={updatePosts} />
        </SC.Wrap>
        <Posts posts={list} />
        <Pagination updatePosts={updatePosts} />
      </Container>
    </>
  );
};
