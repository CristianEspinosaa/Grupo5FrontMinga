import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import modalActions from '../store/actions/modalActions';

const { closeModal } = modalActions;

export default function ModalDonate() {
  const dispatch = useDispatch();
  const { isOpen, modalName } = useSelector((store) => store.modal);

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  let botones = [
    {
      id: 1,
      title: 'Donate $10.000',
      currency_id: 'COP',
      price: 10000,
      image: 'https://img.icons8.com/?size=80&id=9mOQmrZvHt8i&format=png',
      quantity: 1,
      image_pay: 'https://i.imgur.com/anrrNbs.png',
    },
    {
      id: 2,
      title: 'Donate $50.000',
      currency_id: 'COP',
      price: 50000,
      image: 'https://img.icons8.com/?size=80&id=UuufFQcNJ_Ks&format=png',
      quantity: 1,
      image_pay: 'https://i.imgur.com/anrrNbs.png',
    },
    {
      id: 3,
      title: 'Donate $100.000',
      currency_id: 'COP',
      price: 100000,
      image: 'https://img.icons8.com/?size=80&id=U9uKtYyVEMbo&format=png',      
      quantity: 1,
      image_pay: 'https://i.imgur.com/anrrNbs.png',
    },
  ];

  const token = localStorage.getItem('token'); // Obtener el token de localStorage

  return (
    <>
      {isOpen && modalName === 'modalDonate' && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-30 z-[100000]">
          <div className="flex flex-col p-4 gap-4 bg-blue-400 text-white rounded-md items-center z-[10000]">
            {botones.map((btn, index) => (
              <div key={index} className="flex justify-center items-center p-5 gap-5">
                <img src={btn.image} alt={btn.title} />
                <button
                  className="h-12 w-52 rounded bg-slate-700 hover:bg-indigo-800 text-white font-medium"
                  id={btn.id}
                  onClick={() => {
                    axios
                      .post(
                        'http://localhost:8080/api/payment', 
                        btn, 
                        {
                          headers: {
                            Authorization: `Bearer ${token}`, // Enviar el token en los encabezados
                          },
                        }
                      )
                      .then((res) => (window.location.href = res.data.response.body.init_point))
                      .catch((error) => console.error('Error al hacer la donación:', error));
                  }}
                >
                  {btn.title}
                </button>
              </div>
            ))}
            <button
              className="h-8 w-24 rounded bg-blue-600 hover:bg-blue-800 text-white font-medium"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}