import React, {useState} from 'react'
import { Form, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";

const Home = () => {
  const [result, setResult] = useState({});
  const [isSearched, setIsSearched] = useState(false);

  const onFinish = async (values) => {
    fetch("http://user-free-space.herokuapp.com/find/", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: values.username,
      }),
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setIsSearched(true);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
    {isSearched && 
      <div>
        <p>{`     Instagram:    ${result.data.instagram.message}`}</p>
        <p>{`     Twitter:    ${result.data.twitter.message}`}</p>
        <p>{`     Github:    ${result.data.github.message}`}</p>
      </div>}
    </div>
  );
}

export default Home;
