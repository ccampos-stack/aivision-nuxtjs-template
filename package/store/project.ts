import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import type { ProjectsTypes } from '@/types/projects/ProjectsType';

interface ProjectsType {
    projectGrid: ProjectsTypes[];
    selectedProjects: ProjectsTypes[] | any;
}

export const useProjectsGridStore = defineStore('project',{

    state: (): ProjectsType => ({
        projectGrid: [],
       selectedProjects:[]
    }),
    getters: {
        // Get Post from Getters
        getPosts(state) {
            return state.projectGrid;
        }
    },
    actions: {
        // Fetch Blog from action
        async fetchPosts() {
            try {
                const data = await axios.get('/api/data/projects/grid');
                this.projectGrid = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async fetchPost(title: string) {
            try {
                const response = await axios.post('/api/data/projects/post', { title });
                this.selectedProjects = response.data.post;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
