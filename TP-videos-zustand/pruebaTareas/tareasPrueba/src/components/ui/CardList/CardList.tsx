import { FC } from "react";
import { ITarea } from "../../../types/iTareas";
import styles from "./CardList.module.css";
import { useTareas } from "../../../hooks/useTareas";

type ICardList = {
    tarea: ITarea
    handleOpenModal: (tarea:ITarea) => void
}

export const CardList: FC<ICardList> = ({tarea, handleOpenModal}) => {

    const {eliminarTarea} = useTareas();

    const eliminarTareaById = () => {
        eliminarTarea(tarea.id!)
    }

    const editarTarea = () => {
        handleOpenModal(tarea)
    }

    return (
        <div className={styles.containerCard}>
            <div className={styles.container}>
                <h3>Título: {tarea.titulo}</h3>
                <p>Descripción: {tarea.descripcion}</p>
                <p>
                    <b>Fecha límite: {tarea.fechaLimite}</b>
                </p>
            </div>

            <div className={styles.actionCard}>
                <button onClick={eliminarTareaById}>Eliminar</button>
                <button onClick={editarTarea}>Editar</button>
            </div>
        </div>
    )
}
