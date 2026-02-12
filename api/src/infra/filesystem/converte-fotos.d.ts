export interface FotoWEBP {
    buffer: Buffer;
    originalName: string;
    mimeType: 'image/webp';
}
export declare function converteFotosParaWEBP(fotos: Express.Multer.File[]): Promise<FotoWEBP[]>;
//# sourceMappingURL=converte-fotos.d.ts.map