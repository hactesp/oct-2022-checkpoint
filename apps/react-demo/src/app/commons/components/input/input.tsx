import { useController, UseControllerProps } from "react-hook-form";
import { camelCaseTextToTitle } from "../../ultilities/StringUltilities";

type FormValues = {
  todoName: string;
};

export function Input(props: UseControllerProps<FormValues>) {
  const {
    field,
    fieldState: { error, isDirty, invalid },
  } = useController(props);

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ minWidth: '100px' }}>
          {camelCaseTextToTitle(props.name)}:&nbsp;
        </label>
        <input
          {...field}
          placeholder={camelCaseTextToTitle(props.name)}
          className={!isDirty && invalid ? 'invalid' : ''}
          data-testid="input"
        />
      </div>
      {error && invalid && (
        <label style={{ marginLeft: '90px' }} className={'error-text'}>
          This field is required
        </label>
      )}
      <br />
    </>
  );
}
