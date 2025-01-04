import React, { useEffect, useRef, useState } from "react";

import Label from "../Label";

import styles from "./Num.module.scss";

interface NumProps {
  initialValue: number | string;
  disabled?: boolean;
  onChange?(value: number): void;
  pattern?: string;
  className?: string;
  label?: string;
}

function Num({
  initialValue,
  disabled,
  pattern,
  onChange,
  className,
  label,
}: NumProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(prepareNum(initialValue));

  // When the initial value changes, reset state.
  // This can happen if the user types an edit but cancels rather than saving.
  useEffect(() => {
    setValue(prepareNum(initialValue));
  }, [initialValue]);

  function prepareNum(value: string | number) {
    return value.toString().padStart(2, "0");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

  const handleBeforeInput = (
    e: React.FormEvent<HTMLInputElement> & InputEvent
  ) => {
    if (inputRef.current) {
      const selectionStart = inputRef.current.selectionStart ?? 0;
      const selectionEnd = inputRef.current.selectionEnd ?? 0;
      const inputValue = value;
      const newChar = e.data;
      let updatedValue = inputValue;

      // If there's a range selected, replace the entire range with the new character.
      if (selectionStart !== selectionEnd) {
        updatedValue =
          inputValue.slice(0, selectionStart) +
          newChar +
          inputValue.slice(selectionEnd);
      }
      // If there's no range selected and there's currently 2 characters,
      // the new character replaces the character immediately after the cursor
      else if (inputValue.length == 2) {
        updatedValue =
          inputValue.slice(0, selectionStart) + // Text before the selection
          newChar + // The newly typed character
          inputValue.slice(selectionEnd + 1); // Text after the selection
      }
      // No range selected and only one character, the new character is added
      // where the cursor currently is
      else {
        updatedValue =
          inputValue.slice(0, selectionStart) +
          newChar +
          inputValue.slice(selectionEnd);
      }

      const update = !pattern || new RegExp(pattern).test(updatedValue);

      if (update) {
        setValue(updatedValue);
      }

      e.preventDefault();

      // Restore the cursor position after the inserted character
      const newCursorPos = selectionStart + 1;
      requestAnimationFrame(() => {
        // if the new value was valid and has been allowed,
        // the cursor should move to the next position
        if (update) {
          inputRef.current?.setSelectionRange(
            selectionStart + 1,
            selectionStart + 1
          );
        }
        // if the new value was not allowed and was ignored,
        // move the cursor back to the previous position (so the change
        // wasn't made an the cursor wasn't moved)
        else {
          inputRef.current?.setSelectionRange(
            (newCursorPos ?? 0) - 1,
            (newCursorPos ?? 0) - 1
          );
        }
      });
    }
  };
  function handleBlur() {
    if (disabled) return;
    // once the user has left the element, fire the onChange event.
    onChange?.(Number(value));
  }

  function handleFocus() {
    if (disabled) return;
    // select the entire value, with the cursor at the first position.
    // This ensures that when the user types a value, it clears the current value.
    // it's possible that the user de-selects and positions the cursor elsewhere, which
    // has to be handled on the handleChange function.
    inputRef.current?.setSelectionRange(0, 2);
  }
  return (
    <div className={styles["num"]}>
      {label && <Label value={label} />}
      <input
        className={[styles["num__input"], className].join(" ")}
        ref={inputRef}
        value={value}
        type="text"
        pattern={pattern}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onBeforeInput={handleBeforeInput}
      />
    </div>
  );
}

export default Num;
