import React, {
  ReactElement,
  ChangeEvent,
  useState,
  useRef,
  useEffect
} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";
import SaveAlt from "@material-ui/icons/SaveAlt";

interface Props {
  info: string;
  label: string;
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateInfo: (newInfo: string) => void;
}

const OnClickInput = ({ info, label, updateInfo }: Props): ReactElement => {
  const [value, setValue] = useState(info);
  const [editMode, setEditMode] = useState(false);
  const inputEl = useRef(null);

  const changeEditMode = (): void => {
    setEditMode((oldEditMode) => !oldEditMode);
  };

  // const updateInfo = (): void => {
  //   info = value;
  // };

  useEffect(() => {
    if (editMode) {
      inputEl.current.focus();
    }
  }, [editMode]);

  useEffect(() => {
    setValue(info);
  }, [info]);

  const renderEditView = (): ReactElement => {
    return (
      <div>
        <TextField
          inputRef={inputEl}
          label={label}
          defaultValue={value}
          onChange={(e): void => setValue(e.target.value)}
          onBlur={(): void => {
            changeEditMode();
            updateInfo(value);
          }}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <SaveAlt />
        </IconButton>
      </div>
    );
  };
  const renderDefaultView = (): ReactElement => {
    return (
      <div
        role="button"
        onKeyDown={changeEditMode}
        tabIndex={0}
        onClick={changeEditMode}
      >
        <p>{value}&nbsp;</p>
      </div>
    );
  };
  return editMode ? renderEditView() : renderDefaultView();
};

export default OnClickInput;
