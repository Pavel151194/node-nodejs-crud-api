import { config } from 'dotenv';
import createSerever from './core/server';

config();

const PORT = process.env.PORT;

const server = createSerever();

server.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
