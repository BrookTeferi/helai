// app/register/page.tsx
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="page-container">
      <h1>Register</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
