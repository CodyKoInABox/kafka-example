const express = require('express');
const { Kafka } = require('kafkajs');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors());

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'], 
  });
  
  
  

const producer = kafka.producer();

app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
  const { message } = req.body;

  try {
    await producer.connect();
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: message },
      ],
    });
    await producer.disconnect();
    res.status(200).send({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to send message.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
