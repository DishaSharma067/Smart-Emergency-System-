const sendSMS = async (to, message) => {
  console.log("📲 SMS SENT TO:", to);
  console.log("MESSAGE:", message);
};

module.exports = sendSMS;