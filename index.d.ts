type DatacastingCaster = (value: any, key: string, data: any) => any
type DatacastingScheme = {
  [key: string]: DatacastingCaster,
}

type DatacastingPassedData<S extends DatacastingScheme> = Partial<Record<keyof S, any>> & Record<string, any>
type DatacastingRewritedData<S extends DatacastingScheme> = {
  [K in keyof S]: ReturnType<S[K]>;
}

interface Datacasting<S extends DatacastingScheme> {
  rewrite(data: DatacastingPassedData<S>[]): DatacastingRewritedData<S>[];
  rewrite(data: DatacastingPassedData<S>): DatacastingRewritedData<S>;
  cast<P = DatacastingPassedData<S>, R = DatacastingRewritedData<S>>(data: P[]): Pick<P, Exclude<keyof P, keyof R>>[] & R[];
  cast<P = DatacastingPassedData<S>, R = DatacastingRewritedData<S>>(data: P): Pick<P, Exclude<keyof P, keyof R>> & R;
}

export function scheme<S extends DatacastingScheme = DatacastingScheme>(scheme: S): Datacasting<S>;

export function replace(searchValue: string | RegExp, replaceValue: string | RegExp): (value: string) => string;
export function toArrayOf<K = StringConstructor | NumberConstructor | BooleanConstructor>(format: K): (value: any) => ReturnType<typeof format>[];
export function toDate(format: string): (value: string) => Date;
export function toInteger(value: any): number;
export function toLowerCase(value: any): string;
export function toUpperCase(value: any): string;
