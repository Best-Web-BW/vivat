import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {
    Home,
    About,
    Gallery,
    Services,
    Events,
    News,
    Contacts
} from "./components/pages";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <div className="App">
            <Router>
                <header className="App-header">
                    <Header />
                </header>
                <main className="App-main content">
                    <ScrollToTop />
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/gallery" component={Gallery} />
                        <Route path="/services" component={Services} />
                        <Route path="/events" component={Events} />
                        <Route path="/news" component={News} />
                        <Route path="/contacts" component={Contacts} />
                        <Route path="/">
                            <Redirect to="/home" />
                        </Route>
                    </Switch>
                </main>
                <footer className="App-footer">
                    <Footer />
                </footer>
            </Router>
        </div>
    );
}

export default App;