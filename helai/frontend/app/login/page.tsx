// app/login/page.tsx
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="page-container">
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
