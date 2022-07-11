import React from 'react';
import './App.css';

import { AutoForm } from 'uniforms-mui';
import { bridge as schema } from './GuestSchema';

function App() {
  return (
    <div className="App" style={{ maxWidth: '700px', margin: 'auto', marginTop: '1rem' }}>
       <AutoForm schema={schema} onSubmit={console.log} />;
    </div>
  );
}

export default App;
