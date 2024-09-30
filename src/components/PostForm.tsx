import { addDoc,collection, updateDoc } from "firebase/firestore";
import React,{ useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display:flex;
  flex-direction:column;
  gap:10px;
`
const TextArea = styled.textarea`
  background:#000;
  color:#fff;
  border:2px solid #fff;
  border-radius: 20px;
  padding: 20px;
  font-size:16px;
  width:100%;
  height:280px;
  resize:none;
  &::placeholder{
    font-size:20px;
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  &:focus{
    outline:none;
    border-color:#1d9bf9;
    &::placeholder{
      opacity:0;
    }
  }
`
const AttatchFileButton = styled.label`
  width:100%;
  color:#1d9bf9;
  font-size:16px;
  font-weight:600;
  border:1px solid #1d9bf9;
  border-radius:20px;
  text-align:center;
  padding:10px 0;
  cursor: pointer;
  transition:all 0.3s;
  &:hover{
    border:1px solid transparent;
    background:#1d9bf9;
    color:#fff;
  }
`
const AttatchFileInput = styled.input`
  display:none;

`
const SubmitBtn = styled.input`
  background:#fff;
  color:#1d9bf9;
  border:none;
  border-radius:20px;
  padding:10px 0;
  font-size:16px;
  font-weight:600;
  cursor: pointer;
  transition:all 0.3s;
  &:hover,&:active{
    opacity:0.8;
  }
`

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState("");
  // 타입을 지정할 수 없을 땐 <제네릭 형태> 초기값(null)
  const [file, setFile] = useState<File | null> (null);

  //최대 용량 제한 5m
  const maxFileSize = 5 * 1024 * 1024

// 타입 스크립트는 이벤트에 타입을 정해줘야함 .. 타입을 지정할 수 없을 땐 <제네릭 형태로 : 안에 들어오는 타입 형식 그대로 가져가겠다.>
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(e)
    setPost(e.target.value)
  }
  const onFileChange =(e : React.ChangeEvent<HTMLInputElement>)=>{
    // console.log(e.target.files)
    const  {files} = e.target;
    // console.log(files)
    if(files && files.length === 1) {
      if(files[0].size > maxFileSize) {
        alert("The Maximum Capacity that can be uploaded is 5MB!");
        return;
      }
      setFile(files[0]);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if(!user || isLoading || post === "" || post.length > 180 ) return; 
    try{
      setIsLoading(true);
      // collection 이름 지정 "contents" 
      // addDoc = 정보를 저장하는 곳
        const doc = await addDoc(collection(db, "contents"),{
        post,
        createdAt:Date.now(),
        // 회원가입시 입력한 이름 
        username:user?.displayName || "Anonymous",
        // uid 기본적으로 파이어베이스가 만들어주는 아이디
        userId:user.uid
       });
       if(file){
        // firebase에 값을 넣을 위치 지정 함수
        const locationRef = ref(storage, `contents/${user.uid}/${doc.id}`)
        // 위치 지정한 곳에 업로드시키기 (경로, 업로드할 파일)
        const result = await uploadBytes(locationRef,file);
        const url = await getDownloadURL(result.ref);
        const fileType = file.type;
        // 존재하는fileType startsWith 어떤 문자로 시작하는지 확인 후 
        if(fileType.startsWith("image/")){
          await updateDoc(doc, {
            photo: url,
          });  
        }
        if(fileType.startsWith("video/")){
          await updateDoc(doc, {
            video: url,
          });  
        }
        await updateDoc(doc, {
          photo: url,
          video: url,
        });                                  
       }
       setPost("");
       setFile(null);
    }catch(err){
      console.error(err);
    }finally{
      setIsLoading(false);

    }
  }

  return (
    <Form onSubmit={onSubmit}>
    <TextArea 
    onChange={onChange} 
    value={post} 
    name="contents" 
    id="contrnts" 
    placeholder="What is Happening?"
    required/>
    <AttatchFileButton htmlFor="file">
      {file ? "WOW~~ Contents Added 🤩" :"Please Add 😎" }
    </AttatchFileButton>
    <AttatchFileInput 
    onChange={onFileChange} 
    type="file" id="file" 
    accept="video/*, image/*"/>
    <SubmitBtn 
    type="submit" 
    value={isLoading ? "Posting....." : "Post"} />
  </Form>
  )
}

export default PostForm