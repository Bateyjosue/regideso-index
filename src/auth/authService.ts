import supabase from "../data/supabase";

/**
 * Signs up a user with the given email and password.
 * @param {string} email the user's email
 * @param {string} password the user's password
 * @returns {Promise<import("supabase").AuthUser>} the newly created user
 * @throws {Error} if there was an error signing up the user
 */
export async function signUp(email: string, password: string) { 
  try {
      const { data: user } = await supabase.auth.signUp({
      email,
      password,
    });

    return user;
  } catch (error) {
      throw error;
  }
}

/**
 * Logs in a user with the given email and password.
 * @param {string} email the user's email
 * @param {string} password the user's password
 * @returns {Promise<import("supabase").AuthSession>} the newly created session
 * @throws {Error} if there was an error logging in the user
 */
export async function login(email: string, password: string) {
  try {
    const { data: session } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return session;
  } catch (error) {
    throw error;
  }
}

/**
 * Logs out the current user.
 * @throws {Error} if there was an error logging out the user
 */
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}