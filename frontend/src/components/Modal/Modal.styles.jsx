import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: #fff;
  padding: 64px;
  border-radius: 15px;
  box-shadow: 6px 6px 25px 0px rgba(0, 0, 0, 0.05),
    2px 2px 4px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 32px;
`;

export const Dimm = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0 , 0, 0.5);
`;

export const Text = styled.p`
  font-size: 1rem;
  font-weight: 900;
  margin: 0;
`;

export const ButtonWrapper = styled.div`
  
`;