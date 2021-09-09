import UpdateTodo from 'features/auth/modules/updateTodo';
import { withApollo } from 'utils/withApollo';

const UpdateTodoPage = () => <UpdateTodo />;

export default withApollo({ ssr: false })(UpdateTodoPage);
