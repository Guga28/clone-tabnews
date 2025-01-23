function status(requet, response) {
  response.status(200).json({ Declaração: "Eu amo a Sara e o Bento!" });
}

export default status;
