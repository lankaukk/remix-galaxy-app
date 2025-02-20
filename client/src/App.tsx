import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import MainNav from "@/components/layout/MainNav";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Shopify from "@/pages/work/Shopify";
import Utopia from "@/pages/work/Utopia";
import UiSimplification from "@/pages/work/utopia/UiSimplification";
import Multiplayer from "@/pages/work/utopia/Multiplayer";
import ProjectsPage from "@/pages/work/utopia/ProjectsPage";
import Foundations from "@/pages/work/Foundations";
import Typography from "@/pages/work/foundations/Typography";
import JournalApp from "@/pages/work/foundations/JournalApp";
import Blank from "@/pages/work/foundations/Blank";
import PexelArt from "@/pages/work/foundations/PexelArt";
import NoLikes from "@/pages/work/foundations/NoLikes";
import RobotPigeon from "@/pages/work/foundations/RobotPigeon";
import ModernPotions from "@/pages/work/foundations/ModernPotions";
import ProtestPlatform from "@/pages/work/foundations/ProtestPlatform";
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work" component={Work} />
      <Route path="/work/shopify" component={Shopify} />
      <Route path="/work/utopia" component={Utopia} />
      <Route path="/work/utopia/ui_simplification" component={UiSimplification} />
      <Route path="/work/utopia/multiplayer" component={Multiplayer} />
      <Route path="/work/utopia/projects_page" component={ProjectsPage} />
      <Route path="/work/foundations" component={Foundations} />
      <Route path="/work/foundations/typo" component={Typography} />
      <Route path="/work/foundations/journal_app" component={JournalApp} />
      <Route path="/work/foundations/blank" component={Blank} />
      <Route path="/work/foundations/pexel_art" component={PexelArt} />
      <Route path="/work/foundations/no_likes" component={NoLikes} />
      <Route path="/work/foundations/robot_pigeon" component={RobotPigeon} />
      <Route path="/work/foundations/modern_potions" component={ModernPotions} />
      <Route path="/work/foundations/protest_platform" component={ProtestPlatform} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainNav />
      <main className="min-h-screen bg-white pt-16">
        <Router />
      </main>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;