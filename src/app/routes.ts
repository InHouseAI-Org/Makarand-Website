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
      { path: "project/:id", Component: ProjectDetail },
    ],
  },
]);
