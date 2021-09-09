import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import Layout from 'features/auth/components/Layout';
import Button from 'ui/components/Button';
import InputField from 'ui/components/InputField';
import { MeDocument, useUpdateTodoMutation } from 'generated/graphql';
import handleErrors from 'helpers/handleErrors';
import { useMineQuery } from 'generated/graphql';

const UpdateTodo = () => {
  const router = useRouter();
  const [updateTodo] = useUpdateTodoMutation();
  const { data, loading } = useMineQuery();

  return (
    <Layout>
      Todos: {JSON.stringify(data)}
    </Layout>
  );
};

export default UpdateTodo;
