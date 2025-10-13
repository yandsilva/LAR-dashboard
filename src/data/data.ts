export interface Project {
  _id: string;
  title: string;
  name: string;

  projectLink?: string;
}

export const projects: Project[] = [
  {
    _id: "1",
    title: "Portfolio Website",
    name: "Yan Silva",
    projectLink: "https://yandsilva.dev",
  },
  {
    _id: "2",
    title: "API Restful com Node.js",
    name: "Jean Silva",
    projectLink: "https://github.com/yandsilva/backend-api",
  },
  {
    _id: "3",
    title: "Painel Administrativo",
    name: "Gabriel Silva",
    projectLink: "https://admin.yandsilva.dev",
  },
  {
    _id: "4",
    title: "Aplicativo de Finanças",
    name: "Beatriz Silva",
    projectLink: "https://github.com/yandsilva/finance-app",
  },
  {
    _id: "5",
    title: "Sistema de Delivery",
    name: "Saulo Silva",
    projectLink: "https://github.com/yandsilva/delivery-system",
  },
];
