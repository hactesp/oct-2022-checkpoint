import { Button, Input } from '@mui/material';
import { Callback } from 'mongodb';
import { TodoModel } from '.';

export function TodoForm() {
  const handleSubmit= (item: Callback) => {};
  const onSubmit= () => {};
  const onReset= (item: TodoModel) => {};
  return (
    <form
      autoComplete="off"
      style={{ minWidth: '300px', fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      <Input name="todoName"/>
      <div className="action-section">
        <Button
          color="primary"
          type="submit"
          variant="contained"
          data-testid="add"
        >
          Add / Update
        </Button>
        <Button
          color="secondary"
          type="button"
          variant="contained"
          data-testid="reset"
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
