import { useEffect } from "react";
import ContentLeft from "./components/content-left";
import ContentRight from "./components/content-right";

const Login = () => {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
  }, []);
  return (
    <main className="min-h-screen  flex">
      <ContentLeft />
      <ContentRight />
    </main>
  );
};

export default Login;
