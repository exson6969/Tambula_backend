// Utility function to generate a unique ticket ID
exports.generateTicketId = () => {
    // Generate a random string using timestamp and a random number
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 1000).toString();
    return timestamp * randomNum;
  };
  
