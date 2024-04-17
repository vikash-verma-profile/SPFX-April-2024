import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MultipleGroupsDemoWebPart.module.scss';
// import * as strings from 'MultipleGroupsDemoWebPartStrings';

export interface IMultipleGroupsDemoWebPartProps {
  description: string;
  productname: string;
  isCertified: boolean;
}

export default class MultipleGroupsDemoWebPart extends BaseClientSideWebPart <IMultipleGroupsDemoWebPartProps> {
 
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.multipleGroupsDemo }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">Welcome to SharePoint!</span>
  <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
    <p class="${ styles.description }">${escape(this.properties.description)}</p>

    <p class="${ styles.description }">${escape(this.properties.productname)}</p>

    <p class="${ styles.description }">${this.properties.isCertified}</p>

      <a href="https://aka.ms/spfx" class="${ styles.button }">
        <span class="${ styles.label }">Learn more</span>
          </a>
          </div>
          </div>
          </div>
          </div>`;
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}


private checkProdNameLength(value: string): string { 
  if (value.length < 5) { 
      return "ProductName must be more than 5 characters!"; 
  } else { 
    return ""; 
  } 
} 


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    
    pages: [{
      header: {
      description: "Page 1"
      },
      groups: [{
      groupName: "First Group",
      groupFields: [
      PropertyPaneTextField('productname', {
      label: "Product Name 1",
      multiline: true, 
      resizable: true, 
      onGetErrorMessage: this.checkProdNameLength, 
      errorMessage: "This is the error message", 
      deferredValidationTime: 5000, 
      placeholder: "This is the placeholder text (shown when no value is entered)", 
      "description": "This is the description"
      })
      ]
      }, {
      groupName: "Second Group",
      groupFields: [
      PropertyPaneToggle('isCertified', {
      label: "Is Certified 1?"
      })
      ]
      }],
      displayGroupsAsAccordion: true
      },
      {
        header: {
        description: "Page 2"
        },
        groups: [{
        groupName: "First Group",
        groupFields: [
        PropertyPaneTextField('productname', {
        label: "Product Name 2"
        })
        ]
        }, {
        groupName: "Second Group",
        groupFields: [
        PropertyPaneToggle('isCertified', {
        label: "Is Certified 2?"
        })
        ]
        }],
        displayGroupsAsAccordion: true
        },
        {
          header: {
          description: "Page 3"
          },
          groups: [{
          groupName: "First Group",
          groupFields: [
          PropertyPaneTextField('productname', {
          label: "Product Name 3"
          })
          ]
          }, {
          groupName: "Second Group",
          groupFields: [
          PropertyPaneToggle('isCertified', {
          label: "Is Certified 3?"
          })
          ]
          }],
          displayGroupsAsAccordion: true
          },
          {
            header: {
            description: "Page 4"
            },
            groups: [{
            groupName: "First Group",
            groupFields: [
            PropertyPaneTextField('productname', {
            label: "Product Name 4"
            })
            ]
            }, {
            groupName: "Second Group",
            groupFields: [
            PropertyPaneToggle('isCertified', {
            label: "Is Certified 4?"
            })
            ]
            }],
            displayGroupsAsAccordion: true
            }
    
    
    
    
    
    ]//array of pages end



  };
}
}
