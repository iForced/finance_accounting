import React from 'react';
import s from './App.module.css'
import DataInputs from "./components/DataInputs/DataInputs";
import DataTable from "./components/DataTable/DataTable";

const App = () => {
    return (
        <div className={s.app}>
            <h1 className={s.title}>Лавэха</h1>
            <div className={s.container}>
                <DataInputs/>
                <DataTable/>
            </div>
        </div>
    );
};

export default App;