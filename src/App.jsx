import Spinner from "../ui/Spinner";
import { useData } from "./features/useData";
import Comments from "./features/comments/Comments";
import Textarea from "./features/textarea/Textarea";
import CreateComment from "./features/comments/createComment";

function App() {
  const { isLoading1, isLoading2, isLoading3, dataApi: data } = useData();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <div className="flex h-full min-h-dvh flex-col bg-gray-800">
      <div className="m-auto w-[90%]">
        <Textarea>
          <Comments data={data} />
          <CreateComment alwaysVisible={true} type={"comment"} />
        </Textarea>
      </div>
    </div>
  );
}

export default App;
