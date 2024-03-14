import React, { useState } from "react";
import { PostForm } from "../components/PostForm";
import { useDispatch } from "react-redux";
import { addPost } from "../../../redux/slices/postsSlice";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";

export const AddPostPage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const onSubmitForm = (formValues) => {
    console.log(formValues)
    // setShowModal(true)
    dispatch(addPost(formValues))
    
  };

  return (
    <>
      {showModal && (
        <Modal
          text="Пост успешно добавлен"
          buttons={<Button onClick={() => setShowModal(false)}>ОК</Button>}
        />
      )}
      <PostForm title="Добавление нового поста" onSubmitForm={onSubmitForm} />
    </>
  );
};
