import React, { useEffect } from 'react';
import { Container, Steps, Button, useToast } from '@components';
import { Header, Footer } from '@components/layout';

function CreateAccount() {
  const toast = useToast();
  function toastFunction() {
    toast.success('Conta criada!');
  }

  useEffect(() => {
    toastFunction();
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
    </>
  );
}
export default CreateAccount;
