import { Route, Switch } from 'wouter';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Features } from './pages/Features';
import { Contact } from './pages/Contact';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/features" component={Features} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}
