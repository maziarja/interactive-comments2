import { useComments } from "../features/comments/useComments";
import { useUsers } from "../features/users/useUsers";
import { useCurrentUser } from "./users/useCurrentUser";
export function useData() {
  const { isLoading: isLoading1, comments = [] } = useComments();
  const { isLoading: isLoading2, users = [] } = useUsers();
  const { isLoading: isLoading3, currentUser = [] } = useCurrentUser();

  const replyId = comments
    .filter((cm) => cm.parent_comment_id !== null)
    .map((cm) => cm.parent_comment_id);

  const parentCommentWithReply = comments.filter((cm) =>
    replyId.includes(cm.id),
  );

  const repliesForParentComments = comments.filter(
    (cm1) =>
      cm1.parent_comment_id ===
      parentCommentWithReply.find((cm) => cm.id === cm1.parent_comment_id)?.id,
  );

  const repliesForParentCommentsFinal = repliesForParentComments.map(
    (reply) => {
      return {
        ...reply,
        user: users?.find((user) => user.id === reply.user_id),
      };
    },
  );

  const parentCommentNoReply = comments.filter(
    (cm) => !replyId.includes(cm.id) && cm.parent_comment_id === null,
  );

  const commentsWithReplyData = parentCommentWithReply.map((cm) => {
    return {
      ...cm,
      replies: repliesForParentCommentsFinal.filter(
        (reply) => reply.parent_comment_id === cm.id,
      ),
    };
  });

  const formatedCommentsNoSort = [
    ...parentCommentNoReply,
    ...commentsWithReplyData,
  ];

  const formatedComments = formatedCommentsNoSort.sort((a, b) =>
    a.score !== b.score
      ? b.score - a.score
      : a.created_at.localeCompare(b.created_at),
  );

  const data = formatedComments.map(({ user_id, ...rest }) => {
    return {
      ...rest,
      user: users?.filter((user) => user.id === user_id)?.at(0),
    };
  });

  const formatedCommentsFinal = data.map((d) => {
    return {
      ...d,
      ...(d.replies
        ? {
            replies: d.replies.map((reply) => {
              return reply.parent_comment_id === d.id
                ? { ...reply, replyTo: d.user?.username }
                : reply;
            }),
          }
        : { replies: [] }),
    };
  });

  const formatedCurrentUser = currentUser.map(({ user_id, ...rest }) => {
    return {
      ...rest,
      user: users.find((user) => user.id === user_id),
    };
  });

  const dataApi = {
    currentUser: formatedCurrentUser?.at(0)?.user,
    comments: formatedCommentsFinal,
  };

  return { isLoading1, isLoading2, isLoading3, dataApi };
}
