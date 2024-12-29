"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import styles from "./authorization.module.css";
import { Container } from 'postcss';

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState('');

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost/api/token/', {
        username,
        password,
      });
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      router.push('/');
    } catch (err) {
      setError('Неправильный username или пароль');
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/api/register', formData);
      setSuccess(response.data.message);
      router.push('/'); // вы можете изменить это на редирект, куда вам нужно
    } catch (err: any) {
      setError('Ошибка регистрации');
    }
  };

  return (
  <div>
    <p><a href="/" className={styles.return}>Вернуться</a></p>
    <p><a href="/about" className={styles.forwhat}>Для чего это?</a></p>
    <div className={styles.logcontainer}>
          <form onSubmit={handleRegisterSubmit} className={styles.register}>
            <h2>Регистрация</h2>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleRegisterChange}
                required
                />
            </div>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleRegisterChange}
                required
                />
            </div>
            <div>
              <label>Пароль:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleRegisterChange}
                required
                />
            </div>
            <button className={styles.accept}>Зарегистрироваться</button>
          </form>
              <form onSubmit={handleLoginSubmit} className={styles.login}>
            <h2>Вход</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
                <div>
                  <label>Username:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </div>
                <div>
                  <label>Пароль:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button className={styles.accept}>Вход</button>
              </form>
    </div>
   </div>
  );
};

export default AuthPage;