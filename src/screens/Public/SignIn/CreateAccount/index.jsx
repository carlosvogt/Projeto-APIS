/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Container, Steps, Button, useToast, Modal } from '@components';
import { Header, Footer } from '@components/layout';

function CreateAccount() {
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  function toastFunction() {
    toast.success('Conta criada!');
  }

  useEffect(() => {
    toastFunction();
    setShowModal(true);
  }, []);

  return (
    <>
      <Header title="Teste" />
      <Container>
        <Footer>
          <Button onPress={() => console.log('teste')} title="Continuar" />
          <Steps total={3} active={0} />
        </Footer>
      </Container>

      <Modal
        mode="production"
        showModal={showModal}
        positiveAction={(values) => console.log(values)}
        cancelFunction={() => setShowModal(false)}
        isSubmitting={false}
      />
    </>
  );
}
export default CreateAccount;
