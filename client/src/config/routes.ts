import IRoute from "../interfaces/route";
import LoginPage from "../pages/Login";
import EditPage from "../pages/EditPage";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import LearnFlashcardsPage from "../pages/LearnFlashcardsPage";
import SetPage from "../pages/SetPage";

const authRoutes: IRoute[] = [
  {
    path: "/login",
    name: "Login",
    auth: false,
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    auth: false,
    component: LoginPage,
  },
];
const setRoutes: IRoute[] = [
  {
    path: "/set/:setid/edit/",
    name: "Edit",
    auth: true,
    component: EditPage,
  },
  {
    path: "/create/:setid",
    name: "Create",
    auth: true,
    component: CreatePage,
  },
  {
    path: "/set/:setid/learn/flashcards",
    name: "Learn",
    auth: true,
    component: LearnFlashcardsPage,
  },
  {
    path: "/set/:setid",
    name: "Set",
    auth: true,
    component: SetPage,
  },
];
const mainRoutes: IRoute[] = [
  {
    path: "/",
    name: "Home",
    auth: true,
    component: HomePage,
  },
];

const routes: IRoute[] = [...authRoutes, ...setRoutes, ...mainRoutes];

export default routes;
