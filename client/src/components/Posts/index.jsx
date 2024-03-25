import React from "react";
import { Post } from "./components/Post";
import * as SC from "./styles";
import { Typo } from "../ui/Typo";

export const Posts = ({ posts, title }) => (
  <SC.Wrap>
    <Typo>{title}</Typo>
    <SC.Posts>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </SC.Posts>
  </SC.Wrap>
);
