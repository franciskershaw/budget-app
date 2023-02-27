import { FC, ReactElement, useRef, useState } from 'react';
import { RegisterFormData } from '../../types/types';

const RegisterPage: FC = (): ReactElement => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: RegisterFormData) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}

  return (
    <div>
      <section className="h-screen flex justify-center items-center">
        <form onSubmit={onSubmit} className="border border-black">
          <h1 className="text-center">Log in to Budget App</h1>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={onChange}
              className="border"
              type="email"
              id="email"
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={onChange}
              className="border"
              type="text"
              id="username"
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={onChange}
              className="border"
              type="password"
              id="password"
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              className="border"
              type="password"
              id="confirmPassword"
              autoComplete="off"
              required
            />
          </div>
          <div className="text-center">
            <button className="training-wheels">Login</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
