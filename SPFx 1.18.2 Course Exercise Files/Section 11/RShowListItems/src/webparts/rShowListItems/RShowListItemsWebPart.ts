import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'RShowListItemsWebPartStrings';
import RShowListItems from './components/RShowListItems';
import { IRShowListItemsProps } from './components/IRShowListItemsProps';

export interface IRShowListItemsWebPartProps {
  description: string;
}

export default class RShowListItemsWebPart extends BaseClientSideWebPart <IRShowListItemsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRShowListItemsProps> = React.createElement(
      RShowListItems,
      {
        description: this.properties.description,
        websiteurl:this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
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
