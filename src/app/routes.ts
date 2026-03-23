import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { VisionPage } from "./pages/VisionPage";
import { WorkPage } from "./pages/WorkPage";
import { WardPage } from "./pages/WardPage";
import { MediaPage } from "./pages/MediaPage";
import { ConnectPage } from "./pages/ConnectPage";
import { ProjectDetail } from "./pages/ProjectDetail";
import { MediaDetail } from "./pages/MediaDetail";
import YouthPage from "./pages/YouthPage";
import GovernmentProjectsPage from "./pages/GovernmentProjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "vision", Component: VisionPage },
      { path: "work", Component: WorkPage },
      { path: "ward", Component: WardPage },
      { path: "media", Component: MediaPage },
      { path: "connect", Component: ConnectPage },
      { path: "youth", Component: YouthPage },
      { path: "government-projects", Component: GovernmentProjectsPage },
      { path: "project/:id", Component: ProjectDetail },
      { path: "media/:type/:id", Component: MediaDetail },
    ],
  },
]);
