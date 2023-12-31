import React from 'react';
import Button from '../../ui/Button';
import CreateCabinForm from '../../features/cabins/CreateCabinForm';
import Modal from '../../ui/Modal';

// Old Not so proper wayto do.
// function AddCabin() {
//   const [isOpen, setIsOpenModal] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((isOpen) => !isOpen)}>
//         Add New Cabin
//       </Button>

//       {isOpen && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <div>
          <Button>Add New Cabin</Button>
        </div>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
