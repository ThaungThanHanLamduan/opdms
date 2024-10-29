export type signInDataType = {
    email: string,
    password: string
}

export type signUpDataType = {
    email: string,
    password: string,
    confirmPassword: string
}

export type authContextType = {
    token : string | null;
    login : (token: string) => void;
    logout : () => void
}