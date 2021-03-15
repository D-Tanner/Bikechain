export const getImage = (level) => {
  if (level === "Easiest") return (`${process.env.PUBLIC_URL}/easiest.png`)
  if (level === "Easy") return ("/easy.png")
  if (level === "More Difficult") return ("/more-difficult.png")
  if (level === "Very Difficult") return ("/very-difficult.png")
  if (level === "Extremely Difficult") return ("/extremely-difficult.png")
}

export const getLevel = (level) => {
  if (level === "Novice") return ("/novice.png")
  if (level === "Intermediate") return ("/intermediate.png")
  if (level === "Intermediate+") return ("/intermediate-plus.png")
  if (level === "Advanced") return ("/advanced.png")
  if (level === "Advanced+") return ("/advanced-plus.png")
}
