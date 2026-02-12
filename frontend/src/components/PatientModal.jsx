import PatientForm from "./PatientForm";

export default function PatientModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <PatientForm />
      </div>
    </div>
  );
}
