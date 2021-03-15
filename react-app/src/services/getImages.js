export const getImage = (level) => {
  if (level === "Easiest") return (`${process.env.PUBLIC_URL}/easiest.png`)
  if (level === "Easy") return (`${process.env.PUBLIC_URL}/easy.png`)
  if (level === "More Difficult") return (`${process.env.PUBLIC_URL}/more-difficult.png`)
  if (level === "Very Difficult") return (`${process.env.PUBLIC_URL}/very-difficult.png`)
  if (level === "Extremely Difficult") return (`${process.env.PUBLIC_URL}/extremely-difficult.png`)
}

export const getLevel = (level) => {
  if (level === "Novice") return (`${process.env.PUBLIC_URL}/novice.png`)
  if (level === "Intermediate") return (`${process.env.PUBLIC_URL}/intermediate.png`)
  if (level === "Intermediate+") return (`${process.env.PUBLIC_URL}/intermediate-plus.png`)
  if (level === "Advanced") return (`${process.env.PUBLIC_URL}/advanced.png`)
  if (level === "Advanced+") return (`${process.env.PUBLIC_URL}/advanced-plus.png`)
}

export const getDefaultImage = () => {
  return (`${process.env.PUBLIC_URL}/default-profile-image.png`)
}
