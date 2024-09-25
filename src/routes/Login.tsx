// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { Form , Input, Switcher, Title, Wrapper, Error } from "../components/auth-components";
import GithubBtn from "../components/GithubBtn";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // 타입스크립트에서는 말이 잘 안 되는 경우.
  // type 어디 갔어?
  // const onChange = (e) => {
  //   e.target.value;
  // };
  // 제너릭 / 값을 정의 불가
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    // e.target.value;
    const {
      target: { name, value },
    } = e;
    // if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };
  // TS의 목적이 사라짐
  // const onSubmit = (e: any) => {
  //   e.preventDefault();
  // };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // || name === ""
    if (isLoading || email === "" || password === "") return;
    try {
      // const credentials = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password)
      // console.log(credentials.user);
      // await updateProfile(credentials.user, {
      //   displayName: name,
      // });
      navigate("/");
      // create an account
      // set the name of the user
      // redirect to the home page
      // 왜 비동기 처리가 필요한가?
      // => 너 되면, 너 되고, 너 되면 너 되자. 이렇게
    } catch (e) {
      // console.log(e);
      if (e instanceof FirebaseError) {
        // setError(e.message);
      }
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={onSubmit}>
        {/* <Input
          onChange={onChange}
          name="name"
          value={name}
          type="text"
          placeholder="Name"
          required
        /> */}
        <Input
          onChange={onChange}
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading.." : "Login"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't you have an account?
        <Link to ="/create-account"> Create one &rarr;</Link>
      </Switcher>
      <GithubBtn />
    </Wrapper>
  );
};
export default Login;