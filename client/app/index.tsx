import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function App() {
  const [response, setResponse] = useState<string>('Waiting for response...');

  useEffect(() => {
    fetch('https://8fe9-109-67-176-145.ngrok-free.app/ping')
      .then((res) => res.json())
      .then((data: { message: string }) => setResponse(data.message))
      .catch((err) => setResponse('Error: ' + err.message));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{response}</Text>
    </View>
  );
}
