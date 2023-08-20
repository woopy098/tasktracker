import { Component, ChangeEvent } from "react";
import task from "../data.ts";
import taskcreator from "../taskcreator.ts";

type Props={};

type State = task & {submitted: boolean};

export default class addTask extends Component <Props, State>{
    constructor(props:Props){
    super(props);
    this.onChangeTitle= this.onChangeTitle.bind(this);
    this.onChangeDescription= this.onChangeDescription.bind(this);
    this.onChangeduedate=this.onChangeduedate.bind(this);
    this.onChangePriority= this.onChangePriority.bind(this);
    this.onChangeStatus= this.onChangeStatus.bind(this);
    this.saveTask= this.saveTask.bind(this);
    this.resetTask= this.resetTask.bind(this);
    this.state={
        title:"",
        description:"",
        duedate:0,
        priority:"",
        status:"",
        submitted:false
    }
    }
    onChangeTitle(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            title:e.target.value,
        }
        )
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            description:e.target.value,
        }
        )
    }

    onChangeduedate(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            duedate:parseInt(e.target.value,10),
        }
        )
    }

    onChangePriority(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            priority:e.target.value,
        }
        )
    }

    onChangeStatus(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            status:e.target.value,
        }
        )
    }

    saveTask(){
        let data ={
            title:this.state.title,
            description:this.state.description,
            duedate:this.state.duedate,
            priority:this.state.priority,
            status:this.state.status,
            submitted:false
        }
        taskcreator.create(data)
        this.setState({
            submitted:true,
        })
    }

    resetTask(){
        this.setState({
            title:"",
            description:"",
            duedate:0,
            priority:"",
            status:"",
            submitted:false
        })
    }
    render(){
        return(
           <div>
            <div className="form-group">
           <label htmlFor="title">Title</label>
           <input
             type="text"
             className="form-control"
             id="title"
             required
             value={this.state.title}
             onChange={this.onChangeTitle}
             name="title"
           />
         </div>
         <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Due Date</label>
              <input
                type="number"
                className="form-control"
                id="duedate"
                required
                value={this.state.duedate}
                onChange={this.onChangeduedate}
                name="duedate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Priority</label>
              <input
                type="text"
                className="form-control"
                id="priority"
                required
                value={this.state.priority}
                onChange={this.onChangePriority}
                name="priority"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                required
                value={this.state.status}
                onChange={this.onChangeStatus}
                name="status"
              />
            </div>
         <button onClick={this.saveTask} className="btn btn-success">
              Submit
            </button>
         </div>
        );
    }
    

}



