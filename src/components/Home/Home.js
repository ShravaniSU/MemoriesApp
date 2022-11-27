import React, { useState } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@mui/material";
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import { useNavigate, useLocation } from "react-router-dom";
import { MuiChipsInput } from 'mui-chips-input'
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts.js";
import Pagination from "../Pagination";
import styles from "./mystyle.module.css";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const searchPost = () => {
        if (search.trim() || tags) {
          dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
          navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
          navigate('/');
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) { // Enter key
          searchPost();
        }
    };
    
    const handleAddChip = (tag) => setTags([...tags, tag]);
    
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyItems="space-between" alignItems="stretch" spacing={3} className={styles.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={styles.appBarSearch} position="static" color="inherit">
                            <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <MuiChipsInput
                                style={{ margin: '15px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={styles.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={styles.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                        
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;