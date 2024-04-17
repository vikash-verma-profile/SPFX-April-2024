// npm install @types/jquery @types/jqueryui

import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ExtLibDemoWebPart.module.scss';
import * as strings from 'ExtLibDemoWebPartStrings';

import * as $ from 'jquery';
import 'jqueryui';

import { SPComponentLoader } from '@microsoft/sp-loader';

import AccordionTemplate from './AccordionTemplate';


//import * as $ from '../../../node_modules/jquery/dist/jquery.min.js';
//import * as jqueryui from '../../../node_modules/jqueryui/jquery-ui.min.js';


//require('jqueryui');

export interface IExtLibDemoWebPartProps {
  description: string;
}



/*

"externals": {
    "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
    "jqueryui": "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" 


     "jquery":"node_modules/jquery/dist/jquery.min.js",
    "jqueryui":"node_modules/jqueryui/jquery-ui.min.js"
  }


*/

export default class ExtLibDemoWebPart extends BaseClientSideWebPart <IExtLibDemoWebPartProps> {


  public constructor() {
    super();
  
    SPComponentLoader.loadCss('https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css');

    //SPComponentLoader.loadCss('../../../node_modules/jqueryui/jquery-ui.css');
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.extLibDemo }">

//       <div class="accordion">
// <h3>Lesson 14 - ECMAScript Implementation</h3>
// <div>
//     <ul>
//       <li>Overview of ECMAScript</li>
//       <li>using ECMAScript in Application Pages</li>
//       <li>Using ECMAScript in Web Parts</li>
//       <li>Implementing onSucess Function</li>
//       <li>Implementing onFail Function</li>           
//     </ul>
// </div>

// <h3>Lesson 15 - Silverlight with SharePoint</h3>
// <div>
//   <ul>
//   <li>Overview of Silverlight Implemention</li>
//   <li>Using Load Function to load resources</li>
//   <li>Adding fields to a custom list using Silverlight Implementation</li>
//   <li>Exception handling with Silverlight Implementation</li>
//   <li>Cross Domain Policy</li>
//   </ul>
// </div>
// <h3>Lesson 16 - Developing Custom Dialogs</h3>
// <div>
// <ul>
//   <li>Create a Custom Dialog for Data Entry</li>
//   <li>JavaScript and the Client Object Model</li>
//   <li>Modal Dialogs</li>
//   <li>Creating a Custom Dialog</li>
//   <li>Controlling the Client Side Behavior and Visibility of the Dialog</li>
//   <li>Adding Server Side Functionality to the Dialog</li>
//   <li>Deploying and Testing the Dialog User Control</li>  
// </ul>
// </div>
// </div>




          </div>`;


          this.domElement.innerHTML = AccordionTemplate.templateHtml;


          // const accordionOptions: JQueryUI.AccordionOptions = {
          //   animate: true,
          //   collapsible: false,
          //   icons: {
          //     header: 'ui-icon-circle-arrow-e',
          //     activeHeader: 'ui-icon-circle-arrow-s'
          //   }
          // };


          ($('.accordion', this.domElement) as any).accordion();
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
