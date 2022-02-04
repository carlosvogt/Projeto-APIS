import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import {
  Container,
  ToggleButton,
  Steps,
  Button,
  Dropdown,
  ExpensiveNote,
} from '@components';
import {
  Add,
  ArrowBack,
  ArrowDown,
  ArrowMore,
  Bee,
  CheckOutline,
  ConfigIcon,
  DarkMode,
  Done,
  Download,
  Gps,
  Home,
  Info,
  LightMode,
  Location,
  Logout,
  Map,
  More,
  Password,
  Person,
  Send,
  Share,
  Trash,
  VisibilityOff,
  VisibilityOn,
} from '@assets';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignInForm from './SignInForm';

function SignIn() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [selectedCode, setSelectedCode] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  const loading = true;

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
  });
  const options = [
    {
      label: 'Sim',
      value: 'Sim',
    },
    {
      label: 'Não',
      value: 'Não',
    },
    {
      label: 'Nãzo',
      value: 'Nzão',
    },
    {
      label: 'Nzãao',
      value: 'Nzaão',
    },
    {
      label: 'Nãoaa',
      value: 'Nãaao',
    },
    {
      label: 'sNãoaa',
      value: 'Nãsaao',
    },
  ];

  const [selectedOption, setSelectedOption] = useState(false);

  const apiaries = [
    {
      code: 1,
      nome: 'Apiário número 1',
      qtdOcupada: 50,
      qtdLivre: 10,
      notes: [
        {
          code: 1,
          nome: 'Anotação 1',
          note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
        },
        {
          code: 2,
          nome: 'Anotação 2',
          note: 'Aqui o texto será escrito de forma integral',
        },
        {
          code: 3,
          nome: '',
          note: 'Aqui o texto será escrito de forma integral aaa',
        },
      ],
    },
    {
      code: 2,
      nome: 'Apiário número 2',
      qtdOcupada: 50,
      qtdLivre: 10,
      notes: [
        {
          code: 1,
          nome: 'Anotação 1',
          note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
        },
      ],
    },
    {
      code: 3,
      nome: 'Apiário número 3',
      qtdOcupada: 50,
      qtdLivre: 10,
      notes: [],
    },
  ];

  const notes = [
    {
      code: 1,
      nome: 'Anotação 1',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
    {
      code: 2,
      nome: 'Anotação 2',
      note: 'Aqui o texto será escrito de forma integral',
    },
    {
      code: 3,
      nome: '',
      note: 'Aqui o texto será escrito de forma integral aaa',
    },

    {
      code: 4,
      nome: 'Anotação 1',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
  ];

  const handleNote = () => {
    console.log('Nova nota');
  };

  const handleApiari = () => {
    console.log('Ir para apiários', selectedCode);
  };

  const handleEdit = () => {
    console.log('Editar Nota', selectedCode);
  };

  const handleDelete = () => {
    console.log('Deletar nota', selectedCode);
  };

  const modalOptions = [
    { option: 'Nota', onClick: handleNote },
    { option: 'Visualizar', onClick: handleApiari },
  ];

  const modalNoteOptions = [
    { option: 'Editar', onClick: handleEdit },
    { option: 'Apagar', onClick: handleDelete },
  ];

  return (
    <Container>
      <Dropdown
        label={t('form:label.payed')}
        value={selectedOption}
        setValue={setSelectedOption}
        data={options}
      />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {apiaries.length > 0 ? (
          apiaries.map((apiarie) => {
            return (
              <ExpensiveNote
                key={apiarie.code}
                name={apiarie.nome}
                qtdEmpty={apiarie.qtdLivre}
                qtdOccupy={apiarie.qtdOcupada}
                notes={apiarie.notes}
                hasData
                modalOptions={modalOptions}
                mode="apiary"
                selectedCode={apiarie.code}
                setSelectedCode={() => setSelectedCode(apiarie.code)}
              />
            );
          })
        ) : (
          <ExpensiveNote hasData={false} mode="apiary" />
        )}

        {notes.length > 0 ? (
          notes.map((note) => {
            return (
              <ExpensiveNote
                mode="note"
                key={note.code}
                name={note.nome}
                notes={note.note}
                hasData
                modalOptions={modalNoteOptions}
                selectedCode={note.code}
                setSelectedCode={() => setSelectedCode(note.code)}
              />
            );
          })
        ) : (
          <ExpensiveNote hasData={false} mode="note" />
        )}

        <SignInForm
          onSubmit={(values) => console.log(values)}
          isSubmitting={false}
        />

        <Title2>{t('formErrors:required')}</Title2>
        <Title1 family="medium">{t('formErrors:required')}</Title1>

        <ToggleButton
          isEnabled={isEnabled}
          setIsEnabled={() => setIsEnabled(!isEnabled)}
          title={isEnabled ? 'White' : 'Dark'}
        />
        <Steps total={3} active={0} />
        <View style={{ flexDirection: 'row' }}>
          <Add />
          <ArrowBack />
          <ArrowDown />
          <ArrowMore />
          <Bee />
          <CheckOutline />
          <ConfigIcon />
          <DarkMode />
          <Done />
          <Download />
          <Gps />
          <Home />
          <Info />
          <LightMode />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Location />
          <Logout />
          <Map />
          <More />
          <Password />
          <Person />
          <Send />
          <Share />
          <Trash />
          <VisibilityOff />
          <VisibilityOn />
        </View>

        <Button
          title="Logar"
          margin={16}
          onPress={() => navigation.navigate('CreateAccount')}
        />

        <Button
          loading={loading}
          loadingBlock={!!loading}
          title="Logando"
          onPress={() => console.log('teste')}
        />

        <Button
          disabled
          title="Bloqueado"
          onPress={() => console.log('teste')}
        />

        <Button
          title="Esqueceu sua senha?"
          onPress={() => console.log('teste')}
          mode="outlined"
          titleFamily="light"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'yellow',
          }}
        >
          <Button
            title="Cancelar"
            onPress={() => console.log('teste')}
            mode="outlined"
            textColor="red"
            titleFamily="medium"
            viewStyle={{ paddingHorizontal: 20 }}
          />
          <Button
            title="Salvar"
            onPress={() => console.log('teste')}
            viewStyle={{ paddingHorizontal: 20 }}
            style={{
              width: 200,
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
}
export default SignIn;
