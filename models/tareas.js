require('colors');
const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach( key => {
             const tarea = this._listado[key]
             listado.push(tarea)
        })
        return listado
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    /**
     * 
     * @param {Array<Tarea>} tareas 
     */
    cargarTareasArray(tareas) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    /**
     * 
     * @param {string} desc 
     */
    crearTarea(desc) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const index = `${i + 1}`.green;
            const status = tarea.completada !== null ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${index}. ${tarea.desc} :: ${status}`);
        });
    }

    listarPedientesCompletadas(completadas = true) {
        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const { desc, completada } = tarea;
            const estado = (completada) ?  'Completada'.green : 'Pendiente'.red;
            if (completadas) {
                if (completada) {
                    contador++;
                    console.log(`${contador.toString().green}. ${desc} :: ${estado.green}`);
                }
            } else {
                if (!completada) {
                    contador++;
                    console.log(`${contador.toString().green}. ${desc} :: ${estado}`);
                }
            }
        })
    }

    /**
     * 
     * @param {Array} ids 
     */
    cambiarCompletadas(ids) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completada) {
                tarea.completada = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completada = null;
            }
        });
    }
}

module.exports = Tareas;