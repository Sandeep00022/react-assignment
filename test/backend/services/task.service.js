import Task from "../models/task.model.js";

export const createTaskService = async ({title, status}) => {
        const task = await Task.create({title, status});
        return task;
    };
