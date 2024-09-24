import { createUserWithEmailAndPassword } from "firebase/auth";
import React, {useState} from "react";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper=styled.div`
  width:420px;
  height:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  margin:0 auto;
  padding:50px 0;
`

const Title = styled.h1`
font-size:42px;
`

const Form = styled.form`
width: 100%;
display:flex;
flex-direction:column;
gap:10px;
margin-top:30px;
`

const Input = styled.input`
width:100%;
padding: 10px 20px;
border:none;
border-radius:50px;
font-size:16px;
&[type="submit"]{
  cursor:pointer;
  transition:opacity 0.3s;
  &:hover{
    opacity:0.8
  }
}
&:focus{
  outline:none;
}
`

const Error = styled.span`
  font-weight:600;
  color:crimson;
`


const CreateAccount = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [name,setName] = useState() 
  const [email,setEmail] = useState() 
  const [password,setPassworde] = useState() 

  // HTMLInputElement 요소로 들어오는 값을 type로 받아오겠다. 외우기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e) =>target 과 name 값 찾기
    //객체안에 있는 객체 구조분해할당.=> 중첩구조분해할당
    const {
      target:{ name, value },
    } = e
    // e.target.value

    if(name === "name") setName(value)
    else if (name === "email") setEmail(value)
    else if (name === "password") setPassworde(value)
  }
  // (e:any) 가급적 사용하지 않고 집적 타입을 지정해주어야함
  const onsubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(name,email,password)
    if(isLoading || name ==="" || email === "" || password === "") return;
    try{
      await createUserWithEmailAndPassword(auth, email, password)
      //creaye an account
      //set the name of the user
      //redireccy to the home page
    } catch(err){
      //setError()
    } finally{
      setIsLoading(false)
    }
  }

  return <Wrapper>
    <Title>Log into 🏆</Title>
      {/* action 필요 없음 파이어베이스에서 관리해서 */}
      <Form onSubmit={onsubmit}>
        {/* name 값 중요 */}
        <Input onChange={ onChange } name="name" value={name} type="text" placeholder="Name" required/>
        <Input onChange={ onChange } name="email" value={email} type="email" placeholder="Email" required/>
        <Input onChange={ onChange } name="password" value={password} type="password" placeholder="Password" required/>
        <Input type="submit" value={isLoading ? "Loading..." : "Create Account"}/>
      </Form>
      {/* error가 빈 문자열과 같지 않다면 == error라면 */}
        {error !== "" ? <Error>{error}</Error> : null }
    </Wrapper>;
};

export default CreateAccount;
