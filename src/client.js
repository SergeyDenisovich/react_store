import { client } from '@tilework/opus';

client.setEndpoint('http://localhost:4000');
client.setHeaders('content-type', 'application/json');

export { client };
