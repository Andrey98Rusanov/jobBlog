import { Input, Button, Form } from "antd";
import Api from "../../Api/Api";
import styles from "./createArticle.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function CreateArticle() {
  const api = new Api()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { TextArea } = Input;
  const onFinish = (values) => {
    console.log("Success:", values);
    api.createArticle(values).then(() => {
      dispatch({type: "CHANGE_PAGE"})
      navigate("/")
    })
  };
  return (
    <Form name="basic" className={styles.new_article} onFinish={onFinish} initialValues={{
        remember: true,
      }}>
      <h2 className={styles.articleTitle}> Create Article</h2>
      Title
      <Form.Item name="title" rules={[
        {
          required: true,
          message: 'Title field is required',
        },
      ]}>
        <Input placeholder="title" />
      </Form.Item>
      Short description
      <Form.Item name="description" rules={[
        {
          required: true,
          message: 'Description field is required',
        },
      ]}>
        <Input placeholder="short description" />
      </Form.Item>
      Text
      <Form.Item name="body" rules={[
        {
          required: true,
          message: 'Text field is required',
        },
      ]}>
        <TextArea placeholder="text" rows={5} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.button}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateArticle;
