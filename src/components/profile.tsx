import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import minion from "../assets/minion.png";
import { useAppSelector } from "@/store/store";

export default function Profile() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Perfil</h1>
              <p className="mb-5">Visualização completa do perfil</p>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Profile Image</Label>
                <img
                  src={
                    `https://lar-dashboard.vercel.app${user?.IMAGE}` || minion
                  }
                  alt="avatar"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Nome da Empresa</Label>
              <Input type="text" defaultValue={user?.NAME} disabled />
            </div>
            <div className="grid gap-2">
              <Label>E-mail</Label>
              <Input type="text" defaultValue={user?.EMAIL} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Telefone</Label>
              <Input type="text" defaultValue={user?.PHONE} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Sobre</Label>
              <Textarea defaultValue={user?.ABOUT} disabled />
            </div>
            <div className="grid gap-2">
              <Label>LinkedIn URL</Label>
              <Input defaultValue={user?.LINKEDIN} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Instagram URL</Label>
              <Input defaultValue={user?.INSTAGRAM} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Facebook URL</Label>
              <Input defaultValue={user?.FACEBOOK} disabled />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
