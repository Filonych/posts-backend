import React from "react";
import * as SC from './styles'
import { Link } from "../../../ui/Link";

export const Post = ({ post }) => {
    const image = post.image || 'https://img.freepik.com/premium-photo/fantasy-rainbow-landscape-beautiful-minimalist-rainbow-in-sky-illustration-generative-ai_691560-8602.jpg'

    return(
        <SC.Post>
            <SC.Image src={image} alt='image' />
            <SC.Title>{`${post.id} - ${post.title}`}</SC.Title>
            <Link to={`/posts/${post.id}`}>Читать далее...</Link>
        </SC.Post>
    )
}

