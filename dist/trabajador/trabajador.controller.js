"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const trabajador_registration_dto_1 = require("./trabajador.registration.dto");
const log_in_dto_1 = require("../authentication/log.in.dto");
const cookie_1 = require("../authentication/cookie");
const trabajador_service_1 = require("./trabajador.service");
let TrabajadorController = class TrabajadorController {
    constructor(trabajadorService) {
        this.trabajadorService = trabajadorService;
    }
    async register(registerDTO) {
        return await this.trabajadorService.register(registerDTO);
    }
    async login(logInDTo) {
        return await this.trabajadorService.authenticate(logInDTo);
    }
};
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trabajador_registration_dto_1.default]),
    __metadata("design:returntype", Promise)
], TrabajadorController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [log_in_dto_1.LogInDTO]),
    __metadata("design:returntype", Promise)
], TrabajadorController.prototype, "login", null);
TrabajadorController = __decorate([
    common_1.Controller('trabajador'),
    __metadata("design:paramtypes", [trabajador_service_1.default])
], TrabajadorController);
exports.default = TrabajadorController;
//# sourceMappingURL=trabajador.controller.js.map