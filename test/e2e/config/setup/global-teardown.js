module.exports = async function () {
  await globalThis.__CONTAINER__.down();

  console.log('CONTAINER DOWN');
};
