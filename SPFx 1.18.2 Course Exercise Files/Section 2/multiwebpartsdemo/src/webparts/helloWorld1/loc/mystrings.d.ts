declare interface IHelloWorld1WebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'HelloWorld1WebPartStrings' {
  const strings: IHelloWorld1WebPartStrings;
  export = strings;
}
