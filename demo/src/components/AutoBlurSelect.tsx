import React from 'react';

interface AutoblurSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

export class AutoblurSelect extends React.Component<AutoblurSelectProps> {
  selectRef = React.createRef<HTMLSelectElement>();

  onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange(event);
    if (this.selectRef.current) {
      this.selectRef.current.blur();
    }
  };

  render() {
    const { children, onChange, ...otherProps } = this.props;
    return (
      <select {...otherProps} onChange={this.onChange} ref={this.selectRef}>
        {children}
      </select>
    );
  }
}
