import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { userContext } from "@/context/user";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const formScherma = z.object({
  email: z.email({ error: "E-mail inválido." }),
  password: z.string().min(6, "O mínimo de caracteres é 8."),
});
const LoginForm = () => {
  const [isLoading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  type FormSchema = z.infer<typeof formScherma>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formScherma),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signin } = useContext(userContext);

  const handleForm = ({ email, password }: FormSchema) => {
    if (email === "admin@gmail.com" && password === "12345678") {
      setIsloading(true);
      setTimeout(() => {
        signin({ email });
        navigate("/");
      }, 2000);
      return;
    }

    toast.error("Usuário ou senha inválidos.");
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleForm)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div>
                  <FormLabel className="absolute -top-5 left-0 text-xs text-label font-semibold ">
                    Email
                  </FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-icon" />
                    </div>
                    <Input
                      {...field}
                      placeholder="seu@email.com"
                      className="w-full h-full pl-11 pr-4 py-3 bg-input-bg border border-input-border rounded-xl text-foreground placeholder:text-placeholder text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all duration-200"
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel
                      htmlFor="password"
                      className="block text-sm font-medium text-foreground font-sans"
                    >
                      Senha
                    </FormLabel>
                    <button
                      type="button"
                      className="text-sm text-brand hover:text-brand-dark font-medium font-sans transition-colors duration-200"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-icon" />
                    </div>

                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="seu@email.com"
                      className="w-full h-full pl-11 pr-4 py-3 bg-input-bg border border-input-border rounded-xl text-foreground placeholder:text-placeholder text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all duration-200"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-icon hover:text-foreground transition-colors duration-200"
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-3">
          <Checkbox id="remember" />

          <Label
            htmlFor="remember"
            className="text-sm text-black font-sans cursor-pointer select-none"
          >
            Manter-me conectado por 30 dias
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-surface h-full text-white font-semibold rounded-xl transition-all duration-200 font-sans text-sm flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
