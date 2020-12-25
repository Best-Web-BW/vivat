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
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/gallery">
                            <Gallery />
                        </Route>
                        <Route path="/services">
                            <Services />
                        </Route>
                        <Route path="/events">
                            <Events />
                        </Route>
                        <Route path="/news">
                            <News />
                        </Route>
                        <Route path="/contacts">
                            <Contacts />
                        </Route>
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