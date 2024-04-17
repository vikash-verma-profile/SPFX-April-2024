import * as React from 'react';
import styles from './AnonymousDemo2.module.scss';
import { IAnonymousDemo2Props } from './IAnonymousDemo2Props';
//import { escape } from '@microsoft/sp-lodash-subset';
import { IAnonymousDemo2State } from './IAnonymousDemo2State';

import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export default class AnonymousDemo2 extends React.Component<IAnonymousDemo2Props,IAnonymousDemo2State> {

  public constructor(props: IAnonymousDemo2Props, state: IAnonymousDemo2State) {

    super(props);

    this.state={
      id:"",
      name:"",
      username:"",
      email:"",
      address:"",
      phone:"",
      website: "",
      company: "",
    };

}


public getUserDetails(): Promise<any> {

  let url = this.props.apiURL + "/" + this.props.userID;
  
  
  return this.props.context.httpClient.get(
    url,HttpClient.configurations.v1
  )
    .then((response: HttpClientResponse) => {
      return response.json();
    })
    .then(jsonResponse => {    
      return jsonResponse;
    }) as Promise<any>;
}

public InvokeAPIAndSetDataIntoState(){

  this.getUserDetails().then(response =>{

    this.setState({

      id: response.id,
      name: response.name,
      username: response.username,
      email:response.email,
      address:'Street: '+ response.address.street+ ' Suite: '+ response.address.suite+ ' City'+response.address.city+' Zip Code:'+response.address.zipcode, 
      phone:response.phone,
      website: response.website,
      company: response.company.name

      
    });

   });

}


public componentDidMount() {
      
  this.InvokeAPIAndSetDataIntoState();
  
  }

  public componentDidUpdate(prevProps: IAnonymousDemo2Props, prevState: IAnonymousDemo2State, prevContext: any): void {
     
    this.InvokeAPIAndSetDataIntoState();
  }



  public render(): React.ReactElement<IAnonymousDemo2Props> {
    return (
      <div className={ styles.anonymousDemo2 }>
         <span className={ styles.title }>User Details:</span>

    <div><strong>ID: </strong>{this.state.id}</div><br/>
    <div><strong>User Name: </strong>{this.state.username}</div><br/>
    <div><strong>Name: </strong>{this.state.name}</div><br/>
    <div><strong>Address: </strong>{this.state.address}</div><br/>
    <div><strong>Email: </strong>{this.state.email}</div><br/>
    <div><strong>Phone: </strong>{this.state.phone}</div><br/>
    <div><strong>Web site: </strong>{this.state.website}</div><br/>
    <div><strong>Company: </strong>{this.state.company}</div><br/>
      </div>
    );
  }
}
