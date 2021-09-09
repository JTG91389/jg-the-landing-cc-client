import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import Layout from 'features/auth/components/Layout';
import Button from 'ui/components/Button';
import InputField from 'ui/components/InputField';
import { CreateTodoDocument, useCreateTodoMutation } from 'generated/graphql';
import handleErrors from 'helpers/handleErrors';
import useAuth from '../../hooks/useAuth';
import Loading from '../../../../ui/components/Loading';

const CreateTodo = () => {
  const router = useRouter();
  const { data, loading } = useAuth();
  const [createTodo] = useCreateTodoMutation();

  if (loading || !data?.me?.user) {
    return <Loading />;
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          task: '',
          userId: `${data?.me?.user.id}`,
        }}
        validationSchema={Yup.object().shape({
          task: Yup.string().required(),
          userId: Yup.string().required(),
        })}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const res = await createTodo({
            variables: {
              params: {
                task: values.task,
                userId: values.userId,
              },
            },
            awaitRefetchQueries: true,
            refetchQueries: [
              {
                query: CreateTodoDocument,
              },
            ],
          });

          if (res.data?.createTodo.errors) {
            setErrors(handleErrors(res.data.createTodo.errors));
            setSubmitting(false);
          } else if (res.data?.createTodo.todos) {
            router.push('/todo');
          }
        }}
      >
        {() => (
          <Form>
            {data?.me?.user ? (
              <div>
                <span>
                  User: {data?.me?.user?.username || '<Loading Error>'}
                </span>
                <InputField name="task" label="Task" type="text" />
                <Button
                  title="Create Todo"
                  variant="primary"
                  size="large"
                  type="submit"
                />
              </div>
            ) : null}
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreateTodo;
