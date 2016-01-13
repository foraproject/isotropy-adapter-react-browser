declare module "isomorphic-relay" {
    declare function prepareData(props: Object): Promise
    declare function injectPreparedData(data: Object) : void;
}
