import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import type { BlogTypes } from '@/types/blog/BlogTypes';

interface blogType {
    blogGrid: BlogTypes[];
    selectedblog: BlogTypes[] | any;
}

export const useblogGridStore = defineStore('blogs',{

    state: (): blogType => ({
        blogGrid: [],
       selectedblog:[]
    }),
    getters: {
        // Get Post from Getters
        getPosts(state) {
            return state.blogGrid;
        }
    },
    actions: {
        // Fetch Blog from action
        async fetchPosts() {
            try {
                const data = await axios.get('/api/data/blog/grid');
                this.blogGrid = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async fetchPost(title: string) {
            try {
                const response = await axios.post('/api/data/blog/post', { title });
                this.selectedblog = response.data.post;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
