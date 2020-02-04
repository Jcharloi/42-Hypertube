import React, { ReactElement, useState, useRef, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";
import SaveAlt from "@material-ui/icons/SaveAlt";

interface Props {
  info: string;
}

const OnClickInput = ({ info }: Props): ReactElement => {
  const [value, setValue] = useState(info);
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

  const renderEditView = () => {
    return (
      <div>
        <TextField
          ref={inputEl}
          label={value}
          onFocus={(): void => {
            console.log("FOCUS 2");
          }}
          onBlur={(): void => {
            console.log("buring 2");
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
  const renderDefaultView = () => {
    return (
      <div
        role="button"
        onKeyDown={changeEditMode}
        tabIndex={0}
        onClick={changeEditMode}
        onFocus={(): void => {
          console.log("FOCUS");
        }}
        onBlur={(): void => {
          console.log("buring");
        }}
      >
        <p>{info}</p>
      </div>
    );
  };
  return editMode ? renderEditView() : renderDefaultView();
};

export default OnClickInput;
