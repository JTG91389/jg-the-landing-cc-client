import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import Layout from 'features/auth/components/Layout';
import Button from 'ui/components/Button';
import InputField from 'ui/components/InputField';
import { MeDocument, useUpdateTodoMutation } from 'generated/graphql';
import handleErrors from 'helpers/handleErrors';
import { useMineQuery } from 'generated/graphql';

const fetchTodoBySlug = async (slug) => {

};

const UpdateTodo = () => {
  const router = useRouter();
  const [updateTodo] = useUpdateTodoMutation();
  const { todoId } = router.query;
  const { data, loading } = useMineQuery();

  return (
    <Layout>
      <Formik
        initialValues={{
          id: '',
          task: '',
          complete: false,
        }}
        validationSchema={Yup.object().shape({
          id: Yup.string().required(),
          task: Yup.string().required(),
          complete: Yup.boolean().required(),
        })}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const res = await updateTodo({
            variables: {
              params: {
                id: values.id,
                task: values.task,
                complete: values.complete,
              },
            },
            awaitRefetchQueries: true,
            refetchQueries: [
              {
                query: MeDocument,
              },
            ],
          });

          if (res.data?.updateTodo.errors) {
            setErrors(handleErrors(res.data.updateTodo.errors));
            setSubmitting(false);
          } else if (res.data?.updateTodo.todos) {
            router.push('/todo');
          }
        }}
      >
        {() => (
          <Form>
            <InputField name="id" label="Id" type="text" />
            <InputField name="task" label="Task" type="text" />
            <InputField name="complete" label="Complete" type="boolean" />
            <Button
              title="Update Todo"
              variant="primary"
              size="large"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default UpdateTodo;
