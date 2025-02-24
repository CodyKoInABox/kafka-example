const producer = kafka.producer();

const sendMessage = async () => {
  try {
    await producer.connect();
    console.log("Producer connected!");
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: 'Hello Kafka!' }],
    });
    console.log('Message sent!');
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    await producer.disconnect();
  }
};

sendMessage();
