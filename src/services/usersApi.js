import supabase from "./supabase";

export async function users() {
  const { data: users, error } = await supabase.from("users").select("*");
  if (error) {
    console.error(error);
    throw new Error("Could not get current user");
  }
  return users;
}

export async function currentUser() {
  const { data: currentUser, error } = await supabase
    .from("currentUser")
    .select("*");
  if (error) {
    console.error(error);
    throw new Error("Could not get current user");
  }
  return currentUser;
}
