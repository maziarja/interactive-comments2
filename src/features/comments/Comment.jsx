import { formatDistanceToNow } from "date-fns";

import { useData } from "../useData";
import Button from "../../../ui/Button";
import Textarea, { useTextareaContext } from "../textArea/textArea";
import CreateComment from "./createComment";
import { useState } from "react";
import { useUpdateComments } from "./useUpdateComments";
import { useDeleteComment } from "./useDeleteComment";
import Modal from "../../../ui/modal";

function Comment({ comment }) {
  const { dataApi } = useData();
  const { currentUser } = dataApi;
  const { textarea, setTextarea } = useTextareaContext();
  const [editable, setEditable] = useState(false);
  const { isPending: isUpdating, updateComment } = useUpdateComments();
  const { isDeleting, deleteComment } = useDeleteComment();
  const [vote, setVote] = useState(false);

  function handleUpdateComment() {
    setEditable(false);
    const id = comment.id;
    updateComment({
      id,
      obj: {
        content: textarea,
      },
    });
  }

  function handleDeleteComment() {
    const id = comment.id;
    deleteComment(id);
  }

  function handleUpvoteComment() {
    const id = comment.id;

    updateComment({
      id,
      obj: {
        score: comment.score + 1,
      },
    });
    setVote(true);
  }

  function handleDownvoteComment() {
    const id = comment.id;
    if (comment.score > 0) {
      updateComment({
        id,
        obj: {
          score: comment.score - 1,
        },
      });
    }
    setVote(true);
  }

  return (
    <>
      <div className="mt-4 mb-4 grid grid-cols-[auto_1fr_auto] gap-3 rounded-md bg-white p-4 sm:text-lg">
        <div className="col-span-full flex items-center space-x-3 sm:col-start-2 sm:row-start-1">
          <img
            className="h-8 w-8 rounded-full"
            src={comment.user.avatar_png}
            alt={`an avatar of ${comment.user.username}`}
          />
          <p className="font-medium text-blue-950">{comment.user.username}</p>
          {comment.user.id === currentUser.id && (
            <p className="bg-blue-900 p-1 text-xs font-medium tracking-wide text-gray-800">
              you
            </p>
          )}
          <p className="text-sm text-gray-950">
            {formatDistanceToNow(comment.created_at, {
              addSuffix: true,
            })}
          </p>
        </div>
        <p
          contentEditable={editable}
          suppressContentEditableWarning={true}
          onBlur={(e) => {
            setTextarea(e.currentTarget.textContent);
          }}
          className={`col-span-full break-words text-gray-950 sm:col-start-2 ${editable && "rounded-md border-1 border-gray-900 px-2 pt-2 pb-6"}`}
        >
          {comment.content}
        </p>
        <>
          <div className="center row-start-3 flex gap-4 rounded-md bg-gray-800 px-2 py-1 sm:col-start-1 sm:row-start-1 sm:row-end-4 sm:flex-col sm:items-center sm:justify-center sm:place-self-center sm:px-3 sm:py-4">
            <button
              className="cursor-pointer"
              onClick={!vote ? handleUpvoteComment : null}
            >
              <svg
                className="hover:**:fill-blue-900"
                width="11"
                height="11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                  fill="#C5C6EF"
                />
              </svg>
            </button>
            <p className="text-md font-medium text-blue-900">{comment.score}</p>
            <button
              className="cursor-pointer"
              onClick={!vote ? handleDownvoteComment : null}
            >
              <svg
                className="hover:**:fill-blue-900"
                width="11"
                height="3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                  fill="#C5C6EF"
                />
              </svg>
            </button>
          </div>
          <Modal>
            <Modal.Window name={comment.id}>
              <Modal.Message />
              <Modal.Buttons handleDeleteComment={handleDeleteComment} />
            </Modal.Window>
            {comment.user.id === currentUser.id && !editable && (
              <div className="col-start-3 flex items-center space-x-4 sm:row-start-1 sm:space-x-7">
                <Modal.Open opens={comment.id}>
                  <Button
                    disabled={isDeleting}
                    type={"danger"}
                    className="hover:*:text-red-800 hover:**:fill-red-800"
                  >
                    <svg
                      width="12"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                        fill="#ED6368"
                      />
                    </svg>
                    <span>Delete</span>
                  </Button>
                </Modal.Open>
                <Button
                  onClick={() => setEditable((edit) => !edit)}
                  type={"secondary"}
                  className="hover:*:text-blue-800 hover:**:fill-blue-800"
                >
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                      fill="#5357B6"
                    />
                  </svg>
                  <span>Edit</span>
                </Button>
              </div>
            )}
          </Modal>

          {comment.user.id === currentUser.id && editable && (
            <div className="ml-auto space-x-4">
              <Button
                disabled={isUpdating}
                onClick={handleUpdateComment}
                type={"primary"}
              >
                update
              </Button>
              <button
                className="text-gray-950 hover:cursor-pointer"
                onClick={() => setEditable(false)}
                type={"secondary"}
              >
                cancel
              </button>
            </div>
          )}
          {comment.user.id !== currentUser.id && (
            <Textarea.Open id={comment.id}>
              <div className="col-start-3 sm:row-start-1">
                <Button
                  className="ml-auto hover:*:text-blue-800 hover:**:fill-blue-800"
                  type={"secondary"}
                >
                  <svg
                    width="14"
                    height="13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                      fill="#5357B6"
                    />
                  </svg>
                  <span>Reply</span>
                </Button>
              </div>
            </Textarea.Open>
          )}
        </>
      </div>
      <CreateComment type="reply" comment={comment} />
    </>
  );
}

export default Comment;
