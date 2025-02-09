import supabase from "./supabase";

export async function comments() {
  const { data: comments, error } = await supabase.from("comments").select("*");

  if (comments.parent_comment_id === null) return;

  if (error) {
    console.error(error);
    throw new Error("Could not get comments");
  }

  return comments;
}

export async function createComment(obj) {
  const { data, error } = await supabase
    .from("comments")
    .insert([obj])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not create a new comment");
  }
  return data;
}

export async function updateComments(id, obj) {
  const { data, error } = await supabase
    .from("comments")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("The comment has not been updated");
  }
  return data;
}

export async function deleteComment(id) {
  const { error } = await supabase.from("comments").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("The comment has not been updated");
  }
}
