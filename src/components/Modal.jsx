import { createPortal } from "react-dom";

export default function Modal({title,content,show,onClose,onConfirm,confirmText = "Conferma"}){
    if(!show) return null;

    return createPortal(
        <div className="modal-overlay">
            <div className="modal">
                <h2>{title}</h2>
                {content}
                <div className="bottoni-modal">
                    <button onClick={onClose}>Annulla</button>
                    <button onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    )
}













// 📌 Milestone 9 - Componente Modal e Conferma Eliminazione Task
// Creare un componente Modal riutilizzabile e utilizzarlo per confermare l’eliminazione di un task.


// Creare il componente Modal.jsx, che deve:
// Accettare i seguenti props:
// title: il titolo della modale.
// content: il contenuto principale della modale.
// show: stato booleano per mostrare o nascondere la modale.
// onClose: funzione per chiudere la modale.
// onConfirm: funzione eseguita al click del bottone di conferma.
// confirmText (opzionale, default "Conferma"): testo del bottone di conferma.
// Utilizzare ReactDOM.createPortal per rendere la modale indipendente dal flusso di rendering.
// Implementare i pulsanti "Annulla" (chiude la modale) e "Conferma" (esegue onConfirm).

// Integrare il componente Modal in TaskDetail.jsx per confermare l'eliminazione:
// Quando l’utente clicca su "Elimina Task", deve aprirsi la modale di conferma.
// Se l’utente conferma, vengono eseguite le stesse operazioni della Milestone 8.