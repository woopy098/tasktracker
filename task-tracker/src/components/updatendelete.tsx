import { Component,ChangeEvent} from "react";
import task from "../data.ts";
import taskcreator from "../taskcreator.ts";

type Props={
    task:task,
    refereshList: Function
}

type State ={
    currentTask: task,
}

export default class updatendelete extends Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.onChangeTitle= this.onChangeTitle.bind(this);
        this.onChangeDescription= this.onChangeDescription.bind(this);
        this.onChangeduedate=this.onChangeduedate.bind(this);
        this.onChangePriority= this.onChangePriority.bind(this);
        this.onChangeStatus= this.onChangeStatus.bind(this);
        this.updateTask= this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);

        this.state={
            currentTask:{
                id:null,
                title:"",
                description:"",
                duedate:0,
                priority:"",
                status:"",
            }
        }
        }
        static getDerivedStateFromProps(nextProps: Props, prevState: State) {
            const{task}= nextProps;
            if(prevState.currentTask.id!== task.id){
                return{
                    currentTask: task
                  };
            }
            return prevState.currentTask;

        } 
        
        componentDidMount(): void {
            this.setState({
                currentTask:this.props.task,
            });
        }


          
        // onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        //     const title = e.target.value;
        
        //     this.setState(function (prevState: State) {
        //       return {
        //         currentTask: {
        //           ...prevState.currentTask,
        //           title: title,
        //         },
        //       };
        //     });
        //   }

          onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
            const title = e.target.value;
          
            this.setState((prevState: State) => ({
              currentTask: {
                ...prevState.currentTask,
                title: title,
              },
            }));
          }
          
        
        onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
            const description = e.target.value;
        
            this.setState((prevState) => ({
              currentTask: {
                ...prevState.currentTask,
                description: description,
              },
            }));
          }

        onChangeduedate(e: ChangeEvent<HTMLInputElement>) {
            const duedate = parseInt(e.target.value);
        
            this.setState((prevState) => ({
              currentTask: {
                ...prevState.currentTask,
                duedate: duedate,
              },
            }));
          }

        onChangePriority(e: ChangeEvent<HTMLInputElement>) {
            const priority = e.target.value;
        
            this.setState((prevState) => ({
              currentTask: {
                ...prevState.currentTask,
                priority: priority,
              },
            }));
          }

        onChangeStatus(e: ChangeEvent<HTMLInputElement>) {
            const status = e.target.value;
        
            this.setState((prevState) => ({
              currentTask: {
                ...prevState.currentTask,
                status: status,
              },
            }));
          }
    updateTask(){
            console.log(this.state.currentTask)
            if(this.state.currentTask.id){
                const data={
                    title:this.state.currentTask.title,
                    description:this.state.currentTask.description,
                    duedate:this.state.currentTask.duedate,
                    priority:this.state.currentTask.priority,
                    status:this.state.currentTask.status
                };
                // const data={
                //     title:"name",
                //     description:"name",
                //     duedate:3,
                //     priority:"name",
                //     status:"name",
                // };
                taskcreator.update(this.state.currentTask.id, data)
                  .catch((e: Error) => {
                    console.log(e);
                  });
              }

    }

    deleteTask(){
        if(this.state.currentTask.id){
            taskcreator.delete(this.state.currentTask.id)
            .then(()=>{
                this.props.refereshList();
            })
            .catch((e:Error)=>{
                console.log(e);
            });
        }
    }

    render(){
        const { currentTask } = this.state;

        return(
        <div>
            <h4>Task</h4>
            {currentTask?(
                <div className="edit-form">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={currentTask.title}
                      onChange={this.onChangeTitle}
                    />
                </div>
            </form>
            <form>
                  <div className="form-group">
                    <label htmlFor="title">description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={currentTask.description}
                      onChange={this.onChangeDescription}
                    />
                </div>
            </form>
            <form>
                  <div className="form-group">
                    <label htmlFor="title">duedate</label>
                    <input
                      type="number"
                      className="form-control"
                      id="duedate"
                      value={currentTask.duedate}
                      onChange={this.onChangeduedate}
                    />
                </div>
            </form>
            <form>
                  <div className="form-group">
                    <label htmlFor="title">priority</label>
                    <input
                      type="text"
                      className="form-control"
                      id="priority"
                      value={currentTask.priority}
                      onChange={this.onChangePriority}
                    />
                </div>
            </form>
            <form>
                  <div className="form-group">
                    <label htmlFor="title">status</label>
                    <input
                      type="text"
                      className="form-control"
                      id="status"
                      value={currentTask.status}
                      onChange={this.onChangeStatus}
                    />
                </div>
            </form>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTask}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTask}
            >
              Update
            </button>
            </div>
            ):(
                <div>
                    <br/>
                    <p>click on a task...</p>
                </div>
            )}
        </div>
        )
    }
}
        
