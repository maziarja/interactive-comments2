import Button from "../../../ui/Button";
import Spinner from "../../../ui/Spinner";
import Textarea, { useTextareaContext } from "../textarea/Textarea";
import { useData } from "../useData";
import { useCreateComment } from "./useCreateComment";

function CreateComment({ alwaysVisible, type, comment }) {
  const { dataApi } = useData();
  const { currentUser } = dataApi;
  const { textarea, setTextarea } = useTextareaContext();
  const { isPending, createComment } = useCreateComment();
  if (isPending) return <Spinner />;
  function handleClick() {
    setTextarea("");
    if (type === "comment") {
      const obj = {
        content: textarea,
        parent_comment_id: null,
        score: 0,
        user_id: currentUser.id,
      };

      textarea.trim() !== "" && createComment(obj);
    }
    if (type === "reply") {
      const obj = {
        content: textarea,
        parent_comment_id:
          comment.parent_comment_id === null
            ? comment.id
            : comment.parent_comment_id,
        score: 0,
        user_id: currentUser.id,
      };
      textarea.trim() !== "" && createComment(obj);
    }
  }
  return (
    <Textarea.Text
      alwaysVisible={alwaysVisible}
      id={comment?.id}
      defaultValue={comment?.user?.username}
    >
      <Button onClick={handleClick} type={"primary"}>
        {type === "comment" && "send"}
        {type === "reply" && "reply"}
      </Button>
    </Textarea.Text>
  );
}

export default CreateComment;
