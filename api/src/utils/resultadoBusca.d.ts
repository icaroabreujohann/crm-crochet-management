export declare function resultadoInexistente<T>(): {
    readonly existe: false;
    readonly data: null;
};
export declare function resultadoEncontrado<T>(data: T): {
    readonly existe: true;
    readonly data: T;
};
//# sourceMappingURL=resultadoBusca.d.ts.map