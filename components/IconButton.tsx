import React, { ButtonHTMLAttributes } from "react";
import styles from "../styles/icon-button.module.scss";
import classnames from "classnames";

const IconButton: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { done?: boolean }
> = (props) => {
  const { children } = props;
  const className = classnames(
    styles.IconButton,
    props.done && styles.ButtonChecked,
    props.className
  );

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
export default IconButton;
