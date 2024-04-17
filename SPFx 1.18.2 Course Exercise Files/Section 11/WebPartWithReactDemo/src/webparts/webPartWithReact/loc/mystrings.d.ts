declare interface IWebPartWithReactWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'WebPartWithReactWebPartStrings' {
  const strings: IWebPartWithReactWebPartStrings;
  export = strings;
}
