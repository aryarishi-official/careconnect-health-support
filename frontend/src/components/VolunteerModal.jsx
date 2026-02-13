import VolunteerForm from "./VolunteerForm";

export default function VolunteerModal({ open, onClose, onSuccess }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <VolunteerForm onSuccess={onSuccess} />
      </div>
    </div>
  );
}
