import * as React from 'react';
import styles from './Reactdemo.module.scss';
import type { IReactdemoProps } from './IReactdemoProps';

export default class Reactdemo extends React.Component<IReactdemoProps, {}> {
  public render(): React.ReactElement<IReactdemoProps> {
    return (
      <section className={styles.reactdemo}>
        <div className={styles.welcome}>
          <span> User Details</span>
          <div><strong>ID:</strong>{this.props.id}</div>
          <div><strong>Name:</strong>{this.props.name}</div>
          <div><strong>Username:</strong>{this.props.username}</div>
          <div><strong>Email:</strong>{this.props.email}</div>
          <div><strong>Address:</strong>{this.props.address}</div>
          <div><strong>Phone:</strong>{this.props.phone}</div>
          <div><strong>Website:</strong>{this.props.website}</div>
          <div><strong>Company:</strong>{this.props.company}</div>
        </div>
      </section>
    );
  }
}
