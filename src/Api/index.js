import { api } from '../Utils/axios'

export const setLogin = () => {
    return api
        .post(
            '/auth/login',
            {
                email: 'latif@mail.com',
                password: '123qweasd',
            }
            // {
            //     headers: {
            //         language: 'EN',
            //         'Bearer': token,
            //     },
            // }
        )
        .then(res => res?.data)
}

export const getTodos = ({ token }) => {
    return api
        .get('/todos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => res?.data)
}

export const getTasks = ({ token, idTodos }) => {
    return api
        .get(`/todos/${idTodos}/items`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => res?.data)
}

export const updateTask = ({ token, idTodos, idTask, payload }) => {
    return api
        .patch(
            `/todos/${idTodos}/items/${idTask}`,
            {
                target_todo_id: idTask,
                name: payload.name,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(res => res?.data)
}

export const createTask = ({ token, idTodos, payload }) => {
    return api
        .post(
            `/todos/${idTodos}/items`,
            {
                name: payload.name,
                progress_percentage: payload.progress,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(res => res?.data)
}

export const deleteTask = ({ token, idTodos, idTask }) => {
    return api
        .delete(
            `/todos/${idTodos}/items/${idTask}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(res => res?.data)
}
