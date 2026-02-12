"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.converteFotosParaWEBP = converteFotosParaWEBP;
const sharp_1 = __importDefault(require("sharp"));
async function converteFotosParaWEBP(fotos) {
    const fotosConvertidas = [];
    for (const foto of fotos) {
        const bufferWebp = await (0, sharp_1.default)(foto.buffer)
            .resize(800, 800, { fit: 'inside' })
            .webp({ quality: 80 })
            .toBuffer();
        fotosConvertidas.push({
            buffer: bufferWebp,
            originalName: foto.originalname,
            mimeType: 'image/webp'
        });
    }
    return fotosConvertidas;
}
//# sourceMappingURL=converte-fotos.js.map