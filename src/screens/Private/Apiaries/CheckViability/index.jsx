/* eslint-disable consistent-return */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { Container } from '@components';
import { Header } from '@components/layout';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@theme';
import CheckViabilityForm from './CheckViabilityForm';

function CheckViability() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    viewTitle: {
      marginTop: 24,
      marginBottom: 16,
    },
    viewInstruction: {
      marginBottom: 24,
    },
  });

  const bcIndicacaoProducao = (colmeias, flora) => {
    if (flora === '<=10') {
      return parseInt(colmeias, 10) * 17.19;
    }
    if (flora === '>10 e <=20') {
      return parseInt(colmeias, 10) * 27.06;
    }
    if (flora === '>20 e <=30') {
      return parseInt(colmeias, 10) * 28.77;
    }
    if (flora === '>30 e <=40') {
      return parseInt(colmeias, 10) * 30.66;
    }
    if (flora === '>40') {
      return parseInt(colmeias, 10) * 38.94;
    }
  };

  const bcNaoIndicacao = (
    agua,
    acesso,
    vegetacao,
    distancia,
    outros,
    luz,
    lavouras,
  ) => {
    let aguaStatus;
    let acessoStatus;
    let segurancaStatus;
    let outrosStatus;
    let luzStatus;
    let lavourasStatus;

    if (agua === 'Não') {
      aguaStatus = {
        name: 'Água',
        description:
          'A falta de água pode levar as abelhas a abandonarem a colmeia. A fonte de água deve estar localiza a no máximo 300 metros do apiário, sendo ideal uma distância máxima de 50 metros.',
        status: 'Erro',
      };
    } else {
      aguaStatus = {
        name: 'Água nas proximidades',
        description: 'Ok.',
        status: 'Sucesso',
      };
    }
    if (acesso === 'Não') {
      acessoStatus = {
        name: 'Acesso ao apiário',
        description:
          'Tendo em mente que o apiário será construído para a produção de mel, deve ser possível chegar até o local com facilidade, para que seja possível transportar a produção com facilidade.',
        status: 'Erro',
      };
    } else {
      acessoStatus = {
        name: 'Acesso ao apiário',
        description: 'Ok.',
        status: 'Sucesso',
      };
    }
    if (
      (vegetacao === 'Rasteira' && distancia === 'Menos de 300 metros') ||
      (vegetacao === 'Rasteira' && distancia === 'Entre 300 e 400 metros')
    ) {
      segurancaStatus = {
        name: 'Segurança',
        description:
          'Para a segurança das pessoas, é recomendado que seja mantida uma distância mínima de 400 metros de ambientes de circulação em casos de vegetação sendo rasteira.',
        status: 'Erro',
      };
    } else if (vegetacao === 'Mata' && distancia === 'Menos de 300 metros') {
      segurancaStatus = {
        name: 'Segurança',
        description:
          'Para a segurança das pessoas, é recomendado que seja mantida uma distância mínima de 300 metros de ambientes de circulação em casos de vegetação sendo rasteira.',
        status: 'Erro',
      };
    } else {
      segurancaStatus = {
        name: 'Segurança',
        description: 'Ok.',
        status: 'Sucesso',
      };
    }
    if (outros === 'Sim') {
      outrosStatus = {
        name: 'Outros apiários',
        description:
          'As abelhas geralmente buscam alimento em um raio de até 1500 metros, a recomendação é de que os apiários sejam instalados em uma distância mínima de 3000 metros entre eles.',
        status: 'Erro',
      };
    } else {
      outrosStatus = {
        name: 'Outros apiários',
        description: 'Ok.',
        status: 'Sucesso',
      };
    }
    if (luz === 'Não') {
      luzStatus = {
        name: 'Luz solar',
        description:
          'É recomendado que o alvado receba a luz solar da manhã, para que as abelhas possam sair para a coleta de alimento o mais cedo possível.',
        status: 'Erro',
      };
    } else {
      luzStatus = {
        name: 'Luz solar',
        description: 'Ok.',
        status: 'Sucesso',
      };
    }
    if (lavouras === 'Sim') {
      lavourasStatus = {
        name: 'Lavouras nas proximidades',
        description:
          'Lavouras nas proximidades de um apiário podem ser prejudiciais pois não se sabe quais pesticidas são usados, então, é recomendado evitar tais áreas.',
        status: 'Erro',
      };
    } else {
      lavourasStatus = {
        name: 'Lavouras nas proximidades',
        description: 'Ok.',
        status: 'Sucesso',
      };
    }
    return [
      aguaStatus,
      acessoStatus,
      segurancaStatus,
      outrosStatus,
      luzStatus,
      lavourasStatus,
    ];
  };

  const expertSystemRules = (form) => {
    let expertSystemResponse = [];
    let expertSystemProbabilityResponse = 0;

    setIsSubmitting(true);
    if (form.colmeias >= 50) {
      expertSystemResponse = [
        {
          name: 'Atenção!',
          description: `É recomendada a consulta com especialista humano pois a capacidade de análise é de 50 colmeias`,
          status: 'Alerta',
        },
      ];
    } else if (
      form.agua === 'Não' ||
      form.acesso === 'Não' ||
      (form.vegetacao === 'Rasteira' &&
        form.distancia === 'Menos de 300 metros') ||
      (form.vegetacao === 'Rasteira' &&
        form.distancia === 'Entre 300 e 400 metros') ||
      (form.vegetacao === 'Mata' && form.distancia === 'Menos de 300 metros') ||
      form.outros === 'Sim' ||
      form.luz === 'Não' ||
      form.lavouras === 'Sim'
    ) {
      expertSystemResponse = bcNaoIndicacao(
        form.agua,
        form.acesso,
        form.vegetacao,
        form.distancia,
        form.outros,
        form.luz,
        form.lavouras,
      );
    } else if (
      form.agua === 'Sim' &&
      form.acesso === 'Sim' &&
      ((form.vegetacao === 'Rasteira' &&
        form.distancia === 'Mais de 400 metros') ||
        (form.vegetacao === 'Mata' &&
          form.distancia === 'Entre 300 e 400 metros') ||
        (form.vegetacao === 'Mata' &&
          form.distancia === 'Mais de 400 metros')) &&
      form.outros === 'Não' &&
      form.luz === 'Sim' &&
      form.lavouras === 'Não'
    ) {
      expertSystemProbabilityResponse = bcIndicacaoProducao(
        form.colmeias,
        form.flora,
      );

      expertSystemResponse = [
        {
          name: 'Sucesso!',
          description: `O apiário é viável e tem uma estimativa de produzir ao longo do ano cerca de ${expertSystemProbabilityResponse.toFixed(
            2,
          )} Kg`,
          status: 'Sucesso',
          estimativa: `Produção estimada para ${
            form.colmeias
          } colmeias é de ${expertSystemProbabilityResponse.toFixed(
            2,
          )} Kg no ano`,
        },
      ];
    }
    navigation.navigate('CheckViabilityResponse', expertSystemResponse);
    setIsSubmitting(false);
  };

  return (
    <>
      <Header title={t('translations:viabilityHeader')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 color={colors.primary} family="medium">
              {t('translations:checkViability')}
            </Title1>
          </View>
          <View style={styles.viewInstruction}>
            <Title2 color={colors.primary}>
              {t('translations:checkInstruction')}
            </Title2>
          </View>

          <CheckViabilityForm
            isSubmitting={isSubmitting}
            onSubmit={(form) => expertSystemRules(form)}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default CheckViability;
