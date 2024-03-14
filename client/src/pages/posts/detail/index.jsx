import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typo } from "../../../components/ui/Typo";
import { Container } from "../../../components/ui/Container";

import * as SC from "./styles";
import { Link } from "../../../components/ui/Link";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostById,
  showPost,
  deletePost,
} from "../../../redux/slices/postsSlice";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { Loader } from "../../../components/ui/Loader";

export const DetailPostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postForView = useSelector((state) => state.posts.postForView);
  const list = useSelector((state) => state.posts.posts.list);
  const { user } = useSelector((state) => state.auth);

  const [postForDelete, setPostForDelete] = useState(null);

  const showEditandDeleteBtn = list && user;

  const onDeletePost = () => {
    dispatch(deletePost(postForDelete));
    setPostForDelete(null);
    navigate("/posts");
  };

  useEffect(() => {
    const intId = Number(id);
    const findedPost = list
      ? list.find((item) => item.id === intId)
      : undefined;

    if (findedPost) {
      dispatch(showPost(findedPost));
    } else {
      dispatch(getPostById(Number(id)));
    }
  }, [dispatch, list, id]);

  const { post, loading } = postForView;

  if (loading) {
    return <Loader/>;
  }

  if (!post || !post.hasOwnProperty("id")) {
    return <>Пост не найден</>;
  }

  const image =
    post.image ||
    "https://img.freepik.com/premium-photo/fantasy-rainbow-landscape-beautiful-minimalist-rainbow-in-sky-illustration-generative-ai_691560-8602.jpg";

  return (
    <Container>
      {postForDelete && (
        <Modal
          text={`Вы точно хотите удалить пост с ID - ${post.id}?`}
          buttons={
            <>
              <Button hoverColor="red" onClick={onDeletePost}>
                Да
              </Button>
              <Button onClick={() => setPostForDelete(null)}>Нет</Button>
            </>
          }
        />
      )}
      <Typo>{post.title}</Typo>
      <SC.Image src={image} alt={post.title} />
      <SC.Text>{post.body}</SC.Text>
      <div style={{ clear: "both" }} />
      <SC.LinkWrapper>
        <Link to="/posts">Обратно к публикациям</Link>
        {showEditandDeleteBtn && (
          <Link to={`/posts/${id}/edit`}>Редактировать</Link>
        )}
        {showEditandDeleteBtn && (
          <Button hoverColor="red" onClick={() => setPostForDelete(post)}>
            Удалить
          </Button>
        )}
      </SC.LinkWrapper>
    </Container>
  );
};
