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
}

const OnClickInput = ({ info, label }: Props): ReactElement => {
  // const [value, setValue] = useState(info);
  const [editMode, setEditMode] = useState(false);
  const inputEl = useRef(null);

  const changeEditMode = (): void => {
    console.log("change edit mode");
    setEditMode((oldEditMode) => !oldEditMode);
  };

  useEffect(() => {
    if (editMode) {
      console.log("focus input el");
      console.log(inputEl.current);
      inputEl.current.focus();
    }
  }, [editMode]);

  const renderEditView = (): ReactElement => {
    return (
      <div>
        <TextField
          inputRef={inputEl}
          label={label}
          defaultValue={info}
          onBlur={(): void => {
            console.log("buring 2");
            changeEditMode();
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
        <p>{info}&nbsp;</p>
      </div>
    );
  };
  return editMode ? renderEditView() : renderDefaultView();
};

export default OnClickInput;
