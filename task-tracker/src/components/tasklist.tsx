import { Component} from "react";
import task from "../data.ts";
import taskcreator from "../taskcreator.ts";
import {onSnapshot } from 'firebase/firestore'; // Make sure to include the 'getDocs' function
import TaskedComponent from "./updatendelete.tsx";

type Props ={};
type State ={
    tasks: task[],
    currentTasks:task|null,
    currentIndex: number;
}

export default class TaskList extends Component<Props, State> {
    unsubscribe: () => void;

    constructor(props: Props) {

        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
    
        this.state = {
          tasks: [],
          currentTasks: null,
          currentIndex: -1,
        };
    
        this.unsubscribe = () => { };
      }

    componentDidMount() {
        const orderedQuery = taskcreator.getAll();
        this.unsubscribe = onSnapshot(orderedQuery, this.onDataChange);

    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onDataChange(items: any){
        let tasks = new Array<task>();

        items.forEach((item: any) => {
            let id=item.id;
            let data = item.data();
          tasks.push({
            id: id,
            title: data.title,
            description: data.description,
            duedate:data.duedate,
            priority:data.priority,
            status:data.status
          });
        });
    
        this.setState({
          tasks: tasks
        });
    }
    
    refreshList() {
        this.setState({
            currentTasks: null,
          currentIndex: -1,
        });
      }

      setActiveTutorial(task: task, index: number) {
        this.setState({
            currentTasks: task,
          currentIndex: index,
        });
      }

      render(){
        const { tasks, currentTasks,currentIndex } = this.state;

        return(<div>
            <h1>Task List</h1>
            {/* <ul>
            {tasks.map((task, index) => (
                <li key={task.id}>
                <span>{task.title}</span>
                <button onClick={() => this.setActiveTutorial(task, index)}>
                    View Details
                </button>
                </li>
            ))}
            </ul> */}
            <ul className="list-group">
            {tasks &&
              tasks.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>
            {currentTasks && (
              <div>
                <h2>Current Task Details</h2>
                <p>Title: {currentTasks.title}</p>
                <p>Description: {currentTasks.description}</p>
                <p>Duedate :{currentTasks.duedate}</p>
                <p>priority :{currentTasks.priority}</p>
                <p>status :{currentTasks.status}</p>
                <TaskedComponent task={currentTasks} refereshList={this.refreshList} />
              </div>
            )}


            </div>);
    }
}