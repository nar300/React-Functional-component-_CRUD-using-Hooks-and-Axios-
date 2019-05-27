import React,{useState,useEffect} from 'react'
import Axios from 'axios';



export default function Update(props) {

    const url="http://localhost:53962/api/blgs/"

    const[Bloglist,setBlog]=useState([])

    const [data,setData]=useState({
        Title:"",
        Description:"",
    })


    useEffect(
        ()=>{
            const id = props.match.params.id
            Axios.get(url+id)
            .then(res=>setData(res.data)).catch(err=>console.error(err))
        },[]
    )

function blogupdate(e){
    e.preventDefault()
    const id = props.match.params.id
    Axios.put(url+id,data)
    .then(res=>{
        console.log(res.data)
        props.history.push("/")
    }).catch(err=>console.error(err))
}


function handle(e){
    const newdata ={...data}
    newdata[e.target.id] = e.target.value;
    setData(newdata)

}




 

    return (
        <div className="container">
           <form onSubmit={(e)=>blogupdate(e)}>
  <div className="form-group">
    <label htmlFor="Title">Title</label>
    <input onChange={(e)=>handle(e)} value={data.Title} type="text" className="form-control" id="Title"  placeholder="Enter Title"/>

  </div>

  <div className="form-group">
    <label htmlFor="Description"> Description</label>
    <input onChange={(e)=>handle(e)} value={data.Description} type="text" className="form-control" id="Description"  placeholder="Enter Description"/>

  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
         
        </div>
    )
}