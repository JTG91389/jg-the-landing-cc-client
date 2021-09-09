import CreateTodo from 'features/auth/modules/createTodo';
import { withApollo } from 'utils/withApollo';

const CreateTodoPage = () => <CreateTodo />;

export default withApollo({ ssr: false })(CreateTodoPage);
