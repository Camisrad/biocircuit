import { api } from './client.js';

export const PathwaySubmission = {
  list: () => api.get('/api/submissions'),
  create: (data) => api.post('/api/submissions', data),
  updateStatus: (id, status) => api.patch(`/api/submissions/${id}/status`, { status }),
};

export const Comments = {
  list: (params) => {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/api/comments?${qs}`);
  },
  create: (data) => api.post('/api/comments', data),
  delete: (id) => api.delete(`/api/comments/${id}`),
};
