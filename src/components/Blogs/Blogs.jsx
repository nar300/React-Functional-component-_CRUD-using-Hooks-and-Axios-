import React,{useState,useEffect} from 'react'
import Axios from 'axios';

export default function Blogs(props) {

    const url="http://localhost:53962/api/blgs/"

    const[Bloglist,setBlog]=useState([])
    const [isError,setError]=useState(false)

    const [data,setData]=useState({
        Title:"",
        Description:"",
    })


    useEffect(
        ()=>{
            Axios.get(url)
            .then(res=>setBlog(res.data)).catch(err=>{console.error(err)
            setError(true)
            
            })
        },[]
    )


function submit(e){
    e.preventDefault()
    Axios.post(url,data)
    .then(res=>{
        console.log(res.data)
        const mydata =[...Bloglist,res.data]
        setBlog(mydata)}
    
    ).catch(err=>{console.error(err)
    
       setError(true)
    }
    
    )

}

function handle(e){
    const newdata ={...data}
    newdata[e.target.id] = e.target.value;
    setData(newdata)

}


function update(id){
    console.log(id)
    props.history.push("/Update/"+id)
}

function remove(id){
    console.log(id)
    Axios.delete(url+id)
    .then(res=>{
        console.log(res.data)
        const mydata =Bloglist.filter(item=>item.id !==id)
        setBlog(mydata)
    }).catch(err=>{console.error(err)
    
        setError(true)
     })

}

const Display = Bloglist.map(item=>
    <tr key={item.id}>
        <td>{item.Title}</td>
        <td>{item.Description}</td>
      
        <td><button onClick={()=>update(item.id)}><i className="far fa-edit"></i></button></td>
        <td><button onClick={()=>remove(item.id)}><i className="far fa-trash-alt"></i></button></td>
        
    </tr> 
    
    )

    return (
        <div className="container">
           <form onSubmit={(e)=>submit(e)}>
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

 {isError && <div  className="alert alert-danger">Error occured Please try again later</div>}
            <hr></hr>
    
<table className="table table-hover">
    <tbody>
        {Display}
    </tbody>
</table>

        </div>
    )
}
