import Comment from "./Comment";

function Comments({ data }) {
  const comments = data.comments;
  return (
    <ul>
      {comments.map((cm) => {
        return (
          <div key={cm.id}>
            <li>
              <Comment comment={cm} />
            </li>
            <div className="ml-auto max-w-[95%] border-l-2 border-gray-900">
              {cm.replies.length >= 1 &&
                cm.replies.map((reply) => {
                  return (
                    <li className="ml-auto w-[95%]" key={reply.id}>
                      <Comment comment={reply} />
                    </li>
                  );
                })}
            </div>
          </div>
        );
      })}
    </ul>
  );
}

export default Comments;
