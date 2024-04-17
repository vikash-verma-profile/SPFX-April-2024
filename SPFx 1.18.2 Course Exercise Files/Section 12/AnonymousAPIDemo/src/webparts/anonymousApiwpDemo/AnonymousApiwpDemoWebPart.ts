import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AnonymousApiwpDemoWebPartStrings';
import AnonymousApiwpDemo from './components/AnonymousApiwpDemo';
import { IAnonymousApiwpDemoProps } from './components/IAnonymousApiwpDemoProps';

import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export interface IAnonymousApiwpDemoWebPartProps {
  description: string;
}

export default class AnonymousApiwpDemoWebPart extends BaseClientSideWebPart <IAnonymousApiwpDemoWebPartProps> {

  public render(): void {


    this.getUserDetails()
    .then(response =>{

    const element: React.ReactElement<IAnonymousApiwpDemoProps> = React.createElement(
      AnonymousApiwpDemo,
      {
        description: this.properties.description,
        id:response.id,
        name:response.name,
        username:response.username,
        email:response.email,
        address:'Street: '+ response.address.street+ ' Suite: '+ response.address.suite+ ' City'+response.address.city+' Zip Code:'+response.address.zipcode, 
        phone:response.phone,
        website: response.website,
        company: response.company.name 
      }
    );

    ReactDom.render(element, this.domElement);
  }
);

}


  private getUserDetails(): Promise<any> {
    return this.context.httpClient.get(
      'https://jsonplaceholder.typicode.com/users/2',HttpClient.configurations.v1
    )
      .then((response: HttpClientResponse) => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse;
      }) as Promise<any>;
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
