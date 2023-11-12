import React from 'react';
import Header from '../Header/Header'
import AppRouter from "../AppRouter/AppRouter";
import Footer from "../Footer/Footer";

const App: React.FC = () => (
    <div className={`wrapper`}>
        <Header/>
        <main>
            <AppRouter/>
        </main>
        <Footer/>
    </div>
);


export default App;