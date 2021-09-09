import Todo from 'features/auth/modules/todo';
import { withApollo } from 'utils/withApollo';

const TodoPage = () => <Todo />;

export default withApollo({ ssr: false })(TodoPage);
