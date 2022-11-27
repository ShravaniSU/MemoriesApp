import React, {useState} from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@mui/material";
import moment from "moment";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styles from "./mystyle.module.css";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({post, setCurrentId }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes);
    const userId = user?.result.googleId || user?.result?._id ;
    const hasLikedPost = likes.find((like) => like === userId);
    
    const handleLike = async () => {
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId))
        }
        else {
            setLikes([...likes, userId]);
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId) ?
                (
                <><ThumbUpIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
                ) : (
                <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }
    
        return <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => navigate(`/post/${post._id}`)

    return(
        <Card className={styles.card} raised elevation={6}>
            <ButtonBase component="span" name="test" className={styles.cardAction} onClick={openPost}>
                <CardMedia className={styles.media} image={post.selectedFile} title={post.title} />
                <div className={styles.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={styles.overlay2}>
                    <Button style={{color: 'white'}} size="small" onClick={(e) => {
                        e.stopPropagation();
                        setCurrentId(post._id);
                    }}><MoreHorizIcon fontSize="default" /></Button>
                </div>
                )}
                <div className={styles.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={styles.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={styles.cardAction}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}><Likes /></Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (<Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" />&nbsp; Delete</Button>)}
                
            </CardActions>
        </Card>
    );
}

export default Post;