const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

// Helper wrapper untuk menangani HTTP Request
async function request(endpoint, options = {}, withAuth = false) {
  const headers = { ...options.headers };

  if (withAuth) {
    headers.Authorization = `Bearer ${getAccessToken()}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}

async function register({ name, email, password }) {
  const data = await request('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return data.user;
}

async function login({ email, password }) {
  const data = await request('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return data.token;
}

async function getOwnProfile() {
  const data = await request('/users/me', {}, true);
  return data.user;
}

async function getAllUsers() {
  const data = await request('/users');
  return data.users;
}

async function createThread({ title, body, category }) {
  const data = await request(
    '/threads',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, category }),
    },
    true,
  );
  return data.thread;
}

async function getAllThreads() {
  const data = await request('/threads');
  return data.threads;
}

async function getThreadDetail(id) {
  const data = await request(`/threads/${id}`);
  return data.detailThread;
}

async function createComment(threadId, content) {
  const data = await request(
    `/threads/${threadId}/comments`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    },
    true,
  );
  return data.comment;
}

async function upVoteThread(threadId) {
  const data = await request(
    `/threads/${threadId}/up-vote`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    true,
  );
  return data.vote;
}

async function downVoteThread(threadId) {
  const data = await request(
    `/threads/${threadId}/down-vote`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    true,
  );
  return data.vote;
}

async function neutralVoteThread(threadId) {
  const data = await request(
    `/threads/${threadId}/neutral-vote`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    true,
  );
  return data.vote;
}

async function upVoteComment(threadId, commentId) {
  const data = await request(
    `/threads/${threadId}/comments/${commentId}/up-vote`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    true,
  );
  return data.vote;
}

async function downVoteComment(threadId, commentId) {
  const data = await request(
    `/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    true,
  );
  return data.vote;
}

async function neutralVoteComment(threadId, commentId) {
  const data = await request(
    `/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    true,
  );
  return data.vote;
}

async function getLeaderboards() {
  const data = await request('/leaderboards');
  return data.leaderboards;
}

export {
  getAccessToken,
  putAccessToken,
  register,
  login,
  getOwnProfile,
  getAllUsers,
  createThread,
  getAllThreads,
  getThreadDetail,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  getLeaderboards,
};
