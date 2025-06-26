import { InicialService } from "./inicial-service.js";
import { HealthCheckService } from "./health-check-service.js";
import UsuarioService from "./usuario-service.js";
import GatoService from "./gato-service.js";
import RecebimentoService from "./recebimento-gato-service.js";


const Servico = {
    INICIAL: InicialService,
    HEALTH_CHECK: HealthCheckService,
    USUARIO: UsuarioService,
    GATO: GatoService,
    RECEBIMENTOGATO: RecebimentoService
};

export default Servico