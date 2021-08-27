require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

async function Main() {
  let answer = '';
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasArray(tareasDB);
  }

  do {
    answer = await inquirerMenu();

    switch (answer) {
      case '1':
        const desc = await leerInput('Descripción: ');
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        break;
      case '3':
        tareas.listarPedientesCompletadas(true);
        break;
      case '4':
        tareas.listarPedientesCompletadas(false);
        break;
      case '5':
        const ids = await listadoChecklist(tareas.listadoArr);
        tareas.cambiarCompletadas(ids);
        break;
      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);
        const ok = await confirmar('¿Esta seguro?');
        if (id !== '0') {
          if (ok) {
            tareas.borrarTarea(id);
            console.log('Tarea Borrada');
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();

  } while (answer !== '0')
}

Main();