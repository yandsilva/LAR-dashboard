import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUpdatePassword = (
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => {
    console.log(currentPassword, newPassword, confirmNewPassword);
  };

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Alterar Senha</h1>
              <p className="mb-5">Altere a senha da sua pagina</p>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label>Senha antiga</Label>
              <Input
                type="text"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Nova Senha</Label>
              <Input
                type="text"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Confirme sua senha</Label>
              <Input
                type="text"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Button
                onClick={() =>
                  handleUpdatePassword(
                    currentPassword,
                    newPassword,
                    confirmNewPassword
                  )
                }
                className="w-full"
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
