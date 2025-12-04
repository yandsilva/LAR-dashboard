import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAppSelector } from "@/store/store";

interface PrecisoAjudaProps {
  ID: string;
  NAME: string;
  TELEFONE: string;
  EMAIL: string;
  ASSUNTO: string;
  CIDADE: string;
  ESTADO: string;
  TREMOR: string;
  CANSACO: string;
  DESANIMO: string;
  FALTAAR: string;
  AGONIA: string;
  FALTAFOCO: string;
  ALTERACAOHUMOR: string;
  SENSACAOCONEXAO: string;
  PREOCUPACAOPESO: string;
  PERDAINTERESSE: string;
  ABUSOFISICO: string;
  ABUSOPSICOLOGICO: string;
  ABUSOSEXUAL: string;
  ABUSOPATRIMONIAL: string;
  ABUSOMORAL: string;
}

interface QueroAjudarProps {
  ID: string;
  NAME: string;
  TELEFONE: string;
  EMAIL: string;
  VALOR: string;
  CIDADE: string;
  ESTADO: string;
}

export default function Dashboard() {
  const [infoPrecisoAjuda, setInfoPrecisoAjuda] =
    useState<PrecisoAjudaProps | null>(null);
  const [precisoAjuda, setPrecisoAjuda] = useState<PrecisoAjudaProps[] | null>(
    []
  );
  const [infoQueroAjudar, setInfoQueroAjudar] =
    useState<QueroAjudarProps | null>(null);
  const [queroAjudar, setQueroAjudar] = useState<QueroAjudarProps[] | null>([]);

  const { user } = useAppSelector((state) => state.user);

  async function handlePrecisoAjuda() {
    const response = await fetch(
      "https://lar-backend.onrender.com/FormularioPrecisoAjuda",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const json = await response.json();
    setPrecisoAjuda(json);
  }
  async function handleQueroAjudar() {
    const response = await fetch(
      "https://lar-backend.onrender.com/FormularioQueroAjudar",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const json = await response.json();
    setQueroAjudar(json);
    console.log(json);
  }

  useEffect(() => {
    handlePrecisoAjuda();
    handleQueroAjudar();
  }, []);

  function handleClick(data: {
    ID: string;
    NAME: string;
    TELEFONE: string;
    EMAIL: string;
    ASSUNTO: string;
    CIDADE: string;
    ESTADO: string;
    TREMOR: string;
    CANSACO: string;
    DESANIMO: string;
    FALTAAR: string;
    AGONIA: string;
    FALTAFOCO: string;
    ALTERACAOHUMOR: string;
    SENSACAOCONEXAO: string;
    PREOCUPACAOPESO: string;
    PERDAINTERESSE: string;
    ABUSOFISICO: string;
    ABUSOPSICOLOGICO: string;
    ABUSOSEXUAL: string;
    ABUSOPATRIMONIAL: string;
    ABUSOMORAL: string;
  }) {
    setInfoPrecisoAjuda(data);
  }
  function handleClick2(data: {
    ID: string;
    NAME: string;
    TELEFONE: string;
    EMAIL: string;
    VALOR: string;
    CIDADE: string;
    ESTADO: string;
  }) {
    setInfoQueroAjudar(data);
  }

  function handleClose() {
    setInfoPrecisoAjuda(null);
  }
  function handleClose2() {
    setInfoQueroAjudar(null);
  }

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 relative">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardDescription className="max-w-lg text-balance leading-relaxed ">
                  {user?.ABOUT}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="flex flex-col justify-center">
              <CardHeader className="pb-2">
                <CardTitle>Entrado em Contato</CardTitle>
                <CardTitle className="text-5xl">
                  {precisoAjuda && precisoAjuda.length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          <Tabs defaultValue="projects">
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Pessoas</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-white">
                        <TableHead className="w-2/3 text-zinc-400">
                          Titulo
                        </TableHead>
                        <TableHead className="w-1/3 text-zinc-400">
                          Nome
                        </TableHead>
                        <TableHead className="w-1/3 text-zinc-400">
                          Informações
                        </TableHead>
                      </TableRow>
                      {precisoAjuda && precisoAjuda.length > 0 ? (
                        precisoAjuda.map((element) => {
                          return (
                            <TableRow className="bg-accent" key={element.ID}>
                              <TableCell>
                                <div className="font-semibold">
                                  {element.ASSUNTO}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-semibold">
                                  {element.NAME}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  onClick={() =>
                                    handleClick({
                                      ID: element.ID,
                                      ASSUNTO: element.ASSUNTO,
                                      NAME: element.NAME,
                                      TELEFONE: element.NAME,
                                      EMAIL: element.EMAIL,
                                      CIDADE: element.CIDADE,
                                      ESTADO: element.ESTADO,
                                      TREMOR: element.TREMOR,
                                      CANSACO: element.CANSACO,
                                      DESANIMO: element.DESANIMO,
                                      FALTAAR: element.FALTAAR,
                                      AGONIA: element.AGONIA,
                                      FALTAFOCO: element.FALTAAR,
                                      ALTERACAOHUMOR: element.ALTERACAOHUMOR,
                                      SENSACAOCONEXAO: element.SENSACAOCONEXAO,
                                      PREOCUPACAOPESO: element.PREOCUPACAOPESO,
                                      PERDAINTERESSE: element.PERDAINTERESSE,
                                      ABUSOFISICO: element.ABUSOFISICO,
                                      ABUSOPSICOLOGICO:
                                        element.ABUSOPSICOLOGICO,
                                      ABUSOSEXUAL: element.ABUSOSEXUAL,
                                      ABUSOPATRIMONIAL:
                                        element.ABUSOPATRIMONIAL,
                                      ABUSOMORAL: element.ABUSOMORAL,
                                    })
                                  }
                                >
                                  Preciso de Ajuda
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell className="text-3xl overflow-y-hidden">
                            Você não tem nenhuma solicitação
                          </TableCell>
                        </TableRow>
                      )}
                    </TableHeader>
                  </Table>
                </CardContent>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-white">
                        <TableHead className="w-2/3 text-zinc-400">
                          Titulo
                        </TableHead>
                        <TableHead className="w-1/3 text-zinc-400">
                          Nome
                        </TableHead>
                        <TableHead className="w-1/3 text-zinc-400">
                          Informações
                        </TableHead>
                      </TableRow>
                      {queroAjudar && queroAjudar.length > 0 ? (
                        queroAjudar.map((element) => {
                          return (
                            <TableRow className="bg-accent" key={element.ID}>
                              <TableCell>
                                <div className="font-semibold">
                                  {element.EMAIL}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-semibold">
                                  {element.NAME}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  onClick={() =>
                                    handleClick2({
                                      ID: element.ID,
                                      NAME: element.NAME,
                                      TELEFONE: element.TELEFONE,
                                      EMAIL: element.EMAIL,
                                      VALOR: element.VALOR,
                                      CIDADE: element.CIDADE,
                                      ESTADO: element.ESTADO,
                                    })
                                  }
                                >
                                  Doações
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell className="text-3xl overflow-y-hidden">
                            Você não tem nenhuma solicitação
                          </TableCell>
                        </TableRow>
                      )}
                    </TableHeader>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      {infoPrecisoAjuda && (
        <div
          key={infoPrecisoAjuda.ID}
          className="absolute flex top-0 right-0 w-full h-full items-center justify-center"
        >
          <div className="flex border-2 border-zinc-700 bg-[#18181b] text-zinc-100 rounded-lg flex-col p-10 gap-4">
            <div className="flex justify-between gap-30 items-center">
              <p className="text-xl font-bold">
                Nome:{" "}
                <span className="font-semibold">{infoPrecisoAjuda.NAME}</span>
              </p>
              <X onClick={handleClose} className="cursor-pointer" />
            </div>
            <div className="flex items-center justify-center gap-10">
              <div className="flex flex-col gap-2">
                <p className="font-bold">
                  E-mail:{" "}
                  <span className="font-semibold">
                    {infoPrecisoAjuda.EMAIL}
                  </span>
                </p>
                <p className="font-bold">
                  Telefone:{" "}
                  <span className="font-semibold">
                    {infoPrecisoAjuda.TELEFONE}
                  </span>
                </p>
              </div>
              <div className="w-0.5 h-10 bg-zinc-100" />
              <div className="flex flex-col gap-2">
                <p className="font-bold">
                  Cidade:{" "}
                  <span className="font-semibold">
                    {infoPrecisoAjuda.CIDADE}
                  </span>
                </p>
                <p className="font-bold">
                  Estado:{" "}
                  <span className="font-semibold">
                    {infoPrecisoAjuda.ESTADO}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-bold">
                Assunto:{" "}
                <span className="font-semibold">
                  {infoPrecisoAjuda.ASSUNTO}
                </span>
              </p>
              <div className="flex flex-col gap-1">
                <p className="font-bold">O que você sente?</p>
                <div className="grid grid-cols-3 gap-2">
                  {infoPrecisoAjuda.TREMOR && (
                    <p className="font-semibold">Tremor</p>
                  )}
                  {infoPrecisoAjuda.CANSACO && (
                    <p className="font-semibold">Cansaço</p>
                  )}
                  {infoPrecisoAjuda.DESANIMO && (
                    <p className="font-semibold">Desanimo</p>
                  )}
                  {infoPrecisoAjuda.FALTAAR && (
                    <p className="font-semibold">Fata de Ar</p>
                  )}
                  {infoPrecisoAjuda.AGONIA && (
                    <p className="font-semibold">Agonia</p>
                  )}
                  {infoPrecisoAjuda.FALTAFOCO && (
                    <p className="font-semibold">Falta de Foco</p>
                  )}
                  {infoPrecisoAjuda.ALTERACAOHUMOR && (
                    <p className="font-semibold">Alteração de Humor</p>
                  )}
                  {infoPrecisoAjuda.SENSACAOCONEXAO && (
                    <p className="font-semibold">Sensação de desconexão</p>
                  )}
                  {infoPrecisoAjuda.PREOCUPACAOPESO && (
                    <p className="font-semibold">Preocupação de Peso</p>
                  )}
                  {infoPrecisoAjuda.PERDAINTERESSE && (
                    <p className="font-semibold">Perda de Interesse</p>
                  )}
                  {infoPrecisoAjuda.ABUSOPSICOLOGICO && (
                    <p className="font-semibold">Abuso Psicologico</p>
                  )}
                  {infoPrecisoAjuda.ABUSOFISICO && (
                    <p className="font-semibold">Abuso Fisico</p>
                  )}
                  {infoPrecisoAjuda.ABUSOSEXUAL && (
                    <p className="font-semibold">Abuso Sexual</p>
                  )}
                  {infoPrecisoAjuda.ABUSOPATRIMONIAL && (
                    <p className="font-semibold">Abuso Patrimonial</p>
                  )}
                  {infoPrecisoAjuda.ABUSOMORAL && (
                    <p className="font-semibold">Abuso Moral</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {infoQueroAjudar && (
        <div
          key={infoQueroAjudar.ID}
          className="absolute flex top-0 right-0 w-full h-full items-center justify-center"
        >
          <div className="flex border-2 border-zinc-700 bg-[#18181b] text-zinc-100 rounded-lg flex-col p-10 gap-4">
            <div className="flex justify-between gap-30 items-center">
              <p className="text-xl font-bold">
                Nome:{" "}
                <span className="font-semibold">{infoQueroAjudar.NAME}</span>
              </p>
              <X onClick={handleClose2} className="cursor-pointer" />
            </div>
            <div className="flex items-center justify-center gap-10">
              <div className="flex flex-col gap-2">
                <p className="font-bold">
                  E-mail:{" "}
                  <span className="font-semibold">{infoQueroAjudar.EMAIL}</span>
                </p>
                <p className="font-bold">
                  Telefone:{" "}
                  <span className="font-semibold">
                    {infoQueroAjudar.TELEFONE}
                  </span>
                </p>
              </div>
              <div className="w-0.5 h-10 bg-zinc-100" />
              <div className="flex flex-col gap-2">
                <p className="font-bold">
                  Cidade:{" "}
                  <span className="font-semibold">
                    {infoQueroAjudar.CIDADE}
                  </span>
                </p>
                <p className="font-bold">
                  Estado:{" "}
                  <span className="font-semibold">
                    {infoQueroAjudar.ESTADO}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-bold">
                Valor:{" "}
                <span className="font-semibold">
                  {Number(infoQueroAjudar.VALOR).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
