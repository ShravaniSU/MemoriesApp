import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import moment from "moment";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import style from "./styles.css";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({post, setCurrentId }) => {
    const dispatch = useDispatch();
    return(
        <Card className={style.card}>
            <CardMedia className="media" image={post.selectedFile} title={post.title} />
            <div className={style.overlay}>
                <Typography variant="6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={style.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
            </div>
            <div className="details">
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className="title" gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className="cardAction">
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpIcon fontSize="small" />&nbsp; Like &nbsp; {post.likeCount} </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" />&nbsp; Delete</Button>
            </CardActions>
        </Card>
    );
}

export default Post;