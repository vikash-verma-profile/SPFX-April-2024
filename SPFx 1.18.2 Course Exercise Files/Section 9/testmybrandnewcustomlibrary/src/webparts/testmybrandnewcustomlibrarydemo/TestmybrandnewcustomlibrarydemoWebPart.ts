import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import { IReadonlyTheme } from '@microsoft/sp-component-base';
//import { escape } from '@microsoft/sp-lodash-subset';

import styles from './TestmybrandnewcustomlibrarydemoWebPart.module.scss';
import * as strings from 'TestmybrandnewcustomlibrarydemoWebPartStrings';

import * as myLibrary from 'Mybrandnewcustomlibrary';

export interface ITestmybrandnewcustomlibrarydemoWebPartProps {
  description: string;
}

export default class TestmybrandnewcustomlibrarydemoWebPart extends BaseClientSideWebPart<ITestmybrandnewcustomlibrarydemoWebPartProps> {


  public render(): void {


    const myInstance = new myLibrary.MybrandnewcustomlibrarydemolibraryLibrary();


    this.domElement.innerHTML = `
      <div class="${ styles.testmybrandnewcustomlibrarydemo }">
    
    <p>Calling Library function</p>

    <p>${myInstance.getCurrentTime()}</p>

          </div>`;
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
