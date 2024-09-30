import React,{useState} from "react";
import styled from "styled-components";
import { IPost } from "./TimeLine";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref, getDownloadURL, StorageError, StorageErrorCode } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
`;
const Column = styled.div``;
const Photo = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
`;
const Video = styled.video`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 15px;
`;
const UserName = styled.span`
  font-size: 15px;
  font-weight: 600;
`;
const PayLoad = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;
const DeleteButton = styled.button`
  background: #FF6348;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;
const Post = ({
  id,
  createdAt,
  photo,
  video,
  post,
  userId,
  username,
}: IPost) => {
  console.log(username)
  const [isEditing, setIsEditing] =useState(false);
  const [editedPost, setEditedPost] = useState();
  const [editedPhoto,setEditedPhoto] = useState<File | null>(null);

  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedPost(e.target.value);
  }
  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = async () => {
    setIsEditing(true);
  }
 

  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this post?");
    if (!ok || user?.uid !== userId) return;
    // if (user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, `contents`, id));
      if (photo) {
        const photoRef = ref(storage, `contents/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };
  console.log(id);
  return (
    <Wrapper>
      <Column>
        <UserName>{username}</UserName>
        <PayLoad>{post}</PayLoad>
        {/* 로그인한 사람만 내 게시물 삭제버튼 보이게 .. */}
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        ) : null}
      </Column>
      <Column>
        {photo ? <Photo src={photo} /> : null}
        {video ? <Video src={video} /> : null}
      </Column>
    </Wrapper>
  );
};
export default Post;