import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Posts } from "../../components/Posts";
import { Container } from "../../components/ui/Container";
import { Typo } from "../../components/ui/Typo";
import { Loader } from "../../components/ui/Loader";
import { Pagination } from "../../components/Pagination";
import { Search } from "../../components/Posts/components/Search";
import { Sorting } from "../../components/Posts/components/Sorting";
import { getPosts } from "../../redux/slices/postsSlice";
import { resetFilter } from "../../redux/slices/filterSlice";
import * as SC from "./styles";

export const PostsPage = () => {
  const { list, loading } = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilter());
    dispatch(getPosts({}));
  }, []);

  return (
    <Container>
      <Typo>Публикации</Typo>
      <SC.Wrap>
        <Search />
        <Sorting />
      </SC.Wrap>
      {!list && loading && <Loader />}
      {list && <Posts posts={list} />}
      {list && <Pagination />}
    </Container>
  );
};
