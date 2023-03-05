import { FC, ReactElement, useState, useEffect } from 'react';
import { LoginFormData } from '../../types/types';
import { useAuth } from '../../hooks/auth/useAuth';
import { useUser } from '../../hooks/auth/useUser';
import { useNavigate } from 'react-router-dom';

const LoginPage: FC = (): ReactElement => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { signin } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      return navigate('/spaces')
    }
  }, [user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: LoginFormData) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(formData);
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
