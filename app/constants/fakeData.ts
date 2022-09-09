import bcrypt from 'bcryptjs';

export const u0 = {
  username: '',
  lastname: '',
  email: '',
  password: ''
};

export const u1 = {
  username: 'u1',
  lastname: 'u1',
  email: 'u1@wolox.com',
  password: bcrypt.hashSync('u1U1u1U1', 10),
  role: 'standard'
};

export const u2 = {
  username: 'u2',
  lastname: 'u2',
  email: 'u2@wolox.com',
  password: bcrypt.hashSync('u2U2u2U2', 10),
  role: 'standard'
};

export const u2fake = {
  username: 'u2',
  lastname: 'u2',
  email: 'u2@wolox.com',
  password: 'u2U2u2U2'
};

export const u3 = {
  username: 'u3',
  lastname: 'u3',
  email: 'u3@wolox.com',
  password: bcrypt.hashSync('u3U3u3U3', 10)
};

export const u3fake = {
  username: 'u3',
  lastname: 'u3',
  email: 'u3@wolox.com',
  password: '1234'
};

export const u3wolox = {
  email: 'u3@wolox.com'
};

export const tokenStandard = {
  Authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJqb2huIiwibGFzdG5hbWUiOiJkb3ciLCJlbWFpbCI6ImpvaG4uZG93QHdvbG94LmNvbSIsInJvbGUiOiJzdGFuZGFyZCJ9.3VLXNit8C6VsMixaHa6Ho-euevoKKZZqwWrn_FkHfsw'
};

export const tokenAdmin = {
  Authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huIiwibGFzdG5hbWUiOiJkb3ciLCJlbWFpbCI6ImpvaG4uZG93QHdvbG94LmNvbSIsInJvbGUiOiJhZG1pbiJ9.MWeUu0OO-bkB0ByLjMXRYiJH5fQ-ykL8iEkN6HNOBRQ'
};

export default {
  u0,
  u1,
  u2,
  u2fake,
  u3,
  u3fake,
  u3wolox,
  tokenStandard,
  tokenAdmin
};
