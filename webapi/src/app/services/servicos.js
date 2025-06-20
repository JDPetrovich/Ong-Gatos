import { InicialService } from "./inicial-service.js";
import { HealthCheckService } from "./health-check-service.js";
import UsuarioService from "./usuario-service.js";


const Servico = {
    INICIAL: InicialService,
    HEALTH_CHECK: HealthCheckService,
    USUARIO: UsuarioService
};

export default Servico