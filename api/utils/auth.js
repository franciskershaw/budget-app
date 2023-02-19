const validate = async (decoded, request, h) => {
  // Check if the user exists in the database
  const user = await User.findById(decoded.id);

  if (!user) {
    return { isValid: false };
  }

  return { isValid: true };
};

module.exports = { validate };
