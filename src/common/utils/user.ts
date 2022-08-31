export const ageValidate = (dateString: Date | string) => {
  const now = new Date();
  const year = now.getFullYear();
  const day = now.getDate();
  const month = now.getMonth();

  const birthdate = new Date(dateString);
  const birthYear = birthdate.getFullYear();
  const birthDay = birthdate.getDate();
  const birthMonth = birthdate.getMonth();
  const age = year - birthdate.getFullYear();

  if (
    (birthDay === day && birthMonth === month) ||
    (birthMonth <= month && birthDay <= day && birthYear + age === year)
  ) return age;

  return age - 1;
}
