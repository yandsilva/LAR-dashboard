import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "../store/slice/user-slice";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { useAppDispatch, useAppSelector } from "@/store/store";

const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  const { loading, error, isUpdate, message } = useAppSelector(
    (state) => state.user
  );

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [linkedInURL, setLinkedInURL] = useState("");
  const [instagramURL, setInstagramURL] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("EMPRESA", fullName);
    formData.append("PHONE", phone);
    formData.append("ABOUT", aboutMe);
    formData.append("LINKEDIN", linkedInURL);
    formData.append("INSTAGRAM", instagramURL);
    formData.append("FACEBOOK", facebookURL);

    if (avatar) formData.append("IMAGE", avatar);

    dispatch(updateProfile(formData));
    for (let pair of formData.entries()) console.log(pair);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isUpdate) {
      dispatch(getUser());
      dispatch(resetProfile());
    }

    if (message) toast.success(message);
  }, [error, message, isUpdate, dispatch]);

  return (
    <form
      className="w-full h-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdateProfile();
      }}
    >
      <div className="grid w-full gap-6">
        <h1 className="text-3xl font-bold">Atualização do Perfil</h1>
        <p className="text-muted-foreground">Atualize seu perfil aqui</p>

        <div className="grid gap-4">
          {/* Avatar */}
          <div className="grid gap-2">
            <Label>Imagem do perfil</Label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              className="avatar-update-btn"
            />
          </div>

          <Label>Empresa</Label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Label>Telefone</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />

          <Label>Sobre a empresa</Label>
          <Textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />

          <Label>LinkedIn</Label>
          <Input
            value={linkedInURL}
            onChange={(e) => setLinkedInURL(e.target.value)}
          />

          <Label>Instagram</Label>
          <Input
            value={instagramURL}
            onChange={(e) => setInstagramURL(e.target.value)}
          />

          <Label>Facebook</Label>
          <Input
            value={facebookURL}
            onChange={(e) => setFacebookURL(e.target.value)}
          />

          {!loading ? (
            <Button type="submit" className="w-full">
              Atualizar Perfil
            </Button>
          ) : (
            <SpecialLoadingButton content="Atualizando..." width="100%" />
          )}
        </div>
      </div>
    </form>
  );
};

export default UpdateProfile;
