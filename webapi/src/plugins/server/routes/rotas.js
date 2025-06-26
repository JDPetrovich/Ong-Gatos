import RotaInicial from "./rota-inicial.js"
import Redirecionamento from "./redirecionamento-route.js"
import RotaUsuario from "./rota-usuario.js"
import RotaGato from "./rota-gato.js"
import RotaRecebimentoGato from "./rota-recebimento-gato.js"

const Rota = {
    INICIAL: RotaInicial,
    REDIRECIONAMENTO: Redirecionamento,
    USUARIO: RotaUsuario,
    GATO: RotaGato,
    RECEBIMENTO: RotaRecebimentoGato
}

export default Rota 