import React, { useEffect } from "react";
import { Posts } from "../../components/Posts";
import { Container } from "../../components/ui/Container";
import { Typo } from "../../components/ui/Typo";
import { useSelector, useDispatch } from "react-redux";
import { getFreshPosts } from "../../redux/slices/postsSlice";
import { Loader } from "../../components/ui/Loader";

export const MainPage = () => {
  const postForView = useSelector((state) => state.posts.postForView);
  const { freshPosts, loading } = useSelector((state) => state.posts.freshPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!freshPosts) {
      dispatch(getFreshPosts());
    }
  }, [freshPosts, dispatch]);

  return (
    <>
      <Container>
        {loading && <Loader />}
        {freshPosts && (
          <>
            <Typo>Свежие публикации</Typo>
            <Posts posts={freshPosts} />
          </>
        )}

        {postForView.post && (
          <>
            <Typo>Последний просмотренный пост</Typo>
            <Posts posts={[postForView.post]} />
          </>
        )}
      </Container>
    </>
  );
};
