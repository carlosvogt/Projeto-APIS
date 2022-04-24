import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form, Dropdown } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Footer } from '@components/layout';

function CheckViabilityForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const [selectedQuestionOne, setSelectedQuestionOne] = useState(false);
  const [selectedQuestionTwo, setSelectedQuestionTwo] = useState(false);
  const [selectedQuestionTree, setSelectedQuestionTree] = useState(false);
  const [selectedQuestionFour, setSelectedQuestionFour] = useState(false);
  const [selectedQuestionFive, setSelectedQuestionFive] = useState(false);
  const [selectedQuestionSix, setSelectedQuestionSix] = useState(false);
  const [selectedQuestionSeven, setSelectedQuestionSeven] = useState(false);
  const [selectedQuestionEight, setSelectedQuestionEight] = useState(false);

  const schema = Yup.object().shape({
    questionOne: Yup.string().required(t('translations:requiredError')),
    questionTwo: Yup.string().required(t('translations:requiredError')),
    questionTree: Yup.string().required(t('translations:requiredError')),
    questionFour: Yup.string().required(t('translations:requiredError')),
    questionFive: Yup.string().required(t('translations:requiredError')),
    questionSix: Yup.string().required(t('translations:requiredError')),
    questionSeven: Yup.string().required(t('translations:requiredError')),
    questionEight: Yup.string().required(t('translations:requiredError')),
    questionNine: Yup.string().required(t('translations:requiredError')),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const yesNotOptions = [
    {
      label: t('translations:yes'),
      value: t('translations:yes'),
    },
    {
      label: t('translations:not'),
      value: t('translations:not'),
    },
  ];
  const vegetation = [
    {
      label: t('translations:trip'),
      value: t('translations:trip'),
    },
    {
      label: t('translations:woods'),
      value: t('translations:woods'),
    },
  ];
  const distancy = [
    {
      label: t('translations:less300'),
      value: t('translations:less300'),
    },
    {
      label: t('translations:between300and400'),
      value: t('translations:between300and400'),
    },
    {
      label: t('translations:more400'),
      value: t('translations:more400'),
    },
  ];

  const floraOptions = [
    {
      label: t('translations:<=10'),
      value: t('translations:<=10'),
    },
    {
      label: t('translations:>10>=20'),
      value: t('translations:>10>=20'),
    },
    {
      label: t('translations:>20>=30'),
      value: t('translations:>20>=30'),
    },
    {
      label: t('translations:>30>=40'),
      value: t('translations:>30>=40'),
    },
    {
      label: t('translations:>40'),
      value: t('translations:>40'),
    },
  ];

  const handleSetOptionOne = (value) => {
    setSelectedQuestionOne(value);
    setValue('questionOne', value, {
      shouldValidate: true,
    });
  };

  const handleSetOptionTwo = (value) => {
    setSelectedQuestionTwo(value);
    setValue('questionTwo', value, {
      shouldValidate: true,
    });
  };

  const handleSetOptionTree = (value) => {
    setSelectedQuestionTree(value);
    setValue('questionTree', value, {
      shouldValidate: true,
    });
  };

  const handleSetOptionFour = (value) => {
    setSelectedQuestionFour(value);
    setValue('questionFour', value, {
      shouldValidate: true,
    });
  };
  const handleSetOptionFive = (value) => {
    setSelectedQuestionFive(value);
    setValue('questionFive', value, {
      shouldValidate: true,
    });
  };
  const handleSetOptionSix = (value) => {
    setSelectedQuestionSix(value);
    setValue('questionSix', value, {
      shouldValidate: true,
    });
  };
  const handleSetOptionSeven = (value) => {
    setSelectedQuestionSeven(value);
    setValue('questionSeven', value, {
      shouldValidate: true,
    });
  };
  const handleSetOptionEight = (value) => {
    setSelectedQuestionEight(value);
    setValue('questionEight', value, {
      shouldValidate: true,
    });
  };

  return (
    <>
      <Dropdown
        name="questionOne"
        label={t('translations:questionOne')}
        value={selectedQuestionOne}
        setValue={(value) => handleSetOptionOne(value)}
        data={floraOptions}
        error={errors.questionOne?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionTwo"
        label={t('translations:questionTwo')}
        value={selectedQuestionTwo}
        setValue={(value) => handleSetOptionTwo(value)}
        data={yesNotOptions}
        error={errors.questionTwo?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionTree"
        label={t('translations:questionTree')}
        value={selectedQuestionTree}
        setValue={(value) => handleSetOptionTree(value)}
        data={yesNotOptions}
        error={errors.questionTree?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionFour"
        label={t('translations:questionFour')}
        value={selectedQuestionFour}
        setValue={(value) => handleSetOptionFour(value)}
        data={vegetation}
        error={errors.questionFour?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionFive"
        label={t('translations:questionFive')}
        value={selectedQuestionFive}
        setValue={(value) => handleSetOptionFive(value)}
        data={distancy}
        error={errors.questionFive?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionSix"
        label={t('translations:questionSix')}
        value={selectedQuestionSix}
        setValue={(value) => handleSetOptionSix(value)}
        data={yesNotOptions}
        error={errors.questionSix?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionSeven"
        label={t('translations:questionSeven')}
        value={selectedQuestionSeven}
        setValue={(value) => handleSetOptionSeven(value)}
        data={yesNotOptions}
        error={errors.questionSeven?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionEight"
        label={t('translations:questionEight')}
        value={selectedQuestionEight}
        setValue={(value) => handleSetOptionEight(value)}
        data={yesNotOptions}
        error={errors.questionEight?.message}
        control={control}
        mode="bottom"
      />
      <Form.TextInput
        name="questionNine"
        keyboardType="numeric"
        returnKeyType="done"
        label={t('translations:questionNine')}
        placeholder={t('translations:questionNinePlaceholder')}
        errorMessage={errors.questionNine?.message}
        control={control}
      />
      <Footer style={{ marginTop: 8 }}>
        <Button
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          title={
            isSubmitting ? t('translations:checking') : t('translations:check')
          }
        />
      </Footer>
    </>
  );
}

CheckViabilityForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

CheckViabilityForm.defaultProps = {
  isSubmitting: false,
};

export default CheckViabilityForm;
