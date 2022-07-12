import React from 'react';
import './App.css';

import { AutoForm } from 'uniforms-mui';
import { bridge as bridgeSchema } from './GuestSchema';


const schemaStep1 = {
  email: { type: 'string'},
  repeatEmail: {type: 'string', const: {"$data": "1/email"}},
  phone: { type: 'string'}
}

const schemaStep2 = {
  theftDate:  {
    "type": "string", 
    "format": "date-time"
  },
  theftLocation: {
    type: "string"
  }
}

const schema = [schemaStep1, schemaStep2];

// ------------

function App() {
  return (
    <div className="App" style={{ maxWidth: '700px', margin: 'auto', marginTop: '1rem' }}>
       <AutoForm schema={bridgeSchema} onSubmit={console.log} />;
    </div>
  );
}

export default App;
