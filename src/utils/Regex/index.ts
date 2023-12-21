export const regexEmail = (value: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/.test(value)
// min 8 char, uppercase, lowecase, & special char
export const regexPassword = (value: string) =>
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value)
