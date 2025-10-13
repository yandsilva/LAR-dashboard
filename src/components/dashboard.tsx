import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Link } from "react-router-dom";

import { projects } from "../data/data";

export default function Dashboard() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardDescription className="max-w-lg text-balance leading-relaxed ">
                  {/* {user.aboutMe} */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link
                  to={"#"}
                  // to={user.portfolioURL && user.portfolioURL}
                  target="_blank"
                >
                  <Button>Visitar</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-center">
              <CardHeader className="pb-2">
                <CardTitle>Projects Completed</CardTitle>
                <CardTitle className="text-5xl">
                  {/* {projects && projects.length}  */}9
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={"/manage/projects"}>
                  <Button>Manage Projects</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-center">
              <CardHeader className="pb-2">
                <CardTitle>Skills</CardTitle>
                <CardTitle className="text-5xl">
                  {/* {skills && skills.length} */}12
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={"/manage/skills"}>
                  <Button>Manage Skills</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          <Tabs defaultValue="projects">
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
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
                          Visit
                        </TableHead>
                      </TableRow>
                      {projects && projects.length > 0 ? (
                        projects.map((element) => {
                          return (
                            <TableRow className="bg-accent" key={element._id}>
                              <TableCell>
                                <div className="font-semibold">
                                  {element.title}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-semibold">
                                  {element.name}
                                </div>
                              </TableCell>

                              <TableCell className="text-right">
                                <Link
                                  to={
                                    element.projectLink
                                      ? `${element.projectLink}`
                                      : ""
                                  }
                                  target="_blank"
                                >
                                  <Button>Visit</Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell className="text-3xl overflow-y-hidden">
                            You have not added any projects.
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
    </div>
  );
}
