import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearAllUserErrors, updatePassword } from "@/store/slice/user-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, isAuthenticated, error } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const navidateTo = useNavigate();

  const handleUpdatePassword = (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    dispatch(updatePassword({ currentPassword, newPassword, confirmPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isAuthenticated) {
      navidateTo("/");
    }
  }, [isAuthenticated, error]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdatePassword(currentPassword, newPassword, confirmPassword);
        }}
        className="w-full h-full"
      >
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Button className="w-full">Update Password</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
