import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Title2 } from '@components/typography';
import { Container, Button, useToast } from '@components';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Footer, Header } from '@components/layout';
import { useTheme } from '@theme';

function TermsOfUse() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();
  const deviceWidth = Dimensions.get('window').width;

  const showFile = () => {
    // ler os termos
  };

  useEffect(() => {
    showFile();
  }, []);

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: -10,
    },
    buttonStyle: { width: deviceWidth * 0.45 },
  });

  const handleCreateAccount = () => {
    const acceptedAt = Date();
    navigation.navigate('CreateAccountPersonalInfo', {
      params: { accepted: true, acceptedAt },
    });
  };

  const handleDisagreeTerms = () => {
    navigation.goBack();
    toast.error(t('translations:termsDisagree'));
  };

  return (
    <>
      <Header title={t('translations:termsOfUse')} />

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <Title2>
            A seguir estão descritas as regras aplicáveis à utilização do
            aplicativo SE Alimentar (Sistema Especialista Alimentar)
            (“Aplicativo”) desenvolvido com cunho educacional como trabalho de
            conclusão de curso pelo graduando Wiliam Kern Franco do Curso de
            Ciência da Computação pela instituição de ensino UNISC (Universidade
            de Santa Cruz do Sul). Ao aceitar os termos de cadastro para
            utilização do Aplicativo, o Usuário se submeterá automaticamente às
            regras e condições destes Termos de Uso. 1. DEFINIÇÕES 1.1 App ou
            aplicativo móvel: é um software desenvolvido para ser instalado em
            dispositivo eletrônico móvel, como um telefone celular, um
            smartphone que utilize o SO (Sistema Operacional) Android versão 5.0
            (Lollipop) ou superior. 1.2 Android: é um sistema operacional para
            dispositivos móveis, desenvolvido pelo ‘’Open Handset Alliance’’,
            liderada pelo Google. 1.3 Tecnologia Push: no caso deste Termo de
            Uso trata-se de conteúdo a ser encaminhado como alertas, lembretes
            ou mensagens ao usuário que tiver o aplicativo SE Alimentar
            instalado. 1.4 Usuários: a aplicação destina-se para pessoas entre
            18 e 60 anos (público adulto). Os Usuários terão acesso aos
            recursos: a) Criar cadastro com nome, altura, peso, sexo e idade. b)
            Consultar e criar cardápios alimentares. c) Desativar/Ativar
            lembretes referentes a notificações de alimentação. d) Remover seu
            cadastro a qualquer momento. e) Ler os termos de uso a qualquer
            momento. 2. DO CADASTRO E USO DO APP SE Alimentar 2.1 O cadastro
            para uso do Aplicativo é realizado no primeiro acesso do Usuário
            após aceitar os termos de uso, e poderá ser alterado a qualquer
            momento. 2.2 O Usuário ao realizar o cadastro com suas informações
            pessoais é o responsável pelo correto preenchimento e manutenção das
            referidas informações. O “Cadastro” é composto por dados
            obrigatórios, sendo eles, nome, peso, altura, sexo e idade. O
            usuário poderá alterar suas informações cadastrais no próprio
            aplicativo. 2.3 Será permitido um único cadastramento por Usuário, e
            apenas um Usuário por instalação do aplicativo, devendo o acesso,
            visualização e uso do Aplicativo ser feito pelo Usuário em caráter
            pessoal e intransferível. 2.4 Apenas pessoas maiores de 18 anos
            poderão usar a aplicação. 2.5 Não é de responsabilidade do
            desenvolvedor ou da instituição de ensino no caso de um Usuário se
            utilizar do cadastro de outro Usuário. 2.6 Toda e qualquer ação
            executada ou conteúdo publicado pelo Usuário durante o uso do
            aplicativo será de sua exclusiva e integral responsabilidade,
            devendo isentar e indenizar o autor da aplicação e instituição de
            ensino de quaisquer reclamações, prejuízos, perdas e danos causados,
            em decorrência de tais ações ou manifestações. 2.7 O Usuário
            concorda em responder um questionário após uma semana utilizando a
            aplicação, com suas experiências e feedbacks pessoais referente ao
            Aplicativo SE Alimentar. 2.8 O autor e a instituição de ensino se
            eximem de toda e qualquer responsabilidade pelos danos e prejuízos
            de qualquer natureza que possam decorrer do acesso, interceptação,
            eliminação, alteração, modificação ou manipulação, por terceiros não
            autorizados, dos dados do usuário durante a utilização do
            aplicativo. 2.9 As informações solicitadas ao Usuário no momento do
            cadastro serão utilizadas somente para os fins previstos nestes
            Termos de Uso e em nenhuma circunstância, tais informações serão
            cedidas ou compartilhadas com terceiros. 3. RENÚNCIA A GARANTIAS E
            LIMITAÇÃO DE RESPONSABILIDADE 3.1 O autor nem a instituição de
            ensino garantem que o Aplicativo será livre de perdas, defeitos,
            ataques, vírus, interferências, atividades de hackers ou outra
            intrusão de segurança, e o autor e a intuição de ensino renunciam a
            qualquer responsabilidade com relação a isso por ser culpa de
            terceiros. 4. DA PROPRIEDADE INTELECTUAL 4.1. O Usuário concorda que
            o Aplicativo com interface de usuário, scripts e software utilizados
            para implementá-lo contêm informações exclusivas de propriedade do
            autor e são protegidos pelas leis de propriedade intelectual e
            outras leis aplicáveis, incluindo, sem limitação, direitos autorais.
            4.2. O Usuário concorda que não utilizará tais informações ou
            materiais exclusivos de nenhuma forma, exceto para uso dos Serviços
            em conformidade com este Termo de Uso. Nenhuma parte dos serviços
            poderá ser reproduzida de qualquer forma ou por qualquer meio,
            exceto conforme expressamente permitido por estes termos. 4.3. Sem
            prejuízo de qualquer disposição deste Termo, o autor e intuição de
            ensino e seus representantes se reservam o direito de alterar,
            suspender, remover ou desabilitar o acesso ao aplicativo, conteúdos
            ou outros materiais, a qualquer momento, sem aviso ou ônus. Em
            hipótese alguma, o autor nem a instituição de ensino serão
            responsabilizados por ter realizado tais alterações. 5. DA POLITICA
            DE PRIVACIDADE 5.1. Informações pessoais: Os dados pessoais
            inseridos no Aplicativo serão armazenados apenas no dispositivo do
            usuário, não sendo conectados e nenhum web servisse ou banco de
            dados externo ou em nuvem. 6. DO CANCELAMENTO 6.1 O usuário poderá,
            a qualquer momento, desinstalar o SE Alimentar, e remover seus dados
            pessoais da base de dados pela funcionalidade “Dados Pessoais” no
            Aplicativo. 7. DISPOSIÇÕES GERAIS 7.1 O autor reserva o direito de,
            a qualquer tempo, modificar o presente Termo de Uso e Política de
            Privacidade e impor termos ou condições novos ou adicionais sobre
            seu uso do aplicativo. Tais modificações e termos e condições
            adicionais terão eficácia imediata e serão incorporados a este
            Termo. 7.2 Se qualquer termo ou condição do nosso Acordo for
            considerado inválido, ilegal ou inaplicável, as partes concordam que
            tal termo ou condição poderá ser excluído e o restante do Acordo
            deverá continuar em vigorando por prazo indeterminado.
          </Title2>
        </Container>
      </ScrollView>

      <View style={{ margin: 16 }}>
        <Footer withBorder={false} style={styles.footer}>
          <View style={{ flex: 1 }}>
            <Button
              title={t('translations:reject')}
              onPress={() => handleDisagreeTerms()}
              mode="outlined"
              textColor={colors.error}
              titleFamily="medium"
            />
          </View>
          <View>
            <Button
              title={t('translations:accept')}
              onPress={() => handleCreateAccount()}
              style={styles.buttonStyle}
            />
          </View>
        </Footer>
      </View>
    </>
  );
}
export default TermsOfUse;
