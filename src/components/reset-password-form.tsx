import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { clearAllUserErrors } from "@/store/slice/user-slice";
import { toast } from "react-toastify";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch();
  const { loading, isAuthenticated, error } = useAppSelector(
    (state) => state.user
  );
  const navigateTo = useNavigate();

  const handleLogin = (password: string, confirmPassword: string) => {
    console.log(password, confirmPassword);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, error, loading, dispatch, navigateTo]);

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Resetar Senha</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Digite sua nova senha abaixo
          </p>
        </div>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Insira sua senha"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Confirmar Senha</FieldLabel>
          </div>
          <Input
            id="password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Insira sua senha"
            required
          />
        </Field>
        <Field>
          <Button
            onClick={() => handleLogin(password, confirmPassword)}
            type="submit"
          >
            Entrar
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Lembra da sua senha?{" "}
            <Link to="/sign-in" className="underline underline-offset-4">
              Entrar
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
