const EMPLOYEE_ENDPOINT = {
    getAll: {
        url: '/emp/employees',
        method: 'get',
    },
    getById: {
        url: (id) => `/emp/employees/${id}`,
        method: 'get',
    },
    create: {
        url: '/emp/employees',
        method: 'post',
    },
    update: {
        url: (id) => `/emp/employees/${id}`,
        method: 'put',
    },
    delete: {
        url: (id) => `/emp/employees?eid=${id}`,
        method: 'delete',
    },
    search: {
        url: (keyword) => `/emp/search?keyword=${keyword}`,
        method: 'get',
    }
};


export default EMPLOYEE_ENDPOINT;