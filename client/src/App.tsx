import { Switch, Route } from "wouter";
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
import Foundations from "@/pages/work/Foundations";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work" component={Work} />
      <Route path="/work/shopify" component={Shopify} />
      <Route path="/work/utopia" component={Utopia} />
      <Route path="/work/foundations" component={Foundations} />
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
