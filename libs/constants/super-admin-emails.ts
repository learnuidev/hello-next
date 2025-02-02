export const superAdminEmails = [
  "learnuidev@gmail.com",
  "vishal.91@live.com",
  "anairdna16@gmail.com",
];

export const isSuperAdmin = (email: string) => {
  return superAdminEmails?.includes(email);
};
