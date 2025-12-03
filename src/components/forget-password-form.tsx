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

export function ForgetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { loading, isAuthenticated, error } = useAppSelector(
    (state) => state.user
  );
  const navigateTo = useNavigate();

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
          <h1 className="text-2xl font-bold">Recuperar Senha</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Digite seu e-mail abaixo para recuperar a senha
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insira seu e-mail"
            required
          />
        </Field>
        <Field>
          <Button onClick={() => {}} type="submit">
            Enviar
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
