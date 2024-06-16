import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import car from '../assets/car.png'
import NotificationItem from './NotificationItem';

const style = {
  position: 'absolute',
  top: '0%',
  right: '0%',
  // width: '45%',
  height: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  outline: 'none',
};

export default function TransitionsModal({modalHandler}) {

  const closeModal = () => modalHandler.closeModal();
  const isModalOpen = modalHandler.modal

  return (
    <div className='w-full'>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Slide className='' direction="left" in={isModalOpen} mountOnEnter unmountOnExit>
          <Box sx={style} className="w-full">
            <div className="flex flex-col gap-5 w-[100vw] md:w-[30rem] lg:w-[40rem] md:p-7 px-2 py-4 overflow-y-scroll relative">
              <h1 className='font-semibold font-Poppins text-[1rem] lg:text-[1.7rem] flex items-center gap-1 lg:gap-3'>
                <i className='bx bx-chevron-left cursor-pointer text-[1.5rem] lg:text-[1.7rem]' onClick={closeModal}></i>
                Notifications
              </h1>
              <div className="md:h-[70vh] h-[100vh] flex flex-col gap-10 overflow-y-scroll">
                <NotificationItem
                  to="#"
                  image={car}
                  title="Check out the best car deals today!"
                  date="Today, 08:35am"
                  statusColor="#00753E"
                  NotificationIcon="bx bxs-circle"
                />
                <NotificationItem
                  to="#"
                  image={car}
                  title="Check out the best car deals today!"
                  date="Today, 08:35am"
                  statusColor="#00753E"
                  NotificationIcon="bx bxs-circle"
                />
                <NotificationItem
                  to="#"
                  image={car}
                  title="Check out the best car deals today!"
                  date="Today, 08:35am"
                />
                <NotificationItem
                  to="#"
                  image={car}
                  title="Check out the best car deals today!"
                  date="Today, 08:35am"
                />
                <NotificationItem
                  to="#"
                  image={car}
                  title="Check out the best car deals today!"
                  date="Today, 08:35am"
                />
                <NotificationItem
                  to="#"
                  image={car}
                  title="Check out the best car deals today!"
                  date="Today, 08:35am"
                  statusColor="#00753E"
                  NotificationIcon="bx bxs-circle"
                />
                <NotificationItem
                  to="#"
                  image={car}
                  title="Check out the best car deals today!"
                  date="Today, 08:35am"
                />
                <NotificationItem
                  to="#"
                  image={car}
                  title="Check out the best car deals today!"
                  date="Today, 08:35am"
                />
                <NotificationItem
                  to="#"
                  image={car}
                  title="Check out the best car deals today!"
                  date="Today, 08:35am"
                  statusColor="#00753E"
                  NotificationIcon="bx bxs-circle"
                />
              </div>
            </div>
          </Box>
        </Slide>
        {/* <Fade in={isModalOpen}>
          
        </Fade> */}
      </Modal>
    </div>
  );
}