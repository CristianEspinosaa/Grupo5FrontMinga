import React from 'react';
import ButtonSuscribe from './ButtonSuscribe/ButtonSuscribe';
import ModalDonate from './Donate/ModalDonate';
import modalActions from '../store/actions/modalActions';
import { useDispatch, useSelector } from 'react-redux';


const { openModal, closeModal } = modalActions;

export default function Foother() {
  const modalName = 'modalDonate';
  const dispatch = useDispatch();
  const isOpen = useSelector(store => store.modal.isOpen);

  const handleOpenModal = () => {
    dispatch(openModal({ modalName }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <footer className="flex flex-col items-center min-h-[50vh] relative bg-[#faf9f9]">
      {/* Rectángulo de imagen */}
      <div className="bg-cover h-[18vh] w-full rounded-b-[20%] bg-[url('/rectangle.png')]"></div>

      {/* Suscribirse */}
      <div className="flex justify-between items-center rounded-lg absolute bg-[#f8f8f8] w-[80%] h-[18vh] top-[15vh] px-[80px] py-[30px] gap-5 shadow-[0px_85px_45px_rgba(240,240,240)]">
        <h5 id="suscribeId" className="text-black text-2xl font-normal">Subscribe</h5>
        <div className="flex gap-5 p-2 border border-[#a3a3a3] rounded-lg w-[445px]">
          <input type="email" placeholder="Enter your email" className="border-none bg-transparent outline-none w-[190px] h-[5vh]" />
          <ButtonSuscribe text="Subscribe Now" />
        </div>
      </div>

      {/* Contenido final */}
      <div className="mt-[140px] flex justify-between items-center z-10 border-b border-[#d4d4d4] h-[14vh] w-[80vw] flex-wrap">
        {/* Enlaces */}
        <div id="ancors-footer">
          <a href="/" className="text-black font-normal ml-5">Home</a>
          <a href="/mangas" className="text-black font-normal ml-5">Comics</a>
        </div>

        {/* Imagen de logo */}
        <img id="img-footer" src="/Logomr.png" alt="" className="w-[200px] h-[50px]" />

        {/* Iconos y botón */}
        <div className="flex flex-col items-center justify-center h-[13vh] w-[300px]">
          <div className="flex justify-between w-[83%] pl-5 mb-3">
            <img src="/Facebook.png" alt="fb" />
            <img src="/Twitter.png" alt="tw" />
            <img src="/Vimeo.png" alt="vm" />
            <img src="/Youtube.png" alt="yt" />
          </div>
          <button
            className="bg-gradient-to-l from-[#2e1bdb] to-[#4839cf] flex justify-center items-center cursor-pointer rounded-[6px] p-4 w-[13rem] h-[2.5rem] text-white text-[1.1rem] shadow-none"
            onClick={handleOpenModal}
          >
            Donate
          </button>
          <ModalDonate isOpen={isOpen} onCloseModal={handleCloseModal} />
        </div>
      </div>
    </footer>
  );
}