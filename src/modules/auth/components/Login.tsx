import { LoginForm } from './LoginForm';
import { Logo } from './Logo';

export const Login = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-custom-gradient p-6 font-roboto md:flex-row md:gap-6 md:pr-12 lg:gap-14 ">
      <Logo />
      <LoginForm />
    </main>
  );
};
