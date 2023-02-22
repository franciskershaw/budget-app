import { FC, ReactElement, useState } from 'react';
import { LoginFormData } from '../../types/types';
import { useAuth } from '../../hooks/auth/useAuth';

const LoginPage: FC = (): ReactElement => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const { login } = useAuth();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: LoginFormData) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={onSubmit} className="border border-black">
        <h1 className="text-center">Log in to Budget App</h1>
        <div>
          <label htmlFor="">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={onChange}
            className="border"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={onChange}
            className="border"
            type="password"
          />
        </div>
        <div className="text-center">
          <button className="training-wheels">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
