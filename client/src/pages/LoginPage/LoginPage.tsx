import { FC, ReactElement, useState } from 'react';

interface LoginPageState {
  username: string;
  password: string;
}

const LoginPage: FC = (): ReactElement => {
  const [formData, setFormData] = useState<LoginPageState>({
    username: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="border border-black">
        <h1 className="text-center">Log in to Budget App</h1>
        <div>
          <label htmlFor="">Username</label>
          <input
            name="username"
            value={formData.username}
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
