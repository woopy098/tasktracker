import task from "./data.ts";
import {db} from "./config/firebase-config.ts"
import { collection, addDoc,query,orderBy,doc,updateDoc,deleteDoc} from "firebase/firestore";

//const db = getFirestore(firebaseConfig);
const dbRef = collection( db, "task");


class taskcreator{
    getAll(){
        return dbRef;
    }
    create(newtask: task){
        return addDoc(dbRef,newtask);
    }
    getAllOrderedByTask() {
        // Create a query to get all tasks ordered by 'task' field
        const orderedQuery = query(dbRef, orderBy('task'));
    
        return orderedQuery;
      }

    update(id: string, value: any){
        const updatedDocRef=doc(dbRef, id);
        console.log(updatedDocRef);
        return updateDoc(updatedDocRef, value);

    }
    delete(id: string ){
        const deleteDocRef= doc(dbRef, id);
        return deleteDoc(deleteDocRef);
    }

}

export default new taskcreator;


