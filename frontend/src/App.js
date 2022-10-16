import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';


function App() {

  let [info, setInfo] = useState({
    id: '',
    pwd: ''
  });


  useEffect(()=>{
    //회원정보 가져오기
    axios.get('http://localhost:8080/userSelect')
    .then((res)=>{
      console.log(res.data);
      setInfo(res.data);
    }).catch(() => {
      console.log('실패함');
    })
  },[])


  return (
    <div className="App">
     <h1> Plant Project Start </h1>
      <h2>user id? {info.id}</h2>
      <h2>user pwd? {info.pwd}</h2>
      <hr/>
      <h1>회원 가입 모듈</h1>
    <h2>create id <input type="text" id="idInput"  onChange={ (e)=>{ setInfo({id: e.target.value, pwd:info.pwd}) }} ></input></h2>
    <h2>create pwd <input type="text" pwd="pwdInput"  onChange={ (e)=>{setInfo({id: info.id, pwd: e.target.value})}} ></input></h2>
    <button onClick={()=>{
      axios.post("http://localhost:8080/userInsert", info
      ).then(function (response) {
          console.log(response);
      }).catch(function (error) {
          console.log(error);
      })
    }}><h3>ENTER</h3></button>
    </div>
  );
}

export default App;
