import React, { useState } from 'react';
import { GreeterClient } from './proto/greet_grpc_web_pb';
import { HelloRequest } from './proto/greet_pb';
import { Container, TextField, Button, Typography } from '@mui/material';

const client = new GreeterClient('https://rpcapp-b7cucdd4h2a0htfg.southindia-01.azurewebsites.net', null, null);

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleClick = () => {
    const request = new HelloRequest();
    request.setName(name);

    client.sayHello(request, {}, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      setMessage(response.getMessage());
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <Container style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        gRPC React Client
      </Typography>
      <TextField
        label="Enter your name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleClick} style={{ marginTop: 16 }}>
        Make the gRPC Call
      </Button>
      <Typography variant="h6" style={{ marginTop: 20 }}>
        {message}
      </Typography>
    </Container>
  );
}

export default App;
