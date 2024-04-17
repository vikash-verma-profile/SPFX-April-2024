declare interface IMyCommandSetDemoNewCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'MyCommandSetDemoNewCommandSetStrings' {
  const strings: IMyCommandSetDemoNewCommandSetStrings;
  export = strings;
}
