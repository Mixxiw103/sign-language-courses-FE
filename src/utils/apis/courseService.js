// src/api/courseService.js
import api from "./api";

export const courseApi = {
    list: (params) => api.get("/courses", { params }),
    getById: (id) => api.get(`/courses/${id}`),
    create: (data) => api.post("/courses", data),
    update: (id, data) => api.patch(`/courses/${id}`, data),
    delete: (id) => api.delete(`/courses/${id}`),
    updateStatus: (id, status) => api.patch(`/courses/${id}/status`, { status }),
    setFinalExam: (id, final_exam) => api.patch(`/courses/${id}/final-exam`, { final_exam }),
    getTree: (id) => api.get(`/courses/${id}/tree`),
    getUserCourses: (userId) => api.get(`/courses/users/${userId}/courses`)
};
