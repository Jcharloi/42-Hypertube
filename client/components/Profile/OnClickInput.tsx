import React, { ReactElement, useState, useRef, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SaveAlt from "@material-ui/icons/SaveAlt";

interface Props {
  autocomplete?: string;
  startValue: string;
  label: string;
  name: string;
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateInfo: (newInfo: string, label: string) => void;
}

const OnClickInput = ({
  startValue,
  label,
  name,
  updateInfo,
  autocomplete
}: Props): ReactElement => {
  const [value, setValue] = useState(startValue);
  const [editMode, setEditMode] = useState(false);
  const inputEl = useRef(null);

  const changeEditMode = (): void => {
    setEditMode((oldEditMode) => !oldEditMode);
  };
  useEffect(() => {
    if (editMode) {
      inputEl.current.focus();
    }
  }, [editMode]);

  useEffect(() => {
    setValue(startValue);
  }, [startValue]);

  const renderEditView = (): ReactElement => {
    return (
      <div>
        <TextField
          autoComplete={autocomplete}
          inputRef={inputEl}
          label={label}
          name={name}
          defaultValue={value}
          onChange={(e): void => setValue(e.target.value)}
          onBlur={(): void => {
            changeEditMode();
            updateInfo(value, name);
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
