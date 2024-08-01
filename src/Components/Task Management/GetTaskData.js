import { useEffect } from "react";
import { db } from "../Database/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useTaskList } from "../State Management/ContextStore";
import {
  useTaskLoadingStore,
  useScreenLoading,
} from "../State Management/Store";

const GetTaskData = () => {
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  const { setTaskListData } = useTaskList();
  const { taskLoading } = useTaskLoadingStore();
  const { setScreenLoading } = useScreenLoading();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setScreenLoading(true);
        const querySnapshot = await getDocs(collection(db, "Task"));
        const tasksList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTaskListData(tasksList);
        setScreenLoading(false);
      } catch (err) {
        // setError(err.message);
        console.log(err);
        setScreenLoading(false);
      }
      //    finally {
      //     setLoading(false);
      //   }
    };

    fetchTasks();
  }, [setTaskListData, taskLoading]); // Added setTaskListData to the dependency array

  return null; // No JSX needed
};

export default GetTaskData;
