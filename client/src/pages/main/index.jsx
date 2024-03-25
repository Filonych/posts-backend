import React, { useEffect } from "react";
import { Posts } from "../../components/Posts";
import { Container } from "../../components/ui/Container";
import { useSelector, useDispatch } from "react-redux";
import { getFreshPosts } from "../../redux/slices/postsSlice";
import { Loader } from "../../components/ui/Loader";

export const MainPage = () => {
  const postForView = useSelector((state) => state.posts.postForView);
  const { freshPosts, loading } = useSelector(
    (state) => state.posts.freshPosts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFreshPosts());
  }, []);

  return (
    <Container>
      {loading && <Loader />}
      {freshPosts && <Posts posts={freshPosts} title="Свежие публикации" />}

      {postForView.post && (
        <Posts
          posts={[postForView.post]}
          title="Последний просмотренный пост"
        />
      )}
    </Container>
  );
};
