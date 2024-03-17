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
import { resetFilter, setSearchValue } from "../../redux/slices/filterSlice";

export const PostsPage = () => {
  const { list, loading } = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilter());
    dispatch(setSearchValue(""));
    updatePosts();
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
