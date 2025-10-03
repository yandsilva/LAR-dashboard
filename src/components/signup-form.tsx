import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha o formulário abaixo para criar sua conta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
          <Input id="name" type="text" placeholder="Yan Silva" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Insira seu e-mail"
            required
          />
          <FieldDescription>
            Usaremos isso para entrar em contato com você. Não compartilharemos
            seu e-mail com mais ninguém.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input id="password" type="password" required />
          <FieldDescription>Deve ter pelo menos 8 caracteres.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirme sua senha</FieldLabel>
          <Input id="confirm-password" type="password" required />
          <FieldDescription>Por favor confirme sua senha.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Criar uma conta</Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Já tem uma conta? <Link to="/sign-in">Entrar</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
