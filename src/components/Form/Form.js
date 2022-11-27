import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { MuiChipsInput } from 'mui-chips-input'
import styles from "./mystyle.module.css";

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({title: "", message: "", tags: "", selectedFile: "" });
    const post = useSelector((state) => currentId ? state.posts.posts.find((message) => message._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    useEffect(() => {
        if(!post?.title) clear();
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId === 0){
            dispatch(createPost({ ...postData, name: user?.result?.name}, navigate));
        }
        else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
        }
        clear();
    }
    const clear = () => {
        setCurrentId(0);
        setPostData({title: "", message: "", tags: "", selectedFile: "" });
    }
    if (!user?.result?.name) {
        return (
          <Paper className={styles.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
          </Paper>
        );
    }
    const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
      };
    
    const handleDeleteChip = (chipToDelete) => {
        setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
    };

    return(
        <Paper className={styles.paper} elevation={6}>
            <form className={styles.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography style={{textAlign: "center", color: "#3A8891"}} variant="h6">{currentId ? 'Editing' :'Creating'} a Memory</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>
                <div style={{ padding: '5px 0', width: '94%' }}>
                    <MuiChipsInput
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip) => handleDeleteChip(chip)}
                    />
                </div>
                <div className={styles.fileInput}><FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})} /></div>
                <Button className={styles.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;