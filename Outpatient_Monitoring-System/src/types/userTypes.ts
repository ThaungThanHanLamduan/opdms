export type signInDataType = {
  email: string;
  password: string;
};

export type signUpDataType = {
  username: string;
  email: string;
  password: string;
};

export type authContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLogin: boolean
};
