import bcrypt from 'bcrypt';

const { genSalt, hash, compare } = bcrypt;
const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);
  return hashPassword;
};

const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isPasswordChecked = await compare(plainPassword, hashedPassword);

  return isPasswordChecked;
};

export { hashPassword, comparePassword };
