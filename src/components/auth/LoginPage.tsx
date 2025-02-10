import AuthForm from "./AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <AuthForm mode="login" />
    </div>
  );
}
