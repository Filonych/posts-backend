import React, { useState } from "react";
import { PostForm } from "../components/PostForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPost } from "../../../redux/slices/postsSlice";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";

export const EditPostPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.posts.posts);
  const navigate = useNavigate();

  const intId = Number(id);

  const onSubmitForm = (formValues) => {
    setShowModal(true);
    dispatch(editPost(formValues));
  };

  const onHandleClose = () => {
    setShowModal(false);
    navigate("/posts");
  };

  if (!list) {
    return <>Пост не найден</>;
  }

  const findedPost = list.find((item) => item.id === intId);

  return (
    <>
      {showModal && (
        <Modal
          text="Пост успешно изменён"
          buttons={<Button onClick={() => onHandleClose()}>ОК</Button>}
        />
      )}
      <PostForm
        title={`Редактировать пост - ${id}`}
        onSubmitForm={onSubmitForm}
        defaultValues={findedPost}
      />
    </>
  );
};
