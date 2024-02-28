import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.get('/api', (req, res) => {
  res.json({message: "duck"})
  // res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

app.on('error', (err: any) => {
  console.error('Error starting server:', err);
});
